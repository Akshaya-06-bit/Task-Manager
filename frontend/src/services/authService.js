import axios from "axios";

// Separate axios instance for auth endpoints
const api = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

// POST /api/auth/register
export const registerUser = (userData) => api.post("/register", userData);

// POST /api/auth/login
export const loginUser = (userData) => api.post("/login", userData);
