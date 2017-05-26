const Color = require('sf-core/ui/color');
const Image = require("sf-core/ui/image");

const FloatyOpenAnimationType = {
     pop : 0,
     fade : 1,
     slideLeft : 2,
     slideUp : 3,
     slideDown : 4,
     none : 5,
}

function FloatingMenu(params) {
    
    var self = this;
    
    if(!self.nativeObject){
        self.nativeObject = new __SF_Floaty();
    }
    //Defaults
    self.nativeObject.yoga.isEnabled = true;
    self.nativeObject.yoga.position = 1;
    self.nativeObject.yoga.right = 14;
    self.nativeObject.yoga.bottom = 14;
    self.nativeObject.yoga.width = 56;
    self.nativeObject.yoga.height = 56;
    self.nativeObject.buttonColor = Color.create("#00A1F1").nativeObject;
    self.nativeObject.openAnimationType = FloatyOpenAnimationType.slideUp;
    self.nativeObject.plusColor = Color.create("#00A1F1").nativeObject;
    
    self.floatyDelegate = new __SF_FloatyDelegate();
    
    self.floatyDelegate.emptyFloatySelected = function(){
        if (typeof self.onClick === "function"){
            self.onClick();
        } 
    };
    
    self.floatyDelegate.floatyOpened = function(){
        if (typeof self.onOpen === "function"){
            self.onOpen();
        }
    };
    
    self.floatyDelegate.floatyClosed = function(){
        if (typeof self.onClose === "function"){
            self.onClose();
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
            return Image.createFromImage(self.nativeObject.icon);;
        },
        set: function(value) {
            self.nativeObject.buttonImage = value.nativeObject;
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'color', {
        get: function() {
            return new Color({color : self.nativeObject.buttonColor});;
        },
        set: function(value) {
            self.nativeObject.buttonColor = value.nativeObject;
            self.nativeObject.plusColor = value.nativeObject;
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
                self.nativeObject.title = value;
            }
        },
        'icon':{
            get: function(value) {
                return Image.createFromImage(self.nativeObject.icon);
            },
            set: function(value) {
                self.nativeObject.icon = value.nativeObject;
            }
        },
        'color': {
            get: function() {
                return new Color({color : self.nativeObject.buttonColor});
            },
            set: function(value) {
                self.nativeObject.buttonColor = value.nativeObject;
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
                self.nativeObject.titleColor = titleColor.nativeObject;
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