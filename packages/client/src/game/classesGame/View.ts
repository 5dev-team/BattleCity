import { worldLevel, IView, IWorld, IWall, ISprite, ITank } from './types/types'

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
    this.sprite = sprite
  }

  async init() {
    await this.sprite.load()
  }

  public update(world: IWorld): void {
    this.clearScreen()
    this.renderLevel(world.level)
    this.renderPlayer1Tank(world.player1Tank)
  };


  public renderLevel(level: worldLevel) {
    for (let i = 0; i < level.length; i++) {
      const countLevel: Array<null | IWall> = level[i]
      for (let j = 0; j < countLevel.length; j++) {
        const block: IWall | null = countLevel[j]
        if (block) {
          const [x, y, width, height] = this.sprite.get(block.sprite)
          this.context.drawImage(
            this.sprite.image,
            x, y, width, height,
            block.x, block.y, width, height
          )
        }

        // if (block.debug) {
        //     this.context.strokeStyle = '#ffffff';
        //     this.context.lineWidth = 1;
        //     this.context.strokeRect(Number(block.x + 1), Number(block.y + 1), block.width - 2, block.height - 2);
        //     block.debug = false;
        // }

      }
    }
  }


  public renderPlayer1Tank(player1Tank: ITank) {
    const [x, y, width, height]: number[] = player1Tank.sprite

    this.context.drawImage(
      this.sprite.image,
      x, y, width, height,
      player1Tank.x, player1Tank.y, width, height)
  };

  public clearScreen() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}
