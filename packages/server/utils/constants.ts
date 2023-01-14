import * as dotenv from 'dotenv'
dotenv.config({ path: __dirname + '/.env' })

const {
  PORT = 3001,
  NODE_ENV = 'development',
  MONGOOSE_DB_URL = 'mongodb://127.0.0.1:27017/moviesdb',
  JWT_SECRET_KEY = '12345678'
} = process.env

const origin: string  = NODE_ENV === 'production'
  ? 'http://localhost:3000'
  : 'http://localhost:3000'


export {
  PORT,
  NODE_ENV,
  MONGOOSE_DB_URL,
  JWT_SECRET_KEY,
  origin
}
