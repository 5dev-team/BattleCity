import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

import express from 'express'
import serveStatic from 'serve-static'
import * as path from 'path'
import * as fs from 'fs'


import { createServer as createViteServer } from 'vite'
import type { ViteDevServer } from 'vite'

const isDev = () => process.env.NODE_ENV === 'development'

// import { createClientAndConnect } from './db'

async function startServer() {
  const app = express()
  app.use(cors())
  const port = Number(process.env.SERVER_PORT) || 3001

  let vite: ViteDevServer | undefined

  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const serverEntryPath = path.dirname(require.resolve('client/src'))
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom',
    })

    app.use(vite.middlewares)
  } else {
    app.use(serveStatic(distPath, {index: false}))
  }

  app.get('/api', (_, res) => {
    res.json('👋 Howdy from the server :)')
  })

  if (!isDev()) {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template: string

      if (!isDev()) {
        template = fs.readFileSync(
          path.resolve(distPath, 'index.html'),
          'utf-8'
        )
      } else {
        template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')

        template = await vite!.transformIndexHtml(url, template)
      }

      let render: ({ url }: { url: string }) => Promise<{ html: string, state: any}>

      if (!isDev()) {
        render = (await import(ssrClientPath)).render
      } else {
        render = (await vite!.ssrLoadModule(path.resolve(serverEntryPath, 'entry-server.tsx')))
          .render
      }

      const renderData = await render({ url })

      let html = template.replace(`<!--ssr-outlet-->`, renderData.html)
      html = html.replace('ssr-initial-state', JSON.stringify(renderData.state))

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
  })
}

startServer()
// createClientAndConnect()
