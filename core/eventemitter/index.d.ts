import wolfy87emitter from 'wolfy87-eventemitter';

export interface IEventEmitter<TEvent = string> {
  /**
   * Creates an event emitter instance to listen for the actions
   * @param {string} eventName 
   * @param {Function} callback - Gets as any arguments as it needs
   * @returns {Function} Call the function to remove the event
   */
   on(eventName: TEvent, callback: (...args: any) => void): () => void;

   /**
    * Removes the specified event and invokes the callback after it is removed
    * @param {string} eventName 
    * @param {Function} callback 
    */
   off(eventName: TEvent, callback?: (...args: any) => void): void;
 
   /**
    * Triggers the event manually.
    * @param {string} event 
    * @param {Array<*>} detail - Array of arguments that needs to be passed down
    */
   emit(event: TEvent, detail?: any[]): void;
}
 
export class EventEmitter implements IEventEmitter {
  private emitter: wolfy87emitter;
  on(eventName: string, callback: (...args: any) => void): () => void;
  off(eventName: string, callback?: (...args: any) => void): void;
  emit(event: string, detail?: any[]): void;
    /**
   * Events of the Module in key-value notation.
   * Key means the Enum name
   * Value means the parameter to be passed to the EventEmitter
   */
  static Events: { [key: string]: string };
  // static Events: any;
}

export class EventEmitterMixin {
  static on: (eventName: string, callback: (...args: any) => any) => any;
  static off: (eventName: string, callback: (...args: any) => any) => any;
  static emit: (eventName: string, callback: (...args: any) => any) => any
}

export function EventClassFactory(parentClass: any, events: Record<string, string>): any;
export function EventEmitterWrapper(target: any, callback: (...args: any) => any, event: string, ...args: any[]) : () => any;
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
 */
export function EventEmitterCreator(targetInstance: any, eventFunctions: Record<string, (...args: any) => any>, eventCallback: (...args: any) => any)