import { Keys } from '@/game/helpers/constants'
import { ControllerType } from '@/game/core/types'

export default class Input {
  keys: Set<string>
  gamepad: Gamepad | null

  constructor(controller: ControllerType) {
    this.keys = new Set()
    this.gamepad = null

    console.log(controller)

    switch (controller) {
      case ControllerType.Keyboard:
        this.init()
        break
      case ControllerType.Gamepad:
        this.gamepad = navigator.getGamepads()[0]
        this.controllerInput()
        break
    }
  }

  init() {
    //TODO: remove any type
    document.addEventListener('keydown', e => this.controllerInput(e, false))

    document.addEventListener('keyup', e => this.controllerInput(e, true))
  }

  getGamepadKeyCode() {
    if (!this.gamepad) return

    const buttons = this.gamepad.buttons
    const pressed = buttons.findIndex(btn => btn.pressed)

    switch (pressed) {
      case 12:
        return Keys.UP
      case 15:
        return Keys.RIGHT
      case 13:
        return Keys.DOWN
      case 14:
        return Keys.LEFT
      case 1:
        return Keys.SPACE
      case 9:
        return Keys.ENTER
    }
  }

  controllerInput(e?: KeyboardEvent, isKeyUp?: boolean) {
    const keyCode = this.gamepad ? this.getGamepadKeyCode() : e?.code

    switch (keyCode) {
      case Keys.UP:
      case Keys.RIGHT:
      case Keys.DOWN:
      case Keys.LEFT:
      case Keys.SPACE:
      case Keys.ENTER:
        e?.preventDefault()
        isKeyUp ? this.keys.delete(keyCode) : this.keys.add(keyCode)
        break
      default:
        this.keys.clear()
    }
  }

  has(...arg: string[]) {
    return Array.isArray(arg)
      ? arg.some(key => this.keys.has(key))
      : this.keys.has(arg)
  }
}
