import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import * as path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    assetsInclude: ['**/*.png'],
    server: {
      port: Number(process.env.SERVER_PORT) || 3000,
      cors: false
    },
    define: {
      __SERVER_PORT__: process.env.SERVER_PORT,
      __YANDEX_API__: JSON.stringify(process.env.YANDEX_API.trim()),
      __OWN_BACKEND_API__: JSON.stringify(process.env.OWN_BACKEND_API.trim()),
      __YANDEX_OAUTH_URL__: JSON.stringify(process.env.YANDEX_OAUTH_URL.trim()),
      __YANDEX_REDIRECT_URI__: JSON.stringify(process.env.YANDEX_REDIRECT_URI.trim()),
      __NODE_ENV__: JSON.stringify(process.env.NODE_ENV.trim()),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        workbox: {
          clientsClaim: true,
          skipWaiting: true,
          navigateFallback: null,
          globPatterns: ['**/*.{js,css,ico,png,svg,jpg}'],
        },
        devOptions: {
          enabled: true
        }
      })
    ],
    build: {
      manifest: false,
      minify: mode === 'development' ? false : 'terser',
      sourcemap: command === 'serve' ? 'inline' : false,
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name][hash][extname]',
          chunkFileNames: '[name][hash].js',
          entryFileNames: '[name][hash].js'
        }
      }
    }
  }
})
