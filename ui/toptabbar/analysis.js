/**
 * @class UI.TopTabBar
 * @since 3.2.0
 * 
 * TODO: Extends UI.Page or View
 *
 */
function TopTabBar(params){}

/**
 * Gets/sets the tab bar item array of the TopTabBar.
 * @property {UI.TabBarItem[]} items
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.items = [];

/**
 * TODO: Add methods of swipeview
 * Gets the swipe view of the TopTabBar.
 * @property {UI.SwipeView} swipeView
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.swipeView = null;

/**
 * Gets/sets the divider color of the TopTabBar.
 * @property {UI.Color} [dividerColor = UI.Color.BLACK]
 * @android
 * @since 3.2.0
 */
TopTabBar.prototype.dividerColor = Color.BLACK;

/**
 * Gets/sets the divider padding of the TopTabBar.
 * @property {Number} [dividerPadding = 0]
 * @android
 * @since 3.2.0
 */
TopTabBar.prototype.dividerPadding = 0;

/**
 * Gets/sets the divider width of the TopTabBar.
 * @property {Number} [dividerWidth = 0]
 * @android
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
 * Gets the selected index of TopTabBar.
 * @property {Number} selectedIndex
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.selectedIndex;

/**
 * Sets the selected index of TopTabBar.
 * @method setSelectedIndex
 * @param {Number} index
 * @param {Boolean} [animated=true]
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.setSelectedIndex;

/**
 * Gets/sets the icon color of the tabs. You can specify text colors for the different states (normal, selected) used for the tabs.
 * @property {UI.Color|Object} textColor
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.iconColor;

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
 * @param index
 * @android
 * @ios
 * @since 3.2.0
 */
TopTabBar.prototype.onSelected;
