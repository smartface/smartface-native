const extend = require('js-base/core/extend');

const TextBox = require("../textbox");
const TextAlignment = require('sf-core/ui/textalignment');

const TextArea = extend(TextBox)(
    function (_super, params) {
        var self = this;
        _super(this);

        self.nativeObject.setSingleLine(false);
        self.textAlignment = TextAlignment.TOPLEFT;

        // Remove implementations of some properties
        Object.defineProperties(self, {
            'isPassword': {
                get: function(){},
                set: function(){}
            },
            'onActionButtonPress': {
                get: function(){},
                set: function(){}
            },
            'actionKeyType': {
                get: function(){},
                set: function(){},
            },
            'keyboardType': {
                get: function(){},
                set: function(){},
            },
            'hint': {
                get: function(){},
                set: function(){}
            }
        });

        // Remove implementations of some properties
        Object.defineProperties(self.android, {
            'hint': {
                get: function() {
                    return self.nativeObject.getHint();
                },
                set: function(hint) {
                    self.nativeObject.setHint(hint);
                },
            },
        });

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = TextArea;