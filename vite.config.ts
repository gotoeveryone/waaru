import { resolve } from "path";
import autoprefixer from 'autoprefixer';
import vue from "@vitejs/plugin-vue2";
import { defineConfig } from "vite";
import type { UserConfig } from "vite";
import type { InlineConfig } from "vitest";
import biome from "vite-plugin-biome";
import { ViteEjsPlugin } from "vite-plugin-ejs";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  plugins: [
    vue(),
    biome({
      mode: "lint",
      files: "./src",
    }),
    ViteEjsPlugin(config => ({
      env: { ...config.env }
    })),
  ],
  css: {
    postcss: {
      plugins: [
        autoprefixer({})
      ]
    }
  },
  server: {
    port: 8080,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    },
  },
  test: {
    watch: false,
    globals: true,
    environment: "jsdom",
    include: ["**/__tests__/*.{test,spec}.ts"],
    setupFiles: ["tests/setup.ts"],
  },
} as VitestConfigExport);
