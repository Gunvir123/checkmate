// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { FiEdit } from 'react-icons/fi';
// import { MdDelete } from "react-icons/md";
// import './Courses.css';


// const Attendance = () => {
//     const { id } = useParams();
//     const [attendance, setAttendance] = useState([]);

//     useEffect(() => {
//         const getAttendance = async () => {
//             console.log(id);
//             try {
//                 const { data } = await axios.get(`http://localhost:8081/attendance/${id}`);
//                 console.log(data.data);
//                 setAttendance(Array.isArray(data.data) ? data.data : []);
//             } catch (error) {
//                 console.error("Error fetching attendance data:", error);
//             }
//         };

//         getAttendance();
//     }, [id]);

//     const convertToIST = (dateString) => {
//         const date = new Date(dateString);
//         const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
//         const dateInIST = new Date(date.getTime() + ISTOffset);
//         const hours = dateInIST.getUTCHours().toString().padStart(2, '0');
//         const minutes = dateInIST.getUTCMinutes().toString().padStart(2, '0');
//         const seconds = dateInIST.getUTCSeconds().toString().padStart(2, '0');
//         return `${hours}:${minutes}:${seconds}`;
//     };


//     const updateAttendance = async(id)=>{
//         await axios.patch('http://localhost:8081/'+id)
//     }

//     return (
//         <>
//             <table className="table table-dark">
//                 <thead>
//                     <tr>
//                         <th scope="col">#</th>
//                         <th scope="col">Date</th>
//                         <th scope="col">Time (IST)</th>
//                         <th scope="col">Status</th>
//                         <th scope="col">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {console.log(attendance.length)}
//                     {attendance.map((key, index) => (
//                         <tr key={index}>
//                             <th scope="row">{index + 1}</th>
//                             <td>{key.date.split("T")[0]}</td>
//                             <td>{convertToIST(key.date)}</td>
//                             <td>
//                                 {key.status === 'Present' ?
//                                     (<span className="badge bg-success">Present</span>) :
//                                     (<span className="badge bg-danger">Absent</span>)
//                                 }
//                             </td>
//                             <td>
//                                 {/* Add your action buttons here */}
//                                 <FiEdit className="icon-edit" />

//                                 <MdDelete className="icon-edit" />
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </>
//     );
// };

// export default Attendance;



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from "react-icons/md";
import './Courses.css';
import { toast, ToastContainer } from 'react-toastify';

const Attendance = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('login first!')
            navigate('/login')
        }
    }, [])
    const { id } = useParams();
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        const getAttendance = async () => {
            console.log(id);
            //const userId = localStorage.getItem('userId');
            try {
                const { data } = await axios.get(`http://localhost:8081/attendance/${id}`);
                console.log(data.data);
                setAttendance(Array.isArray(data.data) ? data.data : []);
            } catch (error) {
                console.error("Error fetching attendance data:", error);
            }
        };

        getAttendance();
    }, [id]);

    const convertToIST = (dateString) => {
        const date = new Date(dateString);
        const ISTOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
        const dateInIST = new Date(date.getTime() + ISTOffset);
        const hours = dateInIST.getUTCHours().toString().padStart(2, '0');
        const minutes = dateInIST.getUTCMinutes().toString().padStart(2, '0');
        const seconds = dateInIST.getUTCSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    };

    const toggleAttendanceStatus = async (attendanceId, currentStatus) => {
        const confirmed = window.confirm(`Do you want to mark this attendance as ${currentStatus === 'Present' ? 'Absent' : 'Present'}?`);
        if (confirmed) {
            try {
                const { data } = await axios.patch(`http://localhost:8081/attendance/${attendanceId}`, {
                    status: currentStatus === "Present" ? "Absent" : "Present"
                });

                toast.success('attendance updated successfully')
                // Update the local state or fetch fresh data
                // Example: Refetching the attendance list
            } catch (error) {
                console.error("Failed to update attendance status:", error);
            }
        }
    };

    const handleDelete = async (id) => {
        const { data } = await axios.delete('http://localhost:8081/attendance/' + id);
        toast.success(data.message);

    }

    return (
        <>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time (IST)</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {attendance.length > 0 ? attendance.map((key, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{key.date.split("T")[0]}</td>
                            <td>{convertToIST(key.date)}</td>
                            <td>
                                {key.status === 'Present' ?
                                    (<span className="badge bg-success">Present</span>) :
                                    (<span className="badge bg-danger">Absent</span>)
                                }
                            </td>
                            <td>
                                <FiEdit className="icon-edit" onClick={() => toggleAttendanceStatus(key._id, key.status)} />
                                <MdDelete className="icon-edit" onClick={() => handleDelete(key._id)} />

                                {/* Optionally, add a delete button */}
                                {/* <button onClick={() => deleteAttendance(key._id)}>Delete</button> */}
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="5" className="text-center">No attendance records found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
};

export default Attendance;

