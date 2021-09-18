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
export function EventWrapper(target: any, callback: (...args: any) => any, event: string, ...args: any[]) : () => any;
