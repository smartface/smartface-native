const { EventEmitter } = require('./emitterClass');
const EventEmitterMixin = require('./mixin');
const { EventWrapper } = require('./emitterFactory');

module.exports = {
    EventWrapper,
    EventEmitterMixin,
    EventEmitter
};