const mongoose = require("mongoose");
const { userPhoneNoValidation } = require("../config/phoneNoConfig");
const {validatePassword} = require("../config/passwordConfig");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add your name"],
    },
    email: {
      type: String,
      require: [true, "Please add your email"],
      unique: true,
    },
    phoneNumber:{
      type:String,
      require:[true, "Please add your phone number"],
      validate: [userPhoneNoValidation, "Please provide a valid phone number"],
    },
    imageUrl:{
      type: String,
      default:"https://res.cloudinary.com/dwprhpk9r/image/upload/v1729516355/uploads/default_image.png",
    },
    password: {
      type: String,
      require: [true, "Please add your password"],
      validate: {
        validator: function (value) {
          const { valid } = validatePassword(value); // Validate using imported function
          return valid; // Return true if valid, false if not
        },
        message: props => validatePassword(props.value).message, // Return error message from the validator
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    userStatus: {
      type: String,
      enum: ['Active', 'Suspended', 'Deactivated'], // Enum for user status
      default: 'Active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    resetToken: String,
  resetTokenExpire: Date,
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);
