import Tank from '@/game/core/tank/tank'
import {
  Keys,
  PLAYER1_TANK_POSITION,
  PLAYER1_TANK_SPRITES,
} from '@/game/helpers/constants'
import {
  getDirectionForKeys,
  getAxisForDirection,
  getValueForDirection,
} from '@/game/helpers/helpers'
import {
  GameObjectArgs,
  IUpdatable,
  UpdateState,
  Vec2,
} from '@/game/core/types'
import { IScoreResult } from '@/game/core/player-tank/types'

export default class PlayerTank extends Tank implements IUpdatable {
  private score: IScoreResult

  constructor(args: Partial<GameObjectArgs>) {
    super({
      pos: args.pos
        ? args.pos
        : new Vec2(PLAYER1_TANK_POSITION[0], PLAYER1_TANK_POSITION[1]),
      sprites: PLAYER1_TANK_SPRITES,
    })
    this.name = 'player tank'
    this.score = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
    }
  }

  public getScore() {
    return this.score
  }

  public setScore(newScore: IScoreResult) {
    this.score = newScore
  }

  public update(state: UpdateState): void {
    const { input, frameDelta, world } = state
    if (input.has(Keys.UP, Keys.RIGHT, Keys.DOWN, Keys.LEFT)) {
      const direction = getDirectionForKeys(input.keys)
      const axis = getAxisForDirection(direction)
      const value = getValueForDirection(direction)

      const gameObjects = Array.from(world.gameObjects)

      this.turn(direction, this.getTurnOffsetLimit(gameObjects))

      const collisions = this.getCollisions(this.getColliders(gameObjects))

      if (collisions.length === 0) {
        const movement = this.getMovement(this.getMoveOffsetLimit(gameObjects))

        this.move(axis, value * movement)

        if (world.isOutOfBounds(this)) this.move(axis, -value * movement)
      }

      this.animate(frameDelta)
    }

    if (input.has(Keys.SPACE)) {
      this.fire()
    }
  }
}
