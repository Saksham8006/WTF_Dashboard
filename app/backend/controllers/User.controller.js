// backend/controllers/authController.js
const createError = require('http-errors');
const User = require("../models/User.model");

// Controller for user signup
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(createError.Conflict('Email is already in use.'));
    }

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password, // Note: In a production environment, you should hash the password
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ user: savedUser });
  } catch (error) {
    console.error('Error creating user:', error);
    next(createError.InternalServerError('Internal Server Error'));
  }
};

module.exports = registerUser;
