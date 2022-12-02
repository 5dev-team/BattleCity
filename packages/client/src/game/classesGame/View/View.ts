import { ISprite } from '../Sprite/types'
import { iObjectOfWorld } from './types'
import { NUMBER_OF_UNITS, TILE_SIZE, UNIT_SIZE } from '../../helpersGame/constants'
import Stage from '../Stage/Stage'
import { ISet } from '../Game/types'
import Base from '../Base/Base'
import PlayerTank from '../PlayerTank/PlayerTank'
import SteelWall from '../SteelWall/SteelWall'
import BrickWall from '../BrickWall/BrickWall'
import { TObjects } from '../Stage/types'


export default class View {
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

  public update(stage: number | Stage): void {
    this.clearScreen()
    if(typeof stage === 'object'){
      this.renderObjects(stage)
    }
    // this.renderGrid() // отрисовка сетки
  };


  public renderObjects(objects: any): void {
    if (objects) {
      for (const object of objects.objects) {
        if (object) {
          const { x, y, width, height, sprite }: iObjectOfWorld = object
          if (!sprite) return
          const [sp1, sp2, sp3, sp4]: number[] = sprite
          this.context.drawImage(
            this.sprite.image,
            sp1, sp2, sp3, sp4,
            x, y, width, height
          )
        }
        // Включение дебага НЕ УДАЛЯТЬ! stage.getCollision
        // if (object.debug) {
        //   this.context.strokeStyle = '#fafafa'
        //   this.context.lineWidth = 2
        //   this.context.strokeRect(x + 1, y + 1, width - 2, height - 2)
        //   object.debug = false
        // }
      }
    }

  }

  private renderGrid(): void {
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

  public clearScreen(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
