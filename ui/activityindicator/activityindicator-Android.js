const View = require('sf-core/ui/view');
const extend = require('js-base/core/extend');

var ActivityIndicatorStyle = {
    NORMAL: 0,
    LARGE: 1
};

const ActivityIndicator = extend(View)(

    function(_super, params) {
        var self = this;
        if (!self.nativeObject) {
            self.nativeObject = new android.widget.ProgressBar(Android.getActivity());
        }
        _super(this);
        self.nativeObject.setIndeterminate(true);

        // Getting default progressbar color.
        var typedValue = new android.util.TypedValue();
        var a = Android.getActivity().obtainStyledAttributes(typedValue.data, [android.R.attr.colorAccent]);
        var colorInitial = a.getColor(0, 0);
        a.recycle();

        Object.defineProperty(this, 'color', {
            get: function() {
                return colorInitial;
            },
            set: function(color) {
                // need to check if this same but what about after creating new ProgressBar on nativeSide
                if (colorInitial != color) {
                    colorInitial = color;
                    self.nativeObject.getIndeterminateDrawable().setColorFilter(colorInitial, android.graphics.PorterDuff.Mode.SRC_IN);
                }
            },
            enumerable: true
        });

        // This needs: remove old nativeObject from page second set this property add new nativeObject to page.
        // Must be set all properties again.
        var styleInitial = ActivityIndicatorStyle.NORMAL;
        Object.defineProperty(this, 'progressStyle', {
            get: function() {
                return styleInitial;
            },
            set: function(progressStyle) {
                if (styleInitial != progressStyle) {
                    styleInitial = progressStyle
                    if (progressStyle == ActivityIndicatorStyle.LARGE) {
                        self.nativeObject = new android.widget.ProgressBar(Android.getActivity(), null, android.R.attr.progressBarStyleLarge);
                    } else {
                        self.nativeObject = new android.widget.ProgressBar(Android.getActivity());
                    }
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

module.exports = {
    ActivityIndicator: ActivityIndicator,
    ActivityIndicatorStyle: ActivityIndicatorStyle
};