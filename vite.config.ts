import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/playground/",
  resolve: {
    alias: [{ find: "@src", replacement: "/src" }],
  },
  plugins: [react()],
});
