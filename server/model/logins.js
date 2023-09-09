
const mongoose = require("mongoose");


const LoginSchema = new mongoose.Schema({

  full_name: {
    type: String,
    required: true
  },

  email_address: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  
})


const Login = mongoose.model("login", LoginSchema);

module.exports = Login