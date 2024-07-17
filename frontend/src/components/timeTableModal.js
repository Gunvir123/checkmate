import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdAddCircleOutline } from "react-icons/md";
import axios from 'axios';
function TimeTableModal() {
    const [show, setShow] = useState(false);
    const [course, setCourse] = useState('');
    const [startTime, setStart] = useState('');
    const [endTime, setEnd] = useState('');
    const [day, setDay] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const handleShow = () => setShow(true);

    const resetForm = () => {
        setCourse('');
        setStart('');
        setEnd('');
        setDay('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulated API call, replace with actual Axios post request
            // await axios.post('/api/courses', { course, start, end, day });
            const userId = localStorage.getItem("userId");
            const { data } = await axios.post('http://localhost:8081/timeTable', { day, course, startTime, endTime, userId });
            if (data.success) {
                //alert(data.message);
                toast.success('Course added to time table successfully');
            }
            else {
                alert('some server issue')
            }
            resetForm();
        } catch (error) {
            toast.error('Failed to add course');
        } finally {
            setLoading(false);
            setShow(false);
        }
    };

    const [courseOptions, setCourseOptions] = useState([]);
    useEffect(() => {
        const getCourses = async () => {
            const id = localStorage.getItem("userId");
            const { data } = await axios.get('http://localhost:8081/subject/' + id);
            //console.log(data);
            setCourseOptions(data.subjects);
        }

        getCourses();
    }, [])



    return (
        <>
            <Button variant="primary" onClick={handleShow} className="mb-3 ms-2 mt-2">
                <MdAddCircleOutline className='mx-1 mb-0.5' fontSize={20} /> Add Course
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Course Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="courseName">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Select
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                required
                            >
                                <option value="">Select Course...</option>
                                {courseOptions.map((course, index) => (
                                    <option value={course._id}>{course.subjectCode}:-{course.subjectName}</option>

                                ))}

                                {/* Add more options as needed */}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="startTime">
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={startTime}
                                onChange={(e) => setStart(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="endTime">
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                                type="time"
                                value={endTime}
                                onChange={(e) => setEnd(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="lectureDay">
                            <Form.Label>Lecture Day</Form.Label>
                            <Form.Select
                                value={day}
                                onChange={(e) => setDay(e.target.value)}
                                required
                            >
                                <option value="">Select Day...</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                {/* Add more options as needed */}
                            </Form.Select>
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" disabled={loading} >
                                {loading ? (
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                ) : (
                                    'Add Course'
                                )}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
}

export default TimeTableModal;
