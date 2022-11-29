import World from '../World/World'
import { Level } from '../../helpersGame/levels'
import View from '../View/View'

export interface ISet<T> {
  add(value: T): this;

  clear(): void;

  delete(value: T): boolean;

  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: unknown): void;

  has(value: T): boolean;

  readonly size: number;
}

export interface IGameConstructor {
  world: World,
  view: View,
  levels: Level[]
}
