const View = require('sf-core/ui/view');
const extend = require('js-base/core/extend');

const NativeProgressBar = requireClass("android.widget.ProgressBar");
const NativePorterDuff = requireClass("android.graphics.PorterDuff");
const Color = require('sf-core/ui/color');

const ActivityIndicator = extend(View)(
    function(_super, params) {
        var _color = null;
        
        if (!this.nativeObject) {
            this.nativeObject = new NativeProgressBar(Android.getActivity());
        }
        
        _super(this);
        
        Object.defineProperties(this, {
            'color': {
                get: function() {
                    return _color;
                },
                set: function(color) {
                    if (_color !== color) {
                        _color = color;
                        this.nativeObject.getIndeterminateDrawable().setColorFilter(_color, NativePorterDuff.Mode.SRC_IN);
                    }
                },
                enumerable: true
            },
            'toString': {
                value: function(){
                    return 'ActivityIndicator';
                },
                enumerable: true, 
                configurable: true
            }
        });

        // Handling ios specific properties.
        this.ios = {}; 
        
        if(!this.isNotSetDefaults){
            this.nativeObject.setIndeterminate(true);
            this.color = Color.create("#00A1F1"); // SmartfaceBlue
        }
        
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

module.exports = ActivityIndicator;