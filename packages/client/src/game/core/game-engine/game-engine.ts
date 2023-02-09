import View from '@/game/core/view/view'
import Input from '@/game/core/input/input'
import Stage from '@/game/core/stage/stage'
import { IGameConstructor, IGameOverData } from '@/game/core/game-engine/types'
import { Level } from '@/game/helpers/levels'
import { ControllerType } from '@/game/helpers/types'
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
  public controllerMode: ControllerType
  private isGameOver: boolean
  private debugMode: boolean
  private pause: boolean
  private readonly stageIndex: number
  
  constructor({ input, view, levels }: IGameConstructor) {
    this.input = input
    this.view = view
    this.stages = levels
    this.player1 = null
    this.player2 = null
    this.stage = null
    this.controllerMode = 'KEYBOARD'
    this.stageIndex = 0
    this.frames = 0
    this.lastFrame = 0
    this.loop = this.loop.bind(this)
    this.isGameOver = false
    this.debugMode = false
    this.pause = false
  }
  
  /**
   @method init
   @param debug {Boolean} Enable debugging mode with grid rendering and information output
   */
  public async init(debug = false): Promise<void> {
    if (debug) {
      window.addEventListener('keydown', e => {
        if (e.code === 'Space' && !this.pause) {
          this.pause = true
        } else if (e.code === 'Space' && this.pause) {
          this.pause = false
          this.loop(0)
        }
      })
    }
    
    await this.view.init()
  }
  
  public start(
    resolve: (value: IGameOverData | PromiseLike<IGameOverData>) => void, controllerMode: ControllerType = 'KEYBOARD'
  ): void {
    if (controllerMode !== 'KEYBOARD') {
      this.controllerMode = controllerMode
    }
    
    this.stage = new Stage(this.stages[this.stageIndex], this.stageIndex, this.controllerMode)
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
    
    if (this.controllerMode === 'GAMEPAD') {
      this.input.controllerInput()
    }
    
    const frameDelta: number = currentFrame - this.lastFrame
    if (this.stage instanceof Stage) {
      this.stage.update({ input: this.input, frameDelta })
    }
    if (this.stage) {
      this.view.update(this.stage, this.player1)
    }
    this.frames = 0
    this.lastFrame = currentFrame
    if (!this.isGameOver) {
      if (!this.debugMode) {
        setTimeout(() => {
          requestAnimationFrame(this.loop)
        }, 1000 / 60)
      }
    }
  }
  
  getPlayerFirst(): PlayerTank | null {
    return this.player1
  }
  
  setPlayerFirst(player: PlayerTank) {
    this.player1 = player
  }
}
