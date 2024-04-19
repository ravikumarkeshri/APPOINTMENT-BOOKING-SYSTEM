import Doctor from ".././models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "Successfully updated",
        data: updatedDoctor,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete" });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id, { password: 0 }).populate('reviews');
    res
      .status(200)
      .json({ success: true, message: "a User  found", data: doctor });
  } catch (error) {
    res.status(404).json({ success: false, message: "No user found" });
  }
};
export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find(
        {
          isApproved: "approved",
          $or: [
            { name: { $regex: query, $options: "i" } },
            { specialization: { $regex: query, $options: "i" } },
          ],
        },
        { password: 0 }
      );
    } else {
      doctors = await Doctor.find({ isApproved: "approved" });
    }
    res
      .status(200)
      .json({ success: true, message: "Users found", data: doctors });
  } catch (error) {
    res.status(404).json({ success: false, message: "No user found" });
  }
};



// export const getDoctorProfile = async (req, res) => {
//   const doctorId = req.userId
//   try {
//     const doctor = await Doctor.findOne({ doctorId });
//     if (!doctor) {
//       res.status(404).json({ success: false, message: 'Doctor not found' })
//     }
//     const { password, ...rest } = doctor;
//     const appointments = await Booking.find({ doctor: doctorId })
//     res.status(200).json({ success: true, message: 'Profile info getting', data: { ...rest, appointments } })
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Something went wronge, cannot get' })
//   }

// }
// export const getUserProfile = async (req, res) => {
//   const userId = req.userId
//   try {

//       const user = await User.findOne({ _id: userId });
//       // const user = await User.findOne(userId)
//       if (!user) {
//           res.status(404).json({ success: false, message: 'User not found' })
//       }
//       const { password, ...rest } = user._doc;
//       // const { password, ...rest } = user.toObject();
//       res.status(200).json({ success: true, message: 'Profile info getting', data: { ...rest } })
//   } catch (err) {
//       res.status(500).json({ success: false, message: 'Something went wrong, cannot get' })
//   }
// }
export const getDoctorProfile = async (req, res) => {
  // const doctorId = req.userId;
  const doctorId = req.userId
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });
    return res.status(200).json({ success: true, message: 'Profile info getting', data: { ...rest, appointments } });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
  }
};
