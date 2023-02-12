import { GameObjectArgs, Vec2 } from '@/game/core/types'
import {
  PLAYER_REBORN_ANIMATION_SPEED,
  PLAYER_REBORN_HEIGHT,
  PLAYER_REBORN_SPRITES,
  PLAYER_REBORN_WIDTH
} from '@/game/helpers/constants'
import Animation from '@/game/core/animations/animation'
export default class PlayerReborn extends Animation {
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
