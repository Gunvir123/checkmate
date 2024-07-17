import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Slider from 'rc-slider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rc-slider/assets/index.css';
import axios from 'axios';
import '../pages/Courses.css';
import { MdAddCircleOutline } from "react-icons/md";

function CourseModal() {
    const [show, setShow] = useState(false);
    const [criteria, setCriteria] = useState(50);
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setShow(false);
        setCode('');
        setName('');
        setCriteria(50);
    };

    const handleShow = () => setShow(true);

    const handleCriteriaChange = (value) => {
        setCriteria(value);
    };

    const handleClick = async () => {
        if (code.trim() === '' || name.trim() === '') {
            toast.error('Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            const userId = localStorage.getItem("userId");
            const { data } = await axios.post('http://localhost:8081/subject', { name, code, criteria, userId });
            console.log(data);


            setLoading(false);
            handleClose();
            // Persist the loading effect for a few seconds

            toast.success('Course added successfully!');
        } catch (error) {
            toast.error('Failed to add course.');
            console.error(error);
            setLoading(false);
        }
    };

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
                    <Form>
                        <Form.Group className="mb-3" controlId="courseCode">
                            <Form.Label>Course Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter course code"
                                required

                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="courseName">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter course name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="criteria">
                            <Form.Label>Criteria: {criteria}%</Form.Label>
                            <Slider
                                min={0}
                                max={100}
                                value={criteria}
                                onChange={handleCriteriaChange}
                                trackStyle={{ backgroundColor: '#007bff' }}
                                handleStyle={{ borderColor: '#007bff' }}
                            />
                            <div className="d-flex justify-content-between mt-2">
                                <span>0%</span>
                                <span>100%</span>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClick} disabled={loading}>
                        {loading ? (
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        ) : (
                            'Add Course'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
}

export default CourseModal;
