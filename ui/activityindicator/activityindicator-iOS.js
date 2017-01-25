const View = require('../view');
const Color = require("nf-core/ui/color");
const extend = require('js-base/core/extend');

const ActivityIndicator = extend(View)(
    function (_super, params)  {
        var self = this;
        
         if(!self.nativeObject){
              self.nativeObject = new UIActivityIndicatorView(1);
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