import { TSprites } from '../../helpersGame/types'

export interface IBase {
  readonly destroyed: boolean;
  readonly sprite: number[]
}

export interface IBaseConstructor {
  x: number;
  y: number;
  width: number;
  height: number;
  sprites: TSprites;
  destroyed: boolean
}
