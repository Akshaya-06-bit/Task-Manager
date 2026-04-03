const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");

// Load environment variables from .env
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Allow requests from the frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Parse incoming JSON bodies
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("Task Manager API Running...");
});

// Public auth routes — login and register do NOT need a token
app.use("/api/auth", authRoutes);

// Protected task routes — every request must carry a valid JWT token
app.use("/api/tasks", protect, taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
