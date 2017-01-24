const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
/**
 * @class UI.ListViewItem
 * @since 0.1
 * @extends UI.ViewGroup
 * 
 * ListViewItem class can used for a row layout of the ListView.
 * For example usage you can look {@link UI.ListView}.
 * 
 */
const ListViewItem = extend(ViewGroup)(
    function (_super, params) {
        _super(this);

        /**
         * Gets/sets row height of the list view item.
         *
         *     @example
         *     const ListViewItem = require('sf-core/ui/listviewitem');
         *     var myListViewItem = new ListViewItem();
         *     myListViewItem.rowHeight = 30;
         *
         * @property {Number} rowHeight
         * @since 0.1
         */
        this.rowHeight = 0;
    }
);

module.exports = ListViewItem;