const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');

const NativeAbsoluteLayout = requireClass("android.widget.AbsoluteLayout");

const AbsoluteLayout = extend(ViewGroup)(
    function (_super, params) {
        var self = this;
        self.nativeObject = new NativeAbsoluteLayout(Android.getActivity());
        _super(this);

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = AbsoluteLayout;