import GameObject from '@/game/core/game-object/game-object'
import { GameObjectArgs } from '@/game/core/types'
import Bullet from '@/game/core/bullet/bullet'
import {
  Direction, TANK_EXPLOSION_HEIGHT, TANK_EXPLOSION_WIDTH,
  TANK_HEIGHT,
  TANK_SPEED,
  TANK_TURN_THRESHOLD,
  TANK_WIDTH,
  TILE_SIZE
} from '@/game/helpers/constants'
import TankExplosion from '@/game/core/tank-explosion/tank-explosion'

export default class Tank extends GameObject {
  protected speed: number
  private readonly bulletSpeed: number
  protected bullet: null | Bullet
  protected direction: number
  protected explosion:  TankExplosion | null
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
  
  public get isExploding() {
    return Boolean(this.explosion?.isExploding)
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
  
  hit() {
    this.explode()
    this.destroy()
  }
  
  explode() {
    if (this.isExploding) return
    
    const [x, y] = this.getExplosionStartingPosition()
    
    this.explosion = new TankExplosion({
      x,
      y
    })
    
    this.emit('explode', this.explosion)
  }
  
  destroy() {
    this.isDestroyed = true
    this.bullet = null
    this.explosion = null
    
    this.emit('destroyed', this)
  }
  
  getBulletStartingPosition() {
    switch (this.direction) {
      case Direction.UP:
        return [this.left + 12, this.top - 4]
      case Direction.RIGHT:
        return [this.right - 8, this.top + 12]
      case Direction.DOWN:
        return [this.left + 12, this.bottom - 8]
      case Direction.LEFT:
        return [this.left, this.top + 12]
      default:
        return [this.left, this.top]
    }
  }
  
  getExplosionStartingPosition() {
    return [
      this.left - TANK_EXPLOSION_WIDTH * 0.25,
      this.top - TANK_EXPLOSION_HEIGHT* 0.25
    ]
  }
}
