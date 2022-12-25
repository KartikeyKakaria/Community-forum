const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: String,
  age: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

User.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 4);
  next();
});
const Register = new mongoose.model("user", User);
module.exports = Register;
