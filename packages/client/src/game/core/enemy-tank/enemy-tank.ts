import Input from '@/game/core/input/input'
import Stage from '@/game/core/stage/stage'
import Tank from '@/game/core/tank/tank'
import { ENEMY_TANK_SPRITES, ENEMY_TANK_START_POSITIONS, TANK_SPEED } from '@/game/helpers/constants'
import { getAxisForDirection, getValueForDirection } from '@/game/helpers/helpers'
import { GameObjectArgs } from '@/game/core/types'

type EnemyGameObjectArgs = GameObjectArgs & {
  type: number
}

export default class EnemyTank extends Tank {
  
  protected speed: number
  public direction: number
  public type: number
  
  constructor(args: EnemyGameObjectArgs) {
    super({ ...args, sprites: ENEMY_TANK_SPRITES})
    this.direction = Tank.Direction.DOWN
    this.x = 0
    this.y = 0
    this.speed = TANK_SPEED
    this.name = 'enemy-tank'
    this.type = args.type
    this.objectType = 'enemyTank'
  }
  
  hit() {
    if (!this.isDestroyed) {
      this.isDestroyed = true
    }
      super.hit()
  }
  
  private invertDirection() {
    let newDirection = 0
    switch (this.direction) {
      case Tank.Direction.DOWN:
        newDirection = Tank.Direction.UP
        break
      case Tank.Direction.RIGHT:
        newDirection = Tank.Direction.LEFT
        break
      case Tank.Direction.UP:
        newDirection = Tank.Direction.DOWN
        break
      case Tank.Direction.LEFT:
        newDirection = Tank.Direction.RIGHT
        break
      
    }
    this.direction = newDirection
  }
  
  rotateClockwise() {
    if (this.direction !== Tank.Direction.LEFT) {
      this.turn(this.direction + 1)
    } else {
      this.turn(Tank.Direction.UP)
    }
  }
  
  rotateAntiClockwise() {
    if (this.direction !== Tank.Direction.UP) {
      this.turn(this.direction - 1)
    } else {
      this.turn(Tank.Direction.LEFT)
    }
  }
  
  private changeDirectionWhenTileReach() {
    if (Math.round(Math.random()) === 0) {
      this.changeDirection()
      // eslint-disable-next-line no-dupe-else-if
    } else if (Math.round(Math.random()) === 0) {
      this.rotateClockwise()
    } else {
      this.rotateAntiClockwise()
    }
    
  }
  
  private changeDirection() {
    // const periodDuration = this.respawn / 8
  }
  
  public setPosition(positionIndex: number) {
    this.x = ENEMY_TANK_START_POSITIONS[positionIndex][0]
    this.y = ENEMY_TANK_START_POSITIONS[positionIndex][1]
  }
  
  update({
           world,
           input,
           frameDelta
         }: {
    world: Stage
    input: Input
    frameDelta: number
  }): void {
    if (this.isDestroyed) {
      world.objects.delete(this)
    }
    
    const direction = this.direction
    const axis = getAxisForDirection(direction)
    const value = getValueForDirection(direction)
    
    this.turn(direction)
    this.move(axis, value)
    if (Math.floor(Math.random() * 31) === 1) {
      this.fire()
      if (this.bullet) {
        world.objects.add(this.bullet)
      }
    }
    
    this.animate(frameDelta)
    
    const isOutOfBounds = world.isOutOfBounds(this)
    const hasCollision = world.hasCollision(this)
    
    if (isOutOfBounds || hasCollision) {
      this.move(axis, -value)
      const rand = Math.round(Math.random() * 4)
      
      if (rand % 4 == 0) {
        
        if (this.x % 8 !== 0 || this.y % 8 !== 0) {
          this.invertDirection()
        } else {
          this.changeDirectionWhenTileReach()
        }
      }
    }
    return
  }
}
