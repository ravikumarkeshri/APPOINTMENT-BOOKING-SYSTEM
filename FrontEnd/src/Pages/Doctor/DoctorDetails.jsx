import React, { useContext } from "react";
import { useState } from "react";
import doctorImg from "../../assets/images/doctor-img02.png";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback"
import SidePanal from "./SidePanal";
import { BASE_URL } from '../../config'
import useFetchData from '../../hooks/useFetchData'
import Loader from '../../Components/Loader/Loading'
import Error from '../../Components/error/Error'
import { useParams } from "react-router-dom";
import { authContext } from "../../context/authContext";

function DoctorDetails() {
  const { user } = useContext(authContext)
  const [tab, setTab] = useState("about");
  const { id } = useParams();
  const { data: doctor, loading, error } = useFetchData(`${BASE_URL}/doctors/${id}`)
  console.log({ user })

  const {
    about,
    name,
    speciality,
    ticketPrice,
    timeSlots,
    
    avgRating,
    totalRating,
    photo,
    bio,
    reviews,
    specialization,
    qualifications,
    experiences
  } = doctor;
  console.log(name)
  return (
    <section>
      <div className="max-w-[1170px] mx-auto px-5">
        {
          loading && <Loader />
        }
        {
          error && <Error />
        }
        {!loading && !error && <div className="grid md:grid-cols-3 gap-[50px]">
          <div className="grid md:col-span-2">
            <div className="flex items-center gap-5">
              <figure className="max-w-[200px] max-h-[200px]">
                <img src={doctorImg} alt="" className="w-full" />
              </figure>
              <div>
                <span className="bg-[#CCF0F3] py-1 px-2 lg:py-2 lg:px-6 text-[12px] leading-4 lg:text-[16px] lg:leading-7 text-irisBlueColor font-semibold rounded">
                  {specialization}
                </span>
                <h3 className="text-[22px] leading-9 text-headingColor mt-3 font-bold">
                  {name}
                </h3>
                <div className="flex item-center gap-[6px]">
                  <span className="flex items-center gap-[6px] text-[14px] leading-6 lg:text-[16px] lg:leading-7 text-headingColor font-semibold">
                    <img src={starIcon} alt="" />{avgRating}
                  </span>
                  <span className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 text-textColor font-[400]">
                    {totalRating}
                  </span>
                </div>
                <p className="text__para text-[14px] md:text-[15px] leading-6 lg:max-w-[390px]">
                  {bio}
                </p>
              </div>
            </div>

            <div className="mt-[50px] border-b border-solid border-[#0066ff34]">
              <button
                onClick={() => setTab("about")}
                className={`${tab === "about" && "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                About
              </button>
              <button
                onClick={() => setTab("feedback")}
                className={`${tab === "feedback" &&
                  "border-b border-solid border-primaryColor"
                  }  py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
              >
                Feedback
              </button>
            </div>

            <div className="mt-[50px]">
              {tab === "about" && <DoctorAbout name={name} about={about} qualifications={qualifications} experiences={experiences} />}
              {tab === "feedback" && <Feedback reviews={reviews} totalRating={totalRating} />}
            </div>
          </div>
          <div>
            <SidePanal doctorId={doctor._id} ticketPrice={ticketPrice} timeSlots={timeSlots}  />
          </div>
        </div>}
      </div>
    </section>
  );
}

export default DoctorDetails;