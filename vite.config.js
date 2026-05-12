import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  build: {
    outDir: "assets",
    emptyOutDir: false,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: {
        styles: "src/styles.css", // Alleen CSS wordt via Vite verwerkt
      },
      output: {
        assetFileNames: "[name].[ext]",
        dir: "assets",
      },
    },
  },
  css: {
    devSourcemap: true,
    postcss: "./postcss.config.js",
    preprocessorOptions: {
      css: {
        extract: true,
      },
    },
  },
  plugins: [tailwindcss()],
});