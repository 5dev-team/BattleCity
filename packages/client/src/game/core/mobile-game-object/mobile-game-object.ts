import GameObject from '@/game/core/game-object/game-object'
import { Direction, UpdateState, Vec2 } from '@/game/core/types'

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

  public checkCollisions(state: UpdateState): boolean {
    let colliders = [...state.world.gameObjects]

    switch (this.direction) {
      case Direction.Up:
        colliders = colliders.filter(collider => collider.pos.y < this.pos.y)
        break
      case Direction.Down:
        colliders = colliders.filter(collider => collider.pos.y > this.pos.y)
        break
      case Direction.Left:
        colliders = colliders.filter(collider => collider.pos.x < this.pos.x)
        break
      case Direction.Right:
        colliders = colliders.filter(collider => collider.pos.x > this.pos.x)
        break
    }

    const collisions = colliders.map(collider => ({
      collider,
      range: this.distanceBetween(this.direction, this, collider),
    }))

    return (
      collisions.find(
        collision =>
          collision.range === 0 &&
          this.isTowardsDirection(this.direction, this, collision.collider)
      ) === undefined
    )
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
    console.log(dest.center, origin.center, sourceVector, vector, angle)

    return angle < 45
  }

  public signedDistanceBetween(
    direction: Direction,
    obj: GameObject,
    other: GameObject
  ): number {
    switch (direction) {
      case Direction.Up:
        return other.bottom - obj.top
      case Direction.Down:
        return other.top - obj.bottom
      case Direction.Left:
        return other.right - obj.left
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
