import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/BMS-react/', 
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,        // allows using describe/it/expect without imports
    environment: 'jsdom', // simulate a browser DOM
    setupFiles: './src/setupTests.js', // global test setup
    coverage: {
      provider: 'c8',
      reporter: ['text', 'lcov']
    }
  }
})
