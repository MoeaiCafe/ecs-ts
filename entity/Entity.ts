import { Component } from "../component/Component";
import { Ctor, int, Type } from "../helper/Types";
import { Signal } from "../lib/signal-ts";

/**
 * Entity components added or removed.
 */
export interface ComponentChangedEvent {
  entity: Entity;
  type: Type;
  component: Component;
}

/**
 * Entity components replaced.
 */
export interface ComponentReplacedEvent {
  entity: Entity;
  type: Type;
  previousComponent: Component;
  newComponent: Component;
}

/**
 * Entity, as a container of components.
 */
export interface Entity {

  /** Occurs when a new component gets added. */
  readonly onComponentAdded: Signal<ComponentChangedEvent>;

  /** Occurs when a component gets removed. */
  readonly onComponentRemoved: Signal<ComponentChangedEvent>;

  /** Occurs when a component gets replaced. */
  readonly onComponentReplaced: Signal<ComponentReplacedEvent>;

  /** An unique id in context. */
  readonly id: int;

  /**
   * Whether this entity is active.
   * Will be disabled after destroyed.
   */
  readonly isEnabled: boolean;

  /**
   * Initialize the entity.
   * Dont't call this manually.
   * @param id
   */
  initialize(id: int): void;

  /**
   * Add a component to this entity.
   * @param component
   */
  addComponent(component: Component): void;

  /**
   * Remove a component.
   * @param type
   */
  removeComponent(type: Ctor<Component>): void;

  /**
   * Replace a component. Will throw an error if there is not an old one.
   * @param type
   * @param newComponent
   */
  replaceComponent<T extends Component>(type: Ctor<T>, newComponent: T): void;

  /**
   * Get a component with a specified type.
   * @param type
   */
  getComponent<T extends Component>(type: Ctor<T>): T;

  /**
   * Get all components.
   */
  getAllComponents(): Set<Component>;

  /**
   * Determines whether this entity has a component with the specified type.
   * @param type
   */
  hasComponent(type: Ctor<Component>): boolean;

  /**
   * Removes all components.
   */
  removeAllComponents(): void;

  /**
   * Destory entity.
   * Dont't call this manually.
   */
  destroy(): void;

}
