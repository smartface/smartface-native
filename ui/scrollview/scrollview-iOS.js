const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
const ScrollViewAlign = require("sf-core/ui/scrollview/scrollview-align");
const ScrollViewEdge = require("sf-core/ui/scrollview/scrollview-edge");
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');

const ScrollType = {
    vertical : 0,
    horizontal : 1
};

const ScrollView = extend(ViewGroup)(
   function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new __SF_UIScrollView();
            self.contentLayout = new FlexLayout();
            self.contentLayout.nativeObject.addFrameObserver();
            self.contentLayout.nativeObject.frameObserveHandler = function(e){
                self.changeContentSize(e.frame);
                if (typeof self.gradientColorFrameObserver === 'function') {
                    self.gradientColorFrameObserver(e);
                }
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
                }else{
                    _align = ScrollType.vertical;
                }
                self.autoSize();
                self.changeContentSize(self.layout.nativeObject.frame);
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
            if (nativeObjectViewSubviewCount() === 1) { 
                return;
            }
            self.applyLayout();
            self.nativeObject.autoContentSize(_align);
        };
        
        self.changeContentSize = function(frame){
            if (nativeObjectViewSubviewCount() ===  2) { 
                return;
            }
            if (_align ==- ScrollType.vertical) {
                self.nativeObject.contentSize = {width : 0, height : frame.height};
            }else{
                self.nativeObject.contentSize = {width : frame.width, height : 0};
            }
        };
        
        function nativeObjectViewSubviewCount(){
            var count = 0;
            for (var subview in self.nativeObject.subviews) {
                if(self.nativeObject.subviews[subview].constructor.name === "SMFNative.SMFUIView"){
                    count++;
                }
            }
            return count;
        }
        
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