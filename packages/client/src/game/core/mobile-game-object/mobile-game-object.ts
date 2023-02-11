import GameObject from '@/game/core/game-object/game-object'
import { Direction, GameObjectType, Vec2 } from '@/game/core/types'

export default abstract class MobileGameObject extends GameObject {
  protected abstract speed: number
  protected abstract direction: Direction
  protected abstract collideWith: GameObjectType[]

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

  public getColliders(gameObjects: GameObject[], ignoreInside: boolean = false) {
    return gameObjects.filter(obj => {
      const commonFilter =
        obj.id !== this.id &&
        this.collideWith.some(type => obj.gameObjectType === type) &&
        obj.center.distance(this.center) < (this.diagonal + obj.diagonal) / 2

        return ignoreInside ? commonFilter : !this.isInsideOf(obj)
    })
  }

  public getCollisions(
    colliders: GameObject[]
  ) {
    const collisions = colliders.filter(
      collider =>
        this.distanceBetweenBounds(collider, this.direction) === 0 &&
        this.isTowardsTo(collider)
    )

    return collisions
  }

  public isTowardsTo(dest: GameObject): boolean {
    let vector = Vec2.up.opposite
    if (this.direction === Direction.Down) {
      vector = Vec2.down.opposite
    } else if (this.direction === Direction.Left) {
      vector = Vec2.left
    } else if (this.direction === Direction.Right) {
      vector = Vec2.right
    }
    const sourceVector = dest.center.add(this.center.opposite)
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
