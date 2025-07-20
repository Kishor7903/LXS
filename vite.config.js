import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  assetsInclude: ['**/*.docx'],
  server: {
    proxy: {
      '/sachin-kumar-24': 'http://127.0.0.1:5001'
    },
    host: true
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // server: {
  //   allowedHosts: ['4072-2401-4900-8835-7f87-194c-d5a4-ce96-4be7.ngrok-free.app'],
  // }
})
