import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "./client",       // client folder contains index.html
  base: "./",             // relative paths so JS/CSS load correctly
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
    },
  },
  build: {
    outDir: "../dist",     // build output goes to dist/
    emptyOutDir: true,
  },
});
