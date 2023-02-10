import { Sprites } from '@/game/helpers/types'
import { GameObjectArgs } from '@/game/core/types'
import EventBus from '@/game/core/event-bus/event-bus'
import eventBusInstance from '@/game/core/event-bus/event-bus'

export default class GameObject extends EventBus {
  static Direction = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
  }
  public debug: boolean
  public x: number
  public y: number
  public readonly width: number
  public readonly height: number
  public readonly sprites: Sprites
  public readonly eventBus: () => typeof EventBus
  protected animationFrame: number
  protected frames: number
  protected isDestroyed: boolean
  public name: string
  public objectType: string
  
  public id: number
  protected speed: number
  protected animationSpeed: number
  
  constructor({ x, y, width, height, sprites }: GameObjectArgs) {
    super()
    this.debug = false
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.speed = 0
    this.animationSpeed = 0
    this.sprites = sprites
    this.animationFrame = 0
    this.frames = 0
    this.isDestroyed = false
    this.eventBus = () => eventBusInstance
    this.name = 'Root object'
    this.id = Math.floor(Math.random() * (100001) + 1)
    this.objectType = 'rootObject'
  }
  
  public get top(): number {
    return this.y
  }
  
  public get right(): number {
    return this.x + this.width
  }
  
  public get bottom(): number {
    return this.y + this.height
  }
  
  public get left(): number {
    return this.x
  }
  
  public stop() {
    this.speed = 0
  }
  
}
