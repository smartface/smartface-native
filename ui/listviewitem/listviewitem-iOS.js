const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');

const UITableViewCellSelectionStyle = {
    none : 0,
    blue : 1,
    gray : 2,
    default : 3 // @available(iOS 7.0, *)
}

const ListViewItem = extend(ViewGroup)(
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

module.exports = ListViewItem;