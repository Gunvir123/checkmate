// src/components/LoginForm.js
import React, { useEffect, useState } from 'react';
import './Login.css'; // Import custom styles for LoginForm
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
const Login = () => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const { data } = await axios.post('http://localhost:8081/login', {
                email: email,
                password: password
            });

            console.log(data.success);
            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                localStorage.setItem("userId", data.id);
                localStorage.setItem("email", data.email);
                alert("user logged in!");
                navigate('/dash');
            }
            else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2 className="login-header text-black">Login</h2>
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
                    Sign In
                </button>
                <p className='text-danger'>Not registered ? <Link to={'/'}>Register</Link></p>
            </form>
        </div>
    );
}

export default Login;
