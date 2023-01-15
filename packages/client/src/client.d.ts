declare const __SERVER_PORT__: number
declare const __YANDEX_API__: string
declare module "*.png" {
  const value: string
  export default value
}

declare global {
  interface Window {
    __PRELOADED_STATE__?: string
  }
}

export {}
