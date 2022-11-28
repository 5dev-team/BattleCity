import { IWall, IWallConstructor } from './types/types'

export default class Wall implements IWall {
    x: number
    y: number
    width: number
    height: number
    sprite: number

    constructor({ x, y, width, height, sprite }: IWallConstructor) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
    }

  public get top(): number {
        return this.y;
    }

  public get right(): number {
        return this.x + this.width;
    }

  public get bottom(): number {
        return this.y + this.height;
    }

  public get left(): number {
        return this.x;
    }
}
