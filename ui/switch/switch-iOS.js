const View = require('../view');
const Color = require("../../ui/color");
const UIControlEvents = require("../../util").UIControlEvents;
const Events = require('./events');
const { EventEmitterCreator } = require('../../core/eventemitter');
Switch.Events = { ...View.Events, ...Events };

Switch.prototype = Object.create(View.prototype);
function Switch(params) {
    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_UISwitch();
    }

    View.apply(this);

    if (__SF_UIView.viewAppearanceSemanticContentAttribute() == 3) {
        self.nativeObject.setValueForKey(3, "semanticContentAttribute");
    } else if (__SF_UIView.viewAppearanceSemanticContentAttribute() == 4) {
        self.nativeObject.setValueForKey(4, "semanticContentAttribute");
    }

    self.nativeObject.layer.masksToBounds = false;

    const EventFunctions = {
        [Events.ToggleChanged]: function () {
            _onToggleChanged = (state) => {
                this.emitter.emit(Events.ToggleChanged, state);
            }
        }
    }

    EventEmitterCreator(this, EventFunctions);

    Object.defineProperty(self, 'enabled', {
        get: function () {
            return self.nativeObject.setEnabled;
        },
        set: function (value) {
            self.nativeObject.setEnabled = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'thumbOnColor', {
        get: function () {
            if (self.nativeObject.thumbTintColor === undefined) {
                return null;
            } else {
                return new Color({
                    color: self.nativeObject.thumbTintColor
                });
            }
        },
        set: function (value) {
            if (value === null || value === undefined) {
                self.nativeObject.thumbTintColor = undefined;
            } else {
                self.nativeObject.thumbTintColor = value.nativeObject;
            }
        },
        enumerable: true
    });

    var _toggleOnColor = Color.GREEN;
    Object.defineProperty(self, 'toggleOnColor', {
        get: function () {
            return _toggleOnColor;
        },
        set: function (value) {
            _toggleOnColor = value;
            self.nativeObject.onTintColor = value.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'toggle', {
        get: function () {
            return self.nativeObject.isOn;
        },
        set: function (value) {
            self.nativeObject.setOnAnimated(value, true);
        },
        enumerable: true
    });

    var _onToggleChanged;
    Object.defineProperty(self, 'onToggleChanged', {
        get: function () {
            return _onToggleChanged;
        },
        set: function (value) {
            _onToggleChanged = value.bind(this);
            var onToggleChangedHandler = function () {
                if (typeof _onToggleChanged === 'function') {
                    var state = self.toggle;
                    _onToggleChanged(state);
                }
            };
            self.nativeObject.addJSTarget(onToggleChangedHandler, UIControlEvents.valueChanged);
        },
        enumerable: true
    });

    self.android = {};
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

}

module.exports = Switch;