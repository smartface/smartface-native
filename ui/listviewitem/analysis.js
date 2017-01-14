const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
/**
 * @class UI.ListViewItem
 * @since 0.1
 * @extends UI.ViewGroup
 * 
 * //@todo write explanation.
 *
 *     @example
 *     // @todo write example
 * 
 */
const ListViewItem = extend(ViewGroup)(
    function (_super, params) {
        _super(this);
    }
);

module.exports = ListViewItem;