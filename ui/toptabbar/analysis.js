/**
 * @class UI.TopTabBar
 * @since 3.2.0
 * 
 * TODO: Extends UI.Page or View
 *
 */
function TopTabBar(params){}

/**
 * Gets the swipe view of the TopTabBar.
 * @property {UI.SwipeView} swipeView
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.swipeView = null;

/**
 * Gets the divider of the TopTabBar.
 * @property {Divider} divider
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.divider = null;

/**
 * Gets the swipe view of the TopTabBar.
 * @property {Indicator} indicator
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.indicator = null;

/**
 * Gets/sets whether to enable scrollable tabs.
 * @property {Boolean} scrollEnabled
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.scrollEnabled = false;

/**
 * Gets/sets the text color of the tabs. You can specify text colors for the different states (normal, selected) used for the tabs.
 * @property {UI.Color|Object} textColor
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.textColor;

/**
 * This event called when a tab is chosen by the user.
 *
 * @event onSelected
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.onSelected;


/**
 * This event called when a tab exits the selected state.
 *
 * @event onUnselected
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.onUnselected;

/**
 * This event called when a tab that is already selected is chosen again by the user.
 *
 * @event onReselected
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.onReselected;