const View = require('../view');
const Color = require("sf-core/ui/color");
const extend = require('js-base/core/extend');

const ActivityIndicatorStyle = {
    NORMAL: 1,
    LARGE: 0
};


const ActivityIndicator = extend(View)(
    function (_super, params)  {
        
         _super(this);
        var self = this;

       self.nativeObject = new UIActivityIndicatorView(ActivityIndicatorStyle.NORMAL);
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
    
        var _progressStyle = ActivityIndicatorStyle.NORMAL;
            Object.defineProperty(this, 'progressStyle', {
                get: function() {
                    return _progressStyle;
                },
                set: function(progressStyle) {
                    _progressStyle = progressStyle;
                    self.nativeObject.activityIndicatorViewStyle = progressStyle;
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

module.exports = {ActivityIndicator: ActivityIndicator, ActivityIndicatorStyle: ActivityIndicatorStyle};