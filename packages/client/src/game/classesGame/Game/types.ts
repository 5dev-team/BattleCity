
export interface IGame {
  readonly world: any
  readonly view: any
  readonly levels: any
  readonly isMoving: boolean
  readonly activeKeys: ISet<string>
  readonly level: number
  readonly stages: any
  readonly stage: number

  init(): void;

  start(): void;

  loop(): void;
}

//

export interface ISet<T> {
  add(value: T): this;

  clear(): void;

  delete(value: T): boolean;

  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: unknown): void;

  has(value: T): boolean;

  readonly size: number;
}

export interface IGameConstructor {
  world: any,
  view: any,
  levels: any
}
