import * as dotenv from 'dotenv'

dotenv.config({ path: __dirname + '../../.env' })
import { createProxyMiddleware } from 'http-proxy-middleware'

export const {
  SERVER_PORT = 3001,
  NODE_ENV = 'development',
  POSTGRES_USER = 'defaultUSER',
  POSTGRES_PASSWORD = 'defaultPassword',
  POSTGRES_DB = 'defaultDb',
  POSTGRES_PORT = 5432,
  YANDEX_API
} = process.env

export const origin: string  = NODE_ENV === 'production'
  ? 'http://localhost:3000'
  : 'http://localhost:3001'

export const yandexRouter = createProxyMiddleware({
  target: 'https://ya-praktikum.tech',
  changeOrigin: true,
  cookieDomainRewrite: { 'ya-praktikum.tech': 'localhost', '*': '' },
  headers: {
    'Connection': 'keep-alive'
  }
})

export const corsOptions = {
  origin: ['http://localhost:3000', 'https://nashDomain.com'],
  credentials: true,  //access-control-allow-credentials:true
  optionSuccessStatus: 200
}
