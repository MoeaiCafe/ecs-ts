import { Entity } from "../entity/Entity";
import { Matcher } from "../matcher/Matcher";

/**
 * A group of entities which matches the specified matcher.
 */
export interface Group extends Iterable<Entity> {
  /** Returns the matcher used to create this group. */
  readonly matcher: Matcher;

  /**
   * Rematch an entity when it changes.
   * Used by the context to keep group-entities mapping.
   */
  handleEntity(entity: Entity): void;

  /** Returns all entities in this group. */
  getEntities(): Set<Entity>;
}
