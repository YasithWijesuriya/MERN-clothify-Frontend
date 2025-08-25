import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./", 
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // now "@/..." will map to src/
    },
  },
});
