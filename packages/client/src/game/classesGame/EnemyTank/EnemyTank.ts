import { ENEMY_TANK_START_POSITIONS, ENEMY_TANK_SPRITES, TANK_SPEED } from '../../helpersGame/constants'

import Tank from '../Tank/Tank'
import Input from '../Input/Input'
import Stage from '../Stage/Stage'

export default class EnemyTank extends Tank {
  static createRandom() {
    const random = Math.floor(Math.random() * 3)
    const [x, y] = ENEMY_TANK_START_POSITIONS[random]
    const sprites = ENEMY_TANK_SPRITES[random]
    return new EnemyTank({ x, y, sprites })
  }

  public speed: number
  public direction: number

  constructor(args: any) {
    super(args)

    this.direction = Tank.Direction.DOWN
    this.speed = TANK_SPEED
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  update({ world, input, frameDelta }: { world: Stage, input: Input, frameDelta: number }): void {
    return
  }
}
