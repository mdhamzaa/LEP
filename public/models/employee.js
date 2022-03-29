const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    username: {
        type: String,
        unique: true
    },

    level: {
        type: String
    },

    email: {
        type: String
    },
    fname: {
        type: String
    },
    lname: {
        type: String
    },

    gender: {
        type: String
    },

    dob: {
        type: String
    },

    address: {
        type: String
    },

    pincode: {
        type: Number
    },
    phone: {
        type: Number
    },

    Skills: {
        type: String
    },

    Exp: {
        type: String
    },

    password: {
        type: String
    }
})



const Employee = new mongoose.model("Employee", employeeSchema);
module.exports = Employee;