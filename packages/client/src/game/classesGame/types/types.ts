interface ICommon {
  x: number;
  y: number;
  width: number;
  height: number;
}

type framesSprite = [number, number, number, number][]

export interface ITankConstructor extends ICommon {
  direction: number;
  speed: number;
  frames: framesSprite;
}


export interface IWallConstructor extends ICommon {
  sprite: number;
}

export interface Iobject {
  top: number;
  right: number;
  bottom: number;
  left: number
}

export interface ICollisionObject extends ICommon {
  debug: boolean,
  sprite: number,
  bottom: number,
  left: number,
  right: number
}

export interface ISet<T> {
  add(value: T): this;

  clear(): void;

  delete(value: T): boolean;

  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: unknown): void;

  has(value: T): boolean;

  readonly size: number;
}


export interface IGame {
  init(): void;

  start(): void;

  loop(): void;
}

export interface ISprite {
  image: HTMLImageElement;
  src: string;
  map: IObjectDefaultSprite;

  load(): Promise<unknown>;

  set(id: number, { x, y, width, height }: { x: string, y: string, width: number, height: number }): unknown;

  get(id: number): [number, number, number, number];
}

export interface IView {
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;
  readonly sprite: ISprite;
  ctx: CanvasRenderingContext2D | null;

  init(): void;

  update(world: IWorld): void;

  renderPlayer1Tank(player1Tank: ITank): void;

  clearScreen(): void;
}

export interface IWall {
  x: number;
  y: number;
  width: number;
  height: number;
  sprite: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}


export type defaultLevel = number[][]
export type allLevel = number[][][]
export type worldLevel = Array<Array<null | IWall>>;

export interface IWorld {
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
  readonly size: number;
  readonly height: number;
  readonly width: number;
  level: worldLevel;
  player1Tank: ITank;
  player2Tank: unknown;
  enemyTanks: Array<[]>;


update(activeKeys: { has(value: string): boolean; }): unknown;

  objectOnPath: unknown;

  getCollision(object: ITank): Collision;

  getCollisionObject(object: Iobject): IWall | undefined;

  hasCollision(object: Iobject): boolean;

  isOutOfBounds(object: Iobject): boolean;

  setLevel(data: defaultLevel): void;
}
export type Collision = { object: IWall | undefined, delta: undefined | number}
export interface ITank {
  direction: number
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
  readonly sprite: number[];
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
  readonly speed: number
  readonly frames: [number, number, number, number][]
  readonly animationFrame: number

  update(world: IWorld, activeKeys: { has(value: string): boolean; }): void;

}

export interface IGameConstructor {
  world: IWorld;
  view: IView;
  levels: allLevel;
}

type positionSprite = number[];

export interface IObjectDefaultSprite {
  0: positionSprite;
  1: positionSprite;
  2: positionSprite;
  3: positionSprite;
  4: positionSprite;
  5: positionSprite;
  10: positionSprite;
  11: positionSprite;
  12: positionSprite;
  13: positionSprite;
  14: positionSprite;
  15: positionSprite;
  16: positionSprite;
  17: positionSprite;
  18: positionSprite
}
