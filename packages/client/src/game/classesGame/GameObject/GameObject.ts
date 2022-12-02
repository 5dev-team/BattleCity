import { IGameObjectConstructor } from './types'

export default class GameObject {
  static Direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
  }

  public x: number
  public y: number
  public width: number
  public height: number
  public sprites: number[][]
  public animationFrame: number
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

  public get top(): number {
    return this.y
  }

  public get right(): number {
    return this.x + this.width
  }

  public get bottom(): number {
    return this.y + this.height
  }

  public get left(): number {
    return this.x
  }

  public update(): void {
    return
  }

  public hit(): void {
    console.log('hitObject')
  }
}
