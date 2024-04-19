import User from '../models/UserSchema.js'
import Doctor from '../models/DoctorSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const generateToken = user => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'
    })
}
// export const register1 = async (req, res)=>{

//         const { email, password, name, role, photo, gender } = req.body;

//         // Validate required fields
//         if (!email || !password || !name || !role || !gender) {
//             return res.status(400).json({ message: 'All fields are required' });
//         }

//         // Validate role
//         if (role !== 'patient' && role !== 'doctor') {
//             return res.status(400).json({ message: 'Invalid role. Role must be "patient" or "doctor"' });
//         }

//         // Check if email is already registered
//         if (users.find(user => user.email === email)) {
//             return res.status(400).json({ message: 'Email already registered' });
//         }

//         // Create new user object
//         const newUser = {
//             email,
//             password,
//             name,
//             role,
//             photo,
//             gender
//         };

//         // Add user to database
//         users.push(newUser);

//         // You can save the user to a database here
//         // Example: database.save(newUser);

//         // Respond with success message
//         res.status(201).json({ message: 'User registered successfully', user: newUser });


// }
export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body
    try {
        let user = null;

        if (role === 'patient') {
            user = await User.findOne({ email })
        }
        else if (role === 'doctor') {
            user = await Doctor.findOne({ email })
        }

        // If user exist already
        if (user) {
            return res.status(400).json({ message: "User already exist" })
        }

        // hash password 
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)



        if (role === 'patient') {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role,

            })
        }


        if (role === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role,

            })
        }

        // user = {...user, token}
        await user.save();
        res.status(200)
        // res.set('Content-Type', 'application/json');
        res.json({ success: true, message: 'User successfully created' })

        console.log("user: ", user)
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false, message: 'Internal server error, Try agian' })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = null;

        const patient = await User.findOne({ email })
        const doctor = await Doctor.findOne({ email })
        if (patient) {
            user = patient
        }
        if (doctor) {
            user = doctor
        }

        // If user doesn't exist

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })

        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Invalid credential" })
        }

        // get token

        const token = generateToken(user);

        const { password, role, appoinment, ...rest } = user._doc
        // console.log(user)
        // console.log(user._doc, 'user doc')

        res.status(200).json({
            success: true,
            message: "Successfully login",
            data: { token, role, ...rest },
            token,
            role,

        })

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to login' })
    }
}

