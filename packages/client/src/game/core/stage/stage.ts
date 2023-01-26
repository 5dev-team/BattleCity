import BrickWall from '@/game/core/brick-wall/brick-wall'
import SteelWall from '@/game/core/steel-wall/steel-wall'
import Base from '@/game/core/base/base'
import PlayerTank from '@/game/core/player-tank/player-tank'
import Wall from '@/game/core/wall/Wall'
import Bullet from '@/game/core/bullet/bullet'
import { IUpdatable, UpdateState } from '@/game/core/types'
import { IStageConstructor, TObjects } from '@/game/core/stage/types'
import { STAGE_SIZE, TILE_SIZE } from '@/game/helpers/constants'
import EnemyTank from '@/game/core/enemy-tank/enemy-tank'
import EventBus from '@/game/core/event-bus/event-bus'

export default class Stage extends EventBus {
  static TerrainType = {
    BRICK_WALL: 1,
    STEEL_WALL: 2,
    TREE: 3,
    WATER: 4,
    ICE: 5
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
  
  
  static createObject(type: number, x: number, y: number): Wall | undefined {
    let wall: Wall | undefined = undefined
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
          
          objects.push(object)
        }
      }
    }
    return objects
  }
  
  static createEnemies(types: number[]): EnemyTank[] {
    return types.map(type => new EnemyTank({ type }))
  }
  
  public readonly objects: Set<TObjects>
  
  constructor(data: IStageConstructor, stageIndex: number) {
    super()
    //TODO add 2 players: (1 - 1) and (2 - 1)
    this.respawn = (190 - stageIndex * 4 - (1 - 1) * 20) * 60
    this.enemies = Stage.createEnemies(data.enemies)
    this.playerTank = new PlayerTank({})
    this.base = new Base({})
    this.terrain = Stage.createTerrain(data.stage)
    this.enemyTankCount = 0
    this.enemyTankTimer = 0
    this.enemyTankStartPosition = 0
    this.enemyTankPositionIndex = 0
    
    this.objects = new Set([
      this.base,
      this.playerTank,
      ...this.terrain
    
    ])
    this.initListeners()
    
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
      enemyTank.on('fire', bullet => {
        this.objects.add(bullet)
        bullet.on('explode', explosion => {
          this.objects.add(explosion)

          explosion.on('destroyed', () => {
            this.objects.delete(explosion)
          })
        })
        
        bullet.on('destroyed', () => {
          this.objects.delete(bullet)

        })
      })
      
      enemyTank.on('explode', explosion => {
        this.objects.add(explosion)
        
        explosion.on('destroyed', () => {
          this.objects.delete(explosion)
        })
      })
      
      enemyTank.on('destroyed', () => {
        this.playerTank.getScore()[enemyTank.type] += 1
        this.removeEnemyTank(enemyTank)

        if (this.enemyTankCount < 1) {
          this.emit('killAll')
        }
      })
      
      this.playerTank.on('fire', bullet => {
        this.objects.add(bullet)
        
        bullet.on('explode', explosion => {
          this.objects.add(explosion)

          explosion.on('destroyed', () => {
            this.objects.delete(explosion)
          })
        })
        
        bullet.on('destroyed', () => {
          this.objects.delete(bullet)
        })
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
  
  public update(stage: Omit<UpdateState, 'world'>): void {
    const objectsArr: TObjects[] = [...this.objects]
    const { input, frameDelta } = stage
    
    if (this.enemyTankCount < 4) {
      
      this.addEnemyTank(frameDelta)
    }
    
    const state = {
      input,
      frameDelta,
      world: this
    }
    
    objectsArr
    .filter(obj => obj !== undefined && 'update' in obj)
    .map(obj => obj as IUpdatable)
    .forEach((object: IUpdatable) => {
      object.update(state)
    })
  }
  
  public isOutOfBounds(object: PlayerTank | EnemyTank | Bullet): boolean {
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
      if (a.objectType === 'enemyTank' && b.objectType === 'playerTank') {
        if (        a.left < b.right &&
          a.right > b.left &&
          a.top < b.bottom &&
          a.bottom > b.top) {
           if (
             Math.abs(b.left - a.left) < 30 ||
             Math.abs(b.right - a.right) < 30 ||
             Math.abs(b.top - a.top) < 30 ||
             Math.abs(b.bottom - a.bottom) < 30
           ) {
             return false
           } else {
             return true
           }

        }

      }
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
  
  private removeEnemyTank(enemyTank: EnemyTank) {
    this.objects.delete(enemyTank)
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
      this.objects.add(enemyTank)
    }
  }
}
