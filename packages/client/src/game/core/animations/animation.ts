import GameObject from '@/game/core/game-object/game-object'
import { GameObjectArgs, GameObjectType, IDestroyable, IUpdatable, UpdateState } from '@/game/core/types'
import { PROJECTILE_EXPLOSION_SPEED } from '@/game/helpers/constants'

export default class Animation extends GameObject implements IUpdatable, IDestroyable {
  public gameObjectType: GameObjectType = GameObjectType.Explosion
  protected speed: number
  protected duration: number
  protected startTime: number
  
  constructor(args: GameObjectArgs, speed: number, duration = 0) {
    super(args)
    
    this.speed = speed || PROJECTILE_EXPLOSION_SPEED
    this.duration = duration
    this.startTime = 0
  }
  
  public get sprite() {
    return this.sprites[this.animationFrame]
  }
  
  get isAnimating() {
    return this.animationFrame < this.sprites.length
  }
  
  isDurationEnd(frameDelta: number) {
    if (this.startTime === 0) {
      this.startTime = frameDelta
    }
    
    return (this.frames - this.startTime) > this.duration * 60 * 10
  }
  
  private canAnimate(frameDelta: number): boolean{
    if (this.duration) {
      return !this.isDurationEnd(frameDelta)
    } else {
      return this.isAnimating
    }
  }
  public update(state: Partial<UpdateState>) {
    const { frameDelta } = state
    if (frameDelta && this.canAnimate(frameDelta)) {
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
    console.log(this.frames)
    if (this.frames > this.speed) {
      if (this.animationFrame > this.sprites.length) {
        this.animationFrame = 0
      }
      this.animationFrame = (this.animationFrame + 1) % (this.sprites.length + 1)
      this.frames = 0
    }
  }
}
