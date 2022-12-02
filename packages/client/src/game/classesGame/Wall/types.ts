import { IGameObjectConstructor } from '../GameObject/types'
import { TSprites } from '../../helpersGame/types'

export interface IWallConstructor extends IGameObjectConstructor{
  type: string | undefined
  sprites: TSprites;
}


