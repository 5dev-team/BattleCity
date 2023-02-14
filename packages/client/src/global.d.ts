export {}

declare global {
  interface Window {
    __PRELOADED_STATE__?: string
  }
}

declare namespace Express {
  export interface Request {
      userId: any;
  }
  export interface Response {
    userId: any;
  }
}