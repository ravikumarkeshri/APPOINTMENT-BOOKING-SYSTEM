import React from "react";
// import convertTime from "../../utils/convertTime";.
import { BASE_URL, token } from "../../config";

// import { BASE_URL } from "../../config";
import { toast } from "react-toastify";

const SidePanal = ({ doctorId, ticketPrice, timeSlots }) => {

    const bookingHandler = async () => {
        try {
            const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method: 'post',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message + " Please try again")
            }
            if (data.session.url) {
                window.location.href = data.session.url
            }
            toast.success(success.message)
        } catch (error) {
            toast.error(error.message)

        }
    }

    return (
        <div className="shadow-panelShadow p-3 lg:p-5 rounded-md">
            <div className="flex items-center justify-between">
                <p className="text__para mt-0 font-semibold">Ticket Price</p>
                <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 font-bold text-headingColor">
                    {ticketPrice}
                </span>
            </div>
            <div className="mt-[30px]">
                <p className="text__para mt-0 font-semibold text-headingColor">
                    Avialable Time Slote
                </p>
                <ul className="mt-3">
                    {
                        timeSlots?.map((item, index) => (
                            <li key={index} className="flex items-center justify-between mb-2">
                                <p className="text-[15px] leading-6 font-semibold text-textColor">
                                    {item && item.day && item.day.length > 0 ? (item.day.charAt(0).toUpperCase() + item.day.slice(1)) : ''}

                                </p>
                                <p className="text-[15px] leading-6 font-semibold text-textColor">
                                    {/* {convertTime(item.startingTime)} {" "}  {convertTime(item.endingTime)} */}
                                    {item.startingTime} {" "} {item.endingTime}
                                </p>
                            </li>
                        ))
                    }

                    {/* <li className="flex items-center justify-between mb-2">
                        <p className="text-[15px] leading-6 font-semibold text-textColor">
                            Wednusday
                        </p>
                        <p className="text-[15px] leading-6 font-semibold text-textColor">
                            9:30 AM - 4:30 Pm
                        </p>
                    </li>
                    <li className="flex items-center justify-between mb-2">
                        <p className="text-[15px] leading-6 font-semibold text-textColor">
                            Friday
                        </p>
                        <p className="text-[15px] leading-6 font-semibold text-textColor">
                            9:30 AM - 4:30 Pm
                        </p>
                    </li> */}
                </ul>
            </div>
            <button onClick={bookingHandler} className="btn px-20 w-full rounded-md">Book Appointment</button>
        </div>
    );
};

export default SidePanal;