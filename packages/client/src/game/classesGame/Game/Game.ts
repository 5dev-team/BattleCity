import View from '@/game/classesGame/View/View'
import Input from '@/game/classesGame/Input/Input'
import Tank from '@/game/classesGame/Tank/Tank'
import Stage from '@/game/classesGame/Stage/Stage'
import { IGameConstructor } from '@/game/classesGame/Game/types'
import { Level } from '@/game/helpersGame/levels'

export default class Game {
  private readonly input: Input
  private view: View
  private readonly stages: Level[]
  private player1: null | Tank
  private player2: null | Tank
  private stage?: Stage | null
  private lastFrame: number
  private frames: number
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
  }

  public async init(): Promise<void> {
    await this.view.init()
  }

  public start(): void {
    this.stage = new Stage(this.stages[this.stageIndex])
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
    requestAnimationFrame(this.loop)
  }

}
