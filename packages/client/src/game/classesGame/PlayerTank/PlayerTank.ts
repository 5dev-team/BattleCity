import { Keys, PLAYER1_TANK_POSITION, PLAYER1_TANK_SPRITES, TANK_SPEED } from '../../helpersGame/constants'
import { getDirectionForKeys, getAxisForDirection, getValueForDirection } from '../../helpersGame/helpers'
import Tank from '../Tank/Tank'
import Input from '../Input/Input'
import Stage from '../Stage/Stage'
import { IGameObjectConstructor } from '../GameObject/types'

export default class PlayerTank extends Tank {
  public x: number
  public y: number
  public direction: number
  public speed: number
  public sprites: number[][]

  //TODO create uniq Tanks
  constructor(args: any) {
    super(<IGameObjectConstructor>args)
    this.x = PLAYER1_TANK_POSITION[0]
    this.y = PLAYER1_TANK_POSITION[1]
    this.direction = Tank.Direction.UP
    this.speed = TANK_SPEED
    this.sprites = PLAYER1_TANK_SPRITES
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public update({ input, frameDelta, world }: { input: Input, frameDelta: number, world: Stage }): void {
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
