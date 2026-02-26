import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Split vendor chunks for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["framer-motion", "motion"],
          "vendor-gsap": ["gsap"],
        },
      },
    },
    // Target modern browsers for smaller bundles
    target: "es2020",
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
});
