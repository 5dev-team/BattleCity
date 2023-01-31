import * as dotenv from 'dotenv'
import { createProxyMiddleware } from 'http-proxy-middleware'

dotenv.config({ path: __dirname + '../../.env' })

export const {
  SERVER_PORT,
  NODE_ENV,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  DOMAIN,
  YANDEX_API
} = process.env

//TODO если будет 1 домен для апи и для фронта, удалить
export const origin: string[]  = NODE_ENV === 'production'
  ? [`http://${DOMAIN}`, `https://${DOMAIN}`]
  : ['http://localhost:3000', 'http://localhost:3000']

export const corsOptions = {
  origin: origin,
  credentials: true,  //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

export const isDev = () => NODE_ENV === 'development'

export const dataBaseUrl = NODE_ENV === 'production' ? 'postgres' : 'localhost'

export const yandexRouter = createProxyMiddleware({
  target: 'https://ya-praktikum.tech',
  changeOrigin: true,
  cookieDomainRewrite: { 'ya-praktikum.tech': `${DOMAIN}`, '*': '' },
  headers: {
    'Connection': 'keep-alive'
  }
})





