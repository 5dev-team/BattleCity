import Base from '../Base/Base'
import PlayerTank from '../PlayerTank/PlayerTank'
import BrickWall from '../BrickWall/BrickWall'
import SteelWall from '../SteelWall/SteelWall'
import Explosion from '../Explosion/Explosion'
import Bullet from '../Bullet/Bullet'

export type TObjects = (Base | PlayerTank | BrickWall | SteelWall | Explosion | Bullet | undefined)

export interface IStageConsructor {
  stage: number[][],
  tanks: number[];
}


