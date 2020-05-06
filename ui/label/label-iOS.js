const View = require('../view');
const extend = require('js-base/core/extend');
const Color = require("sf-core/ui/color");
const SFTextAlignment = require("sf-core/ui/textalignment");
const Invocation = require('sf-core/util').Invocation;
const NSLineBreakMode = require('sf-core/util/iOS/nslinebreakmode');

Label.prototype = Object.create(View.prototype);
function Label(params) {
    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_SMFUILabel();
    }

    View.apply(this);

    //Defaults
    self.touchEnabled = true;

    Object.defineProperty(self, 'font', {
        get: function() {
            return self.nativeObject.font;
        },
        set: function(value) {
            self.nativeObject.font = value;
            self.minimumFontSize = self.minimumFontSize;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'adjustFontSizeToFit', {
        get: function() {
            return self.nativeObject.adjustsFontSizeToFitWidth;
        },
        set: function(value) {
            value && (self.nativeObject.baselineAdjustment = 1);
            self.nativeObject.adjustsFontSizeToFitWidth = value;
        },
        enumerable: true,
        configurable: true
    });

    var _minimumFontSize = 1;
    Object.defineProperty(this, 'minimumFontSize', {
        get: function() {
            return _minimumFontSize;
        },
        set: function(value) {
            _minimumFontSize = value;
            var minimumScaleFactor = _minimumFontSize / self.font.size;
            self.nativeObject.minimumScaleFactor = minimumScaleFactor;
        },
        enumerable: true,
        configurable: true
    });
    self.minimumFontSize = 1; //Default

    Object.defineProperty(self, 'ellipsizeMode', {
        get: function() {
            return NSLineBreakMode.nsLineBreakModeToEllipsizeMode(self.nativeObject.lineBreakMode);
        },
        set: function(value) {
            self.nativeObject.lineBreakMode = NSLineBreakMode.ellipsizeModeToNSLineBreakMode(value);
        },
        enumerable: true
    });

    Object.defineProperty(self, 'maxLines', {
        get: function() {
            return self.nativeObject.numberOfLines;
        },
        set: function(value) {
            self.nativeObject.numberOfLines = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'multiline', {
        get: function() {
            if (self.nativeObject.numberOfLines === 0 && self.nativeObject.numberOfLines === 0) {
                return true;
            } else {
                return false;
            }
        },
        set: function(value) {
            if (value) {
                self.nativeObject.numberOfLines = 0;
                self.nativeObject.lineBreakMode = 0;
            } else {
                self.nativeObject.numberOfLines = 1;
                self.nativeObject.lineBreakMode = 4;
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'text', {
        get: function() {
            return self.nativeObject.text;
        },
        set: function(value) {
            self.nativeObject.text = value;
        },
        enumerable: true,
        configurable: true
    });

    var _textAlignment = SFTextAlignment.MIDLEFT;
    Object.defineProperty(self, 'textAlignment', {
        get: function() {
            return _textAlignment;
        },
        set: function(value) {
            if (!(value == SFTextAlignment.MIDLEFT || value == SFTextAlignment.MIDCENTER || value == SFTextAlignment.MIDRIGHT)) {
                throw new Error("Label textAlignment property only supports UI.TextAlignment.MIDLEFT, UI.TextAlignment.MIDCENTER, UI.TextAlignment.MIDRIGHT.");
            };
            _textAlignment = value;
            var horizontal;
            if (value % 3 === 0) {
                horizontal = 0;
            } else if (value % 3 === 1) {
                horizontal = 1;
            } else {
                horizontal = 2;
            }
            self.nativeObject.textAlignment = horizontal;
        },
        enumerable: true
    });

    var _textColor = Color.BLACK;
    Object.defineProperty(self, 'textColor', {
        get: function() {
            return _textColor;
        },
        set: function(value) {
            _textColor = value;
            self.nativeObject.textColor = value.nativeObject;
        },
        enumerable: true
    });

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Label;