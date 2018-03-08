const TypeUtil      = require("sf-core/util/type");
const Exception     = require("sf-core/util").Exception;
const Color         = require('sf-core/ui/color');
const Invocation    = require('sf-core/util').Invocation;
const YGUnit        = require('sf-core/util').YogaEnums.YGUnit;

function View(params) {

    var self = this;

    self.android = {};
    self.ios = {};
    
    self.uniqueId = guid();

    if(!self.nativeObject){
        self.nativeObject = new __SF_UIView();
    }

    // Defaults
    self.nativeObject.yoga.isEnabled = true;
    self.nativeObject.layer.masksToBounds = true;
    
    Object.defineProperty(self.ios, 'shadowOffset', {
        get: function() {
            var size = Invocation.invokeInstanceMethod(self.nativeObject.layer,"shadowOffset",[],"CGSize");
            return {x:size.width,y:size.height};
        },
        set: function(shadowOffset) {
            var argShadowOffset = new Invocation.Argument({
                type:"CGSize",
                value: {
                    width : shadowOffset.x,
                    height : shadowOffset.y
                }
            });
            Invocation.invokeInstanceMethod(self.nativeObject.layer,"setShadowOffset:",[argShadowOffset]);
        },
        enumerable: true
    });
    
    Object.defineProperty(self.ios, 'shadowRadius', {
        get: function() {
            return Invocation.invokeInstanceMethod(self.nativeObject.layer,"shadowRadius",[],"CGFloat");
        },
        set: function(shadowRadius) {
            var argShadowRadius = new Invocation.Argument({
                type:"CGFloat",
                value: shadowRadius
            });
            Invocation.invokeInstanceMethod(self.nativeObject.layer,"setShadowRadius:",[argShadowRadius]);
        },
        enumerable: true
    });
    
    Object.defineProperty(self.ios, 'shadowOpacity', {
        get: function() {
            return Invocation.invokeInstanceMethod(self.nativeObject.layer,"shadowOpacity",[],"float");
        },
        set: function(shadowOpacity) {
            var argShadowOpacity = new Invocation.Argument({
                type:"float",
                value: shadowOpacity
            });
            Invocation.invokeInstanceMethod(self.nativeObject.layer,"setShadowOpacity:",[argShadowOpacity]);
        },
        enumerable: true
    });
    
    Object.defineProperty(self.ios, 'shadowColor', {
        get: function() {
            var color = Invocation.invokeInstanceMethod(self.nativeObject.layer,"shadowColor",[],"CGColor");
            return new Color({color : color});
        },
        set: function(shadowColor) {
            var argShadowColor = new Invocation.Argument({
                type:"CGColor",
                value: shadowColor.nativeObject
            });
            Invocation.invokeInstanceMethod(self.nativeObject.layer,"setShadowColor:",[argShadowColor]);
        },
        enumerable: true
    });
    
    Object.defineProperty(self.ios, 'masksToBounds', {
        get: function() {
            return self.nativeObject.layer.masksToBounds;
        },
        set: function(value) {
            self.nativeObject.layer.masksToBounds = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self.ios, 'clipsToBounds', {
        get: function() {
            return self.nativeObject.valueForKey("clipsToBounds");
        },
        set: function(value) {
            self.nativeObject.setValueForKey(value,"clipsToBounds");
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'borderColor', {
        get: function() {
            return new Color({color : self.nativeObject.layer.borderUIColor});
        },
        set: function(value) {
            self.nativeObject.layer.borderUIColor = value.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'alpha', {
        get: function() {
            return self.nativeObject.alpha;
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.alpha = value;
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'borderRadius', {
        get: function() {
            return self.nativeObject.layer.cornerRadius;
        },
        set: function(value) {
            self.nativeObject.layer.cornerRadius = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'backgroundColor', {
        get: function() {
            return new Color({color : self.nativeObject.backgroundColor});
        },
        set: function(value) {
            if (value.nativeObject.constructor.name === "CAGradientLayer"){
                if (!self.gradientColor){
                    self.nativeObject.addFrameObserver();
                    self.nativeObject.frameObserveHandler = function(e){
                        if (self.nativeObject.frame.width === 0 || self.nativeObject.frame.height === 0){
                            return;
                        }
                        self.gradientColor.frame = e.frame;
                        self.nativeObject.backgroundColor = self.gradientColor.layerToColor();
                    }
                }
                self.gradientColor = value.nativeObject;
                if (self.nativeObject.frame.width === 0 || self.nativeObject.frame.height === 0){
                    return;
                }
                self.gradientColor.frame = self.nativeObject.frame;
                self.nativeObject.backgroundColor = self.gradientColor.layerToColor();
            }else{
                if(self.gradientColor){
                    self.nativeObject.removeFrameObserver();
                    self.gradientColor = undefined;
                }
                self.nativeObject.backgroundColor = value.nativeObject;
            }
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(self, 'id', {
        get: function() {
            return self.nativeObject.tag;
        },
        set: function(value) {
            self.nativeObject.tag = value;
        },
        enumerable: true
    });

    self.nativeObject.layer.rotationZ = 0;
    self.nativeObject.layer.rotationX = 0;
    self.nativeObject.layer.rotationY = 0;
    
    var _rotation = 0;
    Object.defineProperty(self, 'rotation', {
        get: function() {
            return _rotation;
        },
        set: function(value) {
            _rotation = value;
            self.nativeObject.layer.rotationZ = _rotation * (Math.PI/180);
            self.nativeObject.layer.rotate();
        },
        enumerable: true
    });
    
    var _rotationX = 0;
    Object.defineProperty(self, 'rotationX', {
        get: function() {
            return _rotationX;
        },
        set: function(value) {
            _rotationX = value;
            self.nativeObject.layer.rotationX = _rotationX * (Math.PI/180);
            self.nativeObject.layer.rotate();
        },
        enumerable: true
    });
    
    var _rotationY = 0;
    Object.defineProperty(self, 'rotationY', {
        get: function() {
            return _rotationY;
        },
        set: function(value) {
            _rotationY = value;
            self.nativeObject.layer.rotationY = _rotationY * (Math.PI/180);
            self.nativeObject.layer.rotate();
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'visible', {
        get: function() {
            return self.nativeObject.visible;
        },
        set: function(value) {
            self.nativeObject.visible = value;
        },
        enumerable: true,configurable: true
    });

    Object.defineProperty(self, 'touchEnabled', {
        get: function() {
            return self.nativeObject.touchEnabled;
        },
        set: function(value) {
            self.nativeObject.touchEnabled = value;
        },
        enumerable: true
    });


    this.getPosition = function(){
        return {left : self.left , top : self.top , width : self.width, height : self.height};
    }

    this.setPosition = function(position){
        self.left = position.left;
        self.top = position.top;
        self.width = position.width;
        self.height = position.height;
    }
    
    //Issue: IOS-2340
    this.bringToFront = function(){
        var parent = self.getParent();
        if (parent) {
            var maxZPosition = 0;
            for (var subview in parent.nativeObject.subviews) {
               var zPosition = Invocation.invokeInstanceMethod(parent.nativeObject.subviews[subview].layer,"zPosition",[],"CGFloat");
               if (zPosition > maxZPosition) {
                   maxZPosition = zPosition
               }
            }
            var argZPosition = new Invocation.Argument({
                    type: "CGFloat",
                    value: maxZPosition + 1});
            Invocation.invokeInstanceMethod(self.nativeObject.layer,"setZPosition:",[argZPosition]);
        }
    };

    this.getParent = function(){
        return self.parent ? self.parent : null;
    };

    Object.defineProperty(self, 'onTouch', {
        get: function() {
            return self.nativeObject.onTouch;
        },
        set: function(value) {
            if (typeof value === 'function') {
                self.nativeObject.onTouch = value.bind(this);
            }
        },
        enumerable: true, configurable: true
    });

    Object.defineProperty(self, 'onTouchEnded', {
        get: function() {
            return self.nativeObject.onTouchEnded;
        },
        set: function(value) {
            if (typeof value === 'function') {
                self.nativeObject.onTouchEnded = value.bind(this);
            }
        },
        enumerable: true, configurable: true
    });

    function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    //////////////////////////////////////////////////////////////////////////
    // YOGA STUFF START
    //////////////////////////////////////////////////////////////////////////

    /*
     The property that decides if we should include this view when calculating layout. Defaults to YES.
     */
    Object.defineProperty(self, 'isIncludedInLayout', {
        get: function() {
            return self.nativeObject.yoga.isIncludedInLayout;
        },
        set: function(value) {
            self.nativeObject.yoga.isIncludedInLayout = value;
        },
        enumerable: true
    });

    /*
     The property that decides during layout/sizing whether or not styling properties should be applied. Defaults to NO.
     */
    Object.defineProperty(self, 'flexEnabled', {
        get: function() {
            return self.nativeObject.yoga.isEnabled;
        },
        set: function(value) {
            self.nativeObject.yoga.isEnabled = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'direction', {
        get: function() {
            return self.nativeObject.yoga.direction;
        },
        set: function(value) {
            self.nativeObject.yoga.direction = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'flexDirection', {
        get: function() {
            return self.nativeObject.yoga.flexDirection;
        },
        set: function(value) {
            self.nativeObject.yoga.flexDirection = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'justifyContent', {
        get: function() {
            return self.nativeObject.yoga.justifyContent;
        },
        set: function(value) {
            self.nativeObject.yoga.justifyContent = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'alignContent', {
        get: function() {
            return self.nativeObject.yoga.alignContent;
        },
        set: function(value) {
            self.nativeObject.yoga.alignContent = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'alignItems', {
        get: function() {
            return self.nativeObject.yoga.alignItems;
        },
        set: function(value) {
            self.nativeObject.yoga.alignItems = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'alignSelf', {
        get: function() {
            return self.nativeObject.yoga.alignSelf;
        },
        set: function(value) {
            self.nativeObject.yoga.alignSelf = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'positionType', {
        get: function() {
            return self.nativeObject.yoga.position;
        },
        set: function(value) {
            self.nativeObject.yoga.position = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'flexWrap', {
        get: function() {
            return self.nativeObject.yoga.flexWrap;
        },
        set: function(value) {
            self.nativeObject.yoga.flexWrap = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'overflow', {
        get: function() {
            return self.nativeObject.yoga.overflow;
        },
        set: function(value) {
            self.nativeObject.yoga.overflow = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'display', {
        get: function() {
            return self.nativeObject.yoga.display;
        },
        set: function(value) {
            self.nativeObject.yoga.display = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'flexGrow', {
        get: function() {
            return self.nativeObject.yoga.flexGrow;
        },
        set: function(value) {
            self.nativeObject.yoga.flexGrow = value;
            if(value > 0){
                self.flexBasis = 1;
            }
            else if(value === 0){ // Workaround Bug iOS / IOS-2406
                self.flexBasis = NaN;
                if(self.nativeObject.superview && self.nativeObject.superview.yoga.isEnabled){
                    if (self.nativeObject.superview.yoga.flexDirection === 0 ||  self.nativeObject.superview.yoga.flexDirection === 1){
                        var height = self.nativeObject.yoga.getYGValueForKey("height");
                        if (isNaN(height)) {
                            self.nativeObject.frame = {x: self.left, y: self.top, width: self.width, height: 0};
                        }
                    }else{
                        var width = self.nativeObject.yoga.getYGValueForKey("width");
                        if (isNaN(width)) {
                            self.nativeObject.frame = {x: self.left, y: self.top, width: 0, height: self.height};
                        }
                    }
                }
            }else{
                self.flexBasis = NaN;
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'flexShrink', {
        get: function() {
            return self.nativeObject.yoga.flexShrink;
        },
        set: function(value) {
            self.nativeObject.yoga.flexShrink = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'flexBasis', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("flexBasis");
        },
        set: function(value) {
            self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"flexBasis");
        },
        enumerable: true
    });

    /*
    // Left and Top can delete or added after tests
    */

    Object.defineProperty(self, 'left', {
        get: function() {
            return self.nativeObject.frame.x;
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"left");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'top', {
        get: function() {
            return self.nativeObject.frame.y;
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"top");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'right', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("right");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"right");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'bottom', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("bottom");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"bottom");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'start', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("start");
        },
        set: function(value) {
            self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"start");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'end', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("end");
        },
        set: function(value) {
            self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"end");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'marginLeft', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("marginLeft");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"marginLeft");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'marginTop', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("marginTop");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"marginTop");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'marginRight', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("marginRight");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"marginRight");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'marginBottom', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("marginBottom");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"marginBottom");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'marginStart', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("marginStart");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"marginStart");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'marginEnd', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("marginEnd");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"marginEnd");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'marginHorizontal', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("marginHorizontal");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"marginHorizontal");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'marginVertical', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("marginVertical");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"marginVertical");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'margin', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("margin");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"margin");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'paddingLeft', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("paddingLeft");
        },
        set: function(value) {
            self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"paddingLeft");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'paddingTop', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("paddingTop");
        },
        set: function(value) {
            self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"paddingTop");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'paddingRight', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("paddingRight");
        },
        set: function(value) {
            self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"paddingRight");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'paddingBottom', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("paddingBottom");
        },
        set: function(value) {
            self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"paddingBottom");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'paddingStart', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("paddingStart");
        },
        set: function(value) {
            self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"paddingStart");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'paddingEnd', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("paddingEnd");
        },
        set: function(value) {
            self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"paddingEnd");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'paddingHorizontal', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("paddingHorizontal");
        },
        set: function(value) {
            self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"paddingHorizontal");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'paddingVertical', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("paddingVertical");
        },
        set: function(value) {
            self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"paddingVertical");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'padding', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("padding");
        },
        set: function(value) {
            self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"padding");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'borderLeftWidth', {
        get: function() {
            return self.nativeObject.yoga.borderLeftWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.borderLeftWidth = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'borderTopWidth', {
        get: function() {
            return self.nativeObject.yoga.borderTopWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.borderTopWidth = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'borderRightWidth', {
        get: function() {
            return self.nativeObject.yoga.borderRightWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.borderRightWidth = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'borderBottomWidth', {
        get: function() {
            return self.nativeObject.yoga.borderBottomWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.borderBottomWidth = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'borderStartWidth', {
        get: function() {
            return self.nativeObject.yoga.borderStartWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.borderStartWidth = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'borderEndWidth', {
        get: function() {
            return self.nativeObject.yoga.borderEndWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.borderEndWidth = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'borderWidth', {
        get: function() {
            return self.nativeObject.yoga.borderWidth;
        },
        set: function(value) {
            // Native object's layer must be updated!
            // Yoga's borderWidth property only effects positioning of its child view.
            self.nativeObject.layer.borderWidth = value;
            self.nativeObject.yoga.borderWidth = value;
        },
        enumerable: true
    });

    /*
    // Width and Height can delete or added after tests
    */

    Object.defineProperty(self, 'width', {
        get: function() {
            return self.nativeObject.frame.width;
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"width");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true, configurable: true
    });

    Object.defineProperty(self, 'height', {
        get: function() {
            return self.nativeObject.frame.height;
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"height");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true, configurable: true
    });

    Object.defineProperty(self, 'minWidth', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("minWidth");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"minWidth");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'minHeight', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("minHeight");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"minHeight");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'maxWidth', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("maxWidth");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"maxWidth");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'maxHeight', {
        get: function() {
            return self.nativeObject.yoga.getYGValueForKey("maxHeight");
        },
        set: function(value) {
            if (typeof value === "number"){
                self.nativeObject.yoga.setYGValueUnitForKey(value,YGUnit.Point,"maxHeight");
            }else{
                throw new TypeError(Exception.TypeError.NUMBER);
            }
        },
        enumerable: true
    });

    // Yoga specific properties, not compatible with flexbox specification
    Object.defineProperty(self, 'aspectRatio', {
        get: function() {
            return self.nativeObject.yoga.aspectRatio;
        },
        set: function(value) {
            self.nativeObject.yoga.aspectRatio = value;
        },
        enumerable: true
    });

    /*
     Get the resolved direction of this node. This won't be YGDirectionInherit
     */
    Object.defineProperty(self, 'resolvedDirection', {
        get: function() {
            return self.nativeObject.yoga.resolvedDirection;
        },
        enumerable: true
    });

    /*
     Perform a layout calculation and update the frames of the views in the hierarchy with the results
     */
    this.applyLayout = function(){
        self.nativeObject.yoga.applyLayoutPreservingOrigin(false);
    }

    /*
     Returns the size of the view if no constraints were given. This could equivalent to calling [self sizeThatFits:CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX)];
     */
    Object.defineProperty(self, 'intrinsicSize', {
        get: function() {
            return self.nativeObject.yoga.intrinsicSize;
        },
        enumerable: true
    });

    /*
     Returns the number of children that are using Flexbox.
     */
    Object.defineProperty(self, 'numberOfChildren', {
        get: function() {
            return self.nativeObject.yoga.numberOfChildren;
        },
        enumerable: true
    });

    /*
     Return a BOOL indiciating whether or not we this node contains any subviews that are included in Yoga's layout.
     */
    Object.defineProperty(self, 'isLeaf', {
        get: function() {
            return self.nativeObject.yoga.isLeaf;
        },
        enumerable: true
    });

    /*
     Mark that a view's layout needs to be recalculated. Only works for leaf views.
     */
    this.dirty = function(){
        self.nativeObject.yoga.markDirty();
    }

    //////////////////////////////////////////////////////////////////////////
    // YOGA STUFF END
    //////////////////////////////////////////////////////////////////////////

     if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

}

module.exports = View;
