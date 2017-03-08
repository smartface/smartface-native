const View = require('../view');
const Color = require("nf-core/ui/color");
const extend = require('js-base/core/extend');
const ActivityIndicatorType = require('nf-core/ui/activityindicatortype');

const ActivityIndicator = extend(View)(
    function (_super, params)  {
        var self = this;
        
        self.ios = {};
        
         if(!self.nativeObject){
              if (params.ios){
                  if (typeof params.ios.type === "number" && params.ios.type >= 0 && params.ios.type < 3){
                      self.nativeObject = new UIActivityIndicatorView(params.ios.type);
                  }else{
                       self.nativeObject = new UIActivityIndicatorView(ActivityIndicatorType.WHITE);
                  }
              }else{
                   self.nativeObject = new UIActivityIndicatorView(ActivityIndicatorType.WHITE);
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
         
        var _type = ActivityIndicatorType.WHITE;
        Object.defineProperty(self.ios, 'type', {
                get: function() {
                    return _type;
                },
                set: function(type) {
                    _type = type;
                },
                enumerable: true
        });
        
        // var _visible = true;
        // Object.defineProperty(self, 'visible', {
        //     get: function() {
        //         return _visible;
        //     },
        //     set: function(value) {
        //         _visible = value;
        //         if (value) {
        //             self.nativeObject.startAnimating();
        //         }else{
        //             self.nativeObject.stopAnimating();
        //         }
        //     },
        //     enumerable: true
        // });

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    
    }
);


module.exports = ActivityIndicator;