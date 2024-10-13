const express = require('express');
const router = express.Router();
const {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/taskController');

// Define the routes
router.get('/', getAllTasks); // Get all tasks
router.post('/', createTask); // Create a new task
router.get('/:id', getTaskById); // Get a task by ID
router.patch('/:id', updateTask); // Update a task by ID (partial update)
router.delete('/:id', deleteTask); // Delete a task by ID

module.exports = router;
