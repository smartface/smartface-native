const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');

const AbsoluteLayout = extend(ViewGroup)(
    function (_super, params) {
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