import { TSprites } from '@/game/helpersGame/types'
import Tank from '@/game/classesGame/Tank/Tank'


export interface IProjectile {
  tank: Tank;
  x: number;
  y: number;
  width: number;
  height: number;
  sprites: TSprites;
  direction: number;
  speed: number;
}

