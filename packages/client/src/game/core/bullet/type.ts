import { Sprites } from '@/game/helpers/types'
import Tank from '@/game/core/tank/tank'

export interface IProjectile {
  tank: Tank;
  x: number;
  y: number;
  width: number;
  height: number;
  sprites: Sprites;
  direction: number;
  speed: number;
}
