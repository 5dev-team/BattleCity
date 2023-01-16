import Input from '@/game/core/input/input'
import Stage from '@/game/core/stage/stage'
import Tank from '@/game/core/tank/tank'
import {
  ENEMY_TANK_SPRITES,
  ENEMY_TANK_START_POSITIONS, PLAYER1_TANK_SPRITES,
  TANK_SPEED
} from '@/game/helpers/constants'
import { getAxisForDirection, getValueForDirection } from '@/game/helpers/helpers'

export default class EnemyTank extends Tank {
  
  protected speed: number
  protected respawn: number
  public direction: number
  
  constructor(args: any) {
    super({ ...args, sprites: ENEMY_TANK_SPRITES, debug: true })
    this.respawn = args.respawn
    this.direction = Tank.Direction.DOWN
    this.x = ENEMY_TANK_START_POSITIONS[0][0]
    this.y = ENEMY_TANK_START_POSITIONS[0][1]
    this.speed = TANK_SPEED
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
      console.log('смени направление на базу или игрока')
      this.changeDirection()
      // eslint-disable-next-line no-dupe-else-if
    } else if (Math.round(Math.random()) === 0) {
      this.rotateClockwise()
    } else {
      this.rotateAntiClockwise()
    }
    
  }
  
  private changeDirection() {
    const periodDuration = this.respawn / 8
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
    const direction = this.direction
    const axis = getAxisForDirection(direction)
    const value = getValueForDirection(direction)
    
    this.turn(direction)
    this.move(axis, value)
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
