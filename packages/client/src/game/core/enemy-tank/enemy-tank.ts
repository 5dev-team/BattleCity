import Input from '@/game/core/input/input'
import Stage from '@/game/core/stage/stage'
import Tank from '@/game/core/tank/tank'
import {
  ENEMY_TANK_SPRITES,
  ENEMY_TANK_START_POSITIONS,
  TANK_SPEED,
} from '@/game/helpers/constants'

export default class EnemyTank extends Tank {
  static createRandom() {
    const random = Math.floor(Math.random() * 3)
    const [x, y] = ENEMY_TANK_START_POSITIONS[random]
    const sprites = ENEMY_TANK_SPRITES[random]
    return new EnemyTank({ x, y, sprites })
  }

  protected speed: number
  public direction: number

  constructor(args: any) {
    super(args)

    this.direction = Tank.Direction.DOWN
    this.speed = TANK_SPEED
  }

  update({
    world,
    input,
    frameDelta,
  }: {
    world: Stage
    input: Input
    frameDelta: number
  }): void {
    return
  }
}
