import Tank from '../Tanks/Tanks'
import { IWorld } from './types'
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
import { IBase } from '../Base/types'
import { ITank } from '../Tanks/types'


export default class World implements IWorld {
  public BASE_X: number
  public BASE_Y: number
  public stage: null | Stage;
  public base: IBase;
  public player1Tank: ITank;
  public player2Tank: null;
  public enemyTanks: null;

  constructor() {
    this.stage = null;
    this.base = new Base({
      destroyed: false,
      x: this.BASE_X,
      y: this.BASE_Y,
      width: UNIT_SIZE,
      height: UNIT_SIZE,
      sprites: BASE_SPRITES
    });
    this.player1Tank = new Tank({
      x: PLAYER1_TANK_START_X,
      y: PLAYER1_TANK_START_Y,
      width: TANK_WIDTH,
      height: TANK_HEIGHT,
      sprites: PLAYER1_TANK_SPRITES,
      rest: undefined,
      direction: Direction.UP,
      speed: TANK_SPEED
    });
    this.player2Tank = null;
    this.enemyTanks = [];
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

  get objects() {
    return [this.base, this.player1Tank, ...this.stage.objects];
  }


  public update(activeKeys: { has(value: string): boolean; }) {
    this.player1Tank.update(this, activeKeys);
  }


  public isOutOfBounds(object: Iobject): boolean {
    return (
      object.top < this.top ||
      object.right > this.right ||
      object.bottom > this.bottom ||
      object.left < this.left
    )
  }

  setStage(level: Level) {
    this.stage = new Stage(level);
  }

  public hasCollision(object: Tank): boolean {
    const collision = this.getCollision(object);
    return Boolean(collision);
  }



  public getCollision(object: ITank): { object: boolean } | undefined {
    const collisionObject : boolean  = this.getCollisionObject(object)
    if (collisionObject) {
      // collisionObject.debug = true;
      return { object: collisionObject };
    }

  }

  public getCollisionObject(object: ITank): boolean {
    return this.stage.objects
      .find(block => block && this.haveCollision(object, block));
  }



  private haveCollision(a: ITank, b: IWall): boolean {
    return (
      a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top
    );
  }
}

