const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');

const AbsoluteContainer = extend(ViewGroup)(
    function (_super, params) {
        var self = this;
        self.nativeObject = new android.widget.AbsoluteLayout(Android.getActivity());
        _super(this);

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = AbsoluteContainer;