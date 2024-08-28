import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.API_URL": JSON.stringify(process.env.API_URL),
    "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
  },
});
