const { EventEmitter } = require('./emitterClass');
const EventEmitterMixin = require('./mixin');
const { EventEmitterCreator, EventEmitterWrapper } = require('./emitterFactory');

module.exports = {
    EventEmitterCreator,
    EventEmitterWrapper,
    EventEmitterMixin,
    EventEmitter
};