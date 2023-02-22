import Tank from '@/game/core/tank/tank'
import {
  Keys,
  PLAYER1_TANK_POSITION,
  PLAYER1_TANK_SPEED,
  PLAYER1_TANK_SPRITES,
} from '@/game/helpers/constants'
import {
  getDirectionForKeys,
  getVectorForDirection,
} from '@/game/helpers/helpers'
import {
  Direction,
  GameObjectArgs,
  IUpdatable,
  UpdateState,
  Vec2,
} from '@/game/core/types'
import { IScores } from '@/store/slices/game/game.models'

export default class PlayerTank extends Tank implements IUpdatable {
  private score: IScores
  public lives: number
  private pause: boolean
  private IDDQD: boolean

  constructor(args: Partial<Pick<GameObjectArgs, 'pos'>>) {
    super({
      pos: args.pos
        ? args.pos
        : new Vec2(PLAYER1_TANK_POSITION[0], PLAYER1_TANK_POSITION[1]),
      sprites: PLAYER1_TANK_SPRITES,
    })
    this.name = 'player tank'
    this.lives = 2
    this.speed = PLAYER1_TANK_SPEED
    this.IDDQD = false
    this.pause = false
    this.score = {
      0: {count: 0, points: 0},
      1: {count: 0, points: 0},
      2: {count: 0, points: 0},
      3: {count: 0, points: 0},
    }
  }

  public getScore() {
    return this.score
  }
  
  public setScore(tankType: number) {
    this.score[tankType].count += 1
    this.score[tankType].points = (tankType + 1) * 100 * this.score[tankType].count
  }

  public getLives() {
    return this.lives
  }

  public stop() {
    this.pause = true
  }
  public play() {
    this.pause = false
  }

  public reborn() {
    this.lives--
    this.pos = new Vec2(PLAYER1_TANK_POSITION[0], PLAYER1_TANK_POSITION[1])
    this.direction = Direction.Up
  }

  public turnOnIDDQD() {
    this.IDDQD = true
  }

  public turnOffIDDQD() {
    this.IDDQD = false
  }

  public hit() {
    if (this.IDDQD) return

    super.hit()
  }

  public update({ input, frameDelta, world }: UpdateState): void {
    if (this.pause) {
      return
    }

    if (input.has(Keys.UP, Keys.RIGHT, Keys.DOWN, Keys.LEFT)) {
      const direction = getDirectionForKeys(input.keys)
      const colliders = this.getColliders(Array.from(world.gameObjects))

      this.turn(direction, this.getTurnOffsetLimit(colliders))

      const collisions = this.getCollisions(colliders)

      if (collisions.length === 0) {
        const directionVector = getVectorForDirection(direction)
        const movement = this.getMovement(this.getMoveOffsetLimit(colliders))
        this.move(directionVector.scale(movement))

        if (world.isOutOfBounds(this)) {
          const outerOffset = world.getOutOfBoundsOffset(this)
          this.move(outerOffset)
        }
      }

      this.animate(frameDelta)
    }

    if (input.has(Keys.SPACE)) {
      this.fire()
    }
  }
}
