import Input from '@/game/core/input/input'
import Stage from '@/game/core/stage/stage'
import Bullet from '@/game/core/bullet/bullet'
import { Sprite } from '@/game/helpers/types'

export enum Direction {
  Up,
  Right,
  Down,
  Left
}

export enum GameObjectType {
  Base,
  Wall,
  Tank,
  Bullet,
  Explosion,
}

export type GameObjectArgs = {
  pos: Vec2,
  width: number,
  height: number,
  sprites: Sprite[]
}

export type UpdateState = { input: Input; frameDelta: number; world: Stage }

export interface IUpdatable {
  update(state: Partial<UpdateState>): void
}

export interface IDestroyable {
  destroy(): void
}

export interface IMovable {
  direction: Direction
  move(axis: string, value: number): void
}

export interface IHitable {
  hit(bullet: Bullet): void
}

export class Vec2 {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  scale(val: number) {
    this.x *= val
    this.y *= val

    return new Vec2(this.x * val, this.y * val)
  }

  add(val: number | Vec2) {
    if (val instanceof Vec2) {
      return new Vec2(this.x + val.x, this.y + val.y)
    } else {
      return new Vec2(this.x + val, this.y + val)
    }
  }

  equals(vector: Vec2) {
    return Vec2.equals(this, vector)
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  dotProduct(vector: Vec2) {
    return Vec2.dotProduct(this, vector)
  }

  angleBetween(vector: Vec2) {
    return Vec2.angleBetween(this, vector)
  }

  get normalized() {
    const length = this.length()

    return new Vec2(this.x / length, this.y / length)
  }
  
  get opposite() {
    return new Vec2(-this.x, -this.y)
  }

  distance(vector: Vec2) {
    return Vec2.distance(this, vector)
  }

  static dotProduct(vector1: Vec2, vector2: Vec2): number {
    return vector1.x * vector2.x + vector1.y * vector2.y
  }

  static angleBetween(vector1: Vec2, vector2: Vec2): number {
    return Math.acos(Vec2.dotProduct(vector1, vector2) / (vector1.length() * vector2.length())) 
  }

  static distance(vector1: Vec2, vector2: Vec2) {
    return Math.sqrt((vector1.x - vector2.x) ** 2 + (vector1.y - vector2.y) ** 2)
  }

  static equals(vector1: Vec2, vector2: Vec2) {
    return vector1.x === vector2.x && vector1.y === vector2.y
  }

  static get one() {
    return new Vec2(1, 1)
  }
  
  static get zero() {
    return new Vec2(0, 0)
  }

  static get up() {
    return new Vec2(0, 1)
  }

  static get down() {
    return new Vec2(0, -1)
  }

  static get left() {
    return new Vec2(-1, 0)
  }

  static get right() {
    return new Vec2(1, 0)
  }
}

export interface IRect {
  pos: Vec2

  get center(): Vec2

  get top(): number

  get right(): number

  get bottom(): number

  get left(): number
}

export enum MapObject {
  BASE,
  BRICK_WALL,
  STEEL_WALL,
  TREE,
  WATER,
  ICE,
  TANK,
}
