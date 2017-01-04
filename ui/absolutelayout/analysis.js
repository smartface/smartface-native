const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
/**
 * @class UI.ViewGroup
 * @since 0.1
 * @extends View
 * AbsoluteContainer is a layout that lets you specify exact positioning(x/y coordinates) of its child views.
 */
const AbsoluteContainer = extend(ViewGroup)(
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

module.exports = AbsoluteContainer;