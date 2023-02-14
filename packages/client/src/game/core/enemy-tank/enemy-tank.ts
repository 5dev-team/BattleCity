import Tank from '@/game/core/tank/tank'
import {
  ENEMY_TANK_SPRITES,
} from '@/game/helpers/constants'
import {
  getVectorForDirection,
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
      this.rotateClockwise()
    } else {
      this.rotateAntiClockwise()
    }
  }

  public update({ world, frameDelta }: Omit<UpdateState, 'input'>): void {
    const direction = this.direction
    const colliders = this.getColliders(Array.from(world.gameObjects))

    this.turn(direction, this.getTurnOffsetLimit(colliders))

    const collisions = this.getCollisions(colliders)

    let isOutOfBounds = false
    if (collisions.length === 0) {
      const directionVector = getVectorForDirection(direction)
      const movement = this.getMovement(this.getMoveOffsetLimit(colliders))
      this.move(directionVector.scale(movement))

      if ((isOutOfBounds = world.isOutOfBounds(this))) {
        const outerOffset = world.getOutOfBoundsOffset(this)
        this.move(outerOffset)
      }
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
