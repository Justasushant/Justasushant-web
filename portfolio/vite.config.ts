import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "./client", // ✅ Let Vite know the HTML & src are inside /client
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"), // ✅ shorthand imports
    },
  },
  build: {
    outDir: "../dist", // ✅ output outside client folder
    emptyOutDir: true,
  },
});
