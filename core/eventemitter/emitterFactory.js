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
 function EventWrapper(target, event, callback, ...args) {
  const handler = function(...args) {
    return target.emitter.emit(event, ...args);
  }
  typeof callback === 'function' && callback();
  return handler.bind(target, ...args);
}

module.exports = {
  EventWrapper
};
