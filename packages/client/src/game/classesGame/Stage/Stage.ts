import { TILE_SIZE, STAGE_SIZE } from '../../helpersGame/constants'
import Input from '../Input/Input'
import BrickWall from '../BrickWall/BrickWall'
import SteelWall from '../SteelWall/SteelWall'
import Base from '../Base/Base'
import PlayerTank from '../PlayerTank/PlayerTank'
import { ISet } from '../Game/types'
import { IStageConsructor } from './types'
import { TObjects } from './types'
import Wall from '../Wall/Wall'
import Projectile from '../Projectile/Projectile'

export default class Stage {
  static TerrainType = {
    BRICK_WALL: 1,
    STEEL_WALL: 2,
    TREE: 3,
    WATER: 4,
    ICE: 5
  }

  static createObject(type: number, args: { x: number, y: number }): (BrickWall | SteelWall) {
    switch (type) {
      case Stage.TerrainType.BRICK_WALL:
        return new BrickWall(args)
      case Stage.TerrainType.STEEL_WALL:
        return new SteelWall(args)
      default:
        return new BrickWall(args)
    }
  }

  static createTerrain(level: number[][]): (BrickWall | SteelWall | undefined)[] {
    const objects = []
    for (let i = 0; i < level.length; i++) {
      for (let j = 0; j < level.length; j++) {
        const value = level[j][i]

        if (value) {
          const object = Stage.createObject(value, {
            x: i * TILE_SIZE,
            y: j * TILE_SIZE
          })

          objects.push(object)
        }
      }
    }
    return objects
  }

  // TODO create BOT
  // static createEnemies(types) {
  //   return types.map(type => new EnemyTank({ type }));
  // }

  public objects: ISet<TObjects>

  constructor(data: IStageConsructor) {

    this.objects = new Set([
      new Base({}),
      new PlayerTank(0),
      ...Stage.createTerrain(data.stage)
    ])
  }

  public get width(): number {
    return STAGE_SIZE
  }

  public get height(): number {
    return STAGE_SIZE
  }

  public get top() {
    return 0
  }

  public get right(): number {
    return this.width
  }

  public get bottom(): number {
    return this.height
  }

  public get left(): number {
    return 0
  }

  public update(input: Input, frameDelta: number): void {
    const state = {
      input,
      frameDelta,
      world: this
    }

    this.objects.forEach((object: TObjects) => {
      if (object) {
        object.update(state)
      }
    })
  }

  public isOutOfBounds(object: (PlayerTank | Projectile)): boolean {
    return (
      object.top < this.top ||
      object.right > this.right ||
      object.bottom > this.bottom ||
      object.left < this.left
    )
  }

  public hasCollision(object: TObjects) {
    const collision = this.getCollision(object)

    return Boolean(collision)
  }

  getCollision(object: TObjects) {
    const collisionObjects = this.getCollisionObjects(object)

    if (collisionObjects.size > 0) {
      return { objects: collisionObjects }
    }
  }

  private getCollisionObjects(object: TObjects) {
    const objects = new Set()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    for (const other of this.objects) {
      if (other !== object && this.haveCollision(object, other)) {
        objects.add(other)
      }
    }

    return objects
  }

  private haveCollision(a: TObjects, b: Wall) {
    if (a) {
      return (
        a.left < b.right &&
        a.right > b.left &&
        a.top < b.bottom &&
        a.bottom > b.top
      )
    } else {
      return false
    }

  }
}
