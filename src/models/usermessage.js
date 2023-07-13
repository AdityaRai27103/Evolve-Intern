const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email id.");
      }
    },
  },
  phone: {
    type: String,
    required: true,
    min: 10,
  },
  message: {
    type: String,
    required: true,
    minLength: 3,
  },
});

//we need a collection
const User = mongoose.model("User", userSchema);

module.exports = User;
