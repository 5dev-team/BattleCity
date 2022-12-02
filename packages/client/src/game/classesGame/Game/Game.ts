import { IGameConstructor } from './types'
import { Level } from '../../helpersGame/levels'
import View from '../View/View'
import Input from '../Input/Input'
import Tank from '../Tank/Tank'
import Stage from '../Stage/Stage'

export default class Game {
  public input: Input
  public view: View
  public stages: Level[]
  public player1: null | Tank
  public player2: null | Tank
  public stage?: Stage | null
  public lastFrame: number
  public frames: number
  public stageIndex: number

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
  }

  public async init(): Promise<void> {
    await this.view.init()
  }

  public start(): void {
    this.stage = new Stage(this.stages[this.stageIndex])
    requestAnimationFrame(this.loop)
  }

  private loop(currentFrame: number): void {
    //main method
    const frameDelta: number = currentFrame - this.lastFrame
    if (this.stage instanceof Stage) {
      this.stage.update(this.input, frameDelta)
    }
    if (this.stage) {
      this.view.update(this.stage)
    }
    this.frames = 0
    this.lastFrame = currentFrame
    requestAnimationFrame(this.loop)
  }

}
