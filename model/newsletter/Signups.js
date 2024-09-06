const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
});

const SignUp = mongoose.model("SignUp", signUpSchema);

module.exports = SignUp;
