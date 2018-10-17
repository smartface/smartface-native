const Color = require("sf-core/ui/color");
const Image = require('sf-core/ui/image');
const Invocation = require('sf-core/util').Invocation;
const FlexLayout = require('sf-core/ui/flexlayout');

function HeaderBarItem(params) {
    var _onPress = null;
    
    var self = this;
    
    self.nativeObject = new __SF_UIBarButtonItem();
    self.nativeObject.target = self.nativeObject;
    var _badge ={};
    _badge.ios = {};
    
    var _nativeView;
    
    Object.defineProperties(this, {
        'layout': {
            get: function (argument) {
                var retval;
                if (_nativeView) {
                    retval = _nativeView;
                } else {
                    var key = new Invocation.Argument({
                        type:"NSString",
                        value: "view"
                    });
                    var view = Invocation.invokeInstanceMethod(self.nativeObject,"valueForKey:",[key],"id");
                    _nativeView = new FlexLayout({nativeObject : view});
                    retval = _nativeView;
                }
                return retval;
            },
            enumerable: true
        },
        'title': {
            get: function() {
                return self.nativeObject.title;
            },
            set: function(value) {
                if (typeof(value) !== "string") {
                    return;
                }
                self.nativeObject.title = value;
            },
            enumerable: true
        },
        'image': {
            get: function() {
                var retval = undefined;
                if (self.nativeObject.image) {
                    retval = Image.createFromImage(self.nativeObject.image);
                }
                return retval;
            },
            set: function(value) {
                if (typeof value === "string") {
                    var image = Image.createFromFile(value);
                    self.nativeObject.image = image.nativeObject;
                } else {
                    if (value) {
                        self.nativeObject.image = value.nativeObject;
                    }   
                }
            },
            enumerable: true
        },
        'color': {
            get: function() {
                return new Color({color : self.nativeObject.tintColor});
            },
            set: function(value) {
                if (value) {
                    self.nativeObject.tintColor = value.nativeObject;
                }
            },
            enumerable: true
        },
        'enabled': {
            get: function() {
                return self.nativeObject.enabled;
            },
            set: function(value) {
                self.nativeObject.enabled = value;
            },
            enumerable: true
        },
        'onPress': {
            get: function() {
                return _onPress;
            },
            set: function(value) {
                if (value instanceof Function) {
                    _onPress = value.bind(this);
                    self.nativeObject.addJSAction(_onPress);
                }
            },
            enumerable: true
        },
        'badge': {
            get: function(){
                return _badge;
            },
            enumerable: true
        }
    });
    
    this.getScreenLocation = function () {
        return this.layout.getScreenLocation();
    };
    
    var _badgeVisible = false;
    var _badgeBackgroundColor = 0;
    var _badgeFont = 0;
    var _badgeTextColor = 0;
    var _badgeBorderColor = 0;
    var _badgeBorderWidth = 0;
    var _badgeHeight = 0;
    var _isBadgeFirstLoad = false;
    var _badgeText;
    
    Object.defineProperties(_badge, {
        'text': {
            get: function(){
                return _badgeText;
            },
            set: function(value){
                if (typeof value === "string") {
                    __SF_Dispatch.mainAsyncAfter(function(){
                        __SF_Dispatch.mainAsyncAfter(function(){
                            self.nativeObject.pp_addBadgeWithText(value);
                        },1);
                        if (!_isBadgeFirstLoad) {
                            if (_badgeVisible) {
                                self.badge.visible = _badgeVisible;
                            }
                            
                            if (_badgeBackgroundColor) {
                                self.badge.backgroundColor = _badgeBackgroundColor;
                            }else{
                                _badgeBackgroundColor = 0;
                            }
                            
                            if (_badgeTextColor) {
                                self.badge.textColor = _badgeTextColor;
                            } else {
                                _badgeTextColor = 0;
                            }
                            
                            if (_badgeFont) {
                                self.badge.font = _badgeFont;
                            } else {
                                _badgeFont = 0;
                            }
                            
                            if (_badgeBorderColor) {
                                self.badge.borderColor = _badgeBorderColor;
                            } else {
                                _badgeBorderColor = 0;
                            }
                            
                            if (_badgeBorderWidth) {
                                self.badge.borderWidth = _badgeBorderWidth;
                            } else {
                                _badgeBorderWidth = 0;
                            }
                            
                            if (_badgeHeight) {
                                self.badge.height = _badgeHeight;
                            } else {
                                _badgeHeight = 0;
                            }
                        }
                        _isBadgeFirstLoad = true;
                    },1);
                }
            }
        },
        'visible' : {
            get : function(){
                return _badgeVisible;
            },
            set : function(value){
                if (typeof value === "boolean") {
                    _badgeVisible = value;
                    if (_badgeVisible) {
                        
                        __SF_Dispatch.mainAsyncAfter(function(){
                            self.nativeObject.pp_showBadge();
                        },1);
                    } else {
                        __SF_Dispatch.mainAsyncAfter(function(){
                            self.nativeObject.pp_hiddenBadge();
                        },1);
                    }
                }
            },
            enumerable: true
        },
        'height' : {
            get : function(){
                return _badgeHeight;
            },
            set : function(value){
                if (typeof value === "number") {
                    _badgeHeight = value;
                    
                    __SF_Dispatch.mainAsyncAfter(function(){
                        self.nativeObject.pp_setBadgeHeight(_badgeHeight);
                    },1);
                }
            },
            enumerable: true
        },
        'borderWidth' : {
            get : function(){
                return _badgeBorderWidth;
            },
            set : function(value){
                if (typeof value === "number") {
                    _badgeBorderWidth = value;
                    
                    __SF_Dispatch.mainAsyncAfter(function(){
                        self.nativeObject.pp_setBorderWidth(_badgeBorderWidth);
                    },1);
                }
            },
            enumerable: true
        },
        'borderColor' : {
            get : function(){
                return _badgeBorderColor;
            },
            set : function(value){
                if (typeof value === "object") {
                    _badgeBorderColor = value;
                    
                    __SF_Dispatch.mainAsyncAfter(function(){
                        self.nativeObject.pp_setBorderColor(_badgeBorderColor.nativeObject);
                    },1);
                }
            },
            enumerable: true
        },
        'backgroundColor' : {
            get : function(){
                return _badgeBackgroundColor;
            },
            set : function(value){
                if (typeof value === "object") {
                    _badgeBackgroundColor = value;
                    
                    __SF_Dispatch.mainAsyncAfter(function(){
                        var argIDBlock= new Invocation.Argument({
                            type:"IDBlock",
                            value: function(label){
                                var argColor= new Invocation.Argument({
                                    type:"NSObject",
                                    value: _badgeBackgroundColor.nativeObject
                                });
                                Invocation.invokeInstanceMethod(label,"setBackgroundColor:",[argColor]);
                            }
                        });
                        Invocation.invokeInstanceMethod(self.nativeObject,"pp_setBadgeLabelAttributes:",[argIDBlock]);
                    },1);
                }
            },
            enumerable: true
        },
        'textColor' : {
            get : function(){
                return _badgeTextColor;
            },
            set : function(value){
                if (typeof value === "object") {
                    _badgeTextColor = value;
                    
                    __SF_Dispatch.mainAsyncAfter(function(){
                        var argIDBlock= new Invocation.Argument({
                            type:"IDBlock",
                            value: function(label){
                                var argColor= new Invocation.Argument({
                                    type:"NSObject",
                                    value: _badgeTextColor.nativeObject
                                });
                                Invocation.invokeInstanceMethod(label,"setTextColor:",[argColor]);
                            }
                        });
                        Invocation.invokeInstanceMethod(self.nativeObject,"pp_setBadgeLabelAttributes:",[argIDBlock]);
                    },1);
                }
            },
            enumerable: true
        },
        'font' : {
            get : function(){
                return _badgeFont;
            },
            set : function(value){
                _badgeFont = value;
                
                __SF_Dispatch.mainAsyncAfter(function(){
                    var argIDBlock= new Invocation.Argument({
                        type:"IDBlock",
                        value: function(label){
                            var argFont= new Invocation.Argument({
                                type:"NSObject",
                                value: _badgeFont
                            });
                            Invocation.invokeInstanceMethod(label,"setFont:",[argFont]);
                        }
                    });
                    Invocation.invokeInstanceMethod(self.nativeObject,"pp_setBadgeLabelAttributes:",[argIDBlock]);
                },1);
            },
            enumerable: true
        },
        'move' : {
            value: function(x,y){
                __SF_Dispatch.mainAsyncAfter(function(){
                    self.nativeObject.pp_moveBadgeWithXY(x,y);
                },1);
            },
            enumerable: true
        },
    });
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = HeaderBarItem;