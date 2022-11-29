export default class Sprite {
  public src: string
  public image: HTMLImageElement

  constructor(src: string) {
    this.src = src
    this.image = new Image()
  }

  async load(): Promise<Sprite> {
    return new Promise((resolve, _) => {
      this.image.src = this.src
      this.image.addEventListener('load', () => resolve(this))
    })
  }
}

