import GameObject from '../GameObject/GameObject'
import { BASE_HEIGHT, BASE_POSITION, BASE_SPRITES, BASE_WIDTH } from '../../helpersGame/constants'
import { IGameObjectConstructor } from '../GameObject/types'

export default class Base extends GameObject {
  public destroyed: boolean

  constructor({ ...args }) {
    super(<IGameObjectConstructor>args)
    this.x = BASE_POSITION[0]  // стандартная позиция базы
    this.y = BASE_POSITION[1] // стандартная позиция базы
    this.width = BASE_WIDTH  // Ширина позиция базы
    this.height = BASE_HEIGHT // Высота позиции базы
    this.sprites = BASE_SPRITES // спрайты базы
    this.destroyed = false // isDestroyed? целая ли база?
  }

  get sprite(): number[] {
    return this.sprites[Number(this.destroyed)] // 0,1 разрушенный или целый в зависимости от damage
  }
}
