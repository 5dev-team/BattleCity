import { ObjectType ,TILE_SIZE, BRICK_WALL_SPRITES, STEEL_WALL_SPRITES }  from '../../helpersGame/constants';
import Wall from '../Wall/Wall';
import { Level } from '../../helpersGame/levels'
import { IStage } from './types'
import { createObjectArgs } from './types'
import { IWall } from '../Wall/types'


export default class Stage implements IStage{
  public objects: (0 | IWall | undefined)[];
  static createObject(args: createObjectArgs) {
    switch (args.type) {
      case ObjectType.BRICK_WALL: return new Wall({
        ...args,
        sprites: BRICK_WALL_SPRITES
      });

      case ObjectType.STEEL_WALL: return new Wall({
        ...args,
        sprites: STEEL_WALL_SPRITES
      });
    }
  }

  constructor(level: Level) {
    this.objects = level.stage.map((values: number[], y: number) => {
      return values.map((value: number, x: number) => {
        return value && Stage.createObject({
          type: value,
          x: x * TILE_SIZE,
          y: y * TILE_SIZE,
          width: TILE_SIZE,
          height: TILE_SIZE
        });
      });
    }).reduce((objects, array) => objects.concat(...array.filter(v => !!v)), []);
  }
}
