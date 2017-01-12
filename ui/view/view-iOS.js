const TypeUtil = require("sf-core/util/type");

function View(params) {
    
    var self = this;

    self.uniqueId = guid();
    
    if(!self.nativeObject){
        self.nativeObject = new SMFUIView();
    }

    //defaults
    self.nativeObject.setAllAutoresizingMask();
    
    var _style;
    Object.defineProperty(self, 'style', {
        get: function() {
           return _style;
        },
        set: function(value) {
           _style = value;
           
           self.nativeObject.layer.borderUIColor = value.borderColor;
           self.nativeObject.layer.borderWidth = value.borderWidth;
           
           _style.addChangeHandler(function(propertyName,value){
               if(propertyName == 'borderColor'){
                   self.nativeObject.layer.borderUIColor = value;
               }else if(propertyName == 'borderWidth'){
                   self.nativeObject.layer.borderWidth = value;
               }
           });
        },
        enumerable: true
    });
     
    Object.defineProperty(self, 'alpha', {
        get: function() {
            return self.nativeObject.alpha;
        },
        set: function(value) {
            self.nativeObject.alpha = value;
        },
        enumerable: true
    });
    
    var _backgroundColor;
    Object.defineProperty(self, 'backgroundColor', {
        get: function() {
            return _backgroundColor;
        },
        set: function(value) {
            _backgroundColor = value;
            self.nativeObject.backgroundColor = value;
        },
        enumerable: true
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

    Object.defineProperty(self, 'visible', {
        get: function() {
            return self.nativeObject.visible;
        },
        set: function(value) {
            self.nativeObject.visible = value;
        },
        enumerable: true
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
        
       return  {left : self.nativeObject.frame.x , top : self.nativeObject.frame.y , width : self.nativeObject.frame.width, height : self.nativeObject.frame.height};
    }


    this.setPosition = function(position){
        self.left = position.left;
        self.top = position.top;
        self.width = position.width;
        self.height = position.height;
    }
    
    this.padding = function(param){
        alert('padd');
        
    };
    
    var _padding;
    Object.defineProperty(self, 'padding', {
        get: function() {
            return _padding;
        },
        set: function(param) {
            _padding = param;
        },
        enumerable: true
    });
    
    this.bringToFront = function(){
        var parent = self.getParent();
        if (parent) {
            parent.nativeObject.bringSubviewToFront(self.nativeObject);
        }
    };
    
    this.getParent = function(){
        return self.parent ? self.parent : null;
    };
    
    var _left = 0;
    Object.defineProperty(self, 'left', {
        get: function() {
            return self.nativeObject.frame.x;
        },
        set: function(value) {
            _left = value;
            
            if (self.parent) {
                var left = !TypeUtil.isNumeric(value) ? self.parent.width * (parseInt(value.replace("%")))/100 : value;
                var frame = this.getPosition();
                self.nativeObject.frame = { x : left, y : frame.top, width : frame.width, height : frame.height};
            }
        },
        enumerable: true
    });
    
    var _top = 0;
    Object.defineProperty(self, 'top', {
        get: function() {
            return self.nativeObject.frame.y;
        },
        set: function(value) {
            _top = value;
            if (self.parent) {
                var top = !TypeUtil.isNumeric(value) ? self.parent.height * (parseInt(value.replace("%")))/100 : value;
                var frame = this.getPosition();
                self.nativeObject.frame = { x : frame.left, y : top, width : frame.width, height : frame.height};
            }
        },
        enumerable: true
    });
    
    var _width = 100;
    Object.defineProperty(self, 'width', {
        get: function() {
            return self.nativeObject.frame.width;
        },
        set: function(value) {
            _width = value;
            self.invalidatePosition();
        },
        enumerable: true
    });
    
    var _height = 100;
    Object.defineProperty(self, 'height', {
        get: function() {
            return self.nativeObject.frame.height;
        },
        set: function(value) {
            _height = value;
            self.invalidatePosition();
        },
        enumerable: true
    });

    Object.defineProperty(self, 'onTouch', {
        get: function() {
            return self.nativeObject.onTouch;
        },
        set: function(value) {
            self.nativeObject.onTouch = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'onTouchEnded', {
        get: function() {
            return self.nativeObject.onTouchEnded;
        },
        set: function(value) {
            self.nativeObject.onTouchEnded = value;
        },
        enumerable: true
    });
    
    function convertPercentage(stringValue, baseValue) {
        if (/^[0-9]+\%$/.test(stringValue)) {
            var value = parseInt(stringValue, 10)
            if (isNaN(value)) {
                return -1;
            }
            return Math.round(baseValue * value / 100);
        }
        return -1;
    };
    
    this.invalidatePosition = function(){
        if( (TypeUtil.isNumeric(_left) && TypeUtil.isNumeric(_top) && TypeUtil.isNumeric(_width) && TypeUtil.isNumeric(_height)) || self.parent){
            setLayoutParam();
        }
    };

    function setLayoutParam(){
        var left = 0;
        var top = 0;
        var height = 0;
        var width = 0;
        
        if(self.parent){
           left = !TypeUtil.isNumeric(_left) ? self.parent.width * (parseInt(_left.replace("%")))/100 : _left;
           top = !TypeUtil.isNumeric(_top) ? self.parent.height * (parseInt(_top.replace("%")))/100 : _top;
           height = !TypeUtil.isNumeric(_height) ? self.parent.height * (parseInt(_height.replace("%")))/100 : _height;
           width = !TypeUtil.isNumeric(_width) ? self.parent.width * (parseInt(_width.replace("%")))/100 : _width;
        }else{
           left = _left;
           top = _top;
           height = _height;
           width = _width;
        }
        
        self.nativeObject.frame = { x : left, y : top, width : width, height : height};
        
        if (self.childs) {
            for (var child in self.childs){
                self.childs[child].invalidatePosition();
             }
        }
    };
    
    function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
}


module.exports = View;