const Task = require("../models/taskModel");

exports.createTask = async (req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                task
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        });
    }
};

exports.getAllTasks = async (req, res, next) => {
    try {
        const taskList = await Task.find();
        res.status(200).json({
            status: "success",
            count: taskList.length,
            data: {
                taskList
            }
        });
    } catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message
        });
    }
};

exports.getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                status: "failed",
                message: "Task not found"
            });
        }
        res.status(200).json({
            status: "success",
            data: {
                task
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        });
    }
};
exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {  // Fixed: Changed `req.params` to `req.params.id`
            new: true,
            runValidators: true // Fixed typo: should be `runValidators`
        });
        
        if (!task) {
            return res.status(404).json({
                status: "failed",
                message: "Task not found" // Updated message for clarity
            });
        }
        
        res.status(200).json({
            status: "success",
            data: {
                task
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        });
    }
};
exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);  // Removed unnecessary options
        
        if (!task) {
            return res.status(404).json({
                status: "failed",
                message: "Task not found"  // This message is clear and appropriate
            });
        }
        
        res.status(200).json({
            status: "success",
            message: "Task deleted successfully",  // Added a success message
            data: {
                task
            }
        });
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        });
    }
};
