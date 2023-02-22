import Stage from '@/game/core/stage/stage'
import {
  ENEMY_TANK_ICONS_SPRITES,
  NUMBERS,
  PANEL_HEIGHT,
  PANEL_X,
  PLAYER1_PANEL_SPRITES,
  PLAYFIELD_HEIGHT,
  PLAYFIELD_WIDTH,
  PLAYFIELD_X,
  PLAYFIELD_Y,
  STAGE_NUMBER_SPRITES,
  TILE_SIZE,
  UNIT_SIZE
} from '@/game/helpers/constants'
import ImageLoader from '@/game/core/sprite'
import PlayerTank from '@/game/core/player-tank/player-tank'
import EnemyTank from '@/game/core/enemy-tank/enemy-tank'

export default class View {
  private canvas: HTMLCanvasElement
  private context: CanvasRenderingContext2D
  private imageLoader: ImageLoader
  private readonly ctx: CanvasRenderingContext2D | null
  
  constructor(canvas: HTMLCanvasElement, loader: ImageLoader) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    if (!this.ctx || !(this.ctx instanceof CanvasRenderingContext2D)) {
      throw new Error('Failed to get 2D context')
    }
    this.context = this.ctx
    this.context.imageSmoothingEnabled = false
    this.imageLoader = loader
  }
  
  get width() {
    return this.canvas.width
  }
  
  get height() {
    return this.canvas.height
  }
  
  async init(): Promise<void> {
    await this.imageLoader.load()
  }
  
  public update(stage: Stage, player1: PlayerTank | null): void {
    this.clearScreen()
    if (typeof stage === 'object') {
      this.renderObjects(stage)
    }
    this.renderPanel(stage, player1)
  }
  
  public renderObjects(stage: Stage): void {
    this.context.fillStyle = '#636363'
    this.context.fillRect(0, 0, this.width, this.height)
    
    this.context.fillStyle = '#000000'
    this.context.fillRect(PLAYFIELD_X, PLAYFIELD_Y, PLAYFIELD_WIDTH, PLAYFIELD_HEIGHT)
    
    stage.gameObjects.forEach(gameObject => {
      if (gameObject.sprite) {
        this.context.drawImage(
          this.imageLoader.image,
          ...gameObject.sprite,
          PLAYFIELD_X + gameObject.pos.x,
          PLAYFIELD_Y + gameObject.pos.y,
          gameObject.width,
          gameObject.height
        )
      }
    })
  }
  
  renderPanel(stage: Stage, player1: PlayerTank | null) {
    this.renderEnemyTankIcons(stage.getEnemies)
    if (player1) {
      this.renderPlayer1Lives(player1)
    }
    this.renderStageNumber(stage)
  }
  
  public clearScreen(): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
  
  renderEnemyTankIcons(enemyTanks: EnemyTank[]) {
    this.context.fillStyle = '#000000'
    
    for (let i = 0, x = 0, y = 0; i < enemyTanks.length; i++) {
      this.context.drawImage(
        this.imageLoader.image,
        ...ENEMY_TANK_ICONS_SPRITES[0],
        PANEL_X + x * TILE_SIZE + 16,
        PLAYFIELD_Y + y * TILE_SIZE + 16,
        TILE_SIZE,
        UNIT_SIZE
      )
      
      if (x === 1) {
        x = 0
        y++
      } else {
        x++
      }
    }
  }
  
  renderPlayer1Lives(player1: PlayerTank) {
    this.context.drawImage(
      this.imageLoader.image,
      ...PLAYER1_PANEL_SPRITES[0],
      PANEL_X + TILE_SIZE,
      PLAYFIELD_Y + PANEL_HEIGHT * 0.5,
      UNIT_SIZE,
      TILE_SIZE
    )
    
    this.context.drawImage(
      this.imageLoader.image,
      ...PLAYER1_PANEL_SPRITES[1],
      PANEL_X + TILE_SIZE,
      PLAYFIELD_Y + PANEL_HEIGHT * 0.5 + TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    )

    this.context.drawImage(
      this.imageLoader.image,
      ...NUMBERS[player1.getLives()],
      PANEL_X + TILE_SIZE * 2,
      PLAYFIELD_Y + PANEL_HEIGHT * 0.5 + TILE_SIZE,
      TILE_SIZE,
      TILE_SIZE
    )
  }
  
  renderStageNumber(stage: Stage) {
    this.context.drawImage(
      this.imageLoader.image,
      ...STAGE_NUMBER_SPRITES[0],
      PANEL_X + TILE_SIZE,
      PLAYFIELD_Y + PANEL_HEIGHT * 0.75,
      UNIT_SIZE,
      UNIT_SIZE
    )
    
    this.context.drawImage(
      this.imageLoader.image,
      ...STAGE_NUMBER_SPRITES[stage.stageIndex + 1],
      PANEL_X + TILE_SIZE * 2,
      PLAYFIELD_Y + PANEL_HEIGHT * 0.75 + UNIT_SIZE,
      TILE_SIZE,
      TILE_SIZE
    )
  }
}
