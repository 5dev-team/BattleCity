import Tank from '../Tanks/Tanks'
import { BASE_X, BASE_Y } from '../../helpersGame/constants'
import {
  BASE_SPRITES,
  Direction,
  PLAYER1_TANK_SPRITES,
  PLAYER1_TANK_START_X,
  PLAYER1_TANK_START_Y,
  TANK_HEIGHT,
  TANK_SPEED,
  TANK_WIDTH, UNIT_SIZE,
  WORLD_SIZE
} from '../../helpersGame/constants'
import Base from '../Base/Base'
import Stage from '../Stage/Stage'
import { Level } from '../../helpersGame/levels'
import Wall from '../Wall/Wall'
import Projectile from '../Projectile/Projectile'

export default class World {
  public stage: Stage | null
  public base: Base
  public player1Tank: Tank
  public player2Tank: null
  public enemyTanks: []
  public projectile: []
  constructor() {

    this.stage = null
    this.base = new Base({
      destroyed: false,
      x: BASE_X,
      y: BASE_Y,
      width: UNIT_SIZE,
      height: UNIT_SIZE,
      sprites: BASE_SPRITES
    })
    this.player1Tank = new Tank({
      x: PLAYER1_TANK_START_X,
      y: PLAYER1_TANK_START_Y,
      width: TANK_WIDTH,
      height: TANK_HEIGHT,
      sprites: PLAYER1_TANK_SPRITES,
      direction: Direction.UP,
      speed: TANK_SPEED
    })
    this.player2Tank = null
    this.enemyTanks = []
    this.projectile = []
  }


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


  get objects(): (Base | Tank | (0 | Wall | undefined) | Projectile)[] | undefined {
    if(this.stage){
      return [this.base, this.player1Tank, ...this.stage.objects, ...this.projectile]
    }
  }


  public update(activeKeys: { has(value: string): boolean; }, frameDelta: number) {
    //Polymorphism
    if(this.objects){
      this.objects.forEach((object: (Base | Tank | (0 | Wall | undefined) | Projectile)[] | undefined) => {
        if(object){
          return object.update(this, activeKeys, frameDelta)
        }
      })
    }
    // this.player1Tank.update(this, activeKeys, frameDelta)
    // if(this.projectile[0]){
    //   this.projectile[0].update(this, frameDelta)
    // }
  }


  public isOutOfBounds(object: Tank): boolean {
    return (
      object.top < this.top ||
      object.right > this.right ||
      object.bottom > this.bottom ||
      object.left < this.left
    )
  }

  setStage(level: Level): void {
    this.stage = new Stage(level)
  }

  public hasCollision(object: Tank): boolean {
    const collision = this.getCollision(object)
    return Boolean(collision)
  }


  public getCollision(object: Tank): { object: Wall | undefined | 0 } | undefined {
    const collisionObject: Wall | undefined | 0 = this.getCollisionObject(object)
    if (collisionObject) {
        // включение дебага
        // collisionObject.debug = false;
        //\@ts-ignore
      return { object: collisionObject }
    }
  }

  public getCollisionObject(object: Tank): Wall | undefined | 0 {
    if (this.stage) {
      return this.stage.objects
        .find(block => block && this.haveCollision(object, block))
    }
  }


  private haveCollision(a: Tank, b: Wall): boolean {
    return (
      a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
    )
  }
}

