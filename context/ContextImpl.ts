import { ComponentChangedEvent, Entity } from "../entity/Entity";
import { EntityImpl } from "../entity/EntityImpl";
import { Group } from "../group/Group";
import { GroupImpl } from "../group/GroupImpl";
import { int } from "../helper/Types";
import { Matcher } from "../matcher/Matcher";
import { Context } from "./Context";

export class ContextImpl implements Context {

  private readonly _name: string;
  public get name(): string { return this._name; }

  private _entityIndex: int;

  private readonly _entities: Set<Entity>;

  private readonly _groups: Map<Matcher, Group>;

  constructor(name: string) {
    this._name = name;

    this._entityIndex = 0;
    this._entities = new Set();

    this._groups = new Map();
  }

  public createEntity(): Entity {
    const entity = new EntityImpl();
    entity.initialize(++this._entityIndex);

    this._entities.add(entity);
    // events
    entity.onComponentAdded.add(this.componentChangedHandler, this);
    entity.onComponentRemoved.add(this.componentChangedHandler, this);

    return entity;
  }

  public hasEntity(entity: Entity): boolean {
    return this._entities.has(entity);
  }

  public getAllEntities(): ReadonlySet<Entity> {
    return this._entities as ReadonlySet<Entity>;
  }

  public destoryEntity(entity: Entity): void {
    if (!this._entities.has(entity)) {
      throw new Error(`${this} cannot destroy ${entity}! Context does not contain that entity!`);
    }

    entity.destroy();
    this._entities.delete(entity);
  }

  public destroyAllEntities(): void {
    for (let entity of this._entities) {
      entity.destroy();
      this._entities.delete(entity);
    }
  }

  public getGroup(matcher: Matcher): Group {
    let group = this._groups.get(matcher);
    if (!group) {
      group = new GroupImpl(matcher);
      for (let entity of this._entities) {
        group.handleEntity(entity);
      }

      this._groups.set(matcher, group);
    }

    return group;
  }

  public toString() {
    return `Context_${this._name}`;
  }

  /**
   * Handles entity component add/remove event.
   * @param event
   */
  private componentChangedHandler(event: ComponentChangedEvent): void {
    const { entity } = event;

    // rematch groups
    for (let group of this._groups.values()) {
      group.handleEntity(entity);
    }
  }

  public reset() {
    this.destroyAllEntities();
    this._groups.clear();
  }

}
