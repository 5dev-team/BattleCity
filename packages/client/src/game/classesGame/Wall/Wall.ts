import { IWallConstructor } from './types'
import GameObject from '../GameObject/GameObject'


export default class Wall extends GameObject {
  public type: number


  constructor({ type, ...rest }: IWallConstructor) {
    super(rest)
    this.type = type
  }

  get sprite() {
    return this.sprites[0]
  }
}
