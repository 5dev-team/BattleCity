import GameObject from '@/game/core/game-object/game-object'
import { Direction, GameObjectType, Vec2 } from '@/game/core/types'
import Stage from '@/game/core/stage/stage'

export default abstract class MobileGameObject extends GameObject {
  protected abstract speed: number
  protected abstract direction: Direction

  public move(axis: string, value: number): void {
    if (axis === 'y') {
      this.pos.y += value * this.speed
    }
    if (axis === 'x') {
      this.pos.x += value * this.speed
    }
  }

  public stop() {
    this.speed = 0
  }

  public getCollisions(
    gameObjects: GameObject[],
    ...withTypes: GameObjectType[]
  ) {
    const colliders = gameObjects.filter(
      obj =>
        obj.id !== this.id &&
        withTypes.some(type => obj.gameObjectType === type) &&
        obj.pos.distance(this.pos) < this.width + obj.width &&
        !this.isInsideOf(obj)
    )

    // switch (this.direction) {
    //   case Direction.Up:
    //     colliders = colliders.filter(collider => collider.pos.y < this.pos.y)
    //     break
    //   case Direction.Down:
    //     colliders = colliders.filter(collider => collider.pos.y > this.pos.y)
    //     break
    //   case Direction.Left:
    //     colliders = colliders.filter(collider => collider.pos.x < this.pos.x)
    //     break
    //   case Direction.Right:
    //     colliders = colliders.filter(collider => collider.pos.x > this.pos.x)
    //     break
    // }

    const collisions = colliders.filter(
      collider =>
        this.signedDistanceBetween(this.direction, this, collider) === 0 &&
        this.isTowardsDirection(this.direction, this, collider)
    )

    return collisions

    // const collisions = colliders.map(collider => ({
    //   collider,
    //   range: this.signedDistanceBetween(this.direction, this, collider),
    // }))

    // return (
    //   collisions.find(collision => {
    //     // if (collision.range < 0) {
    //     //   console.log('collision.distance < 0', collision.range)
    //     // }
    //     return (
    //       collision.range === 0 &&
    //       this.isTowardsDirection(this.direction, this, collision.collider)
    //     )
    //   }) === undefined
    // )
  }

  public isTowardsDirection(
    direction: Direction,
    origin: GameObject,
    dest: GameObject
  ): boolean {
    let vector = Vec2.up.opposite
    if (direction === Direction.Down) {
      vector = Vec2.down.opposite
    } else if (direction === Direction.Left) {
      vector = Vec2.left
    } else if (direction === Direction.Right) {
      vector = Vec2.right
    }
    const sourceVector = dest.center.add(origin.center.opposite)
    const angle = sourceVector.angleBetween(vector) * (180 / Math.PI)
    // console.log(dest.center, origin.center, sourceVector, vector, angle)

    return angle < 45
  }

  public signedDistanceBetween(
    direction: Direction,
    obj: GameObject,
    other: GameObject
  ): number {
    switch (direction) {
      case Direction.Up:
        return obj.top - other.bottom
      case Direction.Down:
        return other.top - obj.bottom
      case Direction.Left:
        return obj.left - other.right
      case Direction.Right:
        return other.left - obj.right
    }
  }

  public distanceBetween(
    direction: Direction,
    obj: GameObject,
    other: GameObject
  ): number {
    return Math.abs(this.signedDistanceBetween(direction, obj, other))
  }
}
