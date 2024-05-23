import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
import react from "@vitejs/plugin-react";
import { checker } from "vite-plugin-checker";
import reactBeyond from "react-beyond/plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/playground/",
  resolve: {
    alias: [{ find: "@src", replacement: "/src" }],
  },
  plugins: [
    checker({
      // e.g. use TypeScript check
      typescript: true,
    }),
    react(),
    reactBeyond(),
  ],
});
