import { ISprite } from '../Sprite/types'
import { IBase } from '../Base/types'
import { ITank } from '../Tanks/types'

export interface IView {
  readonly canvas: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;
  readonly sprite: ISprite;
  ctx: CanvasRenderingContext2D | null;

  init(): void;

  update(world: any): void;

  renderPlayer1Tank(player1Tank: ITank): void;

  clearScreen(): void;

  renderObjects(objects: (IBase | any | ITank)[]): void
}


export interface iObjectOfWorld {
  sprite: [number, number, number, number];
  x: number;
  y: number;
  width: number;
  height: number;
}
