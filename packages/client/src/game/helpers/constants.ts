import { DefaultPosition, Maps, Sprite } from './types'

export const NUMBER_OF_UNITS = 13
export const TILE_SIZE = 16
export const UNIT_SIZE = 32
export const STAGE_SIZE = NUMBER_OF_UNITS * UNIT_SIZE

export const PLAYFIELD_X = UNIT_SIZE
export const PLAYFIELD_Y = UNIT_SIZE
export const PLAYFIELD_WIDTH = NUMBER_OF_UNITS * UNIT_SIZE
export const PLAYFIELD_HEIGHT = NUMBER_OF_UNITS * UNIT_SIZE
export const PANEL_X = PLAYFIELD_X + PLAYFIELD_WIDTH
export const PANEL_HEIGHT = PLAYFIELD_Y + PLAYFIELD_HEIGHT

export const Keys = {
  UP: 'ArrowUp',
  RIGHT: 'ArrowRight',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  SPACE: 'Space',
  ENTER: 'Enter'
}

export const ObjectType = {
  BASE: 0,
  BRICK_WALL: 1,
  STEEL_WALL: 2,
  TREE: 3,
  WATER: 4,
  ICE: 5
}

export const PROJECTILE_WIDTH = 8
export const PROJECTILE_HEIGHT = 8
export const PROJECTILE_SPEED = 2
export const PROJECTILE_SPRITES: Sprite[] = [
  [20 * UNIT_SIZE + 4, 6 * UNIT_SIZE + 12, PROJECTILE_WIDTH, PROJECTILE_WIDTH],
  [
    21.5 * UNIT_SIZE + 4,
    6 * UNIT_SIZE + 12,
    PROJECTILE_WIDTH,
    PROJECTILE_WIDTH
  ],
  [21 * UNIT_SIZE + 4, 6 * UNIT_SIZE + 12, PROJECTILE_WIDTH, PROJECTILE_WIDTH],
  [
    20.5 * UNIT_SIZE + 4,
    6 * UNIT_SIZE + 12,
    PROJECTILE_WIDTH,
    PROJECTILE_WIDTH
  ]
]

