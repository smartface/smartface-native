const wolfy87emitter = require("wolfy87-eventemitter");

function EventEmitter() {
    this.emitter = new wolfy87emitter();
}
/**
* Creates an event emitter instance to listen for the actions
* @param {string} eventName
* @param {Function} callback - Gets as any arguments as it needs
* @returns {Function} Call the function to remove the event
*/
EventEmitter.prototype.on = function (eventName, callback) {
    this.emitter.on(eventName, callback);
    return () => this.off(eventName, callback);
}

/**
 * Removes the specified event and invokes the callback after it is removed
 * @param {string} eventName
 * @param {Function} callback
 */
EventEmitter.prototype.off = function (eventName, callback) {
    this.emitter.removeListener(eventName, callback);
}

/**
 * Triggers the event manually.
 * @param {string} event
 * @param {Array<*>} args - Array of arguments that needs to be passed down
 */
EventEmitter.prototype.emit = function (event, ...args) {
    this.emitter.trigger(event, args);
}

module.exports = {
    EventEmitter
};
