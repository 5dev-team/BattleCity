import { Direction } from '@/game/core/types';

export function getDirectionForKeys(keys: {
  has(value: string): boolean
}): number {
  if (keys.has('ArrowUp')) {
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

export function getAxisForDirection(direction: number): string {
  return direction % 2 === 0 ? 'y' : 'x'
}

export function getValueForDirection(direction: number): 1 | -1 {
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
  direction: number
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
