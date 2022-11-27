import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    server: {
      port: Number(process.env.CLIENT_PORT) || 3000
    },
    define: {
      __SERVER_PORT__: process.env.SERVER_PORT
    },
    plugins: [react()],
    build: {
      manifest: false,
      minify: mode === 'development' ? false : 'terser',
      sourcemap: command === 'serve' ? 'inline' : false,

      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash].[extname]',
          chunkFileNames: '[name].[hash].js',
          entryFileNames: '[name].js'
        }
      }
    }
  }
})
