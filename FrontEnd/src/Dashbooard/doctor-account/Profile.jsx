import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import uploadImageToCloudinary from '../../utils/uploadCloudinar'
import { BASE_URL, token } from '../../config'
import { toast } from 'react-toastify'
const Profile = ({ doctorData }) => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        phone: '',
        bio: '',
        gender: '',
        ticketPrice: '',
        qualifications: [],
        experiences: [],
        timeSlots: [],
        about: '',
        photo: 'null'

    })

    useEffect(() => {
        setFormData({
            name: doctorData?.name,
            // password: doctorData?.password
            email: doctorData?.email,
            phone: doctorData?.phone,
            bio: doctorData?.bio,
            gender: doctorData?.gender,
            ticketPrice: doctorData?.ticketPrice,
            qualifications: doctorData?.qualifications,
            experiences: doctorData?.experiences,
            timeSlots: doctorData?.timeSlots,
            about: doctorData?.about,
            photo: doctorData?.photo
        })
    }, [doctorData])

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleFileInputChange = async (e) => {
        const file = e.target.files[0]
        const data = await uploadImageToCloudinary(file)
        setFormData({ ...formData, photo: data?.url })
    }
    const updatePorfileHandler = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)

            })
            const result = await res.json();
            if (!res.ok) {
                throw Error(result.message);
            }
            toast.success(result.message)
        } catch (error) {
            toast.error(error.message);
        }
    }
    //reusable addIems funciton
    const addItems = (key, item) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item] }))
    }
    //reusable handleReusableInputchangeFunc
    const handleReusableInputChangeFunc = (key, index, event) => {
        const [name, value] = event.target;
        setFormData(prevFormData => {
            const updateItems = [...prevFormData[key]]
            updateItems[index][name] = value;
            return {
                ...prevFormData,
                [key]: updateItems
            }
        })
    }
    //reusable function for deleting items
    const deleteItems = (key, index) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: [prevFormData[key].filter((_, i) => i != index)] }))
    }


    const addQualification = (e) => {
        e.preventDefault();
        addItems('qualifications', {
            startingDate: '', endingDate: '', degree: 'PHD', university: 'PatliPutraUniversity'
        })
    }
    const handleQualificationChange = (event, index) => {
        handleReusableInputChangeFunc('qualification', index, event)
    }
    const deleteQualification = (e, index) => {
        e.preventDefault();
        deleteItems('qualifications', index)


    }
    const addExperience = (e) => {
        e.preventDefault();
        addItems('experiences', {

            startingDate: '', endingDate: '', position: 'Surgeon', hospital: 'PMCH'
        })
    }
    const handleExperienceChange = (event, index) => {
        handleReusableInputChangeFunc('experiences', index, event)
    }
    const deleteExperience = (e, index) => {
        e.preventDefault();
        deleteItems('experiences', index)


    }
    const addTimeSlot = (e) => {
        e.preventDefault();
        addItems('timeSlots', {

            day: 'Sunday', startingTime: '10:00', endingTime: '04:00'
        })
    }
    const handleTimeSlotChange = (event, index) => {
        handleReusableInputChangeFunc('timeSlots', index, event)
    }
    const deleteTimeSlot = (e, index) => {
        e.preventDefault();
        deleteItems('timeSlots', index)


    }
    return (

        <div>
            <h2 className='text-headingColor font bold text-[24px] leading-9 mb-9'>
                Profile Information
            </h2>
            <form action="">
                <div className='mb-5'>
                    <p className='form__label'>Name</p>
                    <input type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder='Full Name'
                        className='form__input' />
                </div>
                <div className='mb-5'>
                    <p className='form__label'>Email</p>
                    <input type="email"
                        name="email"
                        value={formData.email}
                        placeholder='Email'
                        className='form__input'
                        readOnly
                        aria-readonly
                        disabled="true"
                    />
                </div>
                <div className='mb-5'>
                    <p className='form__label'>Phone</p>
                    <input type="number"
                        name="phone"
                        value={formData.phone}
                        placeholder='Phone'
                        className='form__input'
                        onChange={handleInputChange}

                    />
                </div>
                <div className='mb-5'>
                    <p className='form__label'>Bio</p>
                    <input type="text"
                        name="bio"
                        value={formData.bio}
                        placeholder='Bio'
                        className='form__input'
                        maxLength={100}
                        onChange={handleInputChange}

                    />
                </div>
                <div className='mb-5'>
                    <div className='grid grid-cols-3 gap-3 mb-[30px]'>
                        <div>
                            <p className='form__label'>Gender*</p>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                className='form__input py-3.5'
                            >
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">others</option>

                            </select>
                        </div>
                        <div>
                            <p className='form__label'>Specialization*</p>
                            <select
                                name="specialzation"
                                value={formData.specailization}
                                onChange={handleInputChange}
                                className='form__input py-3.5'
                            >
                                <option value="">Select</option>
                                <option value="surgeon">Surgeon</option>
                                <option value="neurologist">Neurologist</option>
                                <option value="dermetologist">Dermetologist</option>

                            </select>
                        </div>
                        <div>
                            <p className='form__label'>TicketPrice</p>
                            <input type="number"
                                name="ticketPrice"
                                value={formData.ticketPrice}
                                placeholder='100'
                                className='form__input'
                                maxLength={100}
                                onChange={handleInputChange}

                            />
                        </div>

                    </div>

                </div>
                <div className='mt-5'>
                    <p className='form__label'>Qualifications*</p>
                    {
                        formData.qualifications?.map((item, index) => (
                            <div key={index} >
                                <div className='flex flex-row gap-4 px-4'>
                                    <div className='flex flex-col flex-1 mt-5'>
                                        <p className='form__label '>Starting Date</p>
                                        <input
                                            type="date"
                                            name='startingDate'
                                            value={item.startingDate}
                                            className='form__input'
                                            onChange={(e) => handleQualificationChange(e, index)}
                                        />
                                        <p className='form__label '>Ending Date</p>
                                        <input
                                            type="date"
                                            name='endingDate'
                                            value={item.endingDate}
                                            className='form__input'
                                            onChange={(e) => handleQualificationChange(e, index)}
                                        />

                                    </div>
                                    <div className='flex flex-col flex-1 mt-5'>
                                        <p className='form__label '>Degree*</p>
                                        <input
                                            type="text"
                                            name='degree'
                                            value={item.degree}
                                            className='form__input'
                                            onChange={(e) => handleQualificationChange(e, index)}
                                        />
                                        <p className='form__label '>University</p>
                                        <input
                                            type="text"
                                            name='university'
                                            value={item.university}
                                            className='form__input'
                                            onChange={(e) => handleQualificationChange(e, index)}
                                        />

                                    </div>

                                </div>
                                <button onClick={(e) => deleteQualification(e, index)} className='bg-red-600 rounded-full text-white text-18px mt-2 mb-[30px] cursor-pointer'><AiOutlineDelete /></button>
                            </div>
                        ))
                    }
                    <button onClick={addQualification} className='bg-black py-2 px-5 rounded-full text-white h-fit cursor-pointer'>Add Qualifications</button>
                </div>
                <div className='mt-5'>
                    <p className='form__label'>Experiences*</p>
                    {
                        formData.experiences?.map((item, index) => (
                            <div key={index}>
                                <div className='flex flex-row gap-4 px-4'>
                                    <div className='flex flex-col flex-1 mt-5'>
                                        <p className='form__label '>Starting Date</p>
                                        <input
                                            type="date"
                                            name='startingDate'
                                            value={item.startingDate}
                                            className='form__input'
                                            onChange={(e) => handleExperienceChange(e, index)}
                                        />
                                        <p className='form__label '>Ending Date</p>
                                        <input
                                            type="date"
                                            name='endingDate'
                                            value={item.endingDate}
                                            className='form__input'
                                            onChange={(e) => handleExperienceChange(e, index)}
                                        />

                                    </div>
                                    <div className='flex flex-col flex-1 mt-5'>
                                        <p className='form__label '>Postion*</p>
                                        <input
                                            type="text"
                                            name='degree'
                                            value={item.position}
                                            className='form__input'
                                            onChange={(e) => handleExperienceChange(e, index)}
                                        />
                                        <p className='form__label '>Hospital</p>
                                        <input
                                            type="text"
                                            name='hospital'
                                            value={item.university}
                                            className='form__input'
                                            onChange={(e) => handleExperienceChange(e, index)}
                                        />

                                    </div>

                                </div>
                                <button onClick={(e) => deleteExperience(e, index)} className='bg-red-600 rounded-full text-white text-18px mt-2 mb-[30px] cursor-pointer'><AiOutlineDelete /></button>
                            </div>
                        ))
                    }
                    <button onClick={addExperience} className='bg-black py-2 px-5 rounded-full text-white h-fit cursor-pointer'>Add Experiences</button>



                </div>
                <div className='mt-5'>
                    <p className='form__label'>Time Slots*</p>
                    {
                        formData.timeSlots?.map((item, index) => (
                            <div key={index}>
                                <div>
                                    <div className='grid grid-cols-2 md:grid-cols-4 mb-[30px] gap-5'>
                                        <p className='form__label '>Day</p>
                                        <select name="day" value={item.day} className='form__input py-3.5'>
                                            <option value="">Select</option>
                                            <option value="monday">Monday</option>
                                            <option value="tuesday">Tuesday</option>
                                            <option value="webnesday">Wednesday</option>
                                            <option value="thursday">Thursday</option>
                                            <option value="friday">Friday</option>
                                            <option value="saturday">Saturday</option>
                                            <option value="sunday">Sunday</option>
                                        </select>

                                    </div>
                                    <div className='grid grid-cols-2 mt-5'>
                                        <p className='form__label '>Starting Time*</p>
                                        <input
                                            type="time"
                                            name='starting Time'
                                            value={item.startingTime}
                                            className='form__input'
                                            onChange={(e) => handleTimeSlotChange(e, index)}
                                        />
                                        <p className='form__label '>Ending Time</p>
                                        <input
                                            type="time"
                                            name='endingTime'
                                            value={item.endingTime}
                                            className='form__input'
                                            onChange={(e) => handleTimeSlotChange(e, index)}
                                        />

                                    </div>
                                    <div className='flex items-center'>
                                        <button onClick={deleteTimeSlot} className='bg-red-600 rounded-full text-white text-18px  mb-[30px] cursor-pointer mt-6'><AiOutlineDelete /></button>
                                    </div>

                                </div>
                            </div>
                        ))
                    }
                    <button onClick={addTimeSlot} className='bg-black py-2 px-5 rounded-full text-white h-fit cursor-pointer'>Add time Slots</button>



                </div>
                <div className='mt-5'>
                    <p className='form__label'>About*</p>
                    <textarea name="about" rows={5} value={formData.about} placeholder='Write about you' onChange={handleInputChange}></textarea>
                </div>
                <div className='mt-5 flex itmes-center gap-3'>
                    {formData.photo && (
                        <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                            <img src={formData.photo} alt="" className="rounded-full" />
                        </figure>
                    )}
                    <div className="relative w-[130px] h-[50px]">
                        <input
                            type="file"
                            name="photo"
                            id="customFile"
                            onChange={handleFileInputChange}
                            className="w-full absolute top-0 left-0 h-full opacity-0 cursor-pointer"
                            accept=".jpg, .png"
                        />
                        <label
                            className="absolute h-full w-full top-0 left-0 flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor rounded-lg font-semibold cursor-pointer truncate"
                            htmlFor="customFile"
                        >
                            Upload Photo
                        </label>
                    </div>

                </div>
                <div className='mt-7'>
                    <button className='bg-primaryColor text-white text-[18px] w-full py-3 px-4 rounded-lg' onClick={updatePorfileHandler}>
                        Update Profile
                    </button>

                </div>
            </form>
        </div>
    )
}

export default Profile