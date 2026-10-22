import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    // Any request starting with /api is forwarded to the Express backend
    proxy: {
      '/api': 'http://127.0.0.1:5000',
    },
  },
})
