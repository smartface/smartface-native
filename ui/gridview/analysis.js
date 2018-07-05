const View = require('../view');
const extend = require('js-base/core/extend');
/**
 * @class UI.CollectionView
 * @since 3.2
 * @extends UI.View
 * CollectionView is a View that presents given items using customizable layouts.
 *

function CollectionView(params) {}

/**
 * This event is called when a CollectionView starts to create a CollectionViewItem.
 * You can customize your UI(not data-binding) inside this callback.
 *
 * @event onItemCreate
 * @android
 * @ios
 * @return {UI.CollectionViewItem}
 * @since 3.2
 */
CollectionView.prototype.onItemCreate = function onItemCreate(){};

/**
 * This event is called when a UI.CollectionViewItem created at specified row index.
 * You can bind your data to row items inside this callback.
 *
 * @param {UI.CollectionViewItem} collectionViewItem
 * @param {Number} index
 * @event onItemBind
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.onItemBind = function onItemBind(collectionViewItem, index){};

/**
 * This event is called when user selects a item at specific index.
 *
 * @param {UI.CollectionViewItem} collectionViewItem
 * @param {Number} index
 * @event onItemSelected
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.onItemSelected = function onItemSelected(collectionViewItem, index){};

/**
 * This event is called when user long selects a item at specific index.
 *
 * @param {UI.CollectionViewItem} collectionViewItem
 * @param {Number} index
 * @event onItemLongSelected
 * @android
 * @since 3.2
 */
CollectionView.prototype.onItemLongSelected = function onItemLongSelected(collectionViewItem, index){};

/**
 * Gets/sets the number of items that will be shown in a CollectionView.
 * You should update this property after each data operation.
 *
 * @property {Number} [itemCount = 0]
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.itemCount = 0;

/**
 * Class for CollectionView layout calculation.
 * The layout used to organize the collected view’s items.
 * Default layout type is StaggeredFlowLayout.
 *
 * @property {StaggeredFlowLayout} layout
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.layout

/**
 * Gets/sets the visibility of scroll bar of CollectionView.
 * If set to true, vertical or horizontal scroll bar will be shown depending on collectionview's
 * scroll direction.
 *
 * @property {Boolean} [scrollBarEnabled = false]
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.scrollBarEnabled = false;

/**
 * Enables/disables the refresh function of CollectionView. If set to false
 * onPullRefresh events will not be called.
 *
 * @property {Boolean} [refreshEnabled = true]
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.refreshEnabled = true;

/**
 * This method returns the index of item which is visible at
 * the top of a CollectionView at a given time.
 *
 * @return {Number}
 * @method getFirstVisibleIndex
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.getFirstVisibleIndex = function(){};

/**
 * This method returns the index of item which is visible at
 * the bottom of a CollectionView at a given time.
 *
 * @return {Number}
 * @method getLastVisibleIndex
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.getLastVisibleIndex = function(){};

/**
 * Sets the colors used in the refresh animation. On Android the first color
 * will also be the color of the bar that grows in response to a
 * user swipe gesture. iOS uses only the first color of the array.
 *
 * @method setPullRefreshColors
 * @param {UI.Color[]} colors
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.setPullRefreshColors = function(colors){};

/**
 * This method notify CollectionView for data changes. After this method is called
 * CollectionView refreshes itself and recreates the items. Do not forget to
 * update itemCount property after data changes.
 *
 * @method refreshData
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.refreshData = function(){};

/**
 * This method scrolls CollectionView to a specific index.
 *
 * @param {Number} index
 * @method scrollTo
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.scrollTo = function(index){};

/**
 * This method cancels refresh operation and stops the refresh
 * indicator on a CollectionView. You should call this method after
 * finishing event inside onPullRefresh otherwise refresh indicator
 * never stops.
 *
 * @method stopRefresh
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.stopRefresh = function(){};

/**
 * This event is called when a CollectionView is scrolling.
 * For better performance, don't set any callback if does not
 * necessary
 *
 * @event onScroll
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.onScroll = function onScroll(){ }

/**
 * This event is called when user pulls down and releases a CollectionView
 * when scroll position is on the top.
 *
 * @event onPullRefresh
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.onPullRefresh = function onPullRefresh(){}

/**
 * This method returns CollectionViewItem
 *
 * @return {UI.CollectionViewItem}
 * @method itemByIndex
 * @param {Number} index
 * @android
 * @ios
 * @since 3.2
 */
CollectionView.prototype.itemByIndex = function(index){};

module.exports = CollectionView;
