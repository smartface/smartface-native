const ViewGroup = require('../viewgroup');

const UITableViewCellSelectionStyle = {
    none: 0,
    blue: 1,
    gray: 2,
    default: 3 // @available(iOS 7.0, *)
}
ListViewItem.prototype = Object.create(ViewGroup.prototype);
// const ListViewItem = extend(ViewGroup)(
function ListViewItem(params) {
    ViewGroup.call(this);

    var self = this;
    
    this.ios.expandSwipe = function(direction){
        self.__nativeCell.expandSwipeAnimated(direction,true);
    }
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = ListViewItem;