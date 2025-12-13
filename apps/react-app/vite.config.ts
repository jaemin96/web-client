import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@weaw/design": path.resolve(
        __dirname,
        "../../packages/weaw-design/src"
      )
    },
  },
});
