import cors from 'cors'
import { dbConnect } from './init'
import { errors } from 'celebrate'
import { errorLogger, requestLogger } from './middlewares/logger'
import { processingErrors } from './middlewares/errors'
import { NotFoundError } from './errors'
import { isAuthorized } from './middlewares/auth'
import { isDev, SERVER_PORT, yandexRouter } from './utils/constants'
import express, { NextFunction, Request, Response } from 'express'
import serveStatic from 'serve-static'
import * as path from 'path'
import * as fs from 'fs'

import type { ViteDevServer } from 'vite'
import { createServer as createViteServer } from 'vite'
import { indexRouters } from './routes'

async function startServer() {
  await dbConnect()
  const app = express()
  app.use(cors())

  let vite: ViteDevServer | undefined

  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const serverEntryPath = path.dirname(require.resolve('client/src'))
  const ssrClientPath = require.resolve('client/ssr-dist/client.cjs')

  if (isDev()) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: srcPath,
      appType: 'custom'
    })

    app.use(vite.middlewares)
  } else {
    app.use(serveStatic(distPath, { index: false }))
  }
  app.use(requestLogger)

  app.use('/api/v2', yandexRouter)
  app.use(express.json())
  app.use('/api/', isAuthorized, indexRouters)

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

      let render: ({ url }: { url: string }) => Promise<{ html: string, state: any }>

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
  app.use(isAuthorized, (_req: Request, _res: Response, next: NextFunction) => next(new NotFoundError('Страница не найдена')))
  app.use(errorLogger)
  app.use(errors())
  app.use(processingErrors)

  app.listen(SERVER_PORT, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${SERVER_PORT}`)
  })
}

startServer()
