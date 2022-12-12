const mongoose = require("mongoose")

const admin =new mongoose.Schema({
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
    }
   
}, { timestamps: true });

module.exports = mongoose.model("admin", admin)
