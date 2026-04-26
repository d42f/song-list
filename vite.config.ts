import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@icons': resolve(__dirname, 'assets/icons'),
    },
  },
  publicDir: false,
  build: {
    outDir: 'public',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    globals: true,
  },
})
