const ViewGroup = require('../viewgroup');

GridViewItem.prototype = Object.create(ViewGroup.prototype);
// const CollectionViewItem = extend(ViewGroup)(
function GridViewItem(params) {

    ViewGroup.apply(this);

    // Assign parameters given in constructor

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = GridViewItem;