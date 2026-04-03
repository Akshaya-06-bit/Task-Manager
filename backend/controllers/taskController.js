const Task = require("../models/Task");

// GET /api/tasks — Fetch only the tasks that belong to the logged-in user
const getTasks = async (req, res) => {
  try {
    // req.user is set by the protect middleware after verifying the JWT
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
};

// POST /api/tasks — Create a new task for the logged-in user
const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }

    // Store the user ID on the task so we can filter by owner later
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
};

// PUT /api/tasks/:id — Update a task (only if it belongs to the logged-in user)
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // Must match both ID and owner
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error: error.message });
  }
};

// DELETE /api/tasks/:id — Delete a task (only if it belongs to the logged-in user)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id, // Prevent deleting another user's task
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
