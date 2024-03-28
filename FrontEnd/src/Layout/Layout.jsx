import React from 'react'
// import { Routes, Route } from 'react-router-dom'
// import Home from '../Pages/Home'
// import Service from '../Pages/Service'
// import Login from '../Pages/Login'
// import Signup from '../Pages/Signup'
// import Contact from '../Pages/Contact'
// import DoctorDetails from '../Pages/Doctor/DoctorDetails'
// import Doctors from '../Pages/Doctor/Doctors'
// import ProtectedRoutes from '../routes/ProtectedRoutes'
// import Profile from '../Dashbooard/doctor-account/Profile'
// import MyAccount from '../Dashbooard/user-account/MyAccount'
// import Dashboard from '../Dashbooard/doctor-account/Dashboard'
// import Porfile from '../Dashbooard/user-account/Porfile'
import { ToastContainer } from 'react-toastify'
import Routers from '../routes/Routers'
import Header from '../Components/Headers/Header'
import Footer from '../Components/Footers/Footer'

const Layout = () => {
    return (
        <>
            <Header />
            <ToastContainer theme='dark' position='top-center' autoClose={3000} closeOnClick pauseOnHover={false} />
            <main>
                <Routers />
            </main>
            <Footer />
        </>
    )
}
// const Layout = () => {
//     return (
//         // <div>
//         //     {/* <Routes>
//         //         <Route path='/' element={<Home />} />
//         //         <Route path='/services' element={<Service />} />
//         //         <Route path='/contact' element={<Contact />} />
//         //         <Route path='/login' element={<Login />} />
//         //         <Route path='/signup' element={<SignUp />} />
//         //         <Route path='/doctors' element={<Doctors />} />
//         //         <Route path='/doctors/:id' element={<DoctorDetails />} />

//         //     </Routes> */}
//         //     <Routes>
//         //         <Route path='/' element={<Home />} />
//         //         <Route path='/home' element={<Home />} />
//         //         <Route path='/doctors' element={<Doctors />} />
//         //         <Route path='/doctors/:id' element={<DoctorDetails />} />
//         //         <Route path='/login' element={<Login />} />
//         //         <Route path='/signup' element={<Signup />} />
//         //         <Route path='/contact' element={<Contact />} />
//         //         <Route path='/services' element={<Service />} />
//         //         {/* <Route path='/user/profile/me' element={<ProtectedRoutes allowedRoles={'patient'}><Porfile /></ProtectedRoutes>} />
//         //         <Route path='/doctors/profile/me' element={<ProtectedRoutes allowedRoles={'doctors'}><Dashboard /></ProtectedRoutes>} /> */}
//         //         <Route path='/user/profile/me' element={<MyAccount />} />
//         //         <Route path='/doctors/profile/me' element={<Dashboard />} />
//         //     </Routes>
//         // </div>
//     )
// }

export default Layout