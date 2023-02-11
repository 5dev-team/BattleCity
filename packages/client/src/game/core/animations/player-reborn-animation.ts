import { GameObjectArgs, Vec2 } from '@/game/core/types'
import {
  PLAYER_REBORN_ANIMATION_SPEED,
  PLAYER_REBORN_HEIGHT,
  PLAYER_REBORN_SPRITES,
  PLAYER_REBORN_WIDTH
} from '@/game/helpers/constants'
import GameAnimation from '@/game/core/animations/game-animation'
export default class PlayerRebornAnimation extends GameAnimation {
  constructor(args: Pick<GameObjectArgs, 'pos'>) {
    super({
      pos: args.pos,
      width: PLAYER_REBORN_WIDTH,
      height: PLAYER_REBORN_HEIGHT,
      sprites: PLAYER_REBORN_SPRITES,
    }, PLAYER_REBORN_ANIMATION_SPEED, 10)
  }
  
  
  setPosition(pos: Pick<Vec2, 'x' | 'y'>) {
    this.pos.y = pos.y
    this.pos.x =  pos.x
  }
}
