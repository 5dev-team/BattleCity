import GameObject from '@/game/core/game-object/game-object'
import { GameObjectArgs } from '@/game/core/types'
import Bullet from '@/game/core/bullet/bullet'
import { TANK_HEIGHT, TANK_SPEED, TANK_TURN_THRESHOLD, TANK_WIDTH, TILE_SIZE } from '@/game/helpers/constants'

export default class Tank extends GameObject {
  protected speed: number
  private readonly bulletSpeed: number
  protected bullet: null | Bullet
  protected direction: number
  protected explosion: boolean | null
  public name: string
  
  constructor(args: Partial<GameObjectArgs>) {
    super({ ...args, width: TANK_WIDTH, height: TANK_HEIGHT } as GameObjectArgs)
    this.speed = TANK_SPEED
    this.bulletSpeed = 4
    this.bullet = null
    this.direction = 0
    this.explosion = null
    this.name = 'tank'
  }
  
  public get sprite() {
    return this.sprites[this.direction * 2 + this.animationFrame]
  }
  
  public turn(direction: number) {
    const prevDirection = this.direction
    
    this.direction = direction
    
    if (
      direction === GameObject.Direction.UP ||
      direction === GameObject.Direction.DOWN
    ) {
      if (prevDirection === GameObject.Direction.RIGHT) {
        const value = TILE_SIZE - (this.x % TILE_SIZE)
        
        if (value <= TANK_TURN_THRESHOLD) {
          this.x += value
        }
      } else if (prevDirection === GameObject.Direction.LEFT) {
        const value = this.x % TILE_SIZE
        
        if (value <= TANK_TURN_THRESHOLD) {
          this.x -= value
        }
      }
    } else {
      if (prevDirection === GameObject.Direction.UP) {
        const value = this.y % TILE_SIZE
        
        if (value <= TANK_TURN_THRESHOLD) {
          this.y -= value
        }
      } else if (prevDirection === GameObject.Direction.DOWN) {
        const value = TILE_SIZE - (this.y % TILE_SIZE)
        
        if (value <= TANK_TURN_THRESHOLD) {
          this.y += value
        }
      }
    }
  }
  
  public move(axis: string, value: number): void {
    if (axis === 'y') {
      this.y += value * this.speed
    }
    if (axis === 'x') {
      this.x += value * this.speed
    }
  }
  
  public fire() {
    if (!this.bullet) {
      const [x, y] = this.getBulletStartingPosition()
      this.bullet = new Bullet(this.direction, x, y, this.bulletSpeed, this)
      
      this.bullet.on('destroyed', () => {
        this.bullet = null
      })
      this.emit('fire', this.bullet)
    }
  }
  
  public animate(frameDelta: number) {
    this.frames += frameDelta
    
    if (this.frames > 20) {
      this.animationFrame ^= 1
      this.frames = 0
    }
  }
  
  public getBulletStartingPosition(): number[] {
    switch (this.direction) {
      case Tank.Direction.UP:
        return [this.left + 10, this.top - 6]
      case Tank.Direction.RIGHT:
        return [this.right - 1, this.top + 12]
      case Tank.Direction.DOWN:
        return [this.left + 10, this.bottom - 1]
      case Tank.Direction.LEFT:
        return [this.left - 6, this.top + 12]
      default:
        return [this.left + 10, this.top]
    }
  }
  
  hit() {
    // this.explode();
    this.destroy()
  }
  
  destroy() {
    this.isDestroyed = true
    this.bullet = null
    this.explosion = null
    
    this.emit('destroyed', this)
  }
}
