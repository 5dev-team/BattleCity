import View from '@/game/core/view/view'
import Input from '@/game/core/input/input'
import Stage from '@/game/core/stage/stage'
import { IGameConstructor, IGameOverData } from '@/game/core/game-engine/types'
import { Level } from '@/game/helpers/levels'
import PlayerTank from '@/game/core/player-tank/player-tank'

export default class GameEngine {
  private readonly input: Input
  private view: View
  private readonly stages: Level[]
  private player1: null | PlayerTank
  private player2: null | PlayerTank
  private stage: Stage | null
  private lastFrame: number
  private frames: number
  private isGameOver: boolean
  private readonly stageIndex: number
  
  constructor({ input, view, levels }: IGameConstructor) {
    this.input = input
    this.view = view
    this.stages = levels
    this.player1 = null
    this.player2 = null
    this.stage = null
    this.stageIndex = 0
    this.frames = 0
    this.lastFrame = 0
    this.loop = this.loop.bind(this)
    this.isGameOver = false
  }
  
  public async init(): Promise<void> {
    await this.view.init()
  }
  
  public start(resolve: (value: IGameOverData | PromiseLike<IGameOverData>) => void): void {
    this.stage = new Stage(this.stages[this.stageIndex], this.stageIndex)
    this.setPlayerFirst(this.stage.getPlayerTank())
    
    this.stage.on('gameOver', () => {
      const playerFirst = this.getPlayerFirst()
      if (!playerFirst) {
        throw Error('First player not set')
      }
      this.isGameOver = true
      resolve({
        gameOverData: [{ scores: playerFirst.getScore() }]
      })
    })
    
    requestAnimationFrame(this.loop)
  }
  
  private loop(currentFrame: number): void {
    const frameDelta: number = currentFrame - this.lastFrame
    if (this.stage instanceof Stage) {
      this.stage.update({ input: this.input, frameDelta })
    }
    if (this.stage) {
      this.view.update(this.stage)
    }
    this.frames = 0
    this.lastFrame = currentFrame
    if (!this.isGameOver) {
      setTimeout(() => {
        requestAnimationFrame(this.loop)
      }, 1000 / 60)
    }
    
  }

  getPlayerFirst(): PlayerTank | null {
    return this.player1
  }
  
  setPlayerFirst(player: PlayerTank) {
    this.player1 = player
  }
  
  getPlayerSecond(): PlayerTank | null {
    return this.player2
  }
  
  setPlayerSecond(player: PlayerTank) {
    this.player2 = player
  }
  
}
