import { ISet, IGameConstructor, IGame, IWorld, IView, defaultLevel, allLevel } from './types/types'

export default class Game implements IGame {
  public world: IWorld
  public view: IView
  public levels: allLevel
  public isMoving: boolean
  public activeKeys: ISet<string>
  public level: number

  constructor({ world, view, levels }: IGameConstructor) {
    this.world = world
    this.view = view
    this.activeKeys = new Set()
    this.levels = levels
    this.level = 0
    this.isMoving = false
    this.loop = this.loop.bind(this) // never link !undefined
  }

  public async init() {
    this.view.init()
    const currentLevel: defaultLevel = this.levels[this.level]
    this.world.setLevel(currentLevel)

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
          e.preventDefault()  // for f5 reload page
          this.activeKeys.delete(e.code)
      }

    })
  }

  public start() {
    requestAnimationFrame(this.loop)
  }

  public loop() {
    // get input;
    // update world;
    // update view;
    this.world.update(this.activeKeys)
    this.view.update(this.world)
    requestAnimationFrame(this.loop)
  }

}
