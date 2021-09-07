module.exports = {
  on(eventName, callback) {
    return this.emitter.on(eventName, callback);
  },
  off(eventName, callback) {
    return this.emitter.off(eventName, callback);
  },
  emit(eventName) {
    return this.emitter.emit(eventName);
  }
}