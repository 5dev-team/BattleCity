import BrickWall from '@/game/core/brick-wall/brick-wall'
import SteelWall from '@/game/core/steel-wall/steel-wall'
import Base from '@/game/core/base/base'
import Tank from '@/game/core/tank/tank'
import Wall from '@/game/core/wall/Wall'
import Bullet from '@/game/core/bullet/bullet'
import { IUpdatable, UpdateState, Vec2 } from '@/game/core/types'
import { IStageConstructor, UnknownGameObject } from '@/game/core/stage/types'
import { STAGE_SIZE, TILE_SIZE } from '@/game/helpers/constants'
import EventBus from '@/game/core/event-bus/event-bus'
import Explosion from '@/game/core/explosion/explosion'
import { ControllerType } from '@/game/helpers/types'
import GameObject from '@/game/core/game-object/game-object'
import EnemyTank from '@/game/core/enemy-tank/enemy-tank'
import PlayerTank from '@/game/core/player-tank/player-tank'

export default class Stage extends EventBus {
  static TerrainType = {
    BRICK_WALL: 1,
    STEEL_WALL: 2,
    TREE: 3,
    WATER: 4,
    ICE: 5,
  }
  private respawn: number
  private enemies: EnemyTank[]
  private readonly playerTank: PlayerTank
  private readonly base: Base
  private readonly terrain: (Wall | undefined)[]
  private enemyTankCount: number
  private enemyTankTimer: number
  private enemyTankStartPosition: number
  private enemyTankPositionIndex: number

  public stageIndex: number
  public readonly gameObjects: Set<UnknownGameObject>

  constructor(
    data: IStageConstructor,
    stageIndex: number,
    controllerMode: ControllerType
  ) {
    super()
    //TODO add 2 players: (1 - 1) and (2 - 1)
    this.stageIndex = stageIndex
    this.respawn = (190 - stageIndex * 4 - (1 - 1) * 20) * 60
    this.enemies = Stage.createEnemies(data.enemies)
    this.playerTank = new PlayerTank({})
    this.base = new Base()
    this.terrain = Stage.createTerrain(data.stage)
    this.enemyTankCount = 0
    this.enemyTankTimer = 0
    this.enemyTankStartPosition = 0
    this.enemyTankPositionIndex = 0

    //TODO: fix it
    // @ts-ignore
    this.gameObjects = new Set([this.base, this.playerTank, ...this.terrain])
    this.initListeners()
  }

