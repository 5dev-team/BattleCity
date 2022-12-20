export default class Input {
  keys: Set<string>

  constructor() {
    this.keys = new Set()
    this.init()
  }

  init() {
    document.addEventListener('keydown', event => {
      switch (event.code) {
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'Space':
        case 'Enter':
          event.preventDefault()
          this.keys.add(event.code)
      }
    })

    document.addEventListener('keyup', event => {
      switch (event.code) {
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'Space':
        case 'Enter':
          event.preventDefault()
          this.keys.delete(event.code)
      }
    })
  }

  has(...arg: string[]) {
    return Array.isArray(arg) ?
      arg.some(key => this.keys.has(key)) :
      this.keys.has(arg)
  }
}
