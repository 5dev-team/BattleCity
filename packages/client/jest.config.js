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
    '\\.(css|scss)$': 'identity-obj-proxy',
    "\\.(png|jpg|svg|jpeg)$": "jest-transform-stub",
    "^@/(.*)$": "<rootDir>/src/$1",
  }
}
