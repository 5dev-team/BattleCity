import View from '@/game/core/view/view'
import Input from '@/game/core/input/input'
import Tank from '@/game/core/tank/tank'
import Stage from '@/game/core/stage/stage'
import { IGameConstructor } from '@/game/core/game-engine/types'
import { Level } from '@/game/helpers/levels'

export default class GameEngine {
  private readonly input: Input
  private view: View
  private readonly stages: Level[]
  private player1: null | Tank
  private player2: null | Tank
  private stage: Stage | null
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

  public end(): void {
    this.loop = () => {
      console.log('Game Over')
    }
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

    console.log(currentFrame)
    requestAnimationFrame(this.loop)
  }

}
