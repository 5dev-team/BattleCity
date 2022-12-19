import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import * as path from 'path'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    assetsInclude: ['**/*.png'],
    server: {
      port: Number(process.env.CLIENT_PORT) || 3000,
    },
    define: {
      __SERVER_PORT__: process.env.SERVER_PORT,
      __YANDEX_API__: JSON.stringify(process.env.YANDEX_API)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
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
