import Explosion from '@/game/core/explosion/explosion'
import { GameObjectArgs } from '@/game/core/types'
import {
  BULLET_EXPLOSION_ANIMATION_SPEED,
  BULLET_EXPLOSION_HEIGHT,
  BULLET_EXPLOSION_SPRITES, BULLET_EXPLOSION_WIDTH
} from '@/game/helpers/constants'

export default class BulletExplosion extends Explosion {
  constructor(args: Pick<GameObjectArgs, 'x' | 'y'>) {
    super({
      ...args,
      width: BULLET_EXPLOSION_WIDTH,
      height: BULLET_EXPLOSION_HEIGHT,
      sprites: BULLET_EXPLOSION_SPRITES,
      animationSpeed: BULLET_EXPLOSION_ANIMATION_SPEED,
    })
  }
}
