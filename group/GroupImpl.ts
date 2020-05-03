import { Entity } from "../entity/Entity";
import { Matcher } from "../matcher/Matcher";
import { Group } from "./Group";

export class GroupImpl implements Group {
  private readonly _entities: Set<Entity> = new Set();

  private readonly _matcher: Matcher;
  public get matcher(): Matcher { return this._matcher; }

  /**
   * Never new this class manually.
   * Use context.getGroup(matcher) to get a group instance.
   * @param matcher
   */
  constructor(matcher: Matcher) {
    this._matcher = matcher;
  }

  public handleEntity(entity: Entity): void {
    // if entity is destoryed, just delete it.
    if (entity.isEnabled) {
      if (this._matcher.matches(entity)) {
        if (!this._entities.has(entity)) {
          this._entities.add(entity);
        }
      } else {
        this._entities.delete(entity);
      }
    } else {
      this._entities.delete(entity);
    }
  }

  public getEntities(): Set<Entity> {
    return new Set(this._entities);
  }

  public toString() {
    return `Group[${this._matcher}]`;
  }

  public [Symbol.iterator]() {
    return this._entities.values();
  }

}
