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
}
 
export class EventEmitter<TEvent extends string> implements IEventEmitter<TEvent> {
  protected emitter: Events.EventEmitter = new Events();

  on(eventName: TEvent, callback: EventListenerCallback) {
    this.emitter.on(eventName, callback);
    return () => this.off(eventName, callback);
  }
  once(eventName: TEvent, callback: EventListenerCallback) {
    this.emitter.once(eventName, callback);
    return () => this.off(eventName, callback);
  }
  off(eventName: TEvent, callback?: EventListenerCallback) {
    this.emitter.removeListener(eventName, callback);
  }
  emit(event: TEvent, ...args: any[]) {
    this.emitter.emit(event, ...args);
  }

  /**
   * Events of the Module in key-value notation.
   * Key means the Enum name
   * Value means the parameter to be passed to the EventEmitter
   */
  static Events: { [key: string]: string } = {};
  // static Events: any;
}

// export class EventEmitterMixin {
//   static on: (eventName: string, callback: (...args: any) => any) => any;
//   static once: (eventName: string, callback: (...args: any) => any) => any;
//   static off: (eventName: string, callback: (...args: any) => any) => any;
//   static emit: (eventName: string, ...args: any[]) => any
// }

// export function EventClassFactory(parentClass: any, events: Record<string, string>): any;
// export function EventEmitterWrapper(target: any, callback: (...args: any) => any, event: string, ...args: any[]) : () => any;
/**
 * This function adds core eventemitter functionality to the targeted class.
 * It modifies the class and the instance.
 * - It adds Events list as Class.Events as static variable
 * - It mixins the eventEmitter class if not inherited
 * - It adds relevant inheritance to the class if there is a parent class
 * - It alters the 'on' method relevant with inheritance
 *  * @example
 * ```
 * // viewGroup-Android.js
 * const Events = { ...View.Events, ...EventList }; // Inherit the Parent Events
 * const EventFunctions = {
 *   [EventsList.ViewAdded]: function() {
 *     this.onViewAdded = EventEmitterWrapper(this, EventList.ViewAdded, null);
 *   }
 * } 
 * 
 * function ViewGroup() {
 *   function emitterCallBack() {
 *     if (!this.didSetHierarchyChangeListener) {
 *       setHierarchyChangeListener(this);
 *     }
 *   }
 *   EventEmitterCreator(this, EventFunctions, emitterCallBack.bind(this));
 * }
 * 
 * ```
 * @param {*} targetInstance this object
 * @param {*} eventFunctions Object of Functions. It will be bound to the current context using targetInstance parameter. If there is no function to inherit, pass empty object.
 * @param {*} callback This will be invoked after the relevant eventFunction is called. Will be bound to 'targetInstance' There is no filter.
//  */
//  function EventEmitterCreator(targetInstance, eventFunctions, eventCallback = () => {}) {
//   const parentOnFunction = targetInstance.on;
//   targetInstance.emitter = targetInstance.emitter || new EventEmitter();

//   const onFunction = (once = false) => (event, callback) => {
//     eventFunctions[event] && eventFunctions[event].call(targetInstance);
//     typeof eventCallback === 'function' && eventCallback.call(targetInstance);
//     var method = once ? targetInstance.emitter.once : targetInstance.emitter.on;
//     method.call(targetInstance.emitter, event, callback);
//     return () => targetInstance.emitter.off(event, callback);
//   };
//   Object.defineProperty(targetInstance, 'on', {
//     value: onFunction(false),
//     configurable: true
//   });

//   Object.defineProperty(targetInstance, 'once', {
//     value: onFunction(true),
//     configurable: true
//   });

//   Object.defineProperty(targetInstance, 'off', {
//     value: (event, callback) => targetInstance.emitter.off(event, callback),
//     configurable: true
//   });

//   Object.defineProperty(targetInstance, 'emit', {
//     value: (event, ...args) => targetInstance.emitter.emit(event, ...args),
//     configurable: true
//   });
// }
