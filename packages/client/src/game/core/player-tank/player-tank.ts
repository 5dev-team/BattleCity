import Tank from '@/game/core/tank/tank'
import {
  Keys,
  PLAYER1_TANK_POSITION,
  PLAYER1_TANK_SPRITES,
} from '@/game/helpers/constants'
import {
  getDirectionForKeys,
  getAxisForDirection,
  getValueForDirection
} from '@/game/helpers/helpers'
import {
  Direction,
  GameObjectArgs,
  IUpdatable,
  UpdateState,
  Vec2
} from '@/game/core/types'
import { IScoreResult } from '@/game/core/player-tank/types'
import PlayerReborn from '@/game/core/animations/player-reborn'
import InitAnimation from '@/game/core/animations/init-animation'

export default class PlayerTank extends Tank implements IUpdatable {
  private score: IScoreResult
  public lives: number
  private pause: boolean
  private paralized: boolean
  private IDDQD: boolean
  private rebornAnimation: PlayerReborn | null
  private initAnimation: InitAnimation | null
  
  constructor(args: Partial<GameObjectArgs>) {
    super({
      pos: args.pos
        ? args.pos
        : new Vec2(PLAYER1_TANK_POSITION[0], PLAYER1_TANK_POSITION[1]),
      sprites: PLAYER1_TANK_SPRITES
    })
    this.name = 'player tank'
    this.lives = 2
    this.IDDQD = false
    this.pause = false
    this.paralized = false
    this.rebornAnimation = null
    this.initAnimation = null
    this.score = {
      1: 0,
      2: 0,
      3: 0,
      4: 0
    }
    
  }
  
  public getScore() {
    return this.score
  }
  
  public setScore(newScore: IScoreResult) {
    this.score = newScore
  }
  
  public getLives() {
    return this.lives
  }
  public animateInitAnimation() {
    this.stop()
    this.initAnimation = new InitAnimation({ pos: new Vec2(this.pos.x, this.pos.y) })
    this.emit('initTank', this.initAnimation)
  }
  
  public stop() {
    this.pause = true
  }
  public play() {
    this.pause = false
  }
  
  public reborn() {
    this.lives--
    this.pos = new Vec2(PLAYER1_TANK_POSITION[0], PLAYER1_TANK_POSITION[1])
    this.direction = Direction.Up
    this.paralized = true
    this.turnOnIDDQD()
    this.rebornAnimation = new PlayerReborn({ pos: new Vec2(this.pos.x, this.pos.y) })
    this.emit('reborn', this.rebornAnimation)
    setTimeout(() => {
      this.paralized = false
    }, 2000)
    
  }
  
  public turnOnIDDQD() {
    this.IDDQD = true
  }
  
  public turnOffIDDQD() {
    this.IDDQD = false
  }
  
  getX() {
    return this.pos.x
  }
  
  getY() {
    return this.pos.y
  }
  
  removeRebornAnimation() {
    this.rebornAnimation = null
  }
  
  public hit() {
    console.log('hit')
    if (!this.IDDQD) {
      super.hit()
    }
  }
  
  public update(state: UpdateState): void {
    if (this.pause) {
      return
    }
    const { input, frameDelta, world } = state
    if (input.has(Keys.UP, Keys.RIGHT, Keys.DOWN, Keys.LEFT)) {
      const direction = getDirectionForKeys(input.keys)
      const axis = getAxisForDirection(direction)
      const value = getValueForDirection(direction)
      
      const gameObjects = Array.from(world.gameObjects)
      
      this.turn(direction, this.getTurnOffsetLimit(gameObjects))
      
      const collisions = this.getCollisions(this.getColliders(gameObjects))
      if (!this.pause) {
        if (collisions.length === 0) {
          const movement = this.getMovement(this.getMoveOffsetLimit(gameObjects))
    
          this.move(axis, value * movement)
    
          if (world.isOutOfBounds(this)) this.move(axis, -value * movement)
        }
      }
      
      if (this.rebornAnimation) {
        this.rebornAnimation.setPosition({
          x: this.getX(),
          y: this.getY()
        })
      }
      

      this.animate(frameDelta)
    }

    if (input.has(Keys.SPACE)) {
      this.fire()
      
      if (this.bullet) {
        world.gameObjects.add(this.bullet)
      }
    }
  }
}
