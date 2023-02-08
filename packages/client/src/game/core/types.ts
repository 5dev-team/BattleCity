import Input from '@/game/core/input/input'
import Stage from '@/game/core/stage/stage'
import Bullet from '@/game/core/bullet/bullet'
import { Sprites } from '@/game/helpers/types'

export type GameObjectArgs = {
  x: number
  y: number
  width: number
  height: number
  sprites: Sprites
}

export type UpdateState = { input: Input; frameDelta: number; world: Stage }

export interface IUpdatable {
  update(state: Partial<UpdateState>): void
}

export interface IHitable {
  hit(bullet: Bullet): void
}

export interface IMovable {
  move(axis: string, value: number): void
}

export class Vec2 {
  x: number
  y: number

  constructor(x: number = 0, y: number = 0) {
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
    return Vec2.Equals(this, vector)
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  dotProduct(vector: Vec2) {
    return Vec2.DotProduct(this, vector);
  }

  angleBetween(vector: Vec2) {
    return Vec2.AngleBetween(this, vector);
  }

  get normalized() {
    const length = this.length()

    return new Vec2(this.x / length, this.y / length)
  }
  
  get opposite() {
    return new Vec2(-this.x, -this.y)
  }

  distance(vector: Vec2) {
    return Vec2.Distance(this, vector)
  }

  static DotProduct(vector1: Vec2, vector2: Vec2): number {
    return vector1.x * vector2.x + vector1.y * vector2.y
  }

  static AngleBetween(vector1: Vec2, vector2: Vec2): number {
    return Math.acos(Vec2.DotProduct(vector1, vector2) / (vector1.length() * vector2.length())) 
  }

  static Distance(vector1: Vec2, vector2: Vec2) {
    return Math.sqrt((vector1.x - vector2.x) ** 2 + (vector1.y - vector2.y) ** 2)
  }

  static Equals(vector1: Vec2, vector2: Vec2) {
    return vector1.x === vector2.x && vector1.y === vector2.y
  }

  static get one() {
    return new Vec2(1, 1)
  }
  
  static get zero() {
    return new Vec2()
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

export class Rect {
  pos: Vec2
  width: number
  height: number
  
  constructor(pos: Vec2, width: number, height: number) {
    this.pos = pos
    this.width = width
    this.height = height
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
}