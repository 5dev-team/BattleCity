import BrickWall from '@/game/core/brick-wall/brick-wall'
import SteelWall from '@/game/core/steel-wall/steel-wall'
import Base from '@/game/core/base/base'
import PlayerTank from '@/game/core/player-tank/player-tank'
import Wall from '@/game/core/wall/Wall'
import Bullet from '@/game/core/bullet/bullet'
import { IUpdatable, UpdateState } from '@/game/core/types'
import { IStageConstructor, TObjects } from '@/game/core/stage/types'
import { STAGE_SIZE, TILE_SIZE } from '@/game/helpers/constants'

export default class Stage implements IUpdatable {
  static TerrainType = {
    BRICK_WALL: 1,
    STEEL_WALL: 2,
    TREE: 3,
    WATER: 4,
    ICE: 5,
  }

  static createObject(type: number, x: number, y: number): Wall | null {
    let wall: Wall | null = null
    switch (type) {
      case Stage.TerrainType.BRICK_WALL:
        wall = new BrickWall(x, y) as Wall
        break
      case Stage.TerrainType.STEEL_WALL:
        wall = new SteelWall(x, y) as Wall
        break
    }
    return wall
  }

  static createTerrain(level: number[][]): (Wall | undefined)[] {
    const objects = []
    for (let i = 0; i < level.length; i++) {
      for (let j = 0; j < level.length; j++) {
        const value = level[j][i]

        if (value) {
          const object = Stage.createObject(value, i * TILE_SIZE, j * TILE_SIZE)

          objects.push(object ? object : undefined)
        }
      }
    }
    return objects
  }

  // TODO create BOT
  // static createEnemies(types) {
  //   return types.map(type => new EnemyTank({ type }));
  // }

  public readonly objects: Set<TObjects>

  constructor(data: IStageConstructor) {
    this.objects = new Set([
      new Base({}),
      new PlayerTank({}),
      ...Stage.createTerrain(data.stage),
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

  public update(stage: Partial<UpdateState>): void {
    const objectsArr: TObjects[] = [...this.objects]
    const { input, frameDelta } = stage

    const state = {
      input,
      frameDelta,
      world: this,
    }
    objectsArr
      .filter(obj => obj !== undefined && 'update' in obj)
      .map(obj => obj as IUpdatable)
      .forEach((object: IUpdatable) => {
        object.update(state)
      })
  }

  public isOutOfBounds(object: PlayerTank | Bullet): boolean {
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
    const objects = new Set<TObjects>()

    this.objects.forEach(other => {
      if (
        other instanceof Wall &&
        other !== object &&
        this.haveCollision(object, other as Wall)
      ) {
        objects.add(other)
      }
    })

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
