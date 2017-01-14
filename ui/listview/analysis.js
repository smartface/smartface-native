const View = require('../view');
const extend = require('js-base/core/extend');
/**
 * @class UI.ListView
 * @since 0.1
 * @extends UI.View
 * ListView is a UI object to display a views as rows. ListView displays UI.ListViewItem as row. 
 * The UI.ListViewController is used for managing ListView.
 *
 *     @example
 *     // @todo write example
 * 
 */
const ListView = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * Gets/sets controller of the ListView. ListView uses this controller for 
         * list item callbacks. 
         * 
         *     @example
         *     // @todo write example
         * 
         * @property {UI.ListViewController} [controller = null] 
         * @since 0.1
         */
        this.controller = null;

        /**
         * Gets/sets list item count of the ListView. This property defines how many list item will shown
         * in the ListView. 
         * 
         *     @example 
         *     const ListView = require('sf-core/ui/listview');
         *     const Color = require('sf-core/ui/color');
         *     var myListView = new ListView({
         *         backgroundColor: Color.RED
         *     });
         *     myListView.itemCount = 100;   
         * 
         * @property {Number} [itemCount = 0]   
         * @since 0.1
         */
        this.itemCount = 0;
        
        /**
         * Gets/sets vertical scroll bar status of the ListView. If this is true, 
         * scroll bar will be shown otherwise scroll bar will be hidden.
         * 
         *     @example 
         *     const ListView = require('sf-core/ui/listview');
         *     const Color = require('sf-core/ui/color');
         *     var myListView = new ListView({
         *         backgroundColor: Color.RED
         *     });
         *     myListView.verticalScrollBarEnabled = true;   
         * 
         * @property {Number} [verticalScrollBarEnabled = false]   
         * @since 0.1
         */
        this.verticalScrollBarEnabled = false;

        /**
         * Notify the ListView for data changes.
         * 
         *     @example
         *     // @todo write example
         * 
         * @method notifyDataSetChanged
         * @since 0.1
         */
        this.notifyDataSetChanged = function(){};
        
        /**
         * Set the colors used in the progress animation. The first color 
         * will also be the color of the bar that grows in response to a 
         * user swipe gesture.
         * This propert will works for only Android.
         * 
         *     @example
         *     // @todo write example
         * 
         * @method setPullRefreshColors
         * @since 0.1
         */
        this.android.setPullRefreshColors = function(colors){};
        
        /**
         * Scroll the ListView to specific index. The item on this index will 
         * shown on the top.
         * 
         *     @example
         *     // @todo write example
         * 
         * @param {Number} index
         * @method scrollTo
         * @since 0.1
         */
        this.scrollTo = function(index){};
        
        /**
         * This method return first visible list item's index which is visible at 
         * the top of the ListView.
         * 
         *     @example
         *     // @todo write example
         * 
         * @return {Number} first visible list item's index.
         * @method firstVisibleIndex
         * @since 0.1
         */
        this.firstVisibleIndex = function(){};
        
        /**
         * This method return last visible list item's index which is visible at 
         * the bottom of the ListView.
         * 
         *     @example
         *     // @todo write example
         * 
         * @return {Number} last visible list item's index.
         * @method lastVisibleIndex
         * @since 0.1
         */
        this.lastVisibleIndex = function(){};
        
        /**
         * Insert list view item to specific row index into the ListView.
         * 
         *     @example
         *     // @todo write example
         * 
         * @param {Number} index The new list view item's position.
         * @param {UI.ListViewItem} listViewItem The new list view item to insert.
         * @method insertListItem
         * @since 0.1
         */
        this.insertListItem = function(index, listViewItem){};
        
        /**
         * Remove list view item from specific row index of the ListView.
         * 
         *     @example
         *     // @todo write example
         * 
         * @param {Number} index The row index to remove list view item.
         * @method removeListItem
         * @since 0.1
         */
        this.removeListItem = function(index){};

        /**
         * Gets/sets scroll event for ListView. This event fires when the ListView
         * scrolls. For better performance, don't set any callback if does not 
         * necessary
         * 
         *     @example
         *     // @todo write example
         * 
         * @event onScroll
         * @since 0.1
         */
        this.onScroll = function onScroll(){ }
        
        /**
         * Gets/sets pull to refresh event for view. This event fires when user swipes
         * and releases the ListView's top.
         * 
         *     @example
         *     // @todo write example
         * 
         * @event onPullRefresh
         * @since 0.1
         */
        this.onPullRefresh = function onPullRefresh(){}
    }
);

module.exports = ListView;