import { TSprites } from '../../helpersGame/types'

export interface IBaseConstructor {
  x: number;
  y: number;
  width: number;
  height: number;
  sprites: TSprites;
  destroyed: boolean
}
