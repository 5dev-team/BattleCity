import { IGameObjectConstructor } from './types'

export default class GameObject{
  x: number;
  y: number;
  width: number;
  height: number;
  sprites: number[][];
  animationFrame: number;
  public frames: number
  constructor({ x, y, width, height, sprites }: IGameObjectConstructor) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.sprites = sprites
    this.animationFrame = 0
    this.frames = 0
  }

  public get top() {
    return this.y
  }

  public get right() {
    return this.x + this.width
  }

  public get bottom() {
    return this.y + this.height
  }

  public get left() {
    return this.x
  }

  update(){
      return
  }
}
