import GameObject from '../GameObject/GameObject'
import { IBaseConstructor } from './types'

export default class Base extends GameObject {
  public destroyed: boolean

  constructor(args: IBaseConstructor) {
    super(args)
    this.destroyed = false
  }

  get sprite(): number[] {
    return this.sprites[Number(this.destroyed)]
  }
}
