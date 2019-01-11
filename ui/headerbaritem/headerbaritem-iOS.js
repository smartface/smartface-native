const Color = require("sf-core/ui/color");
const Image = require('sf-core/ui/image');
const Invocation = require('sf-core/util').Invocation;
const FlexLayout = require('sf-core/ui/flexlayout');
const Badge = require('sf-core/ui/badge');

function HeaderBarItem(params) {
    var _onPress = null;
    
    var self = this;
    
    var _systemItem;
    if (params && params.ios && params.ios.systemItem) {
        _systemItem = params.ios.systemItem;
        self.nativeObject = __SF_UIBarButtonItem.createWithSystemItem(params.ios.systemItem);
    }else{
        self.nativeObject = new __SF_UIBarButtonItem();
    }
    
    self.nativeObject.target = self.nativeObject;
    
    var _badge = new Badge({nativeObject : self.nativeObject});
    
    var _nativeView;
    var _font = undefined;
    
    Object.defineProperties(this, {
        'layout': {
            get: function (argument) {
                var retval;
                if (_nativeView) {
                    retval = _nativeView;
                } else {
                    _nativeView = self.nativeObject.containerView ? new FlexLayout({nativeObject : self.nativeObject.containerView}) : undefined;
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
        },
        'size': {
            get: function(){
                return self.layout ? {width : self.layout.nativeObject.frame.width, height : self.layout.nativeObject.frame.height} : undefined;
            },
            enumerable: true
        }
    });
    
    this.ios = {};
    
    Object.defineProperties(this.ios, {
        'systemItem': {
            get: function(){
                return _systemItem;
            },
            enumerable: true
        },
        'font': {
            get: function() {
                return _font;
            },
            set: function(value) {
                _font = value;
                if (_font) {
                    self.nativeObject.setTitleTextAttributesForState({"NSFont": _font}, 0);        //UIControlStateNormal
                    self.nativeObject.setTitleTextAttributesForState({"NSFont": _font}, 1 << 0);   //UIControlStateHighlighted
                    self.nativeObject.setTitleTextAttributesForState({"NSFont": _font}, 1 << 1);   //UIControlStateDisabled
                }else{
                    self.nativeObject.setTitleTextAttributesForState({}, 0);        //UIControlStateNormal
                    self.nativeObject.setTitleTextAttributesForState({}, 1 << 0);   //UIControlStateHighlighted
                    self.nativeObject.setTitleTextAttributesForState({}, 1 << 1);   //UIControlStateDisabled
                }
            },
            enumerable: true
        }
    });
    
    this.getScreenLocation = function () {
        return this.layout.getScreenLocation();
    };
    
    // Assign parameters given in constructor
    function setParams(params){
        for (var param in params) {
            if(param === "ios" || param === "android"){
                setOSSpecificParams.call(this,params[param],param);
            }else{
                this[param] = params[param];
            }
        }
    }
    
    function setOSSpecificParams(params,key){
        for (var param in params) {
            this[key][param] = params[param];
        }
    }
    
    setParams.call(this,params);
}

HeaderBarItem.iOS = {};
HeaderBarItem.iOS.SystemItem = {
    DONE : 0,
    CANCEL : 1,
    EDIT : 2,
    SAVE : 3,
    ADD : 4,
    FLEXIBLESPACE : 5,
    FIXEDSPACE : 6,
    COMPOSE : 7,
    REPLY : 8,
    ACTION : 9,
    ORGANIZE : 10,
    BOOKMARKS : 11,
    SEARCH : 12,
    REFRESH : 13,
    STOP : 14,
    CAMERA : 15,
    TRASH : 16,
    PLAY : 17,
    PAUSE : 18,
    REWIND : 19,
    FASTFORWARD : 20,
    UNDO : 21,
    REDO : 22
};

module.exports = HeaderBarItem;