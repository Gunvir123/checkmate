import React, { useEffect } from 'react'
import './Dashboard.css'
import { TbMathSymbols } from "react-icons/tb";
import { HiMiniBellAlert } from "react-icons/hi2";
import { FaRegCalendarTimes } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoIosPerson } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('login first!')
            navigate('/login')
        }
    }, [])

    const username = localStorage.getItem('username');
    return (
        <div>
            <div className='side-navbar p-2' style={{ width: '19vw', height: '100vh' }}>

                <div onClick={() => navigate('/dash')}><IoIosPerson />Welcome Back , {username} !</div>
                <hr />
                <div onClick={() => navigate('/courses')}><TbMathSymbols />Courses</div>
                <div onClick={() => navigate('/timeTable')} ><FaRegCalendarTimes />Time Table</div>
                <div onClick={() => navigate('/alerts')}><HiMiniBellAlert />Alerts</div>
                <hr />
                <div onClick={() => navigate('/settings')}><IoSettings />Settings</div>
            </div>
        </div>
    )
}

export default Navbar