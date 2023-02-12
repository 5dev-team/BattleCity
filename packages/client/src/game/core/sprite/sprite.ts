export default class ImageLoader {
  public readonly src: string
  public readonly image: HTMLImageElement

  constructor(src: string) {
    this.src = src
    this.image = new Image()
  }

  async load(): Promise<ImageLoader> {
    return new Promise((resolve, reject) => {
      this.image.src = this.src
      this.image.addEventListener('load', () => resolve(this))
      this.image.addEventListener('error', (e) => reject(e.message))
    })
  }
}
