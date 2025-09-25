import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // host: '0.0.0.0',
    port: 5173,
    strictPort: true // 端口被占用时，自动切换到下一个可用端口
  }
})
