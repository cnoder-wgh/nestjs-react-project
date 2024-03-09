import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
    server: {
      host: "0.0.0.0",
      proxy: {
        "/vc": {
          target: 'https://vcs.zijieapi.com/',
          changeOrigin: true, 
        },
      },
    },
  plugins: [react()],
})
