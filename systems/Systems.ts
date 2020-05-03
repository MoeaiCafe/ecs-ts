import { System } from "./System";

/**
 * A System container used to call methods of sub systems.
 */
export class Systems implements System {

  private readonly _systems: System[];

  constructor() {
    this._systems = [];
  }

  /**
   * Adds a system.
   */
  public add(...args: System[]) {
    this._systems.push(...args);
  }

  /**
   * initialize all systems.
   */
  public initialize(): void {
    for (let system of this._systems) {
      system.initialize && system.initialize();
    }
  }

  /**
   * execute all systems.
   */
  public execute(): void {
    for (let system of this._systems) {
      system.execute && system.execute();
    }
  }

  /**
   * cleanup all systems.
   */
  public cleanup(): void {
    for (let system of this._systems) {
      system.cleanup && system.cleanup();
    }
  }

  /**
   * tearDown all systems.
   */
  public tearDown(): void {
    for (let system of this._systems) {
      system.tearDown && system.tearDown();
    }
  }

}
