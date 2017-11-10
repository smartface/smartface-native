const Color = require('sf-core/ui/color');
const Image = require("sf-core/ui/image");
const TypeUtil = require("sf-core/util/type");
const Invocation    = require('sf-core/util').Invocation;

const FloatyOpenAnimationType = {
     pop : 0,
     fade : 1,
     slideLeft : 2,
     slideUp : 3,
     slideDown : 4,
     none : 5,
}

const UIUserInterfaceLayoutDirection = {
    leftToRight : 0,
    rightToLeft : 1
}

function FloatingMenu(params) {
    
    var self = this;
    
    if(!self.nativeObject){
        self.nativeObject = new __SF_Floaty();
    }
    //Defaults
    self.layoutDirection = Invocation.invokeInstanceMethod(__SF_UIApplication.sharedApplication(),"userInterfaceLayoutDirection",[],"NSInteger");
    
    self.nativeObject.yoga.isEnabled = true;
    self.nativeObject.yoga.position = 1;
    
    if (self.layoutDirection == UIUserInterfaceLayoutDirection.rightToLeft) {
        self.nativeObject.yoga.right = NaN;
        self.nativeObject.yoga.left = 14;
    }else{
        self.nativeObject.yoga.left = NaN;
        self.nativeObject.yoga.right = 14;
    }
    
    self.nativeObject.yoga.bottom = 14;
    self.nativeObject.yoga.width = 56;
    self.nativeObject.yoga.height = 56;
    self.nativeObject.buttonColor = Color.create("#00A1F1").nativeObject;
    self.nativeObject.openAnimationType = FloatyOpenAnimationType.slideUp;
    self.nativeObject.plusColor = Color.create("#00A1F1").nativeObject;
    self.nativeObject.rotationDegrees = 45;
    
    self.floatyDelegate = new __SF_FloatyDelegate();
    
    self.floatyDelegate.emptyFloatySelected = function(){
        if (typeof self.onClick === "function"){
            self.onClick();
        } 
    };
    
    self.floatyDelegate.floatyOpened = function(){
        var items = self.items;
        for (var item in items) {
            if (self.layoutDirection == UIUserInterfaceLayoutDirection.rightToLeft) {
                items[item].nativeObject.alignment = UIUserInterfaceLayoutDirection.rightToLeft;
            }else{
                items[item].nativeObject.alignment = UIUserInterfaceLayoutDirection.leftToRight;
            }
        }

        if (typeof self.onMenuOpen === "function"){
            self.onMenuOpen();
        }
    };
    
    self.floatyDelegate.floatyClosed = function(){
        if (typeof self.onMenuClose === "function"){
            self.onMenuClose();
        }
    };
    
    self.open = function(){
        self.nativeObject.open();
    };
    
    self.close = function(){
        self.nativeObject.close();
    };
    
    self.nativeObject.fabDelegate = self.floatyDelegate;
    
    var _items = [];
    Object.defineProperty(this, 'items', {
        get: function() {
            return _items;
        },
        set: function(items) {
            _items = items;
            self.nativeObject.items = [];
            for (var i = 0; i < _items.length; i++) {
                self.nativeObject.addItemWithItem(_items[i].nativeObject);
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'icon', {
        get: function() {
            return Image.createFromImage(self.nativeObject.icon);
        },
        set: function(value) {
            if(value instanceof Image){
                self.nativeObject.buttonImage = value.nativeObject;
            }else{
                throw new TypeError('icon must be a UI.Image');
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'visible', {
        get: function() {
            return self.nativeObject.visible;
        },
        set: function(value) {
            self.close();
            self.nativeObject.visible = value;
        },
        enumerable: true
    });
    
    var _rotateEnabled = true;
    Object.defineProperty(this, 'rotateEnabled', {
        get: function() {
            return _rotateEnabled;
        },
        set: function(value) {
            _rotateEnabled = value;
            if (_rotateEnabled) {
                self.nativeObject.rotationDegrees = 45;
            }else{
                self.nativeObject.rotationDegrees = 0;
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'color', {
        get: function() {
            return new Color({color : self.nativeObject.buttonColor});;
        },
        set: function(value) {
            if(value instanceof Color){
                self.nativeObject.buttonColor = value.nativeObject;
                self.nativeObject.plusColor = value.nativeObject;
            }else{
                throw new TypeError('color must be a UI.Color');
            }
        },
        enumerable: true
    });
    
     // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

FloatingMenu.Item = function FloatingMenuItem(params) {
    
    var self = this;
    
    if(!self.nativeObject){
        self.nativeObject = new __SF_FloatyItem();
    }
    
    Object.defineProperties(this, {
        'title': {
            get: function() {
                return self.nativeObject.title;
            },
            set: function(value) {
                if(!TypeUtil.isString(value)){
                    throw new TypeError('title must be string');
                }
                self.nativeObject.title = value;
            }
        },
        'icon':{
            get: function(value) {
                return Image.createFromImage(self.nativeObject.icon);
            },
            set: function(value) {
                if(value instanceof Image){
                    self.nativeObject.icon = value.nativeObject;
                }else{
                    throw new TypeError('icon must be a UI.Image');
                }
            }
        },
        'color': {
            get: function() {
                return new Color({color : self.nativeObject.buttonColor});
            },
            set: function(value) {
                if(value instanceof Color){
                    self.nativeObject.buttonColor = value.nativeObject;
                }else{
                    throw new TypeError('color must be a UI.Color');
                }
            }
        },
        'onClick': {
            get: function() {
                return self.nativeObject.onSelected;
            },
            set: function(callback) {
                self.nativeObject.onSelected = callback;
            }
        },
        'titleColor': {
            get: function() {
                return new Color({color : self.nativeObject.titleColor});
            },
            set: function(titleColor) {
                if(titleColor instanceof Color){
                    self.nativeObject.titleColor = titleColor.nativeObject;
                }else{
                    throw new TypeError('titleColor must be a UI.Color');
                }
            }
        }
    });
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

module.exports = FloatingMenu;