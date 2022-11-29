export interface IGameObjectConstructor{
  x: number;
  y: number;
  width: number;
  height: number;
  sprites: number[][];
}

export interface IGameObject {
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly sprites: number[][];
  readonly animationFrame: number;
}
