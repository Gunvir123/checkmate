import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import TimeTable from './pages/TimeTable'
import Alerts from './pages/Alerts'
import Attendance from './pages/Attendance'
import Login from './pages/Login'
import Register from './pages/Register'
import Settings from './pages/Settings'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dash' element={<Dashboard />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/' element={<Register />}></Route>
        <Route path='/courses' element={<Courses />}></Route>
        <Route path='/timeTable' element={<TimeTable />}></Route>
        <Route path='/alerts' element={<Alerts />}></Route>
        <Route path='/attendance/:id' element={<Attendance />}></Route>
        <Route path='/settings' element={<Settings />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App