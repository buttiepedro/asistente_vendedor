import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      'asistentevendedor-front-production.up.railway.app'
    ],
    host: true,
    watch: {
      usePolling: true,
      interval: 100
    }
  }
})