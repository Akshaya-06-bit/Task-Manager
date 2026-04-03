import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://task-manager-7ldh.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
});

export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);
