import GameObject from '@/game/core/game-object/game-object'
import { Direction, GameObjectType, Vec2 } from '@/game/core/types'

export default abstract class MobileGameObject extends GameObject {
  protected abstract speed: number
  protected abstract direction: Direction
  protected abstract collideWith: GameObjectType[]

  public move(offset: Vec2): void {
    this.pos.x += offset.x
    this.pos.y += offset.y
  }

  public stop() {
    this.speed = 0
  }

  public getColliders(gameObjects: GameObject[]) {
    return gameObjects.filter(
      obj => obj.id !== this.id && this.collideWith.includes(obj.gameObjectType)
    )
  }

  public getCollisions(colliders: GameObject[], ignoreInside = false) {
    const collisions = colliders.filter(
      c =>
        c.center.distance(this.center) < (this.diagonal + c.diagonal) / 2 &&
        this.distanceBetweenBounds(c, this.direction) === 0 &&
        this.isTowardsTo(c)
    )

    return ignoreInside
      ? collisions
      : collisions.filter(c => !this.isInsideOf(c))
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
    const radians = sourceVector.angleBetween(vector)
    const angle = radians * (180 / Math.PI)
    
    if (angle < 45) {
      const maxTowardsOffset = (this.width + dest.width) / 2
      const offset = sourceVector.length() * Math.sin(radians)

      return offset < maxTowardsOffset
    }
    return false
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

  protected getMovement(offsetLimit: number): number {
    return offsetLimit >= this.speed ? this.speed : offsetLimit
  }

  protected getMoveOffsetLimit(colliders: GameObject[]): number {
    return this.getMoveOffset(colliders, this.speed)
  }

  protected getMoveOffset(
    colliders: GameObject[],
    defaultOffset: number
  ): number {
    return colliders
      .filter(
        obj =>
          obj.id !== this.id &&
          this.collideWith.some(objType => obj.gameObjectType === objType) &&
          this.distanceBetweenBounds(obj, this.direction) < this.speed &&
          this.isTowardsTo(obj)
      )
      .reduce((distance: number, collider) => {
        const distanceToCollider = this.distanceBetweenBounds(
          collider,
          this.direction
        )

        return distanceToCollider < distance ? distanceToCollider : distance
      }, defaultOffset)
  }
}
