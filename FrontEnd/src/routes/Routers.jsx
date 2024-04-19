import { Routes, Route } from 'react-router-dom';
import React from 'react'
import Home from '../Pages/Home';
import Doctors from '../Pages/Doctor/Doctors';
import DoctorDetails from '../Pages/Doctor/DoctorDetails';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import Contact from '../Pages/Contact';
import Service from '../Pages/Service';
import MyAccount from '../Dashbooard/user-account/MyAccount'
import ProtectedRoutes from './ProtectedRoutes';
import Profile from '../Dashbooard/doctor-account/Profile';
import Dashboard from '../Dashbooard/doctor-account/Dashboard';
import CheckoutSuccess from '../Pages/Doctor/CheckoutSuccess';
import Sysmptoms from '../Pages/Symptoms'
// import Tabs from '../Dashbooard/doctor-account/Tabs';    


const Routers = () => {
    return (
        <Routes>
            <Route path='test' element={<Dashboard />} />
            <Route path='/' element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/doctors/:id' element={<DoctorDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/services' element={<Service />} />
            <Route path='/sysmptoms' element={<Sysmptoms />} />
            <Route path='checkout-success' element={<CheckoutSuccess />} />
            <Route path='/user/profile/me' element={<ProtectedRoutes allowedRoles={['patient']}><MyAccount /></ProtectedRoutes>} />
            <Route path='/doctors/profile/me' element={<ProtectedRoutes allowedRoles={['doctor']}><Dashboard /></ProtectedRoutes>} />
            {/* <Route path='/user/profile/me' element={<Profile />} />
            <Route path='/doctors/profile/me' element={<Dashboard />} /> */}
        </Routes>
    )
}

export default Routers