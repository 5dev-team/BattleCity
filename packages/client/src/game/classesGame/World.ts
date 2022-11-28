import Tank from './Tanks'
import Wall from './Wall'
import { defaultLevel, Iobject, ITank, IWall, IWorld, worldLevel } from './types/types'
import {
  CELL_SIZE,
  Direction,
  PLAYER1_TANK_SPRITES,
  PLAYER1_TANK_START_X,
  PLAYER1_TANK_START_Y,
  TANK_HEIGHT,
  TANK_SPEED,
  TANK_WIDTH,
  WORLD_SIZE
} from '../helpersGame/constants'


export default class World implements IWorld {
  public level: worldLevel = [[null]]

  player1Tank: ITank = new Tank(
    {
      x: PLAYER1_TANK_START_X,
      y: PLAYER1_TANK_START_Y,
      width: TANK_WIDTH,
      height: TANK_HEIGHT,
      direction: Direction.UP,
      speed: TANK_SPEED,
      frames: PLAYER1_TANK_SPRITES
    }
  )
  player2Tank = null
  enemyTanks = []
  objectOnPath = null


  public get width(): number {
    return WORLD_SIZE
  }

  public get height(): number {
    return WORLD_SIZE
  }

  public get top(): number {
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

  public get size(): number {
    return this.level[0].length * CELL_SIZE
  }

  public update(activeKeys: { has(value: string): boolean; }) {
    this.player1Tank.update(this, activeKeys)
  }


  public setLevel(data: defaultLevel): void {
    this.level = data.map((blocks: number[], y: number) => {
      return blocks.map((block: number, x: number) => {
        return block > 0 ? new Wall({
          x: x * CELL_SIZE,
          y: y * CELL_SIZE,
          width: CELL_SIZE,
          height: CELL_SIZE,
          sprite: block
        }) : null
      })
    })
  }


  public isOutOfBounds(object: Iobject): boolean {
    return (
      object.top < this.top ||
      object.right > this.right ||
      object.bottom > this.bottom ||
      object.left < this.left
    )
  }

  public hasCollision(object: ITank): boolean {
    const collisionObject: IWall | undefined = this.getCollisionObject(object)

    if (collisionObject) {
      // console.log(collisionObject)
    }
    return Boolean(collisionObject)
  }


  public getCollision(object: ITank): { object: IWall | undefined, delta: number | null } | { object: IWall | undefined, delta: undefined} | undefined {
    const collisionObject: IWall | undefined = this.getCollisionObject(object)
    let delta: number
    if (collisionObject) {
      let drift: number
      if (object.direction === Direction.UP || object.direction === Direction.DOWN) {
        drift = object.x - collisionObject.x
        if (drift < 0) {        //wall is on the right
          delta = collisionObject.left - object.right
          return { object: collisionObject, delta }
        } else if (drift > 0) { //wall is on the left
          delta = collisionObject.right - object.left
          return { object: collisionObject, delta }
        }
      } else {
        drift = object.y - collisionObject.y
        if (drift < 0) { //wall is on the bottom
          delta = collisionObject.top - object.bottom
          return { object: collisionObject, delta }
        } else if (drift > 0) {//wall is on the top
          delta = collisionObject.bottom - object.top
          return { object: collisionObject, delta }
        }
      }
      return { object: collisionObject, delta: undefined }
    }

  }

  public getCollisionObject(object: ITank): IWall | undefined {
    return this.level
      .reduce((result: any[], blocks: any[]) => {
        return result.concat(...blocks)
      }, [])
      .find((block: IWall) => {
        return block && this._objectsHaveCollision(object, block)
      })
  }


  private objectsHaveCollision(a: ITank, b: IWall): boolean {
    return (
      a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
    )
  }

  private _objectsHaveCollision(a: ITank, b: IWall): boolean {
    return (
      (
        (a.left >= b.left && a.left < b.right)
        ||
        (a.right > b.left && a.right <= b.right)
      )
      &&
      (
        (a.top >= b.top && a.top < b.bottom)
        ||
        (a.bottom > b.top && a.bottom <= b.bottom)
      )
    )
  }
}


// function isBetween(p: number, p1: number, p2: number) {
//     return p > p1 && p < p2;
// }
//
// function isSame(p1: number, p2: number) {
//     return p1 === p2;
// }
