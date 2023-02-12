import { GameObjectArgs, Vec2 } from '@/game/core/types'
import {
  PLAYER_SHIELD_ANIMATION_SPEED,
  PLAYER_SHIELD_HEIGHT,
  PLAYER_SHIELD_SPRITES,
  PLAYER_SHIELD_WIDTH,
} from '@/game/helpers/constants'
import GameAnimation from '@/game/core/animations/game-animation'
export default class PlayerShieldAnimation extends GameAnimation {
  constructor(args: Pick<GameObjectArgs, 'pos'>) {
    super(
      {
        pos: args.pos,
        width: PLAYER_SHIELD_WIDTH,
        height: PLAYER_SHIELD_HEIGHT,
        sprites: PLAYER_SHIELD_SPRITES,
      },
      PLAYER_SHIELD_ANIMATION_SPEED,
      6
    )
  }

  setPosition(pos: Pick<Vec2, 'x' | 'y'>) {
    this.pos.y = pos.y
    this.pos.x = pos.x
  }
}