  static createObject(type: number, pos: Vec2): Wall | undefined {
    let wall: Wall | undefined = undefined
    switch (type) {
      case Stage.TerrainType.BRICK_WALL:
        wall = new BrickWall({ pos }) as Wall
        break
      case Stage.TerrainType.STEEL_WALL:
        wall = new SteelWall({ pos }) as Wall
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
          const object = Stage.createObject(
            value,
            new Vec2(i * TILE_SIZE, j * TILE_SIZE)
          )

          objects.push(object)
        }
      }
    }
    return objects
  }

  static createEnemies(types: number[]): EnemyTank[] {
    return types.map(type => new EnemyTank(type))
  }

  public getPlayerTank() {
    return this.playerTank
  }

  private initListeners() {
    this.on('killAll', () => {
      this.emit('gameOver')
    })

    this.base.on('destroyed', () => {
      this.emit('gameOver')
    })

    this.enemies.map(enemyTank => {
      enemyTank.on('fire', (bullet: Bullet) => {
        this.gameObjects.add(bullet)
        bullet.on('explode', (explosion: Explosion) => {
          this.gameObjects.add(explosion)

          explosion.on('destroyed', () => {
            this.gameObjects.delete(explosion)
          })
        })

        bullet.on('destroyed', () => {
          this.gameObjects.delete(bullet)
        })
      })

      enemyTank.on('explode', explosion => {
        this.gameObjects.add(explosion)

        explosion.on('destroyed', () => {
          this.gameObjects.delete(explosion)
        })
      })

      enemyTank.on('destroyed', () => {
        this.playerTank.getScore()[enemyTank.type] += 1
        this.removeTank(enemyTank)

        if (this.enemyTankCount < 1) {
          this.emit('killAll')
        }
      })
    })

    this.playerTank.on('destroyed', (tank: PlayerTank) => {
      this.gameObjects.delete(tank)
      //if (player.health === 0)
      this.emit('gameOver')
    })

    this.playerTank.on('fire', bullet => {
      this.gameObjects.add(bullet)

      bullet.on('explode', (explosion: Explosion) => {
        this.gameObjects.add(explosion)

        explosion.on('destroyed', () => {
          this.gameObjects.delete(explosion)
        })
      })

      bullet.on('destroyed', () => {
        console.log('desctoy player bullet')
        this.gameObjects.delete(bullet)
      })
    })
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

  public get getEnemies(): EnemyTank[] {
    return this.enemies
  }

  public update(stage: Omit<UpdateState, 'world'>): void {
    const objectsArr: UnknownGameObject[] = [...this.gameObjects]
    const { input, frameDelta } = stage

    if (this.enemyTankCount < 4) {
      this.addEnemyTank(frameDelta)
    }

    objectsArr
      .filter(obj => obj !== undefined && 'update' in obj)
      .map(obj => obj as IUpdatable)
      .forEach((object: IUpdatable) => {
        object.update({ input, frameDelta, world: this })
      })
  }

  public isOutOfBounds(gameObject: GameObject): boolean {
    return (
      gameObject.top < this.top ||
      gameObject.right > this.right ||
      gameObject.bottom > this.bottom ||
      gameObject.left < this.left
    )
  }

  public hasCollision(gameObject: GameObject) {
    const collision = this.getCollision(gameObject)
    return Boolean(collision)
  }

  public getCollision(gameObject: GameObject) {
    const collisionObjects = this.getCollisionObjects(gameObject)
    if (collisionObjects.size > 0) {
      return { objects: collisionObjects }
    }
  }

  private getCollisionObjects(gameObject: GameObject) {
    const objects = new Set<UnknownGameObject>()

    this.gameObjects.forEach(other => {
      if (other !== gameObject && this.haveCollision(gameObject, other)) {
        objects.add(other)
      }
    })
    return objects
  }

  private haveCollision(gameObject: GameObject, other: GameObject) {
    if (gameObject) {
      if (
        gameObject.objectType === 'enemyTank' &&
        other.objectType === 'playerTank'
      ) {
        if (
          gameObject.left < other.right &&
          gameObject.right > other.left &&
          gameObject.top < other.bottom &&
          gameObject.bottom > other.top
        ) {
          if (
            Math.abs(other.left - gameObject.left) < 30 ||
            Math.abs(other.right - gameObject.right) < 30 ||
            Math.abs(other.top - gameObject.top) < 30 ||
            Math.abs(other.bottom - gameObject.bottom) < 30
          ) {
            return false
          } else {
            return true
          }
        }
      }
      return (
        gameObject.left < other.right &&
        gameObject.right > other.left &&
        gameObject.top < other.bottom &&
        gameObject.bottom > other.top
      )
    } else {
      return false
    }
  }

  private removeTank(enemyTank: Tank) {
    this.gameObjects.delete(enemyTank)
    this.enemyTankCount -= 1
  }

  private addEnemyTank(frameDelta: number) {
    this.enemyTankTimer += frameDelta
    if (this.enemyTankTimer > 1000 && this.enemyTankCount < 4) {
      const enemyTank = this.enemies.shift()
      if (!enemyTank) {
        return
      }
      enemyTank.setPosition(this.enemyTankPositionIndex)

      this.enemyTankPositionIndex = (this.enemyTankPositionIndex + 1) % 3
      this.enemyTankCount += 1
      this.enemyTankTimer = 0
      this.gameObjects.add(enemyTank)
    }
  }
}
