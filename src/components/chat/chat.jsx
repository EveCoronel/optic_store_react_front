import React, { useEffect, useState } from 'react';
import "../components.css"
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

function Chat() {

    // const [socket, setsocket] = useState(false);
    const [socketSuccess, setSocketSuccess] = useState(false);

    useEffect(() => {
        const token = Cookies.get('session');

        const socket = io('https://opticecommercekoa-production.up.railway.app', {
            auth: {
                token: token
            }
        });

        socket.on('connect', () => {
            setSocketSuccess(true)
            console.log('Socket.IO connection established');
        });

        socket.on('connect_error', (err) => {
            console.error('Socket.IO connection error:', err);
        });

        return () => socket.disconnect();
    }, []);


    return (
        <>
            {socketSuccess &&
                <div className="container">
                    <div className="columns">
                        <div className="column is-4-desktop is-12-tablet">
                            <div className="box">
                                <div className="media">
                                    <div className="media-content">
                                        <p className="title is-5">Chat</p>
                                    </div>
                                </div>
                                <div className="content">
                                    <div className="container is-max-desktop">
                                        <h1 className="title">Chat History</h1>
                                        <div className="box">
                                            <div className="media">
                                                <div className="media-content">
                                                    <div className="content">
                                                        <p>
                                                            <strong>John Smith</strong> <small>@johnsmith</small> <small>31m ago</small>
                                                            <br />
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent risus leo, dictum in vehicula sit amet, feugiat tempus tellus.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="media-content">
                                                    <div className="content">
                                                        <p>
                                                            <strong>Jane Doe</strong> <small>@janedoe</small> <small>1h ago</small>
                                                            <br />
                                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="media">
                                                <div className="media-content">
                                                    <div className="content">
                                                        <p>
                                                            <strong>John Smith</strong> <small>@johnsmith</small> <small>2h ago</small>
                                                            <br />
                                                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label className="label">Message</label>
                                        <div className="control">
                                            <textarea className="textarea" placeholder="Enter your message"></textarea>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <button className="button is-link">Send</button>
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