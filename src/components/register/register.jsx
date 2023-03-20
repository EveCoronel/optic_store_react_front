import React, { useState, useEffect } from 'react';
import { Link, Navigate } from "react-router-dom";
import "../components.css"
import axios from 'axios';
import { erorrToast, successToast } from '../../utils/toastify';
import Cookies from 'js-cookie';

function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const [success, setSuccess] = useState(false);

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('session');
        if (token) {
            setAuthenticated(true);
        }
    }, []);

    function handleRegister(e) {
        e.preventDefault();
        let newUser = {
            username: email,
            password,
            fullName,
            address,
            birthDate: birthDate.toString(),
            phoneNumber
        };

        axios.post('http://localhost:8080/api/auth/register', newUser)
            .then(response => {
                successToast("Welcome to Optic Store!")
                axios.post('http://localhost:8080/api/auth/login', { username: newUser.username, password: newUser.password })
                    .then(response => {
                        Cookies.set('session', response?.data?.data?.token, { expires: 1 / 24, path: '/' });
                        return setSuccess(true)
                    })
                    .catch(error => {
                        if (error?.response?.data?.message) {
                            erorrToast(error.response.data.message)
                        }
                    });
            })
            .catch(error => {
                console.log(error)
                if (error?.response?.data?.message) {
                    erorrToast(error.response.data.message)
                }
            });
    }

    return (
        <>
            {authenticated && <Navigate to="/home" />}
            {success && <Navigate to="/cart" />}
            <div className='content is-flex-grow-1'>
                <form className='box' onSubmit={handleRegister}>
                    <div className="field">
                        <label className="label">
                            Full Name:
                            <input required={true} className="input" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        </label>
                    </div>
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
                    <div className="field">
                        <label className="label">
                            Birthdate:
                            <input required={true} className="input" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                        </label>
                    </div>
                    <div className="field">
                        <label className="label">
                            Address:
                            <input required={true} className="input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </label>
                    </div>
                    <div className="field">
                        <label className="label">
                            Phone Number:
                            <input required={true} className="input" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        </label>
                    </div>
                    <button className="button is-primary" type="submit" onClick={() => handleRegister}>Register</button>
                </form>
                <article>
                    <span>Already registed?</span>
                    <Link to={'/'} >
                        <button className='button'>Login Here</button>
                    </Link>
                </article>
            </div>
        </>
    );
}

export default Register;