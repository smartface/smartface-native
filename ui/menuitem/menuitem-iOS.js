const {
    EventEmitterMixin,
    EventEmitter
  } = require("../../core/eventemitter");

const Events = require('./events');

MenuItem.prototype = Object.assign({}, EventEmitterMixin);

function MenuItem(params) {
    var self = this;
    self.emitter = new EventEmitter();

    const EventFunctions = {
        [Events.Selected]: function() {
            self.onSelected = function (state) {
                self.emitter.emit(Events.CallStateChanged, state);
            } 
        }
    }

    var _title = "";
    Object.defineProperty(this, 'title', {
        get: function() {
            return _title;
        },
        set: function(title) {
            _title = title;
        },
        enumerable: true
    });

    self.onSelectedListener = function() {
        self.onSelected();
    }
    self.onSelected = function() {}

    self.ios = {};

    self.android = {};

    var _style = 0;
    Object.defineProperty(self.ios, 'style', {
        get: function() {
            return _style;
        },
        set: function(value) {
            _style = value;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'on', {
        value: (event, callback) => {
            EventFunctions[event].call(this);
            this.emitter.on(event, callback);
        }
    });

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

Object.defineProperty(MenuItem, "android", {
    value: {},
    enumerable: true
});

Object.defineProperty(MenuItem, "ios", {
    value: {},
    enumerable: true
});

Object.defineProperty(MenuItem.ios, "Style", {
    value: {},
    enumerable: true
});

Object.defineProperties(MenuItem.ios.Style, {
    'DEFAULT': {
        value: 0,
        enumerable: true
    },
    'CANCEL': {
        value: 1,
        enumerable: true
    },
    'DESTRUCTIVE': {
        value: 2,
        enumerable: true
    }
});

module.exports = MenuItem;