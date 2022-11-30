import GameObject from '../GameObject/GameObject'
import { IProjectile } from './type'
import { getAxisForDirection, getDirectionForKeys, getValueForDirection } from '../../helpersGame/helpers'
import World from '../World/World'
import Tank from '../Tanks/Tanks'


export default class Projectile extends GameObject {
  public speed: number
  public direction: number
  public tank: Tank
  public isExploded: boolean
  isDestroyed: boolean

  constructor({ tank, direction, speed, ...args }: IProjectile) {
    super(args)
    this.tank = tank
    this.speed = speed
    this.direction = direction
    this.isExploded = false
    this.isDestroyed = false
    this.animationFrame = 1
  }


  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  update(world: World, activeKeys: { has(value: string): boolean }, frameDelta: number) {
    this.animate(frameDelta)
    this.move(world, frameDelta)

  }

  private animate(frameDelta: number) {
    this.frames += frameDelta
    if (!this.isExploded && !this.isDestroyed) {
      return
    }
    if (this.animationFrame === 4) {
      this.isDestroyed = true
    } else if(this.frames > 1000) {
      this.animationFrame += 1
      this.frames = 0
    }
  }

  private move(world: World, frameDelta: number) {
    const axis = getAxisForDirection(this.direction)
    const value = getValueForDirection(this.direction)
    const delta = value * this.speed

    this.animate(frameDelta)
    if (this.isDestroyed) {
      [world.projectile] = world.projectile.filter(projectile => projectile !== this)
    } else {
      this[axis] += delta
      const isOutOfBounds = world.isOutOfBounds(this)
      const hasCollision = world.hasCollision(this)

      if (isOutOfBounds || hasCollision) {
        this.isExploded = true
        this.speed = 0
      }
    }

  }

  get sprite() {
    if (!this.isExploded && !this.isDestroyed) {
      return this.sprites[0]
    }
    this.animationFrame = this.animationFrame % this.sprites.length
    return this.sprites[this.animationFrame]

  }
}
