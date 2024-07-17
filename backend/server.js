const express = require('express');
const cors = require('cors');
const connectDb = require('../backend/config/db');
const { addSubjectController, deleteSubjectController, updateSubjectController, getAllSubjects } = require('./controllers/subjectController');
const { getAttendance, createAttendance, updateAttendance, deleteAttendance, attendanceStats } = require('./controllers/attendanceController');
const { createTimeTable, getTimeTable, updateTimeTable, deleteTimeTable } = require('./controllers/timeTableController');
const { getSubjectsForAlerts } = require('./controllers/alertController');
const { getDashboardData } = require('./controllers/dashBoardController');
const { loginController, registerController, updateUser } = require('./controllers/userController');
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//apis

//user

app.post('/login', loginController);
app.post('/register', registerController);
app.patch('/login/:id', updateUser);

//subject
app.post('/subject', addSubjectController)
app.delete('/subject/:id', deleteSubjectController)
app.patch('/subject/:id', updateSubjectController)
app.get('/subject/:id', getAllSubjects)

//attendance
app.get('/attendance/:id', getAttendance);
app.post('/attendance', createAttendance);
app.patch('/attendance/:id', updateAttendance);
app.delete('/attendance/:id', deleteAttendance);

//time table
app.post('/timeTable', createTimeTable);
app.get('/timeTable/:id', getTimeTable);
app.patch('/timeTable/:id', updateTimeTable);
app.delete('/timeTable/:id', deleteTimeTable);

//alerts
app.get('/alert/:id', getSubjectsForAlerts);

//dashboard
app.get('/dashboard/:id', getDashboardData);

connectDb();

app.listen(8081, () => {
    console.log("hello");
})