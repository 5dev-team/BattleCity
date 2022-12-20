import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  // css, scss imports mock
  moduleNameMapper: {
    '\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'identity-obj-proxy',
    "^@/(.*)$": "<rootDir>/src/$1",
  }
}
