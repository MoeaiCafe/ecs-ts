import { Entity } from "../entity/Entity";
import { Group } from "../group/Group";
import { Matcher } from "../matcher/Matcher";

/**
 * A manager of entities and groups.
 * You can only create, get and destroy entities by using a context.
 */
export interface Context {
  readonly name: string;

  /**
   * Creates a new entity
   */
  createEntity(): Entity;

  /**
   * Determines whether the context has the specified entity.
   * @param entity
   */
  hasEntity(entity: Entity): boolean;

  /**
   * Returns all entities in the context.
   */
  getAllEntities(): ReadonlySet<Entity>;

  /**
   * Destories an entity in the context.
   * Throws error if the context does not have the entity.
   * @param entity
   */
  destoryEntity(entity: Entity): void;

  /**
   * Destroys all entities in the context.
   */
  destroyAllEntities(): void;

  /**
   * Returns a group for the specified matcher.
   * Or create a new group if there is not an existing one with that matcher.
   */
  getGroup(matcher: Matcher): Group;

  /**
   * Resets the context.
   * Will destroys all entities and WILL NOT reset index.
   * You cannot destory a context, but only reset it.
   */
  reset(): void;
}
