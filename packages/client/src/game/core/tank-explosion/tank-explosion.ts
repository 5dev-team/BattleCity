import Explosion from '@/game/core/explosion/explosion'
import { GameObjectArgs } from '@/game/core/types'
import {
  TANK_EXPLOSION_ANIMATION_SPEED,
  TANK_EXPLOSION_HEIGHT,
  TANK_EXPLOSION_SPRITES,
  TANK_EXPLOSION_WIDTH
} from '@/game/helpers/constants'

export default class TankExplosion extends Explosion {
  constructor(args: Pick<GameObjectArgs, 'x' | 'y'>) {
    super({
      ...args,
      sprites: TANK_EXPLOSION_SPRITES,
      width: TANK_EXPLOSION_WIDTH,
      height: TANK_EXPLOSION_HEIGHT,
      animationSpeed: TANK_EXPLOSION_ANIMATION_SPEED
    })
  }
  
}
