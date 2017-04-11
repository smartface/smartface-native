const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
const ScrollViewAlign = require("sf-core/ui/scrollview/scrollview-align");
const ScrollViewEdge = require("sf-core/ui/scrollview/scrollview-edge");

const ScrollType = {
    vertical : 0,
    horizontal : 1
};

const ScrollView = extend(ViewGroup)(
   function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new __SF_UIScrollView();
        }
        
        _super(this);
        self.flexBasis = 1; 
        Object.defineProperty(self, 'scrollBarEnabled', {
            get: function() {
                return self.nativeObject.showsHorizontalScrollIndicator;
            },
            set: function(value) {
                self.nativeObject.showsHorizontalScrollIndicator = value;
                self.nativeObject.showsVerticalScrollIndicator = value;
            },
            enumerable: true
         });
         
         var _align = ScrollType.vertical;
         Object.defineProperty(self, 'align', {
            get: function() {
                if (_align === ScrollType.horizontal){
                    return ScrollViewAlign.HORIZONTAL;
                }else{
                    return ScrollViewAlign.VERTICAL;
                }
                
            },
            set: function(value) {
                if (value === ScrollViewAlign.HORIZONTAL) {
                    _align = ScrollType.horizontal;
                }else{
                    _align = ScrollType.vertical;
                }
                self.autoSize();
            },
            enumerable: true
         });
         
        self.scrollToEdge = function(edge){
             if (_align === ScrollType.horizontal){
                 if (edge === ScrollViewEdge.LEFT){
                    self.nativeObject.setContentOffsetAnimated({x : 0,y : 0},true);
                 }else if(edge === ScrollViewEdge.RIGHT){
                     self.nativeObject.scrollToRight();
                 }
             }else if (_align === ScrollType.vertical){
                 if (edge === ScrollViewEdge.TOP){
                     self.nativeObject.setContentOffsetAnimated({x : 0,y : 0},true);
                 }else if(edge === ScrollViewEdge.BOTTOM){
                     self.nativeObject.scrollToBottom();
                 }
             }
        };
         
        self.scrollToCoordinate = function(coordinate){
             if (_align === ScrollType.horizontal){
                 self.nativeObject.setContentOffsetAnimated({x : coordinate,y : 0},true);
             }else if (_align === ScrollType.vertical){
                 self.nativeObject.setContentOffsetAnimated({x : 0,y : coordinate},true);
             }
        };
    
        self.autoSize = function(){
            self.applyLayout();
            self.nativeObject.autoContentSize(_align);
        };
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

Object.defineProperties(ScrollView, {
    'Align': {
        value: require('./scrollview-align'),
        enumarable: true
    },
    'Edge': {
        value: require('./scrollview-edge'),
        enumarable: true
    }
});

module.exports = ScrollView;