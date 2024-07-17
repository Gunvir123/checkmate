import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Settings = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('login first!')
            navigate('/login')
        }
    }, [])

    const [username, setName] = useState(localStorage.getItem('username'));
    const [email, setEmail] = useState(localStorage.getItem('email'));

    const handleChange = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const { data } = await axios.patch('http://localhost:8081/login/' + userId, { username, email });
        console.log(data);
        if (data.success) {
            localStorage.setItem("username", data.data.username);
            localStorage.setItem("email", data.data.email);
            alert('data updated successfully');
            navigate('/settings');

        }

        else {
            alert('error updating details ');
        }
    }




    return (
        <div>
            <Navbar />
            <div style={{ marginLeft: '320px' }}>
                <h3 className='mt-5 text-info'>Profile Settings</h3>
                <img src="https://cdn-icons-png.flaticon.com/512/3607/3607444.png" alt="" width={"220px"} height={"220px"} className='mt-5 text-center' style={{ marginLeft: '25vw' }} />

                <form style={{ width: '50vw', marginLeft: '10vw' }} onSubmit={handleChange}>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Username</label>
                        <input type="text" class="form-control" placeholder="Enter username" value={username} onChange={(e) => setName(e.target.value)} />


                    </div>

                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />

                    </div>


                    <button type="submit" class="btn btn-danger">Save changes</button>
                </form>

            </div>
        </div>
    );
}

export default Settings;
