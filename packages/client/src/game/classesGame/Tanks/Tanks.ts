import {
  Direction,
  Keys,
  TANK_TURN_THRESHOLD,
  TILE_SIZE,
  PROJECTILE_WIDTH,
  PROJECTILE_HEIGHT,
  PROJECTILE_SPRITES, PROJECTILE_SPEED
} from '../../helpersGame/constants'
import { ITankConstructor } from './types'
import GameObject from '../GameObject/GameObject'
import { getAxisForDirection, getDirectionForKeys, getValueForDirection } from '../../helpersGame/helpers'
import World from '../World/World'
import Projectile from '../Projectile/Projectile'

export default class Tank extends GameObject {
  direction: number
  speed: number
  isFire: boolean
  projectile: null | Projectile

  constructor({ direction, speed, ...rest }: ITankConstructor) {
    super(rest)
    this.direction = direction
    this.speed = speed
    this.projectile = null
    this.isFire = false
  }


  get sprite(): number[] {
    return this.sprites[this.direction * 2 + this.animationFrame]
  }

  private move(world: World, direction: number): void {

    const axis = getAxisForDirection(direction)
    const value = getValueForDirection(direction)
    const delta = value * this.speed



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


  update(world: World, activeKeys: { has(value: string): boolean }, frameDelta: number): void {

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
        this.animate(frameDelta);
      }
    }
    if (activeKeys.has(Keys.SPACE)) {
        this.fire(world)
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

  private fire(world: World){
    let projectile
    console.log(this.projectile)
    if (!this.projectile) {
      projectile = new Projectile({
        tank: this,
        x: this.x,
        y: this.y,
        width: PROJECTILE_WIDTH,
        height: PROJECTILE_HEIGHT,
        sprites: PROJECTILE_SPRITES,
        speed: PROJECTILE_SPEED,
        direction: this.direction
      })
    }
    this.projectile = projectile
    world.projectile.push(projectile)
  }

  private animate(frameDelta: number){
    this.frames += frameDelta
    if(this.frames > 100){
      this.animationFrame ^= 1
      this.frames = 0
    }

  }
}



