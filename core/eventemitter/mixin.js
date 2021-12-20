const { EventEmitter } = require(".");

module.exports = {
  emitter: {
    get() {
      this.emitter = this.emitter || new EventEmitter();
      return this.emitter;
    },
    set(value) {
      this.emitter = value;
    }
  },
  on(eventName, callback) {
    return this.emitter.on(eventName, callback);
  },
  once(eventName, callback) {
    return this.emitter.once(eventName, callback);
  },
  off(eventName, callback) {
    return this.emitter.off(eventName, callback);
  },
  emit(eventName) {
    return this.emitter.emit(eventName);
  }
}