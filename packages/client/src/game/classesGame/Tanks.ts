import { Direction, TANK_TURN_THRESHOLD } from '../helpersGame/constants'
import { ITank, ITankConstructor, IWall, IWorld } from './types/types'
import { Collision } from './types/types'

export default class Tank implements ITank {
  direction: number
  x: number
  y: number
  width: number
  height: number
  speed: number
  frames: [number, number, number, number][]
  animationFrame: number

  constructor({ x, y, width, height, direction, speed, frames }: ITankConstructor) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.direction = direction
    this.speed = speed
    this.frames = frames
    this.animationFrame = 0
  }

  get top() {
    return this.y
  }

  get right() {
    return this.x + this.width
  }

  get bottom() {
    return this.y + this.height
  }

  get left() {
    return this.x
  }

  get sprite(): number[] {
    return this.frames[this.direction * 2 + this.animationFrame]
  }

  private move(axis: string, value: number): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this[axis] += this.speed * value
    this.animationFrame ^= 1
  }

  update(world: IWorld, activeKeys: { has(value: string): boolean; }): void {
    if (activeKeys.has('ArrowUp')) {
      this.turn(Direction.UP)
      this.move('y', -1)
      if (world.isOutOfBounds(this)) {
        this.move('y', 1)
        return
      }
      const collision: Collision = world.getCollision(this)
      if (collision) {
        if (collision.delta !== undefined) {
          if (Math.abs(<number>collision.delta) <= TANK_TURN_THRESHOLD) {
            this.x += Number(collision.delta)
          } else {
            this.move('y', 1)
          }
        }
      }

    } else if (activeKeys.has('ArrowRight')) {
      this.turn(Direction.RIGHT)
      this.move('x', 1)
      if (world.isOutOfBounds(this)) {
        this.move('x', -1)
        return
      }

      const collision: Collision = world.getCollision(this)
      if (collision) {
        if (collision.delta != undefined) {
          if (Math.abs(collision.delta) <= TANK_TURN_THRESHOLD) {
            this.y += collision.delta
          } else {
            this.move('x', -1)
          }
        }
      }
    } else if (activeKeys.has('ArrowDown')) {
      this.turn(Direction.DOWN)
      this.move('y', 1)

      if (world.isOutOfBounds(this)) {
        this.move('y', -1)
        return
      }
      const collision: Collision = world.getCollision(this)
      if (collision) {
        if(collision.delta != undefined){
          if (Math.abs(collision.delta) <= TANK_TURN_THRESHOLD) {
            this.x += collision.delta
          } else {
            this.move('y', -1)
          }
        }
      }
    } else if (activeKeys.has('ArrowLeft')) {
      this.turn(Direction.LEFT)
      this.move('x', -1)

      if (world.isOutOfBounds(this)) {
        this.move('x', 1)
        return
      }
      const collision: Collision = world.getCollision(this)
      if (collision) {
        if (collision.delta != null) {
          if (Math.abs(collision.delta) <= TANK_TURN_THRESHOLD) {
            this.y += collision.delta
          }
        } else {
          this.move('x', 1)
          return
        }
      }
    }
  }

  private turn(direction: number) {
    this.direction = direction
  }


}
