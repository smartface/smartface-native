const AbsoluteLayout = require('../absolutelayout');
const extend = require('js-base/core/extend');

const ListViewItem = extend(AbsoluteLayout)(
    function (_super, params) {
        _super(this);
    }
);

module.exports = ListViewItem;