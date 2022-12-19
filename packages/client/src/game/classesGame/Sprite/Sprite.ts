export default class Sprite {
  public readonly src: string
  public readonly image: HTMLImageElement

  constructor(src: string) {
    this.src = src
    this.image = new Image()
  }

  async load(): Promise<Sprite> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, _) => {
      this.image.src = this.src
      this.image.addEventListener('load', () => resolve(this))
    })
  }
}

