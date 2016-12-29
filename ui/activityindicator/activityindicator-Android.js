const View = require('sf-core/ui/view');
const extend = require('js-base/core/extend');

const ActivityIndicator = extend(View)(
    function(_super, params) {
        var self = this;
        if (!self.nativeObject) {
            self.nativeObject = new android.widget.ProgressBar(Android.getActivity());
        }
        _super(this);
        self.nativeObject.setIndeterminate(true);

        // Getting default progressbar color. Its themes default colorAccent on native
        var typedValue = new android.util.TypedValue();
        var a = Android.getActivity().obtainStyledAttributes(typedValue.data, [android.R.attr.colorAccent]);
        var colorInitial = a.getColor(0, 0);
        a.recycle();

        Object.defineProperty(this, 'color', {
            get: function() {
                return colorInitial;
            },
            set: function(color) {
                if (colorInitial != color) {
                    colorInitial = color;
                    self.nativeObject.getIndeterminateDrawable().setColorFilter(colorInitial, android.graphics.PorterDuff.Mode.SRC_IN);
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