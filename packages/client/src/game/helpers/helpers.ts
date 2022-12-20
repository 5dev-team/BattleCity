import { Direction } from './constants'

export function getDirectionForKeys(keys: {
  has(value: string): boolean
}): number {
  if (keys.has('ArrowUp')) {
    return Direction.UP
  }

  if (keys.has('ArrowRight')) {
    return Direction.RIGHT
  }

  if (keys.has('ArrowDown')) {
    return Direction.DOWN
  }

  if (keys.has('ArrowLeft')) {
    return Direction.LEFT
  }

  return Direction.UP
}

export function getAxisForDirection(direction: number): string {
  return direction % 2 === 0 ? 'y' : 'x'
}

export function getValueForDirection(direction: number): 1 | -1 {
  switch (direction) {
    case Direction.UP:
      return -1
    case Direction.RIGHT:
      return 1
    case Direction.DOWN:
      return 1
    case Direction.LEFT:
      return -1
    default:
      return -1
  }
}

export function getSideForDirection(
  direction: number
): 'top' | 'right' | 'bottom' | 'left' | undefined {
  switch (direction) {
    case Direction.UP:
      return 'top'
    case Direction.RIGHT:
      return 'right'
    case Direction.DOWN:
      return 'bottom'
    case Direction.LEFT:
      return 'left'
  }
}
