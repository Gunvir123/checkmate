// src/components/LoginForm.js
import React, { useEffect, useState } from 'react';
import './Login.css'; // Import custom styles for LoginForm
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('http://localhost:8081/register', { username, email, password });
        console.log(data);
        if (data.success) {
            //toast.success("Registeration successfull");
            alert('registered successfully')
            navigate('/login')
        }
    }







    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-header text-black">Register</h2>
                <div className="form-group">
                    <label >Your Name</label>
                    <input
                        type="text"
                        className="form-control"

                        aria-describedby="emailHelp"
                        placeholder="Your Name"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default Register;
