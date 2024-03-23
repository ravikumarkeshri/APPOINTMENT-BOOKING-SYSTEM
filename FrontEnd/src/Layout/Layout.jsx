import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import Service from '../Pages/Service'
import Login from '../Pages/Login'
import SignUp from '../Pages/Signup'
import Contact from '../Pages/Contact'
import DoctorDetails from '../Pages/Doctor/DoctorDetails'
import Doctors from '../Pages/Doctor/Doctors'

const Layout = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/services' element={<Service />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<SignUp />} />
                <Route path='/doctors' element={<Doctors />} />
                <Route path='/doctor/:id' element={<DoctorDetails />} />

            </Routes>
        </div>
    )
}

export default Layout