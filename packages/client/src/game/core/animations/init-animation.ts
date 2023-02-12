import { GameObjectArgs } from '@/game/core/types'
import Animation from '@/game/core/animations/animation'
import {
  INIT_TANK_ANIMATION_HEIGHT, INIT_TANK_ANIMATION_SPEED,
  INIT_TANK_ANIMATION_SPRITES,
  INIT_TANK_ANIMATION_WIDTH
} from '@/game/helpers/constants'
export default class InitAnimation extends Animation {
  constructor(args: Pick<GameObjectArgs, 'pos'>) {
    super({
      pos: args.pos,
      width: INIT_TANK_ANIMATION_WIDTH,
      height: INIT_TANK_ANIMATION_HEIGHT,
      sprites: INIT_TANK_ANIMATION_SPRITES,
    }, INIT_TANK_ANIMATION_SPEED)
  }
  
}
