import React, { useContext, useState } from 'react'
import Error from '../../Components/error/Error'
import useFetchData from '../../hooks/useFetchData'
import { BASE_URL } from '../../config'
import Tabs from './Tabs'
import starIcon from '../../assets/images/Star.png'
import DoctorAbout from '../../Pages/Doctor/DoctorAbout'
import Profile from './Profile'
import Loader from '../../Components/Loader/Loading'
import doctorImg from '../../assets/images/doctor-img02.png'
// import { authContext } from '../../context/authContext'


const Dashboard = () => {
    // const { user } = useContext(authContext)
    const { data, loading, error } = useFetchData(`${BASE_URL}/doctors/profile/me`)
    const [tab, setTab] = useState('overview')
    // console.log("data ", data);
    console.log('Doctor: ', data)

    return (
        <section>
            <div className='max-w-[1280px] px-5 mx-auto border-2'>
                {loading && !error && <Loader />}
                {error && !loading && <Error />}
                {!loading && !error && (
                    <div className='flex flex-row lg:gap-[50px] border-2 border-red-500'>
                        <Tabs tab={tab} setTab={setTab} />
                        <div className='md:col-span-2 border-2 border-black flex-1' >
                            {
                                data?.isApproved === 'pending' && (

                                    <div className='flex p-4 t-yellow-800 bg-yellow-50 rounded-lg'>
                                        <span className='sr-only'> info</span>
                                        <div className='ml-3 text-sm font-md'>
                                            To get Approval please complete Your Profile. We&apos;ll review manually and approve with in 3 days.
                                        </div>
                                    </div>

                                )

                            }
                            <div className='mt-8'>
                                {tab === 'overview' &&
                                    <div>
                                        <div className='flex flex-1 items-center gap-4 mb-10'>
                                            <figure className='max-w-[200px] max-h-[200px]'>
                                                <img src={doctorImg} alt="" className='w-full' />
                                            </figure>
                                            <div>
                                                <span className='bg-[#ccf0f3] text-irisBlueColor py-1 lg:py-2 lg:px-6 rounded-sm text-[12px] lg:text-[16px] leading-4 lg:leading-6 font-semibold'>
                                                    {/* {data.specialization} */}{"surgeon"}
                                                </span>
                                                <h3 className='text-[22px] leading-9 font-bold text-headingColor mt-3'>{data.name}</h3>
                                                <div className='flex items-center gap-[6px]'>
                                                    <span className='flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text[18px] lg:leading-6 font-semibold'>
                                                        <img src={starIcon} alt="" />
                                                        {data.averageRating}
                                                    </span>
                                                    <span className=' text-headingColor text-[14px] leading-5 lg:text[18px] lg:leading-6 font-semibold'>

                                                        ( {data?.totalRating})
                                                    </span>
                                                </div>
                                                <p className='text__para font-[15px] lg:max-w-[390px] leading-5'>
                                                    {/* {data?.bio} */}{'Achha Doctor Tha'}
                                                </p>
                                            </div>


                                        </div>




                                        <DoctorAbout
                                            name={data.name}
                                            about={data.about}
                                            qualification={data.qualification}
                                            experiences={data.experiences}
                                        />
                                    </div>
                                }
                                {tab === 'appointment' && <div>Appointment</div>}
                                {tab === 'settings' && <Profile doctorData={data} />}

                            </div>


                        </div>




                    </div>
                )}
            </div>
        </section>
    )
}

export default Dashboard