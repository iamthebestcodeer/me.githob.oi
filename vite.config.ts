import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "/me.githob.oi/",
  build: {
    target: "es2020",
    modulePreload: { polyfill: false },
    sourcemap: false,
    minify: "esbuild",
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("vue")) {
              return "vendor-vue";
            }
            if (id.includes("primevue") || id.includes("primeicons")) {
              return "vendor-prime";
            }
            return "vendor";
          }
        },
      },
    },
  },
  esbuild: {
    drop: ["console", "debugger"],
  },
});
