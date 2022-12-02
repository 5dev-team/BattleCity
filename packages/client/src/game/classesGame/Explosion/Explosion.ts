import {
  PROJECTILE_EXPLOSION_WIDTH,
  PROJECTILE_EXPLOSION_HEIGHT,
  PROJECTILE_EXPLOSION_SPEED,
  PROJECTILE_EXPLOSION_SPRITES
} from '../../helpersGame/constants'
import GameObject from '../GameObject/GameObject'
import { TSprites } from '../../helpersGame/types'
import { IGameObjectConstructor } from '../GameObject/types'

export default class Explosion extends GameObject {
  public width: number
  public height: number
  public speed: number
  public sprites: TSprites
  public exploded: boolean

  constructor(args: { x: number, y: number }) {
    super(<IGameObjectConstructor>args)
    this.width = PROJECTILE_EXPLOSION_WIDTH
    this.height = PROJECTILE_EXPLOSION_HEIGHT
    this.speed = PROJECTILE_EXPLOSION_SPEED
    this.sprites = PROJECTILE_EXPLOSION_SPRITES
    this.exploded = false
  }

  public get sprite() {
    return this.sprites[this.animationFrame]
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public update({ frameDelta }: { frameDelta: number }): void {
    if (!this.exploded) {
      if (this.animationFrame === 3) {
        this.exploded = true
      } else {
        this.animate(frameDelta)
      }
    }
  }

  public animate(frameDelta: number): void {
    this.frames += frameDelta

    if (this.frames > 50) {
      this.animationFrame = (this.animationFrame + 1) % 4
      this.frames = 0
    }
  }
}
