import { ISprite } from '@/game/core/sprite/types'
import { IObjectOfWorld } from '@/game/core/view/types'
import Stage from '@/game/core/stage/stage'
import { NUMBER_OF_UNITS, TILE_SIZE, UNIT_SIZE } from '@/game/helpers/constants'

export default class View {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private sprite: ISprite
  private readonly ctx: CanvasRenderingContext2D | null

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
    if (typeof stage === 'object') {
      this.renderObjects(stage)
    }
    // this.renderGrid() // отрисовка сетки
  }

  public renderObjects(objects: Stage): void {
    if (objects) {
      for (const object of objects.objects) {
        if (object) {
          const { width, height, sprite }: IObjectOfWorld = object
          if (!sprite) return

          const [sp1, sp2, sp3, sp4]: number[] = sprite
          this.context.drawImage(
            this.sprite.image,
            sp1,
            sp2,
            sp3,
            sp4,
            object.left,
            object.top,
            width,
            height
          )
          // Включение дебага НЕ УДАЛЯТЬ! stage.getCollision
          // if (object.debug) {
          //debug border object
          // this.context.strokeStyle = '#fafafa'
          // this.context.lineWidth = 2
          // this.context.strokeRect(
          //   object.left + 1,
          //   object.top + 1,
          //   width - 2,
          //   height - 2
          // )

          //debug object info
          // if (object.objectType === 'enemyTank') {
          //   let i = 0
          //   const text = Object.entries(object).map(([key, value], index) => {
          //     if (
          //       key !== 'events' &&
          //       key !== 'sprites' &&
          //       key !== 'frames' &&
          //       key !== 'eventBus' &&
          //       key !== 'name'
          //     ) {
          //       i++
          //       this.context.font = '12px roboto'
          //       this.context.shadowColor = 'black'
          //       this.context.shadowBlur = 7
          //       this.context.strokeText(
          //         `${key}: ${value}`,
          //         object.right,
          //         object.top + i * 12
          //       )
          //       this.context.shadowBlur = 0
          //       this.context.fillStyle = '#5bff18'
          //       this.context.fillText(
          //         `${key}: ${value}`,
          //         object.right,
          //         object.top + i * 12
          //       )
          //     }
          //   })
          // }
        }

        // if (object?.debug && object?.id) {
        //   this.context.font = "10px Arial"
        //   this.context.fillStyle = "#00F"
        //   this.context.fillText(`${object.id}`, object.left, object.top)
        // }
      }
    }
  }

  private renderGrid(): void {
    for (let y = 0; y < NUMBER_OF_UNITS; y++) {
      for (let x = 0; x < NUMBER_OF_UNITS; x++) {
        this.context.strokeStyle = '#ffffff'
        this.context.lineWidth = 0.2
        this.context.strokeRect(
          x * UNIT_SIZE + 1,
          y * UNIT_SIZE + 1,
          UNIT_SIZE - 2,
          UNIT_SIZE - 2
        )
      }
    }

    for (let y = 0; y < NUMBER_OF_UNITS * 2; y++) {
      for (let x = 0; x < NUMBER_OF_UNITS * 2; x++) {
        this.context.strokeStyle = '#ffffff'
        this.context.lineWidth = 0.1
        this.context.strokeRect(
          x * TILE_SIZE + 1,
          y * TILE_SIZE + 1,
          TILE_SIZE - 2,
          TILE_SIZE - 2
        )
      }
    }
  }

  public clearScreen(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
