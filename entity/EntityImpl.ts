import { Component } from "../component/Component";
import { Ctor, int, Type } from "../helper/Types";
import { Signal } from "../lib/signal-ts";
import { ComponentChangedEvent, ComponentReplacedEvent, Entity } from "./Entity";

export class EntityImpl implements Entity {

  public readonly onComponentAdded = new Signal<ComponentChangedEvent>();

  public readonly onComponentRemoved = new Signal<ComponentChangedEvent>();

  public readonly onComponentReplaced = new Signal<ComponentReplacedEvent>();

  private _id!: int;
  public get id(): int { return this._id; }

  private _components!: Map<Type, Component>;

  private _isEnabled: boolean = false;
  public get isEnabled(): boolean { return this._isEnabled; }

  /**
   * Don't new this manually. Use Context to manage entities.
   */
  constructor() {
  }

  public initialize(id: int): void {
    this._id = id;

    this._components = new Map();

    this._isEnabled = true;
  }

  public addComponent(component: Component): void {
    if (!this._isEnabled) {
      throw new Error(`Cannot add component ${component} to ${this}! Entity has already been destroyed`);
    }

    const type = component.constructor as Type;
    if (this.hasComponent(type)) {
      throw new Error(`Cannot add component ${component} to ${this}! Entity already has a component with type ${type.name}`);
    }

    this._components.set(type, component);

    this.onComponentAdded.dispatch({ entity: this, type, component });
  }

  public removeComponent(type: Ctor<Component>): void {
    if (!this._isEnabled) {
      throw new Error(`Cannot remove component ${type.name} from ${this}! Entity has already been destroyed`);
    }

    if (!this.hasComponent(type)) {
      throw new Error(`Cannot remove component ${type.name} from ${this}! Entity does not have a component of specified type!`);
    }

    this._removeComponent(type);
  }

  private _removeComponent(type: Ctor<Component>): void {
    const component = this._components.get(type)!;
    this._components.delete(type);

    this.onComponentRemoved.dispatch({ entity: this, type, component });
  }

  public replaceComponent<T extends Component>(type: Ctor<T>, newComponent: T): void {
    if (!this._isEnabled) {
      throw new Error(`Cannot replace component ${type.name} on ${this}! Entity has already been destroyed`);
    }

    if (!this.hasComponent(type)) {
      throw new Error(`Cannot replace component ${type.name} on ${this}! Entity does not have a component of specified type!`);
    }

    this._replaceComponent(type, newComponent);
  }

  private _replaceComponent<T extends Component>(type: Ctor<T>, newComponent: T): void {
    const previousComponent = this._components.get(type)!;
    if (newComponent === previousComponent) { return; }

    this._components.set(type, newComponent);

    this.onComponentReplaced.dispatch({ entity: this, type, previousComponent, newComponent });
  }

  public getComponent<T extends Component>(type: Ctor<T>): T {
    const component = this._components.get(type);
    if (!component) {
      throw new Error(`Cannot get component ${type.name} from ${this}! Entity does not have a component of specified type!`);
    }

    return component as T;
  }

  public getAllComponents(): Set<Component> {
    return new Set(this._components.values());
  }

  public hasComponent(type: Ctor<Component>): boolean {
    return this._components.has(type);
  }

  public removeAllComponents(): void {
    for (let type of this._components.keys()) {
      this._removeComponent(type);
    }
  }

  public destroy(): void {
    if (!this._isEnabled) {
      throw new Error(`Cannot destroy ${this}! Entity has already been destroyed`);
    }
    this._isEnabled = false;

    // removing will occurs events
    this.removeAllComponents();

    this.onComponentAdded.destroy();
    this.onComponentRemoved.destroy();
    this.onComponentReplaced.destroy();
  }

  public toString(): string {
    return `Entity_${this.id}`;
  }
}
