import Base from '@/game/core/base/base'
import PlayerTank from '@/game/core/player-tank/player-tank'
import BrickWall from '@/game/core/brick-wall/brick-wall'
import SteelWall from '@/game/core/steel-wall/steel-wall'
import Explosion from '@/game/core/explosion/explosion'
import Bullet from '@/game/core/bullet/bullet'
import EnemyTank from '@/game/core/enemy-tank/enemy-tank'

export type TObjects =
  | Base
  | PlayerTank
  | EnemyTank
  | BrickWall
  | SteelWall
  | Explosion
  | Bullet
  | undefined

export interface IStageConstructor {
  stage: number[][]
  enemies: number[]
}
