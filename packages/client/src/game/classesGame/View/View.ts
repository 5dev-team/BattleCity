import { ITank } from '../Tanks/types'
import { IBase } from '../Base/types'
import { ISprite } from '../Sprite/types'
import { IView, iObjectOfWorld } from './types'
import { NUMBER_OF_UNITS, TILE_SIZE, UNIT_SIZE } from '../../helpersGame/constants'
import Sprite from '../Sprite/Sprite'

export default class View implements IView {
  public canvas: HTMLCanvasElement
  public context: CanvasRenderingContext2D
  public sprite: ISprite
  public ctx: CanvasRenderingContext2D | null

  constructor(canvas: HTMLCanvasElement, sprite: ISprite) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    if (!this.ctx || !(this.ctx instanceof CanvasRenderingContext2D)) {
      throw new Error('Failed to get 2D context')
    }
    this.context = this.ctx
    this.context.imageSmoothingEnabled = false
    this.context.setTransform(1.54, 0, 0, 1.54, 0, 0)
    this.sprite = sprite
  }

  async init(): Promise<void> {
    await this.sprite.load()
  }

  public update(world: any): void {
    this.clearScreen()
    this.renderObjects(world.objects)
    this.renderGrid()
  };


  public renderObjects(objects: (IBase | any | ITank)[]): void {
    for (const object of objects) {
      const { x, y, width, height, sprite }: iObjectOfWorld = object

      this.context.drawImage(
        this.sprite.image,
        ...sprite,
        x, y, width, height
      )

      if (object.debug) {
        this.context.strokeStyle = '#ff0000'
        this.context.lineWidth = 2
        this.context.strokeRect(x + 1, y + 1, width - 2, height - 2)
        object.debug = false
      }
    }
  }

  private renderGrid() {
    for (let y = 0; y < NUMBER_OF_UNITS; y++) {
      for (let x = 0; x < NUMBER_OF_UNITS; x++) {
        this.context.strokeStyle = '#ffffff'
        this.context.lineWidth = .2
        this.context.strokeRect(x * UNIT_SIZE + 1, y * UNIT_SIZE + 1, UNIT_SIZE - 2, UNIT_SIZE - 2)
      }
    }

    for (let y = 0; y < NUMBER_OF_UNITS * 2; y++) {
      for (let x = 0; x < NUMBER_OF_UNITS * 2; x++) {
        this.context.strokeStyle = '#ffffff'
        this.context.lineWidth = .1
        this.context.strokeRect(x * TILE_SIZE + 1, y * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2)
      }
    }
  }


  public renderPlayer1Tank(player1Tank: ITank): void {
    const [x, y, width, height]: number[] = player1Tank.sprite

    this.context.drawImage(
      this.sprite.image,
      x, y, width, height,
      player1Tank.x, player1Tank.y, width, height)
  };

  public clearScreen(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
