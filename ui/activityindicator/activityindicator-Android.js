const View = require('sf-core/ui/view');
const extend = require('js-base/core/extend');

const NativeProgressBar = requireClass("android.widget.ProgressBar");
const NativeTypedValue = requireClass("android.util.TypedValue");
const NativePorterDuff = requireClass("android.graphics.PorterDuff");
const NativeR = requireClass("android.R");

const ActivityIndicator = extend(View)(
    function(_super, params) {
        var self = this;
        if (!self.nativeObject) {
            self.nativeObject = new NativeProgressBar(Android.getActivity());
        }
        _super(this);
        self.nativeObject.setIndeterminate(true);

        // Getting default progressbar color. Its themes default colorAccent on native
        var typedValue = new NativeTypedValue();
        var a = Android.getActivity().obtainStyledAttributes(typedValue.data, [NativeR.attr.colorAccent]);
        var colorInitial = a.getColor(0, 0);
        a.recycle();

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

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ActivityIndicator;