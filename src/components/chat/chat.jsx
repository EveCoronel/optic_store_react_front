import React, { useContext, useEffect, useState } from 'react';
import "../components.css"
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import timeAgo from '../../utils/timeAgo';
import AuthContext from '../../context/authContext';

const token = Cookies.get('session');



function Chat() {


    const [socketSuccess, setSocketSuccess] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);
    const authContext = useContext(AuthContext);
    const isAuthenticated = authContext.isAuthenticated();

    useEffect(() => {
        if (isAuthenticated) {
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
        }
    }, []);


    const handleFunction = (e) => {
        socket.emit("new-message", newMessage)
        setNewMessage("")
    }


    if (isAuthenticated) {
        return (<>
            {socketSuccess &&
                <main>
                    <div className="divChat">
                        <div className='container_chat'>
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
                </main>
            } {!socketSuccess && <main className='divChat notification'>Chat not available, return later</main>}
        </>
        )
    } else {
        return (
            <div className="chatNotAuthenticated notification is-warning divChat">
                <p>You must login for using the chat</p>
                <Link to={"/"} >
                    <button className="button is-primary">Log in</button>
                </Link>
            </div>
        )
    }

}

export default Chat;