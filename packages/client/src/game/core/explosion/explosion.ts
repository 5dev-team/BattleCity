import GameObject from '@/game/core/game-object/game-object'
import { GameObjectArgs, IUpdatable, UpdateState } from '@/game/core/types'
import {
  PROJECTILE_EXPLOSION_HEIGHT, PROJECTILE_EXPLOSION_SPEED,
  PROJECTILE_EXPLOSION_SPRITES,
  PROJECTILE_EXPLOSION_WIDTH
} from '@/game/helpers/constants'


export default class Explosion extends GameObject implements IUpdatable {
  private speed: number
  private _exploded: boolean

  constructor(x: number, y: number) {
    super({
      width: PROJECTILE_EXPLOSION_WIDTH,
      height: PROJECTILE_EXPLOSION_HEIGHT,
      sprites: PROJECTILE_EXPLOSION_SPRITES,
      x,
      y
    } as GameObjectArgs)

    this.speed = PROJECTILE_EXPLOSION_SPEED

    this._exploded = false
  }

  public get sprite() {
    return this.sprites[this.animationFrame]
  }


  public get exploded(): boolean {
    return this._exploded
  }

  private set exploded(val: boolean) {
    this._exploded = val
  }


  update(state: Partial<UpdateState>): void {
    const { frameDelta } = state
    if (!this.exploded && frameDelta) {
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
