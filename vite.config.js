import { defineConfig } from "vite";

export default defineConfig({
  // Set base for GitHub Pages deployment
  base: "/your-repository-name/",

  build: {
    // Output to dist folder
    outDir: "dist",

    // Generate source maps for debugging
    sourcemap: true,

    // Optimize for modern browsers
    target: "esnext",
  },

  // Dev server configuration
  server: {
    port: 3000,
    open: true,
  },
});
