import { IGameObject, IGameObjectConstructor } from '../GameObject/types'

export interface ITank extends IGameObject {
  direction: number
  speed: number
  sprite: number[];

  update(world: any, activeKeys: { has(value: string): boolean; }): void;
}

export interface ITankConstructor extends IGameObjectConstructor {
  speed: number;
  direction: number;
}
