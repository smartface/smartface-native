const TextBox = require('../textbox');
const UIScrollViewInheritance = require('../../util').UIScrollViewInheritance;

TextArea.prototype = Object.create(TextBox.prototype);
function TextArea(params) {
    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_UITextView();
    }

    TextBox.apply(this);

    UIScrollViewInheritance.addPropertiesAndMethods.call(this);

    Object.defineProperty(self, 'textAlignment', {
        get: function() {
            return self.nativeObject.textAlignmentNumber;
        },
        set: function(value) {
            self.nativeObject.textAlignmentNumber = value;
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'showScrollBar', {
        get: function() {
            return self.nativeObject.showsHorizontalScrollIndicator;
        },
        set: function(value) {
            self.nativeObject.showsHorizontalScrollIndicator = value;
            self.nativeObject.showsVerticalScrollIndicator = value;
        },
        enumerable: true
    });
    self.ios.showScrollBar = false;

    Object.defineProperty(self, 'hint', {
        get: function() {},
        set: function(value) {},
        enumerable: true
    });

    Object.defineProperty(this.ios, 'adjustFontSizeToFit', {
        get: function() {},
        set: function(value) {},
        enumerable: true
    });

    Object.defineProperty(this.ios, 'minimumFontSize', {
        get: function() {},
        set: function(value) {},
        enumerable: true
    });

    Object.defineProperty(this, 'actionKeyType', {
        get: function() {},
        set: function(value) {},
        enumerable: true
    });

    Object.defineProperty(self, 'keyboardType', {
        get: function() {},
        set: function(value) {},
        enumerable: true
    });

    Object.defineProperty(this.ios, 'clearButtonEnabled', {
        get: function() {},
        set: function(value) {},
        enumerable: true
    });

    Object.defineProperty(self, 'isPassword', {
        get: function() {},
        set: function(value) {},
        enumerable: true
    });

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

}

module.exports = TextArea;