import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages project site: https://<user>.github.io/body-type-quiz/
  base: process.env.GITHUB_PAGES === 'true' ? '/body-type-quiz/' : '/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 5173,
    allowedHosts: true,
  },
})
