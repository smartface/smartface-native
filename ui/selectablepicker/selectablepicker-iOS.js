const {
    EventEmitterMixin
  } = require("../../core/eventemitter");

const Events = require('./events');

SelectablePicker.prototype = Object.assign({}, EventEmitterMixin);

function SelectablePicker(params) {
    this.onSelectedItems = function(index, selected) {};
    this.show = function(done, cancel) {};

    const EventFunctions = {
        [Events.Selected]: function() {
            //Android only event
        }
    }

    Object.defineProperty(this, 'on', {
        value: (event, callback) => {
            EventFunctions[event].call(this);
            this.emitter.on(event, callback);
        }
    });

    this.toString = function() {
        return "SelectablePicker";
    };
}

module.exports = SelectablePicker;