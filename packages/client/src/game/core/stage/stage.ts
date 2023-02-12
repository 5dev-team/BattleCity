import BrickWall from '@/game/core/brick-wall/brick-wall'
import SteelWall from '@/game/core/steel-wall/steel-wall'
import Base from '@/game/core/base/base'
import Tank from '@/game/core/tank/tank'
import Wall from '@/game/core/wall/wall'
import Bullet from '@/game/core/bullet/bullet'
import { GameObjectType, IUpdatable, UpdateState, Vec2 } from '@/game/core/types'
import { IStageConstructor, UnknownGameObject } from '@/game/core/stage/types'
import { BASE_POSITION, STAGE_SIZE, TILE_SIZE } from '@/game/helpers/constants'
import EventBus from '@/game/core/event-bus/event-bus'
import Explosion from '@/game/core/explosion/explosion'
import GameObject from '@/game/core/game-object/game-object'
import PlayerTank from '@/game/core/player-tank/player-tank'
import EnemyTank from '@/game/core/enemy-tank/enemy-tank'
import GameOverAnimation from '@/game/core/animations/gameover-animation'

export default class Stage extends EventBus {
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
  private readonly base: Base
  private readonly terrain: Wall[]
  private enemyTankCount: number
  private enemyTankTimer: number
  private enemyTankStartPosition: number
  private enemyTankPositionIndex: number
  private gameOverAnimation: GameOverAnimation | null
  private pause: boolean

  public stageIndex: number
  public readonly gameObjects: Set<UnknownGameObject>

  constructor(
    data: IStageConstructor,
    stageIndex: number
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
    this.gameOverAnimation = null
    this.pause = false
    
    this.gameObjects = new Set<UnknownGameObject>([this.base, this.playerTank, ...this.terrain])
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
    this.on('worldInitialized', world => {
      world.playerTank.animateInitAnimation()
    })
    
    this.on('gameOverAnimation', () => {
      this.pause = true
      this.gameOverAnimation = new GameOverAnimation({pos: new Vec2(BASE_POSITION[0] - 16, BASE_POSITION[1]) })
      //TODO: fix it
      //@ts-ignore
      this.gameObjects.add(this.gameOverAnimation)
      
      this.gameOverAnimation.on('destroyed', () => {
        //TODO: fix it
        //@ts-ignore
        this.gameObjects.delete(this.gameOverAnimation)
        this.emit('gameOver')
      })
    })
    
    this.on('killAll', () => {
      this.emit('gameOver')
    })

    this.base.on('destroyed', () => {
      this.emit('gameOverAnimation')
    })

    this.terrain.forEach(wall => {
      if (wall) {
        wall.on('destroyed', () => this.gameObjects.delete(wall))
      }
    })

    this.enemies.forEach(enemyTank => {
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
      if (this.playerTank.getLives() > 0) {
      this.playerTank.reborn()
      } else {
        this.gameObjects.delete(tank)
        this.emit('gameOverAnimation')
      }

    })
  
    this.playerTank.on('reborn', (rebornAnimation) => {
      this.gameObjects.add(rebornAnimation)
  
      rebornAnimation.on('destroyed', () => {
        this.gameObjects.delete(rebornAnimation)
        this.playerTank.removeRebornAnimation()
        this.playerTank.turnOffIDDQD()
      })
    })
    
    this.playerTank.on('initTank', (initAnimation) => {
      console.log(123123)
      this.gameObjects.add(initAnimation)
  
      initAnimation.on('destroyed', () => {
        this.gameObjects.delete(initAnimation)
        this.playerTank.play()
      })
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
    if (this.pause) {
      objectsArr
      .filter(obj => {
        return [GameObjectType.Animation, GameObjectType.Explosion].includes((obj as unknown as GameObject).gameObjectType)
      })
      .map(obj => obj as IUpdatable)
      .forEach((object: IUpdatable) => {
        object.update({ input, frameDelta, world: this })
      })
      return
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
