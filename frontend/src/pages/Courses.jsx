import React, { useEffect, useState } from 'react';
import CourseModal from '../components/CourseModal';
import './Courses.css';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from "react-icons/md";
import { PieChart } from 'react-minimal-pie-chart';
import axios from 'axios';
import EditModal from '../components/EditModal';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BarChart from '../components/AttendanceChart';
import DonutChart from '../components/AttendanceChart';
import Navbar from './Navbar';
import AlertsModal from '../components/AlertsModal';
const Courses = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('login first!')
            navigate('/login')
        }
    }, [])



    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const getAllCourses = async () => {
            const userId = localStorage.getItem('userId');
            try {
                const { data } = await axios.get('http://localhost:8081/subject/' + userId);
                setSubjects(data.subjects);
                console.log(data.subjects);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };
        getAllCourses();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete('http://localhost:8081/subject/' + id);

        toast.error("subject deleted")
        window.location.reload();
    }


    const [editIndex, setEditIndex] = useState(null);
    const [click, setClicked] = useState(false);

    const handlePresent = async (id) => {
        const date = new Date();
        const subjectId = id;
        const status = 'Present'
        const { data } = await axios.post('http://localhost:8081/attendance', { date, subjectId, status });
        toast.success('attendance marked')
    }

    const handleAbsent = async (id) => {
        const date = new Date();
        const subjectId = id;
        const status = 'Absent'
        const { data } = await axios.post('http://localhost:8081/attendance', { date, subjectId, status });
        console.log(data);
        toast.success('attendance marked')
    }

    const naviagte = useNavigate();


    const calculateAttendancePercentage = (presentCount, totalCount) => {
        return (presentCount / totalCount) * 100;
    };

    const getAttendanceStatus = (subject) => {
        const { presentCount, absentCount, criteria } = subject;
        const attendedPercentage = calculateAttendancePercentage(presentCount, presentCount + absentCount);

        if (attendedPercentage >= criteria) {
            return "You're on track with your attendance!";
        }
        else {
            const remainingClasses = Math.ceil((criteria * (presentCount + absentCount) - 100 * presentCount) / (100 - criteria));
            return `You need to attend ${remainingClasses} more classes to meet the attendance criteria.`;
        }
    };
    return (
        <>
            <div className='d-flex'>
                <Navbar />
                <div style={{ marginLeft: '450px' }}>

                    <CourseModal />
                    <AlertsModal />

                    {subjects.map((subject, index) => (
                        <div key={index} className="card small-card">
                            <div className="card-body d-flex justify-content-between align-items-center">
                                <div>
                                    <h5 className="card-title">{subject.subjectCode} {subject.subjectName}</h5>
                                    <p className="card-text">{getAttendanceStatus(subject)}</p>
                                    <button className="btn btn-success mr-2" onClick={() => handlePresent(subject._id)}>Present</button>
                                    <button className="btn btn-danger ms-3" onClick={() => handleAbsent(subject._id)}>Absent</button>
                                    <p className="mt-2 text-white">Your set criteria is {subject.criteria}%</p>
                                    <button className='btn btn-primary' onClick={() => naviagte('/attendance/' + subject._id)}>Attendance details</button>
                                    <br />
                                    <span className='text-white'>Present :- {subject.presentCount}</span>

                                    <span className='text-white ms-2'>| Absent :- {subject.absentCount}</span>
                                    <span className='text-white ms-2'>| Total :- {subject.presentCount + subject.absentCount}</span>
                                    <div className='text-white '>Current Attendance : {subject.presentCount == 0 ? 0 : Math.ceil(100 * subject.presentCount / (subject.presentCount + subject.absentCount))}%</div>
                                </div>
                                <div className="position-relative">
                                    <FiEdit className="icon-edit" style={{ position: 'absolute', right: '40px' }} onClick={() => { setClicked(!click); setEditIndex(index) }} />
                                    {click && editIndex == index && <EditModal sub_name={subject.subjectName} sub_code={subject.subjectCode} sub_criteria={subject.criteria} sub_id={subject._id} />}
                                    <MdDelete className="icon-edit" style={{ position: 'absolute', right: '2px' }} onClick={() => handleDelete(subject._id)} />
                                    <div className='mt-4'><DonutChart presentCount={subject.presentCount} absentCount={subject.absentCount} /></div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Courses;





