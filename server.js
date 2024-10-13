const express = require('express');
const app = express();

const taskRouter = require("./routes/taskRoutes");  // Import task routes
const userRoutes = require("./routes/userRoutes");  // Import user routes

const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD } = require("./config/config");  // MongoDB credentials
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch((e) => {
        console.log("Error trying to connect MongoDB: ", e);
    });

// Set the port number
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('Hello World using Docker and Express..');
});

// Routes
app.use("/api/v1/tasks", taskRouter);  // Task routes
app.use("/api/v1/users", userRoutes);  // User routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
