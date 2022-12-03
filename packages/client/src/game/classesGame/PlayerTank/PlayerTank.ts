import { Keys, PLAYER1_TANK_POSITION, PLAYER1_TANK_SPRITES, TANK_SPEED } from '@/game/helpersGame/constants'
import { getDirectionForKeys, getAxisForDirection, getValueForDirection } from '@/game/helpersGame/helpers'
import Tank from '@/game/classesGame/Tank/Tank'
import { GameObjectArgs, IUpdatable, UpdateState } from '@/game/classesGame/GameObject/types'

export default class PlayerTank extends Tank implements IUpdatable {
  //TODO create uniq Tanks
  constructor(args: Partial<GameObjectArgs>) {
    super({ ...args, sprites: PLAYER1_TANK_SPRITES })
    this.x = args.x ? args.x : PLAYER1_TANK_POSITION[0]
    this.y = args.y ? args.y : PLAYER1_TANK_POSITION[1]
    this.direction = Tank.Direction.UP
    this.speed = TANK_SPEED
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
