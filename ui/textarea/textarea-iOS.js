const TextBox = require('../textbox');
const extend = require('js-base/core/extend');
const KeyboardType = require('sf-core/ui/keyboardtype');
const ActionKeyType = require('sf-core/ui/actionkeytype');
const Animator = require('sf-core/ui/animator');
const Color = require('sf-core/ui/color');
const TextAlignment = require('sf-core/ui/textalignment');

const TextArea = extend(TextBox)(
    function(_super, params) {
        var self = this;

        if (!self.nativeObject) {
            self.nativeObject = new __SF_UITextView();
        }

        _super(this);
        
        Object.defineProperty(self, 'textAlignment', {
            get: function() {
                return self.nativeObject.textAlignmentNumber;
            },
            set: function(value) {
                self.nativeObject.textAlignmentNumber = value;
            },
            enumerable: true
        });
        self.textAlignment = TextAlignment.TOPLEFT;
        
        Object.defineProperty(self.ios, 'showScrollBar', {
            get:function() {
                return self.nativeObject.showsHorizontalScrollIndicator;
            },
            set:function(value) {
                self.nativeObject.showsHorizontalScrollIndicator = value;
                self.nativeObject.showsVerticalScrollIndicator = value;
            },
            enumerable: true
        });
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }

    }
);

module.exports = TextArea;
