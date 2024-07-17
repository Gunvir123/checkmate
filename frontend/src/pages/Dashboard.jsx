import React, { useEffect, useState } from 'react'
import './Dashboard.css'

import SubjectsChart from '../components/SubjectsChart';
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';
import AlertsModal from '../components/AlertsModal';
import axios from 'axios';

const Dashboard = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('login first!');
            navigate('/login');
        }
    }, [])

    const [alerts, setAlerts] = useState();
    const [coursesEnrolled, setCoursesEnrolled] = useState();
    const [todayCourses, setTodayCourses] = useState();
    const [timeTable, setTimeTable] = useState([]);
    const [charts, setCharts] = useState([]);
    const [day, setDay] = useState();

    useEffect(() => {

        const getData = async () => {
            const userId = localStorage.getItem('userId');
            const { data } = await axios.get('http://localhost:8081/dashboard/' + userId);
            console.log(data);
            setCoursesEnrolled(data.countOfSubjects);
            setAlerts(data.countOfAlerts);
            setTodayCourses(data.countOfClasses);
            setCharts(data.subjectWithPercentange);
            setTimeTable(data.todaysTimeTable);

        }

        getData();

        function getTodaysDayName() {
            let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let today = new Date().getDay();
            let dayName = daysOfWeek[today];
            setDay(dayName);
        }

        // Example usage:
        getTodaysDayName();







    }, []);


    return (
        <div className='d-flex '>
            <Navbar />
            <div>
                <AlertsModal />
                <div className='d-flex '>

                    <div class="card p-4 " style={{ height: '20vh', width: '15vw', marginLeft: '320px' }}>
                        <div class="card-body">

                            <h6 className='text-white' style={{ position: 'absolute', top: '10px', left: '20px' }}>Courses Enrolled</h6>
                            <h4 className='text-white' style={{ position: 'absolute', top: '65px', left: '100px' }}>{coursesEnrolled} </h4>
                        </div>
                    </div>

                    <div class="card p-4 " style={{ height: '20vh', width: '15vw', marginLeft: '40px' }}>
                        <div class="card-body">
                            <h6 className='text-white' style={{ position: 'absolute', top: '10px', left: '20px' }}>Classes Today</h6>
                            <h4 className='text-white' style={{ position: 'absolute', top: '65px', left: '100px' }}>{todayCourses} </h4>
                        </div>
                    </div>

                    <div class="card p-4 " style={{ height: '20vh', width: '15vw', marginLeft: '40px' }}>
                        <div class="card-body">
                            <h6 className='text-white' style={{ position: 'absolute', top: '10px', left: '20px' }}>Short Courses</h6>
                            <h4 className='text-white' style={{ position: 'absolute', top: '65px', left: '100px' }}>{alerts} </h4>
                        </div>
                    </div>

                </div>


                <div className='d-flex' >

                    <div class="card p-4 " style={{ height: '70vh', width: '50vw', marginLeft: '320px' }}>
                        <div class="card-body">
                            <SubjectsChart subjects={charts} />
                        </div>
                    </div>

                    <div class="card p-4 " style={{ height: '100%', width: '20vw', marginLeft: '40px' }}>
                        <div className='text-center'>
                            <div className='text-white'>{day}</div>
                        </div>

                        {timeTable.map((subject, index) => (<div class="card-body">
                            <div >
                                <div className='text-white'>{subject.course.subjectCode}-{subject.course.subjectName}</div>
                                <div className='text-white'>{subject.startTime}-{subject.endTime}</div>

                            </div>

                        </div>))}



                    </div>

                </div>


            </div>


        </div>


    )
}

export default Dashboard