import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration — enables React JSX support
export default defineConfig({
  plugins: [react()],
});
