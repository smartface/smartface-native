const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
const ScrollViewAlign = require("sf-core/ui/scrollview/scrollview-align");
const ScrollViewEdge = require("sf-core/ui/scrollview/scrollview-edge");
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const System = require('sf-core/device/system');

const ScrollType = {
    vertical : 0,
    horizontal : 1
};

const ScrollView = extend(ViewGroup)(
   function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new __SF_UIScrollView();
            if (System.OSVersion.split(".")[0] >= 11) {
                self.nativeObject.setValueForKey(2,"contentInsetAdjustmentBehavior");
            }
            self.contentLayout = new FlexLayout();
            self.contentLayout.nativeObject.addFrameObserver();
            self.contentLayout.nativeObject.frameObserveHandler = function(e){
                if (typeof self.gradientColorFrameObserver === 'function') {
                    self.gradientColorFrameObserver(e);
                }
            }; 
            self.nativeObject.addFrameObserver();
            self.nativeObject.frameObserveHandler = function(e){
                self.layout.applyLayout();
            };
            self.nativeObject.addSubview(self.contentLayout.nativeObject);
        }
        
        _super(this);
        
        self.nativeObject.onScrollBegin = function(){
            if (typeof self.onTouch === 'function'){
                self.onTouch();
            }
        }
        
        Object.defineProperty(self, 'layout', {
            get: function() {
                return self.contentLayout;
            },
            enumerable: true
        });

        self.layout.applyLayout = function(){
            self.layout.nativeObject.yoga.applyLayoutPreservingOrigin(false);
            
            var rect = {x:0,y:0,width:self.nativeObject.frame.width,height:self.nativeObject.frame.height}
            var subviews = self.layout.nativeObject.subviews;
            for (var i = 0; i < subviews.length; i++) {
                var frame = subviews[i].frame;
                rect.x = frame.x < rect.x ? frame.x : rect.x;
                rect.y = frame.y < rect.y ? frame.y : rect.y;
                var width = frame.x + frame.width;
                rect.width = width > rect.width ? width : rect.width;
                var height = frame.y + frame.height;
                rect.height = height > rect.height ? height : rect.height;
            }
            if (_align === ScrollType.horizontal){
                rect.height = self.nativeObject.frame.height;
            }else{
                rect.width = self.nativeObject.frame.width;
            }

            self.layout.width = rect.width;
            self.layout.height = rect.height;
            self.layout.nativeObject.yoga.applyLayoutPreservingOrigin(false);
            
            self.changeContentSize(rect);
        };
        
        Object.defineProperty(self, 'onScroll', {
            set: function(value) {
                self.nativeObject.didScroll = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'contentOffset', {
            get: function() {
                return {x : self.nativeObject.contentOffset.x, y : self.nativeObject.contentOffset.y};
            },
            enumerable: true
        });
        
        Object.defineProperty(self.layout, 'backgroundColor', {
            get: function() {
                return new Color({color : self.layout.nativeObject.backgroundColor});
            },
            set: function(value) {
                if (value.nativeObject.constructor.name === "CAGradientLayer"){
                    if (!self.gradientColor){
                        self.gradientColorFrameObserver = function(e){
                            if (self.layout.nativeObject.frame.width === 0 || self.layout.nativeObject.frame.height === 0){
                                return;
                            }
                            self.gradientColor.frame = e.frame;
                            self.layout.nativeObject.backgroundColor = self.gradientColor.layerToColor();
                        }
                    }
                    self.gradientColor = value.nativeObject;
                    if (self.layout.nativeObject.frame.width === 0 || self.layout.nativeObject.frame.height === 0){
                        return;
                    }
                    self.gradientColor.frame = self.layout.nativeObject.frame;
                    self.layout.nativeObject.backgroundColor = self.gradientColor.layerToColor();
                }else{
                    if(self.gradientColor){
                        self.gradientColorFrameObserver = undefined;
                        self.gradientColor = undefined;
                    }
                    self.layout.nativeObject.backgroundColor = value.nativeObject;
                }
            },
            enumerable: true,
            configurable: true
        });
        
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
                    self.layout.flexDirection = FlexLayout.FlexDirection.ROW;
                }else{
                    _align = ScrollType.vertical;
                    self.layout.flexDirection = FlexLayout.FlexDirection.COLUMN;
                }
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
        
        self.changeContentSize = function(frame){
            if (_align === ScrollType.vertical) {
                self.nativeObject.contentSize = {width : 0, height : frame.height};
            }else{
                self.nativeObject.contentSize = {width : frame.width, height : 0};
            }
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
        enumerable: true
    },
    'Edge': {
        value: require('./scrollview-edge'),
        enumerable: true
    }
});

module.exports = ScrollView;