import GameObject from '@/game/core/game-object/game-object'
import { GameObjectArgs, GameObjectType, IDestroyable, IUpdatable, UpdateState } from '@/game/core/types'
import { PROJECTILE_EXPLOSION_SPEED } from '@/game/helpers/constants'

export default class Explosion extends GameObject implements IUpdatable, IDestroyable {
  public gameObjectType: GameObjectType = GameObjectType.Explosion
  protected speed: number
  
  constructor(args: GameObjectArgs) {
    super(args)
    
    this.speed = PROJECTILE_EXPLOSION_SPEED
  }
  
  public get sprite() {
    return this.sprites[this.animationFrame]
  }
  
  get isExploding() {
    return this.animationFrame < this.sprites.length
  }

  public update(state: Partial<UpdateState>) {
    const { frameDelta } = state
    if (this.isExploding && frameDelta) {
      this.animate(frameDelta)
    } else {
      this.destroy()
    }
  }
    
  public destroy() {
    this.emit('destroyed', this)
  }

  public animate(frameDelta: number): void {
    this.frames += frameDelta
    
    if (this.frames > 50) {
      this.animationFrame = (this.animationFrame + 1) % (this.sprites.length + 1)
      this.frames = 0
    }
  }
}