export const PROJECTILE_EXPLOSION_WIDTH = UNIT_SIZE
export const PROJECTILE_EXPLOSION_HEIGHT = UNIT_SIZE
export const PROJECTILE_EXPLOSION_SPEED = 4
export const PROJECTILE_EXPLOSION_SPRITES: Sprite[] = [
  [16 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [17 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [18 * UNIT_SIZE, 8 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]
]

export const BASE_POSITION: DefaultPosition = [6 * UNIT_SIZE, 12 * UNIT_SIZE]
export const BASE_WIDTH = UNIT_SIZE
export const BASE_HEIGHT = UNIT_SIZE
export const BASE_SPRITES: Sprite[] = [
  [11 * UNIT_SIZE, 7.5 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [12 * UNIT_SIZE, 7.5 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]
]

export const BULLET_WIDTH = 8
export const BULLET_HEIGHT = 8
export const BULLET_SPEED = 10
export const BULLET_SPRITES: Sprite[] = [
  [16 * UNIT_SIZE, 0, BULLET_WIDTH, BULLET_HEIGHT],
  [16.5 * UNIT_SIZE, 0, BULLET_WIDTH, BULLET_HEIGHT],
  [17 * UNIT_SIZE, 0, BULLET_WIDTH, BULLET_HEIGHT],
  [17.5 * UNIT_SIZE, 0, BULLET_WIDTH, BULLET_HEIGHT]
]

export const BULLET_EXPLOSION_WIDTH = UNIT_SIZE
export const BULLET_EXPLOSION_HEIGHT = UNIT_SIZE
export const BULLET_EXPLOSION_ANIMATION_SPEED = 4
export const BULLET_EXPLOSION_SPRITES: Sprite[] = [
  [16 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [17 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [18 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]
]


export const PLAYER1_TANK_START_X = 4 * UNIT_SIZE
export const PLAYER1_TANK_START_Y = 12 * UNIT_SIZE

export const TANK_WIDTH = UNIT_SIZE
export const TANK_HEIGHT = UNIT_SIZE
export const TANK_SPEED = 2
export const TANK_TURN_THRESHOLD = 12

export const TANK_EXPLOSION_WIDTH = 2 * UNIT_SIZE
export const TANK_EXPLOSION_HEIGHT= 2 * UNIT_SIZE
export const TANK_EXPLOSION_ANIMATION_SPEED = 100
export const TANK_EXPLOSION_SPRITES: Sprite[] = [
  [16 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [17 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [18 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [19 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE * 2, UNIT_SIZE * 2],
  [21 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE * 2, UNIT_SIZE * 2],
  [16 * UNIT_SIZE, 2 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]
]

export const PLAYER_REBORN_WIDTH = UNIT_SIZE
export const PLAYER_REBORN_HEIGHT= UNIT_SIZE
export const PLAYER_REBORN_ANIMATION_SPEED = 50
export const PLAYER_REBORN_SPRITES: Sprite[] = [
  [16 * UNIT_SIZE, 3 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [17 * UNIT_SIZE, 3 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
]

export const INIT_TANK_ANIMATION_WIDTH = UNIT_SIZE
export const INIT_TANK_ANIMATION_HEIGHT= UNIT_SIZE
export const INIT_TANK_ANIMATION_SPEED = 100
export const INIT_TANK_ANIMATION_SPRITES: Sprite[] = [
  [18 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [19 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [20 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [21 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [20 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [19 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [18 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [19 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [20 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [21 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
]

export const GAME_OVER_ANIMATION_WIDTH = 2* UNIT_SIZE
export const GAME_OVER_ANIMATION_HEIGHT= UNIT_SIZE
export const GAME_OVER_ANIMATION_SPRITES: Sprite[] = [
  [16 * UNIT_SIZE, 5.25 * UNIT_SIZE, 2* UNIT_SIZE, UNIT_SIZE],
]

export const PLAYER1_TANK_POSITION: DefaultPosition = [
  4 * UNIT_SIZE,
  12 * UNIT_SIZE
]
export const PLAYER1_TANK_SPRITES: Sprite[] = [
  [0, 0, UNIT_SIZE, UNIT_SIZE],
  [UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [2 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [3 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [4 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [5 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [6 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE],
  [7 * UNIT_SIZE, 0, UNIT_SIZE, UNIT_SIZE]
]

export const ENEMY_TANK_START_POSITIONS: DefaultPosition[] = [
  [0, 0],
  [6 * UNIT_SIZE, 0],
  [12 * UNIT_SIZE, 0]
]
export const ENEMY_TANK_SPRITES: Sprite[] = [
  [0, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [2 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [3 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [4 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [5 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [6 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE],
  [7 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE]
]

export const BRICK_WALL_SPRITES: Sprite[] = [
  [8 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE], // full
  [9 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE], // top 8/16
  [10 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE], // right 8/16
  [11 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE], // bottom 8/16
  [12 * UNIT_SIZE, 4 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE], // left 8/16
  [8 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // 1/4
  [8.5 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // top left 3/4
  [9 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // top right 3/4
  [9.5 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // bottom right 3/4
  [10 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // bottom left 3/4
  [12 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // top 2/4
  [11.5 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // right 2/4
  [11 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // bottom 2/4
  [10.5 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // left 2/4
  [12.5 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // top left 1/4
  [13 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // top right 1/4
  [13.5 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // bottom right 1/4
  [14 * UNIT_SIZE, 4 * UNIT_SIZE, TILE_SIZE, TILE_SIZE] // bottom left 1/4
]

export const BRICK_WALL_SPRITE_MAP: Maps = {
  '0': 5,
  '1': 10,
  '2': 11,
  '4': 12,
  '8': 13
}

export const STEEL_WALL_SPRITES: Sprite[] = [
  [8 * UNIT_SIZE, 6.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // 1/4
  [8 * UNIT_SIZE, 6.5 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE], // full
  [9 * UNIT_SIZE, 6.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // top
  [10 * UNIT_SIZE, 6.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // right
  [11 * UNIT_SIZE, 6.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // bottom
  [12 * UNIT_SIZE, 6.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE] // left
]

export const STAGE_NUMBER_SPRITES: Sprite[] = [
  [23.5 * UNIT_SIZE, 11.5 * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE], // flag
  [19 * UNIT_SIZE, 5.25 * UNIT_SIZE, TILE_SIZE, TILE_SIZE] // stage number
]

export const PLAYER1_PANEL_SPRITES: Sprite[] = [
  [23.5 * UNIT_SIZE, 8.5 * UNIT_SIZE, UNIT_SIZE, TILE_SIZE], // 1P
  [23.5 * UNIT_SIZE, 9 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // tank icon
]
export const NUMBERS: Sprite[] = [
  [18.5 * UNIT_SIZE, 5.25 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // 0
  [19 * UNIT_SIZE, 5.25 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // 1
  [19.5 * UNIT_SIZE, 5.25 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // 2
  [20 * UNIT_SIZE, 5.25 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // 3
  [20.5 * UNIT_SIZE, 5.25 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // 4
  [18.5 * UNIT_SIZE, 5.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // 5
  [19 * UNIT_SIZE, 5.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // 6
  [19.5 * UNIT_SIZE, 5.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // 7
  [20 * UNIT_SIZE, 5.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // 8
  [20.5 * UNIT_SIZE, 5.5 * UNIT_SIZE, TILE_SIZE, TILE_SIZE], // 9
]

export const PLAYER1_LIVES_SPRITE_MAP: Maps = {
  '0': 5,
  '1': 10,
  '2': 11,
  '4': 12,
  '8': 13
}

export const ENEMY_TANK_ICONS_SPRITES: Sprite[] = [
  [18 * UNIT_SIZE, 5.5 * UNIT_SIZE, TILE_SIZE, UNIT_SIZE]
]
