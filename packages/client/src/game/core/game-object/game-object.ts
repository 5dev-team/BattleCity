import { Sprite } from '@/game/helpers/types'
import { GameObjectArgs, GameObjectType, IRect, Vec2 } from '@/game/core/types'
import EventBus from '@/game/core/event-bus/event-bus'
import eventBusInstance from '@/game/core/event-bus/event-bus'

export default abstract class GameObject extends EventBus implements IRect {
  public abstract gameObjectType: GameObjectType
  public readonly eventBus: () => typeof EventBus
  public readonly width: number
  public readonly height: number
  public readonly sprites: Sprite[]
  public id: number
  public pos: Vec2
  public name = 'Root object'
  public debug = false
  protected speed = 0
  protected frames = 0
  protected animationFrame = 0
  protected isDestroyed = false

  constructor(args: GameObjectArgs) { 
    super()
    this.width = args.width
    this.height = args.height
    this.sprites = args.sprites
    this.id = Math.floor(Math.random() * 100001 + 1)
    this.pos = args.pos
    this.eventBus = () => eventBusInstance
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
    
    const divider =
      angle > 45 && angle < 135 ? Math.sin(radians) : Math.cos(radians)

    const distance = Number(sourceVector.length().toFixed(10))
    const minDistance = Number(((this.width + other.width) / 2 / divider).toFixed(10))

    return distance < minDistance
  }
}

// export default class GameObject extends EventBus {
//   public debug: boolean
//   public x: number
//   public y: number
//   public readonly width: number
//   public readonly height: number
//   public readonly sprites: Sprites
//   public readonly eventBus: () => typeof EventBus
//   protected animationFrame: number
//   protected frames: number
//   protected isDestroyed: boolean
//   public name: string
//   public objectType: string

//   public id: number
//   protected speed: number
//   protected animationSpeed: number

//   constructor({ x, y, width, height, sprites }: GameObjectArgs) {
//     super()
//     this.debug = false
//     this.x = x
//     this.y = y
//     this.width = width
//     this.height = height
//     this.speed = 0
//     this.animationSpeed = 0
//     this.sprites = sprites
//     this.animationFrame = 0
//     this.frames = 0
//     this.isDestroyed = false
//     this.eventBus = () => eventBusInstance
//     this.name = 'Root object'
//     this.id = Math.floor(Math.random() * (100001) + 1)
//     this.objectType = 'rootObject'
//   }

//   public get top(): number {
//     return this.y
//   }

//   public get right(): number {
//     return this.x + this.width
//   }

//   public get bottom(): number {
//     return this.y + this.height
//   }

//   public get left(): number {
//     return this.x
//   }

//   public stop() {
//     this.speed = 0
//   }

// }
