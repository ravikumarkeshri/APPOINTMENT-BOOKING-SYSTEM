import express from "express"
import cookieParser from "cookie-parser";
// import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv'
import mongoose from "mongoose";
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import doctorRoute from './routes/doctors.js'
import reviewRoute from './routes/review.js'
import bookingRoute from './routes/booking.js'

dotenv.config()
const PORT = process.env.PORT || 5000


const app = express()



const corsOptions = {
    origin: true
};

// mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        })
        console.log("MongoDb is connected Successfully")
    } catch (error) {
        console.log("MongoDb is not connected Successfully");
        console.log("message ", error.message)
    }
}


// middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
app.get('/', (req, res) => {
    res.send("hello")
})
app.get('/home', (req, res) => {
    // Send a response back to the client
    res.send('Hello, World! home');
});
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/reviews', reviewRoute)
app.use('/api/v1/bookings',bookingRoute)


app.listen(PORT, () => {
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})