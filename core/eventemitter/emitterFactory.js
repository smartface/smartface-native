const { EventEmitter } = require('./emitterClass');

/**
 * This callback will be executed after the handler function is set.
 * Can get any param, can return anything.
 * @callback EventCallback
 */

/**
 * This function will be bound to this
 * @param {Object} target - Target type, "this" should be passed
 * @param {string} event - The event to be handled
 * @param {EventCallback} callback - Pass null or empty function if you don't need to set any callback
 * @param  {Object} args - This might take multiple parameters and can get anything.
 * @returns {Function} - The function to be used on the native parts as event handler.
 */
 function EventEmitterWrapper(target, event, callback, ...args) {
  const handler = function(...args) {
    return target.emitter.emit(event, ...args);
  }
  typeof callback === 'function' && callback();
  return handler.bind(target, ...args);
}

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
function EventEmitterCreator(targetInstance, eventFunctions, eventCallback = () => {}) {
  const parentOnFunction = targetInstance.on;
  targetInstance.emitter = targetInstance.emitter || new EventEmitter();
  
  const onFunction = (once = false) => (event, callback) => {
    eventFunctions[event] && eventFunctions[event].call(targetInstance);
    typeof eventCallback === 'function' && eventCallback.call(targetInstance);
    var method = once ? targetInstance.emitter.once : targetInstance.emitter.on;
    method.call(targetInstance.emitter, event, callback);
    return () => targetInstance.emitter.off(event, callback);
  };
  Object.defineProperty(targetInstance, 'on', {
    value: onFunction(false),
    configurable: true
  });

  Object.defineProperty(targetInstance, 'once', {
    value: onFunction(true),
    configurable: true
  });

  Object.defineProperty(targetInstance, 'off', {
    value: (event, callback) => targetInstance.emitter.off(event, callback),
    configurable: true
  });

  Object.defineProperty(targetInstance, 'emit', {
    value: (event, ...args) => targetInstance.emitter.emit(event, ...args),
    configurable: true
  });
}

module.exports = {
  EventEmitterWrapper,
  EventEmitterCreator
};
