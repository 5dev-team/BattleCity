import { Sprites, DefaultPosition } from './types'

export const NUMBER_OF_UNITS = 13
export const TILE_SIZE = 16
export const UNIT_SIZE = 32
export const STAGE_SIZE = NUMBER_OF_UNITS * UNIT_SIZE

export const Keys = {
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  SPACE: 'Space',
}

export enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT
}

export enum ObjectType {
  BASE,
  BRICK_WALL,
  STEEL_WALL,
  TREE,
  WATER,
  ICE
}

export const PROJECTILE_WIDTH = 8
export const PROJECTILE_HEIGHT = 8
export const PROJECTILE_SPEED = 2
export const PROJECTILE_SPRITES: Sprites = [
  [20 * UNIT_SIZE + 4, 6 * UNIT_SIZE + 12, PROJECTILE_WIDTH, PROJECTILE_WIDTH],
  [
    21.5 * UNIT_SIZE + 4,
    6 * UNIT_SIZE + 12,
    PROJECTILE_WIDTH,
    PROJECTILE_WIDTH,
  ],
  [21 * UNIT_SIZE + 4, 6 * UNIT_SIZE + 12, PROJECTILE_WIDTH, PROJECTILE_WIDTH],
  [
    20.5 * UNIT_SIZE + 4,
    6 * UNIT_SIZE + 12,
    PROJECTILE_WIDTH,
    PROJECTILE_WIDTH,
  ],
]

export const PROJECTILE_EXPLOSION_WIDTH = UNIT_SIZE
export const PROJECTILE_EXPLOSION_HEIGHT = UNIT_SIZE
export const PROJECTILE_EXPLOSION_SPEED = 4
export const PROJECTILE_EXPLOSION_SPRITES: Sprites = [
  [16 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [17 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [18 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
]

export const BASE_POSITION: DefaultPosition = [6 * UNIT_SIZE, 12 * UNIT_SIZE]
export const BASE_WIDTH = UNIT_SIZE
export const BASE_HEIGHT = UNIT_SIZE
export const BASE_SPRITES: Sprites = [
  [19 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [20 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
]

export const PLAYER1_TANK_START_X = 4 * UNIT_SIZE
export const PLAYER1_TANK_START_Y = 12 * UNIT_SIZE

export const TANK_WIDTH = UNIT_SIZE
export const TANK_HEIGHT = UNIT_SIZE
export const TANK_SPEED = 1
export const TANK_TURN_THRESHOLD = 12

export const PLAYER1_TANK_POSITION: DefaultPosition = [
  4 * UNIT_SIZE,
  12 * UNIT_SIZE,
]
export const PLAYER1_TANK_SPRITES: Sprites = [
  [0, 0, UNIT_SIZE, UNIT_SIZE],
  [UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [6 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [7 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [4 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [5 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [2 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [3 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
]

export const ENEMY_TANK_START_POSITIONS: DefaultPosition[] = [
  [0, 0],
  [6 * UNIT_SIZE, 0],
  [12 * UNIT_SIZE, 0],
]
export const ENEMY_TANK_SPRITES: [][] = [[], []]

export const BRICK_WALL_SPRITES: Sprites = [
  [16 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // full
  [17 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // right
  [18 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // bottom
  [19 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // left
  [24 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // top
]

export const STEEL_WALL_SPRITES: Sprites = [
  [16 * UNIT_SIZE, 4.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // full
  [17 * UNIT_SIZE, 4.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // right
  [18 * UNIT_SIZE, 4.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // bottom
  [19 * UNIT_SIZE, 4.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // left
  [20 * UNIT_SIZE, 4.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // top
]
