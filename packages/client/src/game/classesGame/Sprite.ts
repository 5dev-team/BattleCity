import { ISprite } from './types/types'
import { IObjectDefaultSprite } from './types/types'
export default class Sprite implements ISprite{
  public src: string;
  public image: HTMLImageElement;
  public map: IObjectDefaultSprite ;

  constructor(src: string, map: IObjectDefaultSprite) {
    this.src = src;
    this.image = new Image();
    this.map = map;
  }

  set(id: number, {x, y, width, height}:{x: string, y: string, width: number, height: number}){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.map[id]([x, y, width, height])
    return this;
  }

  get(id: number): [number, number, number, number]{
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.map[id]
  }

  async load() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, _) => {
      this.image.src = this.src;
      this.image.addEventListener('load', () => resolve(this))
    });
  }
}
