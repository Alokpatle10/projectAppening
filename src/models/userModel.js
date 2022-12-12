const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: "first name is required",
        trim: true
    },
    lname: {
        type: String,
        required: "last name is required",
        trim: true
    },
    
    email: {
        type: String,
        unique: true,
        required: "Email is required",
        trim: true
    },
    password:{
        type:String,
        required:"Password is required"
    },
    phone: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("useralok", userSchema)

