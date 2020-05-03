interface SignalHandler<TEventArgs extends object> {
  (eventArgs: TEventArgs): void;
}

interface SignalBinding<TEventArgs extends object> {
  handler: SignalHandler<TEventArgs>;
  once: boolean;
  thisArg?: object;
}

/**
 * A signal event system implementation.
 */
export class Signal<TEventArgs extends object> {
  /**
   * event handler binding list
   */
  private readonly bindings: Set<SignalBinding<TEventArgs>> = new Set();

  constructor() { }

  /**
   * Adds a event handler.
   * @param handler   handler function
   * @param thisArg   binding this argument
   */
  public add(handler: SignalHandler<TEventArgs>, thisArg?: object) {
    this.bindings.add({
      handler,
      thisArg,
      once: false
    });
  }

  /**
   * Adds a event handler.
   * Once dispatched, will be removed automatically.
   * @param handler   handler function
   * @param thisArg   binding this argument
   */
  public once(handler: SignalHandler<TEventArgs>, thisArg?: object) {
    this.bindings.add({
      handler,
      thisArg,
      once: true
    });
  }

  /**
   * Returns whether this signal has any listener.
   */
  public hasListeners() {
    return this.bindings.size > 0;
  }

  /**
   * Returns whether this signal has a specified listener.
   * @param handler
   * @param thisArg
   */
  public hasBinding(handler: TEventArgs, thisArg?: object) {
    for (let binding of this.bindings) {
      if (binding.handler === handler && binding.thisArg === thisArg) {
        return true;
      }
    }
  }

  /**
   * Dispatchs a event.
   * @param args  event arguments
   */
  public dispatch(args: TEventArgs) {
    for (let binding of this.bindings) {
      if (binding.once) {
        this.bindings.delete(binding);
      }
      binding.handler.call(binding.thisArg, args);
    }
  }

  /**
   * Removes a speccified listener.
   * @param handler
   * @param thisArg
   */
  public remove(handler: TEventArgs, thisArg?: object) {
    for (let binding of this.bindings) {
      if (binding.handler === handler && binding.thisArg === thisArg) {
        this.bindings.delete(binding);
      }
    }
  }

  /**
   * Removes all listeners.
   */
  public removeAll() {
    this.bindings.clear();
  }

  /**
   * Destory.
   */
  public destroy() {
    // detach
    this.removeAll();
  }
}
