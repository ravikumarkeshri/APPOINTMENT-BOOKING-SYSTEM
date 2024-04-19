import React from 'react'
// import { BiMenu } from 'react-icons/bi'
import { useContext } from 'react'
import { authContext } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


const Tabs = ({ tab, setTab }) => {
    const {dispatch} = useContext(authContext)
    const navigate = useNavigate();

    // const handleLogout = () => {
    //     dispatch({ type: 'LOGOUT' })
    //     navigate('/')
    // }
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        toast.warning('Logged Out')
        navigate('/home')
    };
    return (
        <div className='border-2 border-black '>
            {/* <span className='lg:hidden'>
                <BiMenu className='w-6 h-6 cursor-pointer' />
            </span> */}
            <div className=' lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md'>
                <button
                    onClick={() => setTab('overview')}
                    className={`${tab === 'overview' ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor "} w-[100%] btn mt-0  `}>
                    Overview
                </button>
                <button
                    onClick={() => setTab('appointment')}
                    className={`${tab === 'appointments' ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor "} w-full btn mt-0 `}>
                    Appointment
                </button>
                <button
                    onClick={() => setTab('settings')}
                    className={`${tab === 'settings' ? "bg-indigo-100 text-primaryColor" : "bg-transparent text-headingColor "} w-full btn mt-0 `}>
                    Profile
                </button>
                <div className=" mt-[100px] w-full">
                    <button
                        onClick={handleLogout}
                        className=" w-full p-3 rounded-md text-[16px] leading-7 bg-[#181A1E] text-white"
                    >
                        Logout
                    </button>
                    <button className=" w-full p-3 rounded-md text-[16px] leading-7 bg-red-600 mt-4 text-white">
                        Delete account
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Tabs