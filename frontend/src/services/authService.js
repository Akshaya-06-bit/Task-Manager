import axios from "axios";



const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});


// POST /api/auth/register
export const registerUser = (userData) => api.post("/register", userData);

// POST /api/auth/login
export const loginUser = (userData) => api.post("/login", userData);
