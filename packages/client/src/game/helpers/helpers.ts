import { Direction, Vec2 } from '@/game/core/types'

export function getDirectionForKeys(keys: {
  has(value: string): boolean
}): number {
  if (keys.has('ArrowUp')) {
    // debugger
    return Direction.Up
  }

  if (keys.has('ArrowRight')) {
    return Direction.Right
  }

  if (keys.has('ArrowDown')) {
    return Direction.Down
  }

  if (keys.has('ArrowLeft')) {
    return Direction.Left
  }

  return Direction.Up
}

export function getAxisForDirection(direction: Direction): string {
  return direction % 2 === 0 ? 'y' : 'x'
}

export function getVectorForDirection(direction: Direction): Vec2 {
  switch (direction) {
    case Direction.Up:
      return Vec2.up.opposite
    case Direction.Right:
      return Vec2.right
    case Direction.Down:
      return Vec2.down.opposite
    case Direction.Left:
      return Vec2.left
  }
}

export function getValueForDirection(direction: Direction): 1 | -1 {
  switch (direction) {
    case Direction.Up:
      return -1
    case Direction.Right:
      return 1
    case Direction.Down:
      return 1
    case Direction.Left:
      return -1
    default:
      return -1
  }
}

export function getSideForDirection(
  direction: Direction
): 'top' | 'Right' | 'bottom' | 'Left' | undefined {
  switch (direction) {
    case Direction.Up:
      return 'top'
    case Direction.Right:
      return 'Right'
    case Direction.Down:
      return 'bottom'
    case Direction.Left:
      return 'Left'
  }
}
