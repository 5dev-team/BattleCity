import { controllerModeType } from '@/game/helpers/types'

export default class Input {
  keys: Set<string>
  
  constructor(controllerMode: controllerModeType) {
    this.keys = new Set()
    this.gamepad = null
    console.log(controllerMode)
    if (controllerMode === 'KEYBOARD') {
      this.init()
    } else {
      this.gamepad = navigator.getGamepads()[0]
      this.controllerInput()
    }
  }
  
  init() {
    
    //TODO: remove any type
    document.addEventListener('keydown', this.controllerInput)
    
    document.addEventListener('keyup', this.controllerInput)
  }
  
  arrowBinding() {
    
    const buttons = this.gamepad.buttons
    
    const arrowsAfterBind = {
      ArrowUp: buttons[12].pressed,
      ArrowRight: buttons[15].pressed,
      ArrowDown: buttons[13].pressed,
      ArrowLeft: buttons[14].pressed,
      Space: buttons[1].pressed,
      Enter: buttons[9].pressed,
    }
    return Object.keys(arrowsAfterBind).filter(
      b => arrowsAfterBind[b] === true
    )[0]
  }
  
  controllerInput(e) {
    let keyCode = e?.code
    if (this.gamepad) {
      keyCode = this.arrowBinding()
    }
    console.log(keyCode)
    switch (keyCode) {
      case 'ArrowUp':
      case 'ArrowRight':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'Space':
      case 'Enter':
        if (e) {
          e.preventDefault()
        }
        this.keys.add(keyCode)
        break
      default:
        for(const i of this.keys) {
          this.keys.delete(i)
        }
    }
  }
  
  
  has(...arg: string[]) {
    return Array.isArray(arg)
      ? arg.some(key => this.keys.has(key))
      : this.keys.has(arg)
  }
}
