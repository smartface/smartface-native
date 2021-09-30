const View = require('../view');

const Color = require("../../ui/color");
const SFTextAlignment = require("../../ui/textalignment");
const Invocation = require('../../util').Invocation;
const UIScrollViewInheritance = require('../../util').UIScrollViewInheritance;
const NSLineBreakMode = require('../../util/iOS/nslinebreakmode');
const Events = require('./events');

const NSUnderlineStyle = {
    None: 0,
    Single: 1,
    Thick: 2,
    Double: 9
};
TextView.prototype = Object.create(View.prototype);
function TextView(params) {
    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_UITextView();
    }

    View.apply(this);

    UIScrollViewInheritance.addPropertiesAndMethods.call(this);

    //Defaults
    self.nativeObject.setSelectable = false;
    self.nativeObject.setEditable = false;
    self.nativeObject.setDelaysContentTouches = true;
    self.nativeObject.textContainer.maximumNumberOfLines = 0;
    self.nativeObject.textContainer.lineBreakMode = 0;

    var _attributedText = [];
    
    const EventFunctions = {
        [Events.LinkClick]: function() {
            _onLinkClick = function (state) {
                self.emitter.emit(Events.LinkClick, state);
            } 
        }
    }
    Object.defineProperty(self, 'attributedText', {
        get: function() {
            return _attributedText;
        },
        set: function(value) {
            if (Array.isArray(value)) {
                _attributedText = value;
                setText(value);
            }
        },
        enumerable: true,
        configurable: true
    });

    var _onClick = undefined; //Deprecated : Please use self.onLinkClick
    Object.defineProperty(self, 'onClick', {
        get: function() {
            return _onClick;
        },
        set: function(value) {
            _onClick = value;
        },
        enumerable: true,
        configurable: true
    });

    var _onLinkClick = undefined;
    Object.defineProperty(self, 'onLinkClick', {
        get: function() {
            return _onLinkClick;
        },
        set: function(value) {
            _onLinkClick = value;
        },
        enumerable: true,
        configurable: true
    });

    var _letterSpacing = 0;
    Object.defineProperty(self, 'letterSpacing', {
        get: function() {
            return _letterSpacing;
        },
        set: function(value) {
            _letterSpacing = value;
        },
        enumerable: true,
        configurable: true
    });

    self.nativeObject.didTapLinkWithURL = function(e) {
        if (typeof self.onClick == 'function') {
            self.onClick(e.URL);
        }
        if (typeof self.onLinkClick == 'function') {
            self.onLinkClick(e.URL);
        }
    };

    var _lineSpacing = 0;
    Object.defineProperty(self, 'lineSpacing', {
        get: function() {
            return _lineSpacing;
        },
        set: function(value) {
            _lineSpacing = value;
        },
        enumerable: true,
        configurable: true
    });

    var _lastModifiedAttributedString;

    function setText(value) {
        var paragraphAlloc = Invocation.invokeClassMethod("NSMutableParagraphStyle", "alloc", [], "id");
        var paragraphStyle = Invocation.invokeInstanceMethod(paragraphAlloc, "init", [], "NSObject");
        var argLineSpacing = new Invocation.Argument({
            type: "CGFloat",
            value: self.lineSpacing
        });
        Invocation.invokeInstanceMethod(paragraphStyle, "setLineSpacing:", [argLineSpacing]);

        var alloc = Invocation.invokeClassMethod("NSMutableAttributedString", "alloc", [], "id");
        var mutableString = Invocation.invokeInstanceMethod(alloc, "init", [], "NSObject");

        for (var i in value) {
            var attributeString = value[i];

            var allocNSAttributedString = Invocation.invokeClassMethod("NSAttributedString", "alloc", [], "id");

            var argString = new Invocation.Argument({
                type: "NSString",
                value: attributeString.string
            });

            var argAttributes = new Invocation.Argument({
                type: "id",
                value: {
                    "NSColor": attributeString.foregroundColor.nativeObject,
                    "NSFont": attributeString.font,
                    "NSUnderline": attributeString.underline ? NSUnderlineStyle.Single : NSUnderlineStyle.None,
                    "NSStrikethrough": attributeString.strikethrough ? NSUnderlineStyle.Single : NSUnderlineStyle.None,
                    "NSLink": attributeString.link,
                    "NSBackgroundColor": attributeString.backgroundColor.nativeObject,
                    "NSUnderlineColor": attributeString.ios.underlineColor.nativeObject,
                    "NSStrikethroughColor": attributeString.ios.strikethroughColor.nativeObject,
                    "NSKern": self.letterSpacing,
                    "NSParagraphStyle": paragraphStyle
                }
            });
            var nativeAttributeString = Invocation.invokeInstanceMethod(allocNSAttributedString, "initWithString:attributes:", [argString, argAttributes], "NSObject");

            var argAppend = new Invocation.Argument({
                type: "NSObject",
                value: nativeAttributeString
            });
            Invocation.invokeInstanceMethod(mutableString, "appendAttributedString:", [argAppend]);
        }

        _lastModifiedAttributedString = mutableString;

        var argAttributeString = new Invocation.Argument({
            type: "NSObject",
            value: mutableString
        });

        Invocation.invokeInstanceMethod(self.nativeObject, "setAttributedText:", [argAttributeString]);
        self.textAlignment = self.textAlignment;
    }

    var _selectable = false;
    Object.defineProperty(self, 'selectable', {
        get: function() {
            return _selectable;
        },
        set: function(value) {
            if (typeof(value) === "boolean") {
                _selectable = value;
                self.nativeObject.setSelectable = value;
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'getAttributeTextSize', {
        value: function(maxWidth) {
            if (_lastModifiedAttributedString) {
                var argSize = new Invocation.Argument({
                    type: "CGSize",
                    value: {
                        width: maxWidth,
                        height: Number.MAX_VALUE
                    }
                });

                var argOptions = new Invocation.Argument({
                    type: "NSUInteger",
                    value: 00000011 //(NSStringDrawingUsesLineFragmentOrigin | NSStringDrawingUsesFontLeading)
                });
                var argContext = new Invocation.Argument({
                    type: "NSObject",
                    value: undefined
                });

                var rect = Invocation.invokeInstanceMethod(_lastModifiedAttributedString, "boundingRectWithSize:options:context:", [argSize, argOptions, argContext], "CGRect");
                return {
                    width: rect.width,
                    height: rect.height
                };
            }
            return null;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'htmlText', {
        get: function() {
            return self.nativeObject.htmlText;
        },
        set: function(value) {
            self.nativeObject.htmlText = value;
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

    Object.defineProperty(self.ios, 'scrollEnabled', { //Deprecated
        get: function() {
            return self.nativeObject.valueForKey("scrollEnabled");
        },
        set: function(value) {
            self.nativeObject.setValueForKey(value, "scrollEnabled");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'scrollEnabled', {
        get: function() {
            return self.nativeObject.valueForKey("scrollEnabled");
        },
        set: function(value) {
            self.nativeObject.setValueForKey(value, "scrollEnabled");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'font', {
        get: function() {
            return self.nativeObject.font;
        },
        set: function(value) {
            self.nativeObject.setEditable = true;
            self.nativeObject.font = value;
            self.nativeObject.setEditable = false;
            self.nativeObject.setSelectable = self.selectable;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'multiline', {
        get: function() {
            if (self.nativeObject.textContainer.maximumNumberOfLines === 0 && self.nativeObject.textContainer.lineBreakMode === 0) {
                return true;
            } else {
                return false;
            }
        },
        set: function(value) {
            if (value) {
                self.nativeObject.textContainer.maximumNumberOfLines = 0;
                self.nativeObject.textContainer.lineBreakMode = 0;
            } else {
                self.nativeObject.textContainer.maximumNumberOfLines = 1;
                self.nativeObject.textContainer.lineBreakMode = 4;
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

    Object.defineProperty(self, 'textAlignment', {
        get: function() {
            return self.nativeObject.textAlignmentNumber;
        },
        set: function(value) {
            self.nativeObject.setEditable = true;
            self.nativeObject.textAlignmentNumber = value;
            self.nativeObject.setEditable = false;
            self.nativeObject.setSelectable = self.selectable;
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
            self.nativeObject.setEditable = true;
            self.nativeObject.textColor = value.nativeObject;
            self.nativeObject.setEditable = false;
            self.nativeObject.setSelectable = self.selectable;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'ellipsizeMode', {
        get: function() {
            return NSLineBreakMode.nsLineBreakModeToEllipsizeMode(self.nativeObject.textContainer.lineBreakMode);
        },
        set: function(value) {
            self.nativeObject.textContainer.lineBreakMode = NSLineBreakMode.ellipsizeModeToNSLineBreakMode(value);
        },
        enumerable: true
    });

    Object.defineProperty(self, 'maxLines', {
        get: function() {
            return self.nativeObject.textContainer.maximumNumberOfLines;
        },
        set: function(value) {
            self.nativeObject.textContainer.maximumNumberOfLines = value;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'on', {
        value: (event, callback) => {
            EventFunctions[event].call(this);
            this.emitter.on(event, callback);
        }
    });

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = TextView;