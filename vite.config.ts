import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Expose to the network
    port: 5173,      // Default Vite port
    strictPort: true,
    allowedHosts: ['localhost'], // Allow local and ngrok hosts
    hmr: {
      clientPort: 5173, // Ensure HMR uses the correct port through the proxy
    },
    watch: {
      usePolling: true, // Necessary if using Windows/WSL2 host to detect file changes
    },
  },
})
