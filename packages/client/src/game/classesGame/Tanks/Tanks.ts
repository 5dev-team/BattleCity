import { Direction, Keys, TANK_TURN_THRESHOLD, TILE_SIZE } from '../../helpersGame/constants'
import { ITankConstructor } from './types'
import GameObject from '../GameObject/GameObject'
import { getAxisForDirection, getDirectionForKeys, getValueForDirection } from '../../helpersGame/helpers'
import World from '../World/World'

export default class Tank extends GameObject {
  direction: number
  speed: number

  constructor({ direction, speed, ...rest }: ITankConstructor) {
    super(rest)
    this.direction = direction
    this.speed = speed
  }


  get sprite(): number[] {
    return this.sprites[this.direction * 2 + this.animationFrame]
  }

  private move(world: World, direction: number): void {

    const axis = getAxisForDirection(direction)
    const value = getValueForDirection(direction)
    const delta = value * this.speed

    this.animationFrame ^= 1

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this[axis] += delta

    const isOutOfBounds = world.isOutOfBounds(this)
    const hasCollision = world.hasCollision(this)

    if (isOutOfBounds || hasCollision) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this[axis] += -delta
    }
  }


  update(world: World, activeKeys: { has(value: string): boolean; }): void {

    if (
      activeKeys.has(Keys.UP) ||
      activeKeys.has(Keys.RIGHT) ||
      activeKeys.has(Keys.DOWN) ||
      activeKeys.has(Keys.LEFT)
    ) {
      const direction: number | undefined = getDirectionForKeys(activeKeys)
      if (direction != undefined) {
        this.turn(world, direction)
        this.move(world, direction)
      }

    }
  }

  private turn(world: World, direction: number) {
    const prevDirection = this.direction
    this.direction = direction

    if (direction === Direction.UP || direction === Direction.DOWN) {
      if (prevDirection === Direction.RIGHT) {
        const value = TILE_SIZE - (this.x % TILE_SIZE)

        if (value <= TANK_TURN_THRESHOLD) {
          this.x += value
        }
      } else if (prevDirection === Direction.LEFT) {
        const value = this.x % TILE_SIZE

        if (value <= TANK_TURN_THRESHOLD) {
          this.x -= value
        }
      }
    } else {
      if (prevDirection === Direction.UP) {
        const value = this.y % TILE_SIZE

        if (value <= TANK_TURN_THRESHOLD) {
          this.y -= value
        }
      } else if (prevDirection === Direction.DOWN) {
        const value = TILE_SIZE - (this.y % TILE_SIZE)

        if (value <= TANK_TURN_THRESHOLD) {
          this.y += value
        }
      }
    }
  }


}
