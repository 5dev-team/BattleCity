export {}

declare global {
  interface Window {
    __PRELOADED_STATE__?: string
  }
}

declare namespace Express {
  export interface Request {
      userId: number
  }
  export interface Response {
    userId: number
  }
}
