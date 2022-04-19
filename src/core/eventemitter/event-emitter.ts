import Events from 'events';

export type EventListenerCallback = (...args: any) => void;

export interface IEventEmitter<TEvent extends string = string> {
  /**
   * Creates an event emitter instance to listen for the actions
   * @param {string} eventName
   * @param {Function} callback - Gets as any arguments as it needs
   * @returns {Function} Call the function to remove the event
   */
  on(eventName: TEvent, callback: EventListenerCallback): () => void;

  /**
   * Creates an event emitter instance to listen for the actions
   * @param {string} eventName
   * @param {Function} callback - Gets as any arguments as it needs
   * @returns {Function} Call the function to remove the event
   */
  once(eventName: TEvent, callback: EventListenerCallback): () => void;

  /**
   * Removes the specified event and invokes the callback after it is removed
   * @param {string} eventName
   * @param {Function} callback
   */
  off(eventName: TEvent, callback?: EventListenerCallback): void;

  /**
   * Triggers the event manually.
   * @param {string} event
   * @param {*} args - Arguments that needs to be passed down
   */
  emit(event: TEvent, ...args: any[]): void;

  /**
   * Adds the listener function to the beginning of the listeners array for the event named eventName.
   * No checks are made to see if the listener has already been added.
   * Multiple calls passing the same combination of eventName and listener will result in the listener being added, and called, multiple times.
   */
  prependListener(eventName: TEvent, callback: EventListenerCallback): void;
  /**
   * Adds a one-time listener function for the event named eventName to the beginning of the listeners array. The next time eventName is triggered, this listener is removed, and then invoked.
   */
  prependOnceListener(eventName: TEvent, callback: EventListenerCallback): void;
}

export class EventEmitter<TEvent extends string> implements IEventEmitter<TEvent> {
  private emitter: Events.EventEmitter = new Events();

  on(eventName: TEvent, callback: EventListenerCallback) {
    this.emitter.on(eventName, callback);
    return () => this.off(eventName, callback);
  }
  once(eventName: TEvent, callback: EventListenerCallback) {
    this.emitter.once(eventName, callback);
    return () => this.off(eventName, callback);
  }
  off(eventName: TEvent, callback: EventListenerCallback) {
    this.emitter.removeListener(eventName, callback);
  }
  emit(event: TEvent, ...args: any[]) {
    this.emitter.emit(event, ...args);
  }
  prependListener(eventName: TEvent, callback: EventListenerCallback) {
    this.emitter.prependListener(eventName, callback);
  }
  prependOnceListener(eventName: TEvent, callback: EventListenerCallback) {
    this.emitter.prependOnceListener(eventName, callback);
  }

  /**
   * Events of the Module in key-value notation.
   * Key means the Enum name
   * Value means the parameter to be passed to the EventEmitter
   */
  static Events: { [key: string]: string } = {};
  // static Events: any;
}
