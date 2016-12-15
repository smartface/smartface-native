const View = require('../view');
const extend = require('js-base/core/extend');
const Label = extend(View)(
    function (_super, params) {
        _super(this);
        var self = this;
        
        // TODO Dogan Check params before using it
        self.nativeObject = new SMFUITextView({
            left: params.left,
            top: params.top,
            width: params.width,
            height: params.height
        });

        Object.defineProperty(self, 'htmlText', {
            get:function() {
                return self.nativeObject.htmlText;
            },
            set:function(value) {
                self.nativeObject.htmlText = value;
            }
        });

        Object.defineProperty(self, 'font', {
            get:function() {
                return self.nativeObject.font;
            },
            set:function(value) {
                self.nativeObject.font = value;
            }
         });

        var _multipleLine;
        Object.defineProperty(self, 'multipleLine', {
            get function() {
                return _multipleLine;
            },
            set: function(value) {
            	if (value){
            		self.nativeObject.numberOfLines = 0;
    				self.nativeObject.lineBreakMode = 0;
            	}else{
            		self.nativeObject.numberOfLines = 1;
    				self.nativeObject.lineBreakMode = 4;
            	}
    			_multipleLine = value
            }
            
        });

        /**
         * Gets/sets style of view. 
         * 
         * @property {Style} style Style of view
         */
        this.style = {};

        Object.defineProperty(self, 'text', {
            get: function() {
                return self.nativeObject.text;
            },
            set: function(value) {
                self.nativeObject.text = value;
            }
        });

        Object.defineProperty(self, 'textAlignment', {
            get: function() {
                return self.nativeObject.textAlignment;
            },
            set: function(value) {
                self.nativeObject.textAlignment = value;
            }
        });

        Object.defineProperty(self, 'textColor', {
            get: function() {
                return self.nativeObject.textColor;
            },
            set: function(value) {
                self.nativeObject.textColor = value;
            }
        });

        /**
         * Sets/gets showing scroll bar when text doesn't fit to label view.
         * 
         * @property {Boolean} showScrollBar
         */
        this.showScrollBar = true;
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = Label;