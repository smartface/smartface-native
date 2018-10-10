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
 * Gets the divider color of the TopTabBar.
 * @property {UI.Color} [dividerColor = UI.Color.BLACK]
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.dividerColor = Color.BLACK;

/**
 * Gets the divider padding of the TopTabBar.
 * @property {Number} [dividerPadding = 0]
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.dividerPadding = 0;

/**
 * Gets the divider width of the TopTabBar.
 * @property {Number} [dividerWidth = 0]
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.dividerWidth = 0;

/**
 * Gets/sets the indicator color of the TopTabBar.
 * @property {UI.Color} [indicatorColor = UI.Color.create("#00A1F1")]
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.indicatorColor;

/**
 * Gets/sets the indicator height of the TopTabBar.
 * @property {Number} indicatorHeight
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.indicatorHeight;

/**
 * Gets/sets background color of tabs.
 * @property {UI.Color} [backgroundColor = Color.WHITE]
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.backgroundColor = Color.WHITE;

/**
 * Gets/sets whether to enable scrollable tabs.
 * @property {Boolean} scrollEnabled
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.scrollEnabled = false;

/**
 * Gets/sets the selected index of TopTabBar.
 * @property {Number} selectedIndex
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.selectedIndex;

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