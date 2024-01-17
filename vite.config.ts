import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { checker } from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/playground/",
  resolve: {
    alias: [{ find: "@src", replacement: "/src" }],
  },
  plugins: [
    react(),
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
  ],
});
