const mongoose = require("mongoose");
const User = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:String,
    age:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})
const Register = new mongoose.model("user",User);
module.exports = Register;