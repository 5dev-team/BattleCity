import Sprite from './sprite'

export interface ISprite {
  image: HTMLImageElement
  src: string

  load(): Promise<Sprite>
}
