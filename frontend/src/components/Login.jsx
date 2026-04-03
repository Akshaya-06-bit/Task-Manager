import { useState } from "react";
import { loginUser } from "../services/authService";

// Login form — shown when the user is not authenticated
// Props:
//   onLogin    — called with user data after a successful login
//   onSwitch   — called when the user clicks "Sign up" to show the Signup form
function Login({ onLogin, onSwitch }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await loginUser(formData);
      // Save the token to localStorage so it persists on page refresh
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      onLogin(response.data); // Tell App.jsx the user is now logged in
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Task Manager</h1>
        <h2 className="auth-subtitle">Welcome back</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Switch to Signup */}
        <p className="auth-switch">
          Don't have an account?{" "}
          <button className="auth-link-btn" onClick={onSwitch}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
