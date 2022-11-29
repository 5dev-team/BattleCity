import Sprite from './Sprite'

export interface ISprite {
  image: HTMLImageElement;
  src: string;
  load(): Promise<Sprite>;
}
