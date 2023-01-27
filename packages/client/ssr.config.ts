import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __YANDEX_API__: JSON.stringify(process.env.YANDEX_API.trim())
  },
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, "./src/entry-server.tsx"),
      name: 'Client',
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist',
      },
    }
  }
})
