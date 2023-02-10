import Tank from '@/game/core/tank/tank'
import {
  ENEMY_TANK_SPRITES,
  ENEMY_TANK_START_POSITIONS,
} from '@/game/helpers/constants'
import {
  getAxisForDirection,
  getValueForDirection,
} from '@/game/helpers/helpers'
import { Direction, GameObjectType, IUpdatable, UpdateState, Vec2 } from '@/game/core/types'

export default class EnemyTank extends Tank implements IUpdatable {
  public type: number

  constructor(type: number) {
    super({ pos: Vec2.zero, sprites: ENEMY_TANK_SPRITES })
    this.direction = Direction.Down
    this.type = type
    this.name = 'enemy-tank'
  }

  public hit() {
    if (!this.isDestroyed) {
      this.isDestroyed = true
    }
    super.hit()
  }

  private invertDirection() {
    let newDirection = 0
    switch (this.direction) {
      case Direction.Down:
        newDirection = Direction.Up
        break
      case Direction.Right:
        newDirection = Direction.Left
        break
      case Direction.Up:
        newDirection = Direction.Down
        break
      case Direction.Left:
        newDirection = Direction.Right
        break
    }
    this.direction = newDirection
  }

  public rotateClockwise() {
    if (this.direction !== Direction.Left) {
      this.turn(this.direction + 1)
    } else {
      this.turn(Direction.Up)
    }
  }

  public rotateAntiClockwise() {
    if (this.direction !== Direction.Up) {
      this.turn(this.direction - 1)
    } else {
      this.turn(Direction.Left)
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
    this.pos = new Vec2(
      ENEMY_TANK_START_POSITIONS[positionIndex][0],
      ENEMY_TANK_START_POSITIONS[positionIndex][1]
    )
  }

  public update({ world, frameDelta }: Omit<UpdateState, 'input'>): void {
    // if (this.isDestroyed) {
    //   world.gameObjects.delete(this)
    // }

    // const direction = this.direction
    // const axis = getAxisForDirection(direction)
    // const value = getValueForDirection(direction)
    
    // this.turn(direction)
    // this.move(axis, value)
    // if (Math.floor(Math.random() * 31) === 1) {
    //   this.fire()
    //   if (this.bullet) {
    //     world.gameObjects.add(this.bullet)
    //   }
    // }

    // this.animate(frameDelta)

    // const isOutOfBounds = world.isOutOfBounds(this)
    // const hasCollision = world.hasCollision(this)

    // if (isOutOfBounds || hasCollision) {
    //   this.move(axis, -value)
    //   const rand = Math.round(Math.random() * 4)

    //   if (rand % 4 == 0) {
    //     if (this.pos.x % 8 !== 0 || this.pos.y % 8 !== 0) {
    //       this.invertDirection()
    //     } else {
    //       this.changeDirectionWhenTileReach()
    //     }
    //   }
    // }

    if (this.isDestroyed) {
      world.gameObjects.delete(this)
    }

    const direction = this.direction
    const axis = getAxisForDirection(direction)
    const value = getValueForDirection(direction)
    
    this.turn(direction)

    const hasCollision = this.getCollisions(Array.from(world.gameObjects), GameObjectType.Wall, GameObjectType.Tank)
    if (hasCollision.length === 0)
      this.move(axis, value)
    
    if (Math.floor(Math.random() * 31) === 1) {
      this.fire()
      if (this.bullet) {
        world.gameObjects.add(this.bullet)
      }
    }

    this.animate(frameDelta)
    
    const isOutOfBounds = world.isOutOfBounds(this) 

    if (isOutOfBounds) {
      this.move(axis, -value)
    }

    if (isOutOfBounds || hasCollision.length > 0) {
      const rand = Math.round(Math.random() * 4)

      if (rand % 4 == 0) {
        if (this.pos.x % 8 !== 0 || this.pos.y % 8 !== 0) {
          this.invertDirection()
        } else {
          this.changeDirectionWhenTileReach()
        }
      }
    }
  }
}
