import GameObject from '@/game/core/game-object/game-object'
import { GameObjectArgs, GameObjectType, IDestroyable, IUpdatable, UpdateState } from '@/game/core/types'
import { PROJECTILE_EXPLOSION_SPEED } from '@/game/helpers/constants'

export default class Animation extends GameObject implements IUpdatable, IDestroyable {
  public gameObjectType: GameObjectType = GameObjectType.Explosion
  protected speed: number
  protected duration: number
  protected startTime: number
  
  constructor(args: GameObjectArgs, speed: number, duration: number) {
    super(args)
    
    this.speed = speed || PROJECTILE_EXPLOSION_SPEED
    this.duration = duration || 0
    this.startTime = 0
  }
  
  public get sprite() {
    return this.sprites[this.animationFrame]
  }
  
  isDurationEnd(frameDelta: number) {
    if (this.startTime === 0) {
      this.startTime = frameDelta
    }
    
    return (this.frames - this.startTime) > this.duration * 60 * 10
    
  }
  
  public update(state: Partial<UpdateState>) {
    const { frameDelta } = state
    if (frameDelta && !this.isDurationEnd(frameDelta)) {
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
    if (this.frames > this.speed) {
      if (this.animationFrame > this.sprites.length) {
        this.animationFrame = 0
      }
      this.animationFrame = (this.animationFrame + 1) % (this.sprites.length + 1)
    }
  }
}
