import { BRICK_WALL_SPRITES } from '../../helpersGame/constants'
import Wall from '../Wall/Wall'
import Projectile from '../Projectile/Projectile'


export default class BrickWall extends Wall {
  constructor(args: any) {
    super(args);
    this.sprites = BRICK_WALL_SPRITES;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  public hit(projectile: Projectile): void {
    console.log('БУМ', this, projectile);
  }
}
