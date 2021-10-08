const {
    EventEmitterCreator
} = require("../../core/eventemitter");

const Events = require('./events');
SelectablePicker.Events = { ...Events };

function SelectablePicker(params) {
    this.onSelectedItems = function (index, selected) { };
    this.show = function (done, cancel) { };

    const EventFunctions = {
        [Events.Selected]: function () {
            //Android only event
        }
    }

    EventEmitterCreator(this, EventFunctions);

    this.toString = function () {
        return "SelectablePicker";
    };
}

module.exports = SelectablePicker;