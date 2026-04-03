import axios from "axios";

// Create an axios instance pointing to our backend task API
const api = axios.create({
  baseURL: "http://localhost:5000/api/tasks",
});

// Before every request, read the token from localStorage and attach it
// This is called a request interceptor — it runs automatically before each call
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // The backend's protect middleware expects: Authorization: Bearer <token>
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = () => api.get("/");
export const createTask = (taskData) => api.post("/", taskData);
export const updateTask = (id, taskData) => api.put(`/${id}`, taskData);
export const deleteTask = (id) => api.delete(`/${id}`);
