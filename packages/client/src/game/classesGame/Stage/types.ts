import Base from '@/game/classesGame/Base/Base'
import PlayerTank from '@/game/classesGame/PlayerTank/PlayerTank'
import BrickWall from '@/game/classesGame/BrickWall/BrickWall'
import SteelWall from '@/game/classesGame/SteelWall/SteelWall'
import Explosion from '@/game/classesGame/Explosion/Explosion'
import Bullet from '@/game/classesGame/Bullet/Bullet'

export type TObjects = (Base | PlayerTank | BrickWall | SteelWall | Explosion | Bullet | undefined)

export interface IStageConstructor {
  stage: number[][],
  tanks: number[];
}


