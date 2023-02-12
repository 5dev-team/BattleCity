import BrickWall from '@/game/core/brick-wall/brick-wall'
import SteelWall from '@/game/core/steel-wall/steel-wall'
import Base from '@/game/core/base/base'
import Tank from '@/game/core/tank/tank'
import Wall from '@/game/core/wall/wall'
import Bullet from '@/game/core/bullet/bullet'
import { IRect, IUpdatable, UpdateState, Vec2 } from '@/game/core/types'
import { IStageConstructor } from '@/game/core/stage/types'
import {
  BASE_POSITION,
  ENEMY_TANK_START_POSITIONS,
  STAGE_SIZE,
  TILE_SIZE,
} from '@/game/helpers/constants'
import EventBus from '@/game/core/event-bus/event-bus'
import Explosion from '@/game/core/explosion/explosion'
import GameObject from '@/game/core/game-object/game-object'
import PlayerTank from '@/game/core/player-tank/player-tank'
import EnemyTank from '@/game/core/enemy-tank/enemy-tank'
import GameOverAnimation from '@/game/core/animations/gameover-animation'
import PlayerShieldAnimation from '../animations/player-shield-animation'
import InitAnimation from '../animations/init-animation'

export default class Stage extends EventBus implements IRect {
  static TerrainType = {
    BRICK_WALL: 1,
    STEEL_WALL: 2,
    TREE: 3,
    WATER: 4,
    ICE: 5,
  }
  private respawn: number
  private readonly enemies: EnemyTank[]
  private readonly playerTank: PlayerTank
  private readonly tanks: Tank[]
  private readonly base: Base
  private readonly terrain: Wall[]
  private enemyTankCount: number
  private enemyTankTimer: number
  private enemyTankStartPosition: number
  private enemyTankPositionIndex: number
  private pause: boolean

  public stageIndex: number
  public readonly gameObjects: Set<GameObject>
  public readonly pos: Vec2 = Vec2.zero

  constructor(data: IStageConstructor, stageIndex: number) {
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
    this.pause = false

    this.tanks = [this.playerTank, ...this.enemies]
    this.gameObjects = new Set<GameObject>([this.base, ...this.terrain])

    this.initListeners()
    this.emit('worldInitialized', this)
  }

  static createObject(type: number, pos: Vec2): Wall | undefined {
    switch (type) {
      case Stage.TerrainType.BRICK_WALL:
        return new BrickWall({ pos }) as Wall
      case Stage.TerrainType.STEEL_WALL:
        return new SteelWall({ pos }) as Wall
    }
  }

  static createTerrain(level: number[][]): Wall[] {
    const objects = [] as Wall[]
    for (let i = 0; i < level.length; i++) {
      for (let j = 0; j < level.length; j++) {
        const value = level[j][i]

        if (value) {
          const object = Stage.createObject(
            value,
            new Vec2(i * TILE_SIZE, j * TILE_SIZE)
          )
          if (object) {
            objects.push(object)
          }
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
    this.on('worldInitialized', () => {
      this.playerTank.emit(
        'initTank',
        new InitAnimation({ pos: this.playerTank.pos })
      )
    })

    this.once('gameOverAnimation', () => {
      this.playerTank.stop()
      this.playerTank.turnOnIDDQD()
      this.pause = true
      const gameOverAnim = new GameOverAnimation({
        pos: new Vec2(BASE_POSITION[0] - 16, BASE_POSITION[1]),
      })
      this.gameObjects.add(gameOverAnim)

      gameOverAnim.on('destroyed', () => {
        this.gameObjects.delete(gameOverAnim)
        this.emit('gameOver')
      })
    })

    this.on('killAll', () => {
      this.emit('gameOver')
    })

    this.base.on('destroyed', () => {
      this.emit('gameOverAnimation')
    })

    this.terrain.forEach(wall =>
      wall.on('destroyed', () => this.gameObjects.delete(wall))
    )

    this.tanks.forEach(tank => {
      tank.on('fire', (bullet: Bullet) => {
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

      tank.on('explode', explosion => {
        this.gameObjects.add(explosion)

        explosion.on('destroyed', () => {
          this.gameObjects.delete(explosion)
        })
      })
    })

    this.enemies.forEach(enemyTank => {
      enemyTank.on('initTank', initAnimation => {
        this.gameObjects.add(initAnimation)
  
        initAnimation.on('destroyed', () => {
          this.gameObjects.delete(initAnimation)
          this.gameObjects.add(enemyTank)
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

    this.playerTank.on('initTank', initAnimation => {
      this.gameObjects.add(initAnimation)

      initAnimation.on('destroyed', () => {
        this.gameObjects.delete(initAnimation)
        this.gameObjects.add(this.playerTank)

        const shieldAnimation = new PlayerShieldAnimation({ pos: this.playerTank.pos })
        this.playerTank.emit('reborn', shieldAnimation)
      })
    })

    this.playerTank.on('destroyed', () => {
      this.gameObjects.delete(this.playerTank)
      if (this.playerTank.getLives() > 0) {
        this.playerTank.reborn()
        this.playerTank.emit(
          'initTank',
          new InitAnimation({ pos: this.playerTank.pos })
        )
      } else {
        this.emit('gameOverAnimation')
      }
    })

    this.playerTank.on('reborn', (rebornAnimation: PlayerShieldAnimation) => {
      this.gameObjects.add(rebornAnimation)
      this.playerTank.turnOnIDDQD()

      rebornAnimation.on('destroyed', () => {
        this.gameObjects.delete(rebornAnimation)
        this.playerTank.turnOffIDDQD()
      })
    })
  }

  public get center(): Vec2 {
    return Vec2.zero.add(STAGE_SIZE / 2)
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
    const objectsArr: GameObject[] = [...this.gameObjects]
    const { input, frameDelta } = stage

    if (this.enemyTankCount < 4) {
      this.addEnemyTank(frameDelta)
    }

    objectsArr
      .filter(obj => obj !== undefined && 'update' in obj)
      .map(obj => (obj as unknown) as IUpdatable)
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

  public getOutOfBoundsOffset(outerGameObject: GameObject): Vec2 {
    const offset = Vec2.zero

    if (outerGameObject.top < this.top)
      offset.y = this.top - outerGameObject.top
    if (outerGameObject.bottom > this.bottom)
      offset.y = this.bottom - outerGameObject.bottom
    if (outerGameObject.right > this.right)
      offset.x = this.right - outerGameObject.right
    if (outerGameObject.left < this.left)
      offset.x = this.left - outerGameObject.left

    return offset
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

      enemyTank.pos = new Vec2(
        ENEMY_TANK_START_POSITIONS[this.enemyTankPositionIndex][0],
        ENEMY_TANK_START_POSITIONS[this.enemyTankPositionIndex][1]
      )
      this.enemyTankPositionIndex = (this.enemyTankPositionIndex + 1) % 3
      this.enemyTankCount += 1
      this.enemyTankTimer = 0

      enemyTank.emit(
        'initTank',
        new InitAnimation({ pos: enemyTank.pos })
      )
    }
  }
}
