import { IGameConstructor, ISet } from './types'
import { Level } from '../../helpersGame/levels'
import World from '../World/World'
import View from '../View/View'

export default class Game {
  public world: World
  public view: View
  public levels: Level[]
  public isMoving: boolean
  public activeKeys: ISet<string>
  public level: number
  public stages: Level[]
  public stage: number
  public lastFrame: number;
  constructor({ world, view, levels }: IGameConstructor) {
    this.world = world
    this.view = view
    this.activeKeys = new Set()
    this.levels = levels
    this.level = 0
    this.stages = levels
    this.stage = 0
    this.isMoving = false
    this.lastFrame = 0;
    this.loop = this.loop.bind(this)
  }

  public async init() {
    await this.view.init()
    this.world.setStage(this.stages[this.stage])

    document.addEventListener('keydown', (e) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'Space':
        case 'Enter':
          e.preventDefault()  // for f5 reload page
          this.activeKeys.add(e.code)
      }
    })

    document.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'Space':
        case 'Enter':
          e.preventDefault()   // for f5 reload page
          this.activeKeys.delete(e.code)
      }
    })
  }

  public start() {
    requestAnimationFrame(this.loop)
  }

  public loop(currentFrame: number) {
    // get input;
    // update world;
    // update view;
    const frameDelta: number = currentFrame - this.lastFrame
    this.world.update(this.activeKeys, frameDelta)
    this.view.update(this.world)
    this.lastFrame = currentFrame;
    requestAnimationFrame(this.loop)
  }

}
