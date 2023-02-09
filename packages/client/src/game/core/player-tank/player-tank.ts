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
  Direction,
  GameObjectArgs,
  UpdateState,
  Vec2,
} from '@/game/core/types'
import { IScoreResult } from '@/game/core/player-tank/types'

export default class PlayerTank extends Tank {
  private score: IScoreResult

  constructor(args: Partial<GameObjectArgs>) {
    super({
      pos: args.pos
        ? args.pos
        : new Vec2(PLAYER1_TANK_POSITION[0], PLAYER1_TANK_POSITION[1]),
      sprites: PLAYER1_TANK_SPRITES,
    })
    this.direction = Direction.Up
    this.speed = 8
    this.objectType = 'playerTank'
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
        world.gameObjects.add(this.bullet)
      }
    }
  }
}
