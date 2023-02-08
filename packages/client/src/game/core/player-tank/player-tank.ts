import {
  Keys,
  PLAYER1_TANK_POSITION,
  PLAYER1_TANK_SPRITES,
  TANK_SPEED,
} from '@/game/helpers/constants'
import {
  getDirectionForKeys,
  getAxisForDirection,
  getValueForDirection,
} from '@/game/helpers/helpers'
import Tank from '@/game/core/tank/tank'
import { IUpdatable, UpdateState, Vec2 } from '@/game/core/types'

export default class PlayerTank extends Tank implements IUpdatable {
  //TODO create uniq Tanks
  constructor(pos?: Vec2) {
    super(
      pos ? pos : new Vec2(PLAYER1_TANK_POSITION[0], PLAYER1_TANK_POSITION[1]),
      PLAYER1_TANK_SPRITES
    )
  }

  update(state: UpdateState): void {
    const { input, frameDelta, world } = state
    if (input.has(Keys.UP, Keys.RIGHT, Keys.DOWN, Keys.LEFT)) {
      const direction = getDirectionForKeys(input.keys)
      const axis = getAxisForDirection(direction)
      const value = getValueForDirection(direction)

      this.turn(direction)
      this.move(axis, value)
      this.animate(frameDelta)

      const isOutOfBounds = world.isOutOfBounds(this)
      const hasCollision = world.hasCollision(this)

      if (isOutOfBounds || hasCollision) {
        this.move(axis, -value)
      }
    }

    if (input.keys.has(Keys.SPACE)) {
      this.fire()

      if (this.bullet) {
        world.objects.add(this.bullet)
      }
    }
  }
}
