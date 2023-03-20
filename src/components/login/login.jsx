import React, { useState, useEffect } from 'react';
import { Link, Navigate } from "react-router-dom";
import "../components.css"
import axios from 'axios';
import { erorrToast, successToast } from '../../utils/toastify';
import Cookies from 'js-cookie';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('session');
        if (token) {
            setAuthenticated(true);
        }
    }, []);

    function handleLogin(e) {
        e.preventDefault();

        let user = {
            username: email,
            password
        }
        axios.post('http://localhost:8080/api/auth/login', user)
            .then(response => {
                successToast("The login was sucessfully!")
                Cookies.set('session', response?.data?.data?.token, { expires: 1 / 24, path: '/' });
                return setSuccess(true)
            })
            .catch(error => {
                console.log(error)
                if (error?.response?.data?.data?.message) {
                    erorrToast(error.response.data.message)
                }
            });
    }

    return (
        <>
            {authenticated && <Navigate to="/home" />}
            {success && <Navigate to="/cart" />}
            <div className='content is-flex-grow-1'>
                <form className='box' onSubmit={handleLogin}>
                    <div className="field">
                        <label className="label">
                            Email:
                            <input required={true} className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                    </div>
                    <div className="field">
                        <label className="label">
                            Password:
                            <input required={true} className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <button className='button is-primary' type="submit" onClick={() => handleLogin}>Login</button>
                </form>
                <article>
                    <span>Don't have an account?</span>
                    <Link to={'/register'} >
                        <button className='button'>Register Here</button>
                    </Link>
                </article>
            </div>
        </>
    );
}

export default Login;