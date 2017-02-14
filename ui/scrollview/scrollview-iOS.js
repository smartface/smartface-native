const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
 
const ScrollView = extend(ViewGroup)(
   function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new SMFUIScrollView();
        }
    
        _super(this);
         
        Object.defineProperty(self, 'showHorizontalScrollBar', {
            get: function() {
                return self.nativeObject.showsHorizontalScrollIndicator;
            },
            set: function(value) {
                self.nativeObject.showsHorizontalScrollIndicator = value;
            },
            enumerable: true
         });
         
        Object.defineProperty(self, 'showVerticalScrollBar', {
            get: function() {
                return self.nativeObject.showsVerticalScrollIndicator;
            },
            set: function(value) {
                self.nativeObject.showsVerticalScrollIndicator = value;
            },
            enumerable: true
         });
         
         Object.defineProperty(self, 'declerationRate', {
            get: function() {
                return self.nativeObject.decelerationRate;
            },
            set: function(value) {
                self.nativeObject.decelerationRate = value;
            },
            enumerable: true
         });
         
         Object.defineProperty(self, 'scrollX', {
            get: function() {
                return self.nativeObject.contentOffset.x;
            },
            set: function(value) {
                self.nativeObject.setContentOffsetAnimated({x : value,y : self.nativeObject.contentOffset.y},true);
            },
            enumerable: true
         });
         
         Object.defineProperty(self, 'scrollY', {
            get: function() {
                return self.nativeObject.contentOffset.y;
            },
            set: function(value) {
                self.nativeObject.setContentOffsetAnimated({x : self.nativeObject.contentOffset.x,y : value},true);
            },
            enumerable: true
         });
          
        self.nativeObject.onScrollBegin = function(){
              self.onScrollBegin();
        }
          
        self.nativeObject.onScrollEnd = function(){
              self.onScrollEnd();
        }
        
        self.nativeObject.onScrollBeginDecelerating = function(){
              self.onScrollBeginDecelerating();
        }
        
        self.nativeObject.onScrollEndDecelerating = function(){
              self.onScrollEndDecelerating();
        }
        
        self.autoSize = function(){
            self.applyLayout();
            self.nativeObject.autoContentSize(1);
        }
        
        self.scrollToTop = function(){
            self.nativeObject.setContentOffsetAnimated({x : 0,y : 0},true);
        }
        
        self.scrollToLeft = function(){
            self.nativeObject.setContentOffsetAnimated({x : 0,y : 0},true);
        }
        
        
        self.scrollToBottom = function(){
            self.nativeObject.scrollToBottom;
        }
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ScrollView;