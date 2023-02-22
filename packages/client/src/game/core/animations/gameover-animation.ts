import { GameObjectArgs, UpdateState } from '@/game/core/types'
import GameAnimation from '@/game/core/animations/game-animation'
import {
  GAME_OVER_ANIMATION_HEIGHT, GAME_OVER_ANIMATION_SPRITES,
  GAME_OVER_ANIMATION_WIDTH, HALF_CANVAS_HEIGHT
} from '@/game/helpers/constants'

export default class GameOverAnimation extends GameAnimation {
  constructor(args: Pick<GameObjectArgs, 'pos'>) {
    super({
      pos: args.pos,
      width: GAME_OVER_ANIMATION_WIDTH,
      height: GAME_OVER_ANIMATION_HEIGHT,
      sprites: GAME_OVER_ANIMATION_SPRITES
    }, 0)
  }
  
  
  public update(state: Partial<UpdateState>) {
    const { frameDelta } = state
    if (frameDelta && this.pos.y >= HALF_CANVAS_HEIGHT) {
      this.animate(frameDelta)
    } else {
      this.destroy()
    }
    
  }
  
  public animate(frameDelta: number) {
    this.frames += frameDelta
    if (this.frames > this.speed) {
      this.pos.y = this.pos.y - 2
      this.frames = 0
    }
  }
  
}
