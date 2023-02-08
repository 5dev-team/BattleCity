import Input from '@/game/core/input/input'
import Stage from '@/game/core/stage/stage'
import Tank from '@/game/core/tank/tank'
import {
  ENEMY_TANK_SPRITES,
  ENEMY_TANK_START_POSITIONS,
} from '@/game/helpers/constants'
import { IUpdatable, UpdateState, Vec2 } from '../types'

export default class EnemyTank extends Tank {
  static createRandom() {
    const random = Math.floor(Math.random() * 3)
    const [x, y] = ENEMY_TANK_START_POSITIONS[random]
    const sprites = ENEMY_TANK_SPRITES[random]
    return new EnemyTank(new Vec2(x, y), sprites)
  }

  update({
    world,
    input,
    frameDelta,
  }: UpdateState): void {
    return
  }
}
