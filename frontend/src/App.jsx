import { useState, useEffect } from "react";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/taskService";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import SearchBar from "./components/SearchBar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

function App() {
  // ── Auth state ──────────────────────────────────────────────────────────────
  // Read user from localStorage so the session survives a page refresh
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  // Controls whether we show the Login page or the Signup page
  const [showSignup, setShowSignup] = useState(false);

  // ── Task state ───────────────────────────────────────────────────────────────
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [editTask, setEditTask] = useState(null);

  // Fetch tasks whenever the logged-in user changes
  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getTasks();
      setTasks(response.data);
    } catch (err) {
      setError("Failed to load tasks. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Called by Login and Signup after a successful API response
  const handleLogin = (userData) => {
    setUser(userData);
    setShowSignup(false);
  };

  // Clear everything from state and localStorage
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setTasks([]);
    setEditTask(null);
    setError(null);
  };

  // ── Task handlers ────────────────────────────────────────────────────────────
  const handleSubmit = async (formData) => {
    try {
      setError(null);
      if (editTask) {
        const response = await updateTask(editTask._id, formData);
        setTasks((prev) =>
          prev.map((t) => (t._id === editTask._id ? response.data : t))
        );
        setEditTask(null);
      } else {
        const response = await createTask(formData);
        setTasks((prev) => [response.data, ...prev]);
      }
    } catch (err) {
      setError("Failed to save task. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      setError(null);
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError("Failed to delete task.");
    }
  };

  const handleToggle = async (task) => {
    try {
      setError(null);
      const response = await updateTask(task._id, {
        ...task,
        completed: !task.completed,
      });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? response.data : t))
      );
    } catch (err) {
      setError("Failed to update task status.");
    }
  };

  const handleEdit = (task) => setEditTask(task);
  const handleClearEdit = () => setEditTask(null);

  // Filter by status then by search term
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "Completed") return task.completed === true;
      if (filter === "Pending") return task.completed === false;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // ── If not logged in, show Login or Signup ───────────────────────────────────
  if (!user) {
    return showSignup ? (
      <Signup onLogin={handleLogin} onSwitch={() => setShowSignup(false)} />
    ) : (
      <Login onLogin={handleLogin} onSwitch={() => setShowSignup(true)} />
    );
  }

  // ── Logged-in view ───────────────────────────────────────────────────────────
  return (
    <div className="app-container">
      {/* Header with title and user info */}
      <div className="app-header">
        <h1 className="app-title">Task Manager</h1>
        <div className="user-info">
          <span className="user-name">Hi, {user.name}</span>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>

      <TaskForm
        onSubmit={handleSubmit}
        editTask={editTask}
        clearEdit={handleClearEdit}
      />

      <div className="controls">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <FilterBar filter={filter} onFilterChange={setFilter} />
      </div>

      {error && <p className="error-message">{error}</p>}

      {loading ? (
        <p className="loading-text">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggle}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
