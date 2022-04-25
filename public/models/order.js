
const mongoose = require('mongoose');


const bookingSchema = new mongoose.Schema(
    {
        employee: {
            type: String

        },
        employer: {
            type: String

        },
        date: {
            type: Date,

        },
        timeslot: {
            type: String,

        },
        status: {
            type: String,

            enum: ['pending', 'completed', 'rejected'],
            default: 'pending'
        }
    },




)

const Booking = new mongoose.model("Booking", bookingSchema);
module.exports = Booking;