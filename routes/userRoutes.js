const express = require("express");
const UserController = require("../controllers/userController"); // Import the user controller

const router = express.Router();

// Route to handle user registration
router.post('/signUp', UserController.register);
router.post('/login', UserController.login);

module.exports = router;
