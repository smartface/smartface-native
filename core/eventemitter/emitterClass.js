/** @type {import("events").EventEmitter} */
const Events = require("events");

function EventEmitter() {
    /** @type {import("events").EventEmitter} */
    this.emitter = new Events();
}
/**
* Creates an event emitter instance to listen for the actions
* @param {string} eventName
* @param {Function} callback - Gets as any arguments as it needs
* @returns {Function} Call the function to remove the event
*/
EventEmitter.prototype.once = function (eventName, callback) {
    this.emitter.once(eventName, callback);
    return () => this.off(eventName, callback);
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
 * @param {Array<*>} args - Arguments that needs to be passed down
 */
EventEmitter.prototype.emit = function (event, ...args) {
    this.emitter.emit(event, ...args);
}

module.exports = {
    EventEmitter
};
