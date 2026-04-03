const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS - allow local + deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-manager-773liinjq-akshaya-06-bits-projects.vercel.app",
    ],
    credentials: true,
  })
);

// Parse JSON
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Task Manager API Running...");
});

// API health route
app.get("/api", (req, res) => {
  res.json({ message: "API is running..." });
});

// Auth routes
app.use("/api/auth", authRoutes);

// Protected task routes
app.use("/api/tasks", protect, taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
