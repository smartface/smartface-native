const View = require('../view');
const extend = require('js-base/core/extend');
const Color = require("sf-core/ui/color");
const SFTextAlignment = require("sf-core/ui/textalignment");

const Label = extend(View)(
    function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new SMFUITextView();
        }
        
        _super(this);
        
        //Defaults
        self.nativeObject.setSelectable = false;
		self.nativeObject.setEditable = false;	
		self.nativeObject.setDelaysContentTouches = true;
	    self.nativeObject.textAlignmentNumber = SFTextAlignment.MIDLEFT;
	    
        Object.defineProperty(self, 'htmlText', {
            get:function() {
                return self.nativeObject.htmlText;
            },
            set:function(value) {
                self.nativeObject.htmlText = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'showScrollBar', {
            get:function() {
                return self.nativeObject.showsHorizontalScrollIndicator;
            },
            set:function(value) {
                self.nativeObject.showsHorizontalScrollIndicator = value;
                self.nativeObject.showsVerticalScrollIndicator = value;
            },
            enumerable: true
        });

        Object.defineProperty(self, 'font', {
            get:function() {
                return self.nativeObject.font;
            },
            set:function(value) {
                self.nativeObject.font = value;
            },
            enumerable: true
         });

        var _multiline;
        Object.defineProperty(self, 'multiline', {
            get function() {
                return _multiline;
            },
            set: function(value) {
            	if (value){
            		self.nativeObject.textContainer.maximumNumberOfLines = 0;
    				self.nativeObject.textContainer.lineBreakMode = 0;
            	}else{
            		self.nativeObject.textContainer.maximumNumberOfLines = 1;
    				self.nativeObject.textContainer.lineBreakMode = 4;
            	}
    			_multiline = value
            },
            enumerable: true
        });

        Object.defineProperty(self, 'text', {
            get: function() {
                return self.nativeObject.text;
            },
            set: function(value) {
                self.nativeObject.text = value;
                self.nativeObject.textColor = _textColor;
            },
            enumerable: true
        });

        Object.defineProperty(self, 'textAlignment', {
            get: function() {
                return self.nativeObject.textAlignmentNumber;
            },
            set: function(value) {
                self.nativeObject.textAlignmentNumber = value;
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
                self.nativeObject.textColor = value
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

module.exports = Label;