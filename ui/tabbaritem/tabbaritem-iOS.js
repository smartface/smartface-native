const UITabBarItem = SF.requireClass("UITabBarItem");
const Invocation = require('sf-core/util').Invocation;
const Image = require('sf-core/ui/image');

function TabBarItem(params) {
    var self = this;
    
    self.nativeObject = undefined;
    if (params.nativeObject) {
        self.nativeObject = params.nativeObject;
    }
    
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
                    console.log("Tabbaritem native title did set");
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
    
    // These are setted to undefined because of invalidate() function.
    // Invalidate function will call from Page's tabBarItem setter for each item, check these code flow.
    var _text = undefined;
    var _visible = undefined;
    var _height = undefined;
    var _backgroundColor = undefined;
    var _font = undefined;
    var _textColor = undefined;
    var _borderWidth = undefined;
    var _borderColor = undefined;
    var _move = {};
    
    Object.defineProperties(_badge, {
        'text': {
            get : function() {
                return _text;
            },
            set : function(text) {
                if (typeof text === "string") {
                    _text = text;
                    
                    if (self.nativeObject) {
                        __SF_Dispatch.mainAsyncAfter(function(){
                            self.nativeObject.pp_addBadgeWithText(text);
                            _visible ? self.nativeObject.pp_showBadge() : self.nativeObject.pp_hiddenBadge();
                            _borderColor ? self.badge.borderColor = _borderColor : 0;
                            _borderWidth ? self.badge.borderWidth = _borderWidth : 0;
                            _backgroundColor ? self.badge.backgroundColor = _backgroundColor : 0;
                            _textColor ? self.badge.textColor = _textColor : 0;
                            _font ? self.badge.font = _font : 0;
                        },1);  
                    }
                }
            },
            enumerable: true
        },
        'visible': {
            get : function() {
                return _visible;
            },
            set : function (value) {
                if (typeof value === "boolean") {
                    _visible = value;
                    
                    if (self.nativeObject) {
                        if (value) {
                            self.nativeObject.pp_showBadge();
                        }else{
                            self.nativeObject.pp_hiddenBadge();
                        }    
                    }
                }
            },
            enumerable: true
        },
        'height': {
            get : function () {
                return _height;
            },
            set : function (value) {
                if (typeof value === "number") {
                    _height = value;
                    
                    if (self.nativeObject) {
                        self.nativeObject.pp_setBadgeHeight(value);   
                    }
                }
            },
            enumerable: true
        },
        'borderWidth' : {
            get : function(){
                return _borderWidth;
            },
            set : function(value){
                if (typeof value === "number") {
                    _borderWidth = value;
                    
                    if (self.nativeObject) {
                        self.nativeObject.pp_setBorderWidth(_borderWidth);   
                    }
                }
            },
            enumerable: true
        },
        'borderColor' : {
            get : function(){
                return _borderColor;
            },
            set : function(value){
                if (typeof value === "object") {
                    _borderColor = value;
                    
                    if (self.nativeObject) {
                        self.nativeObject.pp_setBorderColor(_borderColor.nativeObject);   
                    }
                }
            },
            enumerable: true
        },
        'backgroundColor' : {
            get : function () {
                return _backgroundColor;
            },
            set : function (value) {
                if (typeof value === "object") {
                    _backgroundColor = value;
                    
                    if (self.nativeObject) {
                        var argIDBlock= new Invocation.Argument({
                            type:"IDBlock",
                            value: function(label){
                                var argColor= new Invocation.Argument({
                                    type:"NSObject",
                                    value: value.nativeObject
                                });
                                Invocation.invokeInstanceMethod(label,"setBackgroundColor:",[argColor]);
                            }
                        });
                        Invocation.invokeInstanceMethod(self.nativeObject,"pp_setBadgeLabelAttributes:",[argIDBlock]);   
                    }
                }
            },
            enumerable: true
        },
        'textColor' : {
            get : function () {
                return _textColor;
            },
            set : function (value) {
                if (typeof value === "object") {
                    _textColor = value;
                    
                    if (self.nativeObject) {
                        var argIDBlock= new Invocation.Argument({
                            type:"IDBlock",
                            value: function(label){
                                var argColor= new Invocation.Argument({
                                    type:"NSObject",
                                    value: value.nativeObject
                                });
                                Invocation.invokeInstanceMethod(label,"setTextColor:",[argColor]);
                            }
                        });
                        Invocation.invokeInstanceMethod(self.nativeObject,"pp_setBadgeLabelAttributes:",[argIDBlock]);   
                    }
                }
            },
            enumerable: true
        },
        'font' : {
            get : function () {
                return _font;
            },
            set : function (value) {
                if (typeof value === "object") {
                    _font = value;
                        
                    if (self.nativeObject) {
                        var argIDBlock= new Invocation.Argument({
                            type:"IDBlock",
                            value: function(label){
                                var argFont= new Invocation.Argument({
                                    type:"NSObject",
                                    value: value
                                });
                                Invocation.invokeInstanceMethod(label,"setFont:",[argFont]);
                            }
                        });
                        Invocation.invokeInstanceMethod(self.nativeObject,"pp_setBadgeLabelAttributes:",[argIDBlock]);   
                    }
                }
            },
            enumerable: true
        }
    });
    
    Object.defineProperties(_badge, {
        'move' : {
            value: function(x,y){
                if (typeof x === "number" && typeof y === "number") {
                    _move = {x:x, y:y};
                    
                    if (self.nativeObject) {
                        __SF_Dispatch.mainAsyncAfter(function(){
                            self.nativeObject.pp_moveBadgeWithXY(_move.x, _move.y);
                        },1);   
                    }
                }
            },
            enumerable: true
        }
    });
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    // UTIL
    self.invalidate = function() {
        this.title = _title;
        this.icon = _icon;
        
        //For badge
        this.badge.text = _text;
        this.badge.visible = _visible;
        this.badge.height = _height;
        this.badge.backgroundColor = _backgroundColor;
        this.badge.font = _font;
        this.badge.textColor = _textColor;
        this.badge.borderColor = _borderColor;
        this.badge.borderWidth = _borderWidth;
        this.badge.move(_move.x, _move.y);
    }
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

module.exports = TabBarItem;