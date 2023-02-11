import Tank from '@/game/core/tank/tank'
import {
  ENEMY_TANK_SPRITES,
  ENEMY_TANK_START_POSITIONS,
} from '@/game/helpers/constants'
import {
  getAxisForDirection,
  getValueForDirection,
} from '@/game/helpers/helpers'
import { Direction, IUpdatable, UpdateState, Vec2 } from '@/game/core/types'

export default class EnemyTank extends Tank implements IUpdatable {
  public type: number

  constructor(type: number) {
    super({ pos: Vec2.zero, sprites: ENEMY_TANK_SPRITES })
    this.direction = Direction.Down
    this.type = type
    this.name = 'enemy-tank'
  }

  private invertDirection() {
    switch (this.direction) {
      case Direction.Down:
        this.direction = Direction.Up
        break
      case Direction.Right:
        this.direction = Direction.Left
        break
      case Direction.Up:
        this.direction = Direction.Down
        break
      case Direction.Left:
        this.direction = Direction.Right
        break
    }
  }

  public rotateClockwise() {
    if (this.direction !== Direction.Left) {
      this.direction = this.direction + 1
    } else {
      this.direction = Direction.Up
    }
  }

  public rotateAntiClockwise() {
    if (this.direction !== Direction.Up) {
      this.direction = this.direction - 1
    } else {
      this.direction = Direction.Left
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
    const direction = this.direction
    const axis = getAxisForDirection(direction)
    const value = getValueForDirection(direction)

    const gameObjects = Array.from(world.gameObjects)

    this.turn(direction, this.getTurnOffsetLimit(gameObjects))

    const collisions = this.getCollisions(this.getColliders(gameObjects))

    let isOutOfBounds = false
    if (collisions.length === 0) {
      const movement = this.getMovement(this.getMoveOffsetLimit(gameObjects))
      this.move(axis, value * movement)

      if ((isOutOfBounds = world.isOutOfBounds(this)))
        this.move(axis, -value * movement)
    }

    if (isOutOfBounds || collisions.length > 0) {
      const rand = Math.round(Math.random() * 4)

      if (rand % 4 == 0) {
        if (this.pos.x % 8 !== 0 || this.pos.y % 8 !== 0) {
          this.invertDirection()
        } else {
          this.changeDirectionWhenTileReach()
        }
      }
    }

    this.animate(frameDelta)

    if (Math.floor(Math.random() * 31) === 1) {
      this.fire()
    }
  }
}
