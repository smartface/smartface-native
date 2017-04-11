const View = require('../view');
const Color = require("sf-core/ui/color");
const extend = require('js-base/core/extend');

const ActivityIndicator = extend(View)(
    function (_super, params)  {
        var self = this;
        
        self.ios = {};
        
         if(!self.nativeObject){
              if (params.ios){
                  if (typeof params.ios.type === "number" && params.ios.type >= 0 && params.ios.type < 3){
                      self.nativeObject = new __SF_UIActivityIndicatorView(params.ios.type);
                  }else{
                       self.nativeObject = new __SF_UIActivityIndicatorView(ActivityIndicator.iOS.Type.WHITE);
                  }
              }else{
                   self.nativeObject = new __SF_UIActivityIndicatorView(ActivityIndicator.iOS.Type.WHITE);
              }
         }
         _super(this);
        
        self.nativeObject.startAnimating();

        var _color = Color.WHITE;
        Object.defineProperty(this, 'color', {
                get: function() {
                    return _color;
                },
                set: function(color) {
                    _color = color;
                    self.nativeObject.color = color;
                },
                enumerable: true
        });
           
        self.ios = {};
         
        var _type = ActivityIndicator.iOS.Type.WHITE;
        Object.defineProperty(self.ios, 'type', {
                get: function() {
                    return _type;
                },
                set: function(type) {
                    _type = type;
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
);

ActivityIndicator.iOS = {};

ActivityIndicator.iOS.Type = {};

Object.defineProperty(ActivityIndicator.iOS.Type, 'WHITELARGE', {
    value: 0,
    writable: false
});

Object.defineProperty(ActivityIndicator.iOS.Type, 'WHITE', {
    value: 1,
    writable: false
});


Object.defineProperty(ActivityIndicator.iOS.Type, 'GRAY', {
    value: 2,
    writable: false
});

module.exports = ActivityIndicator;