export interface IDerection {
  UP: number,
  RIGHT: number,
  DOWN: number,
  LEFT: number,

}

export interface IKeys {
  UP: string,
  RIGHT: string,
  DOWN: string,
  LEFT: string,
  SPACE: string,
}

export interface IObjectType {
  BASE: number,
  BRICK_WALL: number,
  STEEL_WALL: number,
  TREE: number,
  WATER: number,
  ICE: number,

}

export type TSprites = [number, number, number, number][]
