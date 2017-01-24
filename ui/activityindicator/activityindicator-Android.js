const View = require('nf-core/ui/view');
const extend = require('js-base/core/extend');

const NativeProgressBar = requireClass("android.widget.ProgressBar");
const NativePorterDuff = requireClass("android.graphics.PorterDuff");
const Color = require('nf-core/ui/color');

const ActivityIndicator = extend(View)(
    function(_super, params) {
        var self = this;
        if (!self.nativeObject) {
            self.nativeObject = new NativeProgressBar(Android.getActivity());
        }
        _super(this);
        self.nativeObject.setIndeterminate(true);

        var colorInitial = null;
        Object.defineProperty(this, 'color', {
            get: function() {
                return colorInitial;
            },
            set: function(color) {
                if (colorInitial != color) {
                    colorInitial = color;
                    self.nativeObject.getIndeterminateDrawable().setColorFilter(colorInitial, NativePorterDuff.Mode.SRC_IN);
                }
            },
            enumerable: true
        });

        self.color = Color.create("#00A1F1"); // SmartfaceBlue
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ActivityIndicator;