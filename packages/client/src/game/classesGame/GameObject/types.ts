import Input from '@/game/classesGame/Input/Input'
import Stage from '@/game/classesGame/Stage/Stage'
import Bullet from '@/game/classesGame/Bullet/Bullet'
import { TSprites } from '@/game/helpersGame/types'

export type GameObjectArgs = {
  x: number;
  y: number;
  width: number;
  height: number;
  sprites: TSprites;
}

export type UpdateState = { input: Input, frameDelta: number, world: Stage };

export interface IUpdatable {
  update(state: Partial<UpdateState>): void;
}


export interface IHitable {
  hit(bullet: Bullet): void
}
