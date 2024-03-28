import User from '../models/UserSchema.js'
import Booking from '../models/BookingSchema.js'
import Doctor from '../models/DoctorSchema.js'
import Stripe from 'stripe'

export const getCheckoutSession = async (req, res) => {
    try {
        //get currently booked doctor...
        const doctor = await Doctor.findById(req.params.doctorId);
        const user = await User.findById(req.userId);
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


        if (!doctor || !user) {
            return res.status(404).json({
                success: false,
                message: "Doctor or user not found"
            });
        }

        if (isNaN(doctor.ticketPrice)) {
            // If doctor.ticketPrice is NaN, provide a default value (e.g., 0)
            const defaultPrice = 400;

            console.log("Invalid ticket price for the doctor. Using default price.");

            // Use defaultPrice as the ticket price
            doctor.ticketPrice = defaultPrice;
        }

        console.log("Doctor's ticket price:", doctor.ticketPrice);

        const unitAmount = Math.round(doctor.ticketPrice * 100);

        console.log("Calculated unit amount:", unitAmount);

        const successUrl = `${req.protocol}://${req.get('host')}/checkout-success`;

        //create stripe checkoutSession
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            customer_email: user.email,
            client_reference_id: req.params.doctorId,
            line_items: [{
                price_data: {
                    currency: 'inr',
                    unit_amount: doctor.ticketPrice * 100,
                    product_data: {
                        name: doctor.name,
                        description: doctor.bio,
                        images: [doctor.photo]
                    }
                },
                quantity: 1
            }]
        })

        // create new booking,

        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
            session: session.id
        })
        await booking.save();
        res.status(200).json({
            success: true,
            message: 'successfully paid',
            session
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error Creating checkout Session..."
        })
    }
}