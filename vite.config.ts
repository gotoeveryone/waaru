import vue from "@vitejs/plugin-vue2";
import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";

export default defineConfig({
  plugins: [
    vue(),
    ViteEjsPlugin(config => ({
      env: { ...config.env }
    })),
  ],
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      "@": "/src"
    },
  }
});
