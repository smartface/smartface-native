const TypeUtil = require('../../util/type');
const UIDatePickerMode = require("../../util").UIDatePickerMode;
const { EventEmitterCreator } = require('../../core/eventemitter');
const Events = require('./events');
TimePicker.Events = {...Events};

function TimePicker(params) {
    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_UIDatePicker();
    }

    self.android = {};

    self.onTimeSelected = function() {};

    self.onTimeSelectedListener = function(e) {
        var time = e.date;
        self.onTimeSelected({
            hour: time.getHours(),
            minute: time.getMinutes()
        });
    };

    const EventFunctions = {
        [Events.Selected]: function() {
            self.onTimeSelected = function (state) {
                this.emitter.emit(Events.Selected, state);
            } 
        }
    }
    
    EventEmitterCreator(this, EventFunctions);

    self.nativeObject.onSelected = self.onTimeSelectedListener;

    var _hours = null;
    var _minutes = null;

    self.setTime = function(time) {
        if (TypeUtil.isNumeric(time.hour) && TypeUtil.isNumeric(time.minute)) {
            _hours = time.hour;
            _minutes = time.minute;
        }
    };

    self.show = function() {
        var date = new Date();
        if (_hours && _minutes) {
            date.setHours(_hours);
            date.setMinutes(_minutes);
        }
        self.nativeObject.defaultDate = date;
        self.nativeObject.datePickerMode = UIDatePickerMode.time;
        self.nativeObject.show();
    };

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = TimePicker;