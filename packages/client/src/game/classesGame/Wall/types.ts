import { IGameObject, IGameObjectConstructor } from '../GameObject/types'
import { TSprites } from '../../helpersGame/types'

export interface IWallConstructor extends IGameObjectConstructor{
  type: number
  sprites: TSprites;
}

export interface IWall extends IGameObject{
  type: number;
  readonly sprite: number[]
}
