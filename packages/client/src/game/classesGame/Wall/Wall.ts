import { IWallConstructor } from './types'
import GameObject from '../GameObject/GameObject'
import { TILE_SIZE } from '../../helpersGame/constants'
import { IGameObjectConstructor } from '../GameObject/types'


export default class Wall extends GameObject {
  public width: number;
  public height: number;
  public damage: number;
  public type: string | undefined
  constructor({ type, ...rest }: IWallConstructor) {
    super(rest);
    this.width = TILE_SIZE;
    this.height = TILE_SIZE;
    this.damage = 0;
    this.type = type;
  }

  get sprite() {
    return this.sprites[this.damage];
  }
}
