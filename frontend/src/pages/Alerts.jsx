import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Alerts = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('login first!')
            navigate('/login')
        }
    }, [])

    const [data, setData] = useState([]);
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const getSubjectsAttendance = async () => {
            const { data } = await axios.get('http://localhost:8081/alert/' + userId);
            setData(data.subjects);
            console.log(data.subjects);

        }
        getSubjectsAttendance();
    }, [])

    return (
        <>
            <div className='d-flex'>
                <Navbar />
                <div className='' style={{ marginLeft: '320px', marginTop: '20px' }}>

                    {data.map((subject, index) => (
                        <div key={index} className="alert alert-danger" role="alert">
                            Your attendance of {subject.subjectName} with course code {subject.subjectCode} is short !! Checkout the courses section for more details
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default Alerts