
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TimeTable.css';
import TimeTableModal from '../components/timeTableModal';
import EditTimeTable from '../components/EditTimeTable';
import Navbar from './Navbar.jsx';
import EditModal from '../components/EditModal.jsx';
import { toast } from 'react-toastify';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const TimeTable = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('login first!')
            navigate('/login')
        }
    }, [])



    const [timeTableData, settimeTableData] = useState([]);



    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const getTimeTable = async () => {
            try {
                const { data } = await axios.get('http://localhost:8081/timeTable/' + userId);
                settimeTableData(data.data);
                console.log(data.data); // Ensure data is logged correctly
            } catch (error) {
                console.error('Error fetching time table data:', error);
            }
        };

        getTimeTable();
    }, []);

    const renderDayContent = (day) => {
        const dayData = timeTableData.filter(data => data.day === day);
        if (dayData.length > 0) {
            return (
                <td>
                    {dayData.map((data, index) => (
                        <div key={index} className="timetable-entry">
                            <div> <h6>{data.course.subjectCode} {data.course.subjectName}</h6></div>
                            <div>{data.startTime}-{data.endTime}</div>
                            <div className='d-flex mt-2' style={{ marginLeft: '130px' }}>

                                <EditTimeTable sub={data.course} start={data.startTime} end={data.endTime} Day={data.day} time_id={data._id} />

                                <MdDelete className="icon-edit" onClick={() => handleDelete(data._id)} />
                            </div>
                            {<hr className="entry-divider" />}
                        </div>
                    ))}
                </td>
            );
        } else {
            return <td></td>;
        }
    };

    const handleDelete = async (entryId) => {
        console.log(entryId);
        try {
            const tableId = entryId;
            const { data } = await axios.delete('http://localhost:8081/timeTable/' + tableId);
            if (data.success) {
                toast.success(data.message);
            }
            else {
                toast.error("some server issue");
            }

        } catch (error) {
            toast.error(error);


        }
    }

    return (
        <>
            <div className='d-flex'>
                <Navbar />
                <div style={{ marginLeft: '320px' }}>
                    <TimeTableModal />
                    <div className="timetable-container">
                        <table className="timetable">
                            <thead>
                                <tr>
                                    <th>Monday</th>
                                    <th>Tuesday</th>
                                    <th>Wednesday</th>
                                    <th>Thursday</th>
                                    <th>Friday</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    {renderDayContent('Monday')}
                                    {renderDayContent('Tuesday')}
                                    {renderDayContent('Wednesday')}
                                    {renderDayContent('Thursday')}
                                    {renderDayContent('Friday')}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TimeTable;

