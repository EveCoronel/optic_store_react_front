import React, { useEffect, useState } from 'react';
import "../components.css"
import io from 'socket.io-client';
import Cookies from 'js-cookie';
// import { Navigate } from 'react-router-dom';
import timeAgo from '../../utils/timeAgo';

const token = Cookies.get('session');



function Chat() {

    const [socketSuccess, setSocketSuccess] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {

        const socket = io('https://opticecommercekoa-production.up.railway.app', {
            auth: {
                token: token
            }
        });

        setSocket(socket);

        socket.on('connect', () => {
            setSocketSuccess(true)
            console.log('Socket.IO connection established');
        });

        socket.on('messages', (messages) => {
            setMessages(messages);
        });

        socket.on('connect_error', (err) => {
            console.error('Socket.IO connection error:', err);
        });

        return () => socket.disconnect();
    }, []);


    const handleFunction = (e) => {
        socket.emit("new-message", newMessage)
        setNewMessage("")
    }

    return (
        <>
            {socketSuccess &&
                <div className="container">
                    <div className="columns">
                        <div className="column is-4-desktop is-12-tablet">
                            <div className="box">
                                <div className="media">
                                </div>
                                <div className="content">
                                    <div className="container is-max-desktop">
                                        <h1 className="title">Chat</h1>
                                        <div className="box">
                                            {messages && messages.map((item) => (
                                                <div className="media">
                                                    <div className="content">
                                                        <p>
                                                            <strong><small>{item.username}</small></strong><small> {timeAgo(item.date)} </small>
                                                            <br />
                                                            {item.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Message</label>
                                        <div className="control">
                                            <textarea className="textarea" placeholder="Enter your message" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button className="button is-link" onClick={(e) => handleFunction()}>Send</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            } {!socketSuccess && <div>Chat not available, return later</div>}
        </>
    );
}

export default Chat;