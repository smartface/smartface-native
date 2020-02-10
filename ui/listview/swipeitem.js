const Color = require("sf-core/ui/color");
const Font = require("sf-core/ui/font");

function SwipeItem(params) {

    var self = this;

    var _text = "Button";
    Object.defineProperty(self, 'text', {
        get: function() {
            return _text;
        },
        set: function(value) {
            _text = value;
        },
        enumerable: true
    });

    var _font = Font.create(Font.DEFAULT, 14);
    Object.defineProperty(self, 'font', {
        get: function() {
            return _font;
        },
        set: function(value) {
            _font = value;
        },
        enumerable: true
    });

    var _backgroundColor = Color.GRAY;
    Object.defineProperty(self, 'backgroundColor', {
        get: function() {
            return _backgroundColor;
        },
        set: function(value) {
            _backgroundColor = value;
        },
        enumerable: true
    });

    var _textColor = Color.WHITE;
    Object.defineProperty(self, 'textColor', {
        get: function() {
            return _textColor;
        },
        set: function(value) {
            _textColor = value;
        },
        enumerable: true
    });

    var _onPress = function() {};
    Object.defineProperty(self, 'onPress', {
        get: function() {
            return _onPress;
        },
        set: function(value) {
            _onPress = value;
        },
        enumerable: true
    });

    var _icon = undefined;
    Object.defineProperty(self, 'icon', {
        get: function() {
            return _icon;
        },
        set: function(value) {
            _icon = value;
        },
        enumerable: true
    });

    self.ios = {};
    self.android = {};

    var _ios_padding = 10;
    Object.defineProperty(self.ios, 'padding', {
        get: function() {
            return _ios_padding;
        },
        set: function(value) {
            _ios_padding = value;
        },
        enumerable: true
    });

    var _ios_iconTextSpacing = 3;
    Object.defineProperty(self.ios, 'iconTextSpacing', {
        get: function() {
            return _ios_iconTextSpacing;
        },
        set: function(value) {
            _ios_iconTextSpacing = value;
        },
        enumerable: true
    });

    var _ios_isAutoHide = true;
    Object.defineProperty(self.ios, 'isAutoHide', {
        get: function() {
            return _ios_isAutoHide;
        },
        set: function(value) {
            _ios_isAutoHide = value;
        },
        enumerable: true
    });

    let _android_threshold = 0.5,
        _borderBottomLeftRadius = 0,
        _borderBottomRightRadius = 0,
        _borderTopRightRadius = 0,
        _borderTopLeftRadius = 0,
        _paddingLeft = 0,
        _paddingRight = 0,
        _paddingBottom = 0,
        _paddingTop = 0;
    Object.defineProperties(self.android, {
        'threshold': {
            get: function() {
                return _android_threshold;
            },
            set: function(value) {
                _android_threshold = value;
            },
            enumerable: true
        },
        borderBottomLeftRadius: {
            get: () => _borderBottomLeftRadius,
            set: (value) => _borderBottomLeftRadius = value,
            enumerable: true
        },
        borderBottomRightRadius: {
            get: () => _borderBottomRightRadius,
            set: (value) => _borderBottomRightRadius = value,
            enumerable: true
        },
        borderTopLeftRadius: {
            get: () => _borderTopLeftRadius,
            set: (value) => _borderTopLeftRadius = value,
            enumerable: true
        },
        borderTopRightRadius: {
            get: () => _borderTopRightRadius,
            set: (value) => _borderTopRightRadius = value,
            enumerable: true
        },
        paddingLeft: {
            get: () => _paddingLeft,
            set: (value) => _paddingLeft = value,
            enumerable: true
        },
        paddingRight: {
            get: () => _paddingRight,
            set: (value) => _paddingRight = value,
            enumerable: true
        },
        paddingTop: {
            get: () => _paddingTop,
            set: (value) => _paddingTop = value,
            enumerable: true
        },
        paddingBottom: {
            get: () => _paddingBottom,
            set: (value) => _paddingBottom = value,
            enumerable: true
        }
    });

    // Assign parameters given in constructor
    params && (function(params) {
        for (var param in params) {
            if (param === "ios" || param === "android") {
                setOSSpecificParams.call(this, params[param], param);
            } else {
                this[param] = params[param];
            }
        }

        function setOSSpecificParams(params, key) {
            for (var param in params) {
                this[key][param] = params[param];
            }
        }
    }.bind(this)(params));
};

module.exports = SwipeItem;