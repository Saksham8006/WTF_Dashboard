const bcrypt = require("bcrypt");
const User = require("../../models/User.model");
const { registerValidation } = require("../../Services/validationSchema");

const registerUser = async (req, res, next) => {
    try {
        const { role, name, email, password} = await registerValidation.validateAsync(req.body);

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new User instance with the hashed password
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            originalPassword: password,
            role
        });

        // Save the user to the database
        const savedUser = await newUser.save();

        if (!savedUser) {
            // Handle the case where user saving fails
            return res.status(500).json({
                message: "Unable to save user. Please try again later."
            });
        }

        // Return a success response
        res.status(200).json({
            message: "User Created Successfully",
            savedUser,
        });

    } catch (error) {
        if (error.isJoi) {
            // Handle validation errors
            res.status(400).json({
                message: "Validation Error",
                details: error.details
            });
        } else {
            // Handle other errors
            next(error);
        }
    }
};

module.exports = registerUser;
