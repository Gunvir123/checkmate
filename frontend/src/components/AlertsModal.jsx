import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function AlertsModal() {

    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            alert('login first!');
            navigate('/login');
        }
    }, [])
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [data, setData] = useState([]);

    useEffect(() => {
        const getSubjectsAttendance = async () => {
            const id = localStorage.getItem("userId");
            const { data } = await axios.get('http://localhost:8081/alert/' + id);
            setData(data.subjects);

            console.log(data.subjects);

        }
        getSubjectsAttendance();
    }, [])

    if (data.length === 0) {
        return null; // Return null if there is no data, preventing the modal from rendering
    }


    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>Your attendance of {data[0].subjectName} with course code {data[0].subjectCode} is short !! Checkout alert section</Modal.Body>


            </Modal>
        </>
    );
}

export default AlertsModal;