const Font = require('sf-core/ui/font');
const Color = require('sf-core/ui/color');
const Invocation = require('sf-core/util').Invocation;

const AttributedString = function(params){
    
    var self = this;
    
    self.ios = {};
    self.android = {};
    
    var _string = "";
    Object.defineProperty(self, 'string', {
        get: function() {
            return _string;
        },
        set: function(value) {
            _string = value;
        },
        enumerable: true
    });
    
    var _font = Font.create(Font.DEFAULT, 14, Font.NORMAL);
    Object.defineProperty(self, 'font', {
        get: function() {
            return _font;
        },
        set: function(value) {
            _font = value;
        },
        enumerable: true
    });
    
    var _foregroundColor = Color.BLACK;
    Object.defineProperty(self, 'foregroundColor', {
        get: function() {
            return _foregroundColor;
        },
        set: function(value) {
            _foregroundColor = value;
        },
        enumerable: true
    });
    
    var _underline = false;
    Object.defineProperty(self, 'underline', {
        get: function() {
            return _underline;
        },
        set: function(value) {
            _underline = value;
        },
        enumerable: true
    });
    
    var _strikethrough = false;
    Object.defineProperty(self, 'strikethrough', {
        get: function() {
            return _strikethrough;
        },
        set: function(value) {
            _strikethrough = value;
        },
        enumerable: true
    });
    
    var _underlineColor = self.foregroundColor;
    Object.defineProperty(self.ios, 'underlineColor', {
        get: function() {
            return _underlineColor;
        },
        set: function(value) {
            _underlineColor = value;
        },
        enumerable: true
    });
    
    var _strikethroughColor = self.foregroundColor;
    Object.defineProperty(self.ios, 'strikethroughColor', {
        get: function() {
            return _strikethroughColor;
        },
        set: function(value) {
            _strikethroughColor = value;
        },
        enumerable: true
    });
    
    var _backgroundColor = Color.TRANSPARENT;
    Object.defineProperty(self, 'backgroundColor', {
        get: function() {
            return _backgroundColor;
        },
        set: function(value) {
            _backgroundColor = value;
        },
        enumerable: true
    });
    
    var _link = undefined;
    Object.defineProperty(self, 'link', {
        get: function() {
            return _link;
        },
        set: function(value) {
            _link = value;
        },
        enumerable: true
    });
    
    function setParams(params){
        for (var param in params) {
            if(param === "ios" || param === "android"){
                setOSSpecificParams.call(this,params[param],param);
            }else{
                this[param] = params[param];
            }
        }
    }
    
    function setOSSpecificParams(params,key){
        for (var param in params) {
            this[key][param] = params[param];
        }
    }
    
    setParams.call(this,params);
};

const NSUnderlineStyle = {
    None: 0,
    Single: 1,
    Thick: 2,
    Double: 9
};


AttributedString.getSize = function(array,size,lineSpacing,letterSpacing){
    var paragraphAlloc = Invocation.invokeClassMethod("NSMutableParagraphStyle", "alloc", [], "id");
            var paragraphStyle = Invocation.invokeInstanceMethod(paragraphAlloc, "init", [], "NSObject");
            var argLineSpacing = new Invocation.Argument({
                type: "CGFloat",
                value: lineSpacing
            });
            Invocation.invokeInstanceMethod(paragraphStyle, "setLineSpacing:", [argLineSpacing]);

            var alloc = Invocation.invokeClassMethod("NSMutableAttributedString", "alloc", [], "id");
            var mutableString = Invocation.invokeInstanceMethod(alloc, "init", [], "NSObject");

            for (var i in array) {
                var attributeString = array[i];

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
                        "NSKern": letterSpacing,
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

            var argSize = new Invocation.Argument({
                type: "CGSize",
                value: size
            });
            
            var argOptions = new Invocation.Argument({
                type: "id",
                value: 00000011 //(NSStringDrawingUsesLineFragmentOrigin | NSStringDrawingUsesFontLeading)
            });
            var argContext = new Invocation.Argument({
                type: "NSObject",
                value: undefined
            });
            
            return Invocation.invokeInstanceMethod(mutableString, "boundingRectWithSize:options:context:", [argSize,argOptions,argContext],"CGRect");
}
module.exports = AttributedString;