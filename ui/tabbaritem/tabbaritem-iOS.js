const UITabBarItem = SF.requireClass("UITabBarItem");
const Invocation = require('sf-core/util').Invocation;
const Image = require('sf-core/ui/image');
const FlexLayout = require('sf-core/ui/flexlayout');

function TabBarItem(params) {
    var self = this;
    
    self.nativeObject = undefined;
    if (params.nativeObject) {
        self.nativeObject = params.nativeObject;
    }
    
    var _nativeView;
    Object.defineProperty(this, 'layout', {
        get: function() {
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
    });
    
    this.getScreenLocation = function () {
        return this.layout.getScreenLocation();
    };
    
    var _title = "";
    Object.defineProperty(this, 'title', {
        get: function() {
            return _title;
        },
        set: function(title) {
            if (typeof title === 'string') {
                _title = title;
                if (self.nativeObject) {
                    self.nativeObject.title = _title;
                }
            }
        },
        enumerable: true
    });
    
    var _icon = null;
    Object.defineProperty(this, 'icon', {
        get: function() {
            return _icon;
        },
        set: function(icon) {
            if (typeof icon === 'object') {
                _icon = icon;
                if (self.nativeObject) {
                    if (_icon && (_icon.normal || _icon.selected)) {
                        if (typeof _icon.normal === "object") {
                            self.nativeObject.image = _icon.normal.nativeObject;
                        } else if (typeof _icon.normal === "string") {
                            var image = Image.createFromFile(_icon.normal);
                            self.nativeObject.image = image.nativeObject;
                        } else {
                            self.nativeObject.image = undefined;
                        }
                        
                        if (typeof _icon.selected === "object") {
                            self.nativeObject.selectedImage = _icon.selected.nativeObject;
                        } else if (typeof _icon.selected === "string") {
                            var image = Image.createFromFile(_icon.selected);
                            self.nativeObject.selectedImage =image.nativeObject;
                        } else {
                            self.nativeObject.selectedImage = undefined;
                        }
                    } else {
                        if (typeof _icon === "object") {
                            self.nativeObject.image = _icon ? _icon.nativeObject : undefined;
                            self.nativeObject.selectedImage = _icon ? _icon.nativeObject : undefined;
                        } else if (typeof _icon === "string") {
                            var image = Image.createFromFile(_icon);
                            self.nativeObject.image = image.nativeObject ? image.nativeObject : undefined;
                            self.nativeObject.selectedImage = image.nativeObject ? image.nativeObject : undefined;
                        }
                    }
                }
            }
        },
        enumerable: true
    });
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BADGE
    
    var _badge = {};
    Object.defineProperty(this, 'badge', {
        get: function(){
            return _badge;
        },
        enumerable: true
    });
    
    var _badgeVisible = false;
    var _badgeBackgroundColor = 0;
    var _badgeFont = 0;
    var _badgeTextColor = 0;
    var _badgeBorderColor = 0;
    var _badgeBorderWidth = 0;
    var _badgeHeight = 0;
    var _isBadgeFirstLoad = false;
    var _badgeText;
    var isLTR = (__SF_UIView.viewAppearanceSemanticContentAttribute() == 0) ? (__SF_UIApplication.sharedApplication().userInterfaceLayoutDirection == 0) : (__SF_UIView.viewAppearanceSemanticContentAttribute() == 3);
    var _isRTL = !isLTR;
    
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
                            
                            if (_isRTL) {
                                self.badge.isRTL = _isRTL;
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
        'isRTL' : {
            get: function(){
                return _isRTL;
            },
            set: function(value){
                _isRTL = value;
                __SF_Dispatch.mainAsyncAfter(function(){
                    self.nativeObject.pp_setIsRTL(value);
                },1);
            },
            enumerable: true
        }
    });
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // UTIL
    self.invalidate = function() {
        this.title = _title;
        this.icon = _icon;
    }
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

module.exports = TabBarItem;
