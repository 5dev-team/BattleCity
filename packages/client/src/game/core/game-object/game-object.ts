
import { Sprites } from '@/game/helpers/types'
import { GameObjectArgs } from '@/game/core/types'

export default class GameObject{
  static Direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
  }

  protected x: number
  protected y: number
  public readonly width: number
  public readonly height: number
  public readonly sprites: Sprites
  protected animationFrame: number
  protected frames: number

  constructor({ x, y, width, height, sprites }: GameObjectArgs) {
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
}
