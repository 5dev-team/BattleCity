import { IWallConstructor, IWall } from './types'
import GameObject from '../GameObject/GameObject'


export default class Wall extends GameObject implements IWall{
  public type: number
  constructor({ type, ...rest }: IWallConstructor) {
    super(rest)
    this.type = type
  }

  get sprite() {
    return this.sprites[0]
  }
}
