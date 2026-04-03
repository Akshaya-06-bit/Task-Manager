import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "https://task-manager-7ldh.onrender.com/api";

const api = axios.create({
  baseURL: `${API_URL}/tasks`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = () => api.get("/");
export const createTask = (taskData) => api.post("/", taskData);
export const updateTask = (id, taskData) => api.put(`/${id}`, taskData);
export const deleteTask = (id) => api.delete(`/${id}`);
