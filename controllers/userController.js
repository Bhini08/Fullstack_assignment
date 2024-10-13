const User = require("../models/userModel"); // Import User model
const bcrypt = require("bcryptjs");

// Register a new user
exports.register = async (req, res) => {
    try {
        // Destructure user data from request body
        const { userName, email, password } = req.body;

        // Check for missing fields
        if (!userName || !email || !password) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide all required fields: userName, email, and password",
            });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                status: "failed",
                message: "Email already registered",
            });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 12);

        // Create a new user with hashed password
        const newUser = await User.create({
            userName,
            email,
            password: hashPassword,
        });

        // Send a success response
        res.status(201).json({
            status: "success",
            data: {
                user: newUser,
            },
        });
    } catch (error) {  // Handle errors during registration
        console.error("Error during registration:", error);

        // Check if the error is due to a validation issue
        if (error.name === "ValidationError") {
            return res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }

        // Handle any other errors
        res.status(500).json({
            status: "failed",
            message: "Failed to register user",
        });
    }
};

// Placeholder for login functionality
exports.login = async (req, res) => {
    try {
        // Destructure email and password from request body
        const { email, password } = req.body;

        // Check for missing fields
        if (!email || !password) {
            return res.status(400).json({
                status: "failed",
                message: "Please provide both email and password",
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid email or password",
            });
        }

        // Check if the provided password matches the stored hashed password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid email or password",
            });
        }

        // Successful login response
        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                user: {
                    userName: user.userName,
                    email: user.email,
                    // Add any other user details you want to send
                },
            },
        });
    } catch (error) {  // Handle errors during login
        console.error("Error during login:", error);
        res.status(500).json({
            status: "failed",
            message: "Internal server error",
        });
    }
};