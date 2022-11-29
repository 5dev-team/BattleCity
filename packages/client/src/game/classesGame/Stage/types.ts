import { IWall } from '../Wall/types'
export interface IStage {
  readonly objects: (0 | IWall | undefined)[];

}


export type createObjectArgs = {height: number, type: number, width: number, x: number, y: number}


