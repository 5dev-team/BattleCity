import { Sprite } from '@/game/helpers/types'
import {
  Direction,
  GameObjectArgs,
  GameObjectType,
  IRect,
  Vec2,
} from '@/game/core/types'
import EventBus from '@/game/core/event-bus/event-bus'
import eventBusInstance from '@/game/core/event-bus/event-bus'

export default abstract class GameObject extends EventBus implements IRect {
  public readonly abstract gameObjectType: GameObjectType
  public readonly eventBus: () => typeof EventBus
  public readonly width: number
  public readonly height: number
  public readonly sprites: Sprite[]
  public id: number
  public pos: Vec2
  public name = 'Root object'
  public debug = false
  protected frames = 0
  protected animationFrame = 0

  constructor(args: GameObjectArgs) {
    super()
    this.width = args.width
    this.height = args.height
    this.sprites = args.sprites
    this.id = Math.floor(Math.random() * 100001 + 1)
    this.pos = args.pos
    this.eventBus = () => eventBusInstance
  }

  abstract get sprite(): Sprite

  get diagonal() {
    return this.width * Math.sqrt(2)
  }

  get center() {
    return this.pos.add(new Vec2(this.width * 0.5, this.height * 0.5))
  }

  get top() {
    return this.pos.y
  }

  get right() {
    return this.pos.x + this.width
  }

  get bottom() {
    return this.pos.y + this.height
  }

  get left() {
    return this.pos.x
  }

  public isInsideOf(other: GameObject) {
    const sourceVector = other.center.add(this.center.opposite)
    const radians = sourceVector.angleBetween(Vec2.up)
    const angle = radians * (180 / Math.PI)

    const divider = Math.abs(
      angle > 45 && angle < 135 ? Math.sin(radians) : Math.cos(radians)
    )

    const distance = Number(sourceVector.length().toFixed(10))
    const minDistance = Number(
      ((this.width + other.width) / 2 / divider).toFixed(10)
    )

    return distance < minDistance
  }

  public distanceBetweenBounds(
    other: GameObject,
    boundDirection: Direction
  ): number {
    switch (boundDirection) {
      case Direction.Up:
        return this.top - other.bottom
      case Direction.Right:
        return other.left - this.right
      case Direction.Down:
        return other.top - this.bottom
      case Direction.Left:
        return this.left - other.right
    }
  }
}
