import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import * as path from 'path'
import { rollup, InputOptions, OutputOptions } from 'rollup'
import rollupPluginTypescript from '@rollup/plugin-typescript'

dotenv.config()

const CompileTsServiceWorker = () => ({
  name: 'compile-typescript-service-worker',
  // writeBundle hook from rollup
  async writeBundle() {
    const inputOptions: InputOptions = {
      input: 'src/sw.ts',
      plugins: [rollupPluginTypescript()],
    }
    const outputOptions: OutputOptions = {
      file: 'dist/sw.js',
      format: 'es',
    }
    const bundle = await rollup(inputOptions)
    await bundle.write(outputOptions)
    await bundle.close()
  }
})

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return {
    assetsInclude: ['**/*.png'],
    server: {
      port: Number(process.env.CLIENT_PORT) || 3000,
    },
    define: {
      __SERVER_PORT__: process.env.SERVER_PORT,
      __YANDEX_API__: JSON.stringify(process.env.YANDEX_API.trim()),
      __YANDEX_OAUTH_URL__: JSON.stringify(process.env.YANDEX_OAUTH_URL.trim()),
      __YANDEX_REDIRECT_URI__: JSON.stringify(process.env.YANDEX_REDIRECT_URI.trim()),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [react(),CompileTsServiceWorker()],
    build: {
      manifest: false,
      minify: mode === 'development' ? false : 'terser',
      sourcemap: command === 'serve' ? 'inline' : false,
      rollupOptions: {
        //TODO: add hash to filename after service worker fix dynamic names
        output: {
          assetFileNames: 'assets/[name][hash][extname]',
          chunkFileNames: '[name][hash].js',
          entryFileNames: '[name][hash].js'
        }
      }
    }
  }
})
