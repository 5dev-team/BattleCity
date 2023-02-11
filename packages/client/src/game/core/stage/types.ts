import Base from '@/game/core/base/base'
import Explosion from '@/game/core/explosion/explosion'
import Bullet from '@/game/core/bullet/bullet'
import Tank from '@/game/core/tank/tank'
import Wall from '@/game/core/wall/wall'

export type UnknownGameObject =
  | Base
  | Tank
  | Wall
  | Explosion
  | Bullet

export interface IStageConstructor {
  stage: number[][]
  enemies: number[]
}
