declare const __SERVER_PORT__: number
declare const __YANDEX_API__: string
declare const __YANDEX_OAUTH_URL__: string
declare const __YANDEX_REDIRECT_URI__: string
declare const __NODE_ENV__: 'development' | 'production'

declare module "*.png" {
  const value: string
  export default value
}
