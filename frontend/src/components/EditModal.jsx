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
import '../pages/Courses.css'

function EditModal({ sub_name, sub_code, sub_criteria, sub_id }) {
    const [show, setShow] = useState(true);
    const [criteria, setCriteria] = useState(sub_criteria);
    const [code, setCode] = useState(sub_code);
    const [name, setName] = useState(sub_name);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setShow(false);
        console.log(show);
        // setCode('');
        // setName('');
        // setCriteria(50);
    };



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
            const { data } = await axios.patch('http://localhost:8081/subject/' + sub_id, { name, code, criteria });
            console.log(data);


            setLoading(false);
            handleClose();
            toast.success('Course updated successfully!');
            window.location.reload();
            // Persist the loading effect for a few seconds

        } catch (error) {
            toast.error('Failed to update course.');
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <>

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
                            'Update Course Details'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
}

export default EditModal;
