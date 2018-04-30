const View = require('../view');
const extend = require('js-base/core/extend');
const Color = require("sf-core/ui/color");
const SFTextAlignment = require("sf-core/ui/textalignment");
const Invocation    = require('sf-core/util').Invocation;

const NSUnderlineStyle = {
    None : 0,
    Single : 1,
    Thick : 2,
    Double : 9
};

const TextView = extend(View)(
    function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new __SF_UITextView();
        }
        
        _super(this);
        
        //Defaults
        self.nativeObject.setSelectable = false;
		self.nativeObject.setEditable = false;	
		self.nativeObject.setDelaysContentTouches = true;
	    self.nativeObject.textAlignmentNumber = SFTextAlignment.MIDLEFT;
	    self.nativeObject.textContainer.maximumNumberOfLines = 0;
    	self.nativeObject.textContainer.lineBreakMode = 0;
    	self.nativeObject.backgroundColor = Color.TRANSPARENT.nativeObject;
    	
    	var _attributedText = [];
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
        
        var _onClick = undefined;
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
        
        self.nativeObject.didTapLinkWithURL = function(e){
            if (typeof self.onClick == 'function') {
                self.onClick(e.URL);
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
        
        function setText(value){
            var paragraphAlloc = Invocation.invokeClassMethod("NSMutableParagraphStyle","alloc",[],"id");
            var paragraphStyle = Invocation.invokeInstanceMethod(paragraphAlloc,"init",[],"NSObject");
            var argLineSpacing = new Invocation.Argument({
                type:"CGFloat",
                value: self.lineSpacing
            });
            Invocation.invokeInstanceMethod(paragraphStyle,"setLineSpacing:",[argLineSpacing]);

            var alloc = Invocation.invokeClassMethod("NSMutableAttributedString","alloc",[],"id");
            var mutableString = Invocation.invokeInstanceMethod(alloc,"init",[],"NSObject");

            for (var i in value) {
                var attributeString = value[i];
                
                var allocNSAttributedString = Invocation.invokeClassMethod("NSAttributedString","alloc",[],"id");
        
                var argString = new Invocation.Argument({
                    type:"NSString",
                    value: attributeString.string
                });
                    
                var argAttributes = new Invocation.Argument({
                    type:"id",
                    value: {
                        "NSColor" : attributeString.foregroundColor.nativeObject,
                        "NSFont" : attributeString.font,
                        "NSUnderline" : attributeString.underline ? NSUnderlineStyle.Single : NSUnderlineStyle.None,
                        "NSLink": attributeString.link,
                        "NSBackgroundColor" : attributeString.backgroundColor.nativeObject,
                        "NSUnderlineColor" : attributeString.ios.underlineColor.nativeObject,
                        "NSKern" : self.letterSpacing,
                        "NSParagraphStyle" : paragraphStyle
                    }
                });
                var nativeAttributeString = Invocation.invokeInstanceMethod(allocNSAttributedString,"initWithString:attributes:",[argString,argAttributes],"NSObject");
                
                var argAppend = new Invocation.Argument({
                        type:"NSObject",
                        value: nativeAttributeString
                    });
                Invocation.invokeInstanceMethod(mutableString,"appendAttributedString:",[argAppend]);
            }

            var argAttributeString = new Invocation.Argument({
                type:"NSObject",
                value: mutableString
            });
            
            Invocation.invokeInstanceMethod(self.nativeObject,"setAttributedText:",[argAttributeString]);
            self.textAlignment = self.textAlignment;
        }
        
    	var _selectable = false;			
    	Object.defineProperty(self, 'selectable', {
            get:function() {
                return _selectable;
            },
            set:function(value) {
                if (typeof(value) === "boolean"){
                    _selectable = value;
                    self.nativeObject.setSelectable = value;
                }
            },
            enumerable: true
         });
         
        Object.defineProperty(self, 'htmlText', {
            get:function() {
                return self.nativeObject.htmlText;
            },
            set:function(value) {
                self.nativeObject.htmlText = value;
            },
            enumerable: true
        });
        
        self.ios = {};
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
        
        Object.defineProperty(self.ios, 'scrollEnabled', {
            get:function() {
                return self.nativeObject.valueForKey("scrollEnabled");
            },
            set:function(value) {
                self.nativeObject.setValueForKey(value,"scrollEnabled");
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'font', {
            get:function() {
                return self.nativeObject.font;
            },
            set:function(value) {
                self.nativeObject.setEditable = true;
                self.nativeObject.font = value;
                self.nativeObject.setEditable = false;
                self.nativeObject.setSelectable = self.selectable;
            },
            enumerable: true
         });

        Object.defineProperty(self, 'multiline', {
            get: function() {
               if(self.nativeObject.textContainer.maximumNumberOfLines === 0 && self.nativeObject.textContainer.lineBreakMode === 0){
                    return true;
                }else{
                    return false;
                }
            },
            set: function(value) {
            	if (value){
            		self.nativeObject.textContainer.maximumNumberOfLines = 0;
    				self.nativeObject.textContainer.lineBreakMode = 0;
            	}else{
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
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = TextView;