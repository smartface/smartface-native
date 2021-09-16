import wolfy87emitter from 'wolfy87-eventemitter';

export interface IEventEmitter {
  /**
   * Creates an event emitter instance to listen for the actions
   * @param {string} eventName 
   * @param {Function} callback - Gets as any arguments as it needs
   * @returns {Function} Call the function to remove the event
   */
   on(eventName: string, callback: (...args: any) => void): () => void;

   /**
    * Removes the specified event and invokes the callback after it is removed
    * @param {string} eventName 
    * @param {Function} callback 
    */
   off(eventName: string, callback?: (...args: any) => void): void;
 
   /**
    * Triggers the event manually.
    * @param {string} event 
    * @param {Array<*>} detail - Array of arguments that needs to be passed down
    */
   emit(event: string, detail?: any[]): void;
}
 
export class EventEmitter implements IEventEmitter {
  private emitter: wolfy87emitter;
  on(eventName: string, callback: (...args: any) => void): () => void;
  off(eventName: string, callback?: (...args: any) => void): void;
  emit(event: string, detail?: any[]): void;
}