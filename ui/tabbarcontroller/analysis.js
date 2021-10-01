/**
 * @class UI.TabBarController
 * @extends UI.Page
 * @since 3.2.0
 * 
 * This class extends from {@link UI.Page Page}. But you shouldn't use directly layout of the {@link UI.TabBarController TabBarController}.
 * 
 *     @example
 *     const extend = require("js-base/core/extend");
 *     const TabBarController = require('@smartface/native/ui/tabbarcontroller');
 *     const Color = require('@smartface/native/ui/color');
 *     const TabBarItem = require('@smartface/native/ui/tabbaritem');
 *     const Page = require('@smartface/native/ui/page');
 *     
 *     const backgroundColors = [Color.RED, Color.YELLOW, Color.BLUE, Color.GREEN, Color.MAGENTA];
 *     const SamplePage = extend(Page)(
 *         function(_super, params) {
 *             _super(this, params);
 *         }
 *     );
 *     
 *     var TabBarController1 = extend(TabBarController)(
 *         function(_super, params) {
 *             _super(this, {
 *                 items: createTabBarItems(5)
 *             });
 *     
 *             var pages = [];
 *             this.onPageCreate = function(index) {
 *                 if (!pages[index]) {
 *                     pages[index] = new SamplePage({ index: index });
 *                     pages[index].layout.backgroundColor = backgroundColors[index];
 *                 }
 *                 return pages[index];
 *             };
 *     
 *             this.onShow = function() {
 *                 this.headerBar.visible = false;
 *             }.bind(this);
 *     
 *             this.onLoad = function() {
 *                 this.scrollEnabled = true;
 *                 this.indicatorColor = Color.BLACK;
 *                 this.indicatorHeight = 5;
 *                 this.barColor = Color.LIGHTGRAY;
 *                 this.iconColor = {
 *                     normal: Color.BLACK,
 *                     selected: Color.BLUE
 *                 };
 *                 this.textColor = {
 *                     normal: Color.BLACK,
 *                     selected: Color.BLUE
 *                 };
 *             }.bind(this);
 *     
 *             this.onSelected = function(index) {
 *                 console.log("Selected item index: " + index);
 *             };
 *         }
 *     );
 *     
 *     function createTabBarItems(itemCount) {
 *         var items = [];
 *         for (var i = 0; i < itemCount; i++) {
 *             items.push(new TabBarItem({
 *                 title: "Category " + i
 *             }));
 *         }
 *         return items;
 *     }
 *
 */
function TabBarController(params) {}

/**
 * Gets the tab bar height of the TabBarController. You can change barHeight on Android, but not iOS.
 * This property is read-only for iOS.
 * @property {Number} barHeight
 * @android
 * @ios
 * @since 3.2.0
 */
TabBarController.prototype.barHeight;

/**
 * Gets/sets the tab bar item array of the TabBarController.
 * @property {UI.TabBarItem[]} items
 * @android
 * @ios
 * @since 3.2.0
 */
TabBarController.prototype.items = [];


/**
 * Gets/sets the divider color of the TabBarController.
 * @property {UI.Color} [dividerColor = UI.Color.BLACK]
 * @android
 * @since 3.2.0
 */
TabBarController.prototype.dividerColor = Color.BLACK;

/**
 * Gets/sets the divider padding of the TabBarController.
 * @property {Number} [dividerPadding = 0]
 * @android
 * @since 3.2.0
 */
TabBarController.prototype.dividerPadding = 0;

/**
 * Gets/sets the divider width of the TabBarController.
 * @property {Number} [dividerWidth = 0]
 * @android
 * @since 3.2.0
 */
TabBarController.prototype.dividerWidth = 0;

/**
 * Gets/sets the indicator color of the TabBarController.
 * @property {UI.Color} [indicatorColor = UI.Color.create("#00A1F1")]
 * @android
 * @ios
 * @since 3.2.0
 */
TabBarController.prototype.indicatorColor;

/**
 * Gets/sets the auto capitalize title of the items of TabBarController.
 * @property {Boolean} [autoCapitalize = true]
 * @android
 * @ios
 * @since 3.2.1
 */
TabBarController.prototype.autoCapitalize;

/**
 * Gets/sets the indicator height of the TabBarController.
 * @property {Number} indicatorHeight
 * @android
 * @ios
 * @since 3.2.0
 */
TabBarController.prototype.indicatorHeight;

/**
 * Gets/sets over-scroll mode for top tab bar.
 *
 * @property {UI.Android.OverScrollMode} [overScrollMode = UI.Android.OverScrollMode.ALWAYS]
 * @android
 * @since 3.2.0
 */
TabBarController.prototype.overScrollMode = UI.Android.OverScrollMode.ALWAYS;

/**
 * Gets/sets bar color of tabs.
 * @property {UI.Color} [barColor = Color.WHITE]
 * @android
 * @ios
 * @since 3.2.0
 */
TabBarController.prototype.barColor = Color.WHITE;

/**
 * Gets/sets whether to enable scrollable tabs.
 * @property {Boolean} scrollEnabled
 * @android
 * @ios
 * @since 3.2.0
 */
TabBarController.prototype.scrollEnabled = false;

/**
 * Gets the selected index of TabBarController.
 * @property {Number} selectedIndex
 * @android
 * @ios
 * @since 3.2.0
 */
TabBarController.prototype.selectedIndex;

/**
 * Sets the selected index of TabBarController.
 * @method setSelectedIndex
 * @param {Number} index
 * @param {Boolean} [animated=true]
 * @android
 * @ios
 * @since 3.2.0
 */
TabBarController.prototype.setSelectedIndex;

/**
 * Gets/sets the icon color of the tabs. You can specify text colors for the different states (normal, selected) used for the tabs.
 * @property {UI.Color|Object} textColor
 * @android
 * @ios
 * @since 3.2.0
 */
TabBarController.prototype.iconColor;

/**
 * Gets/sets the text color of the tabs. You can specify text colors for the different states (normal, selected) used for the tabs.
 * @property {UI.Color|Object} textColor
 * @android
 * @ios
 * @since 3.2.0
 */
TabBarController.prototype.textColor;


/**
* Enables/Disables paging behavior.
*
* @property {Boolean} [pagingEnabled = true]
* @android
* @ios
* @since 4.3.2
*/
TabBarController.prototype.pagingEnabled = true;

/**
 * This event called when a tab is chosen by the user.
 * Returns an {@link UI.Page Page} instance based on index.
 *
 * @event onPageCreate
 * @deprecated
 * @param index
 * @return UI.Page
 * @android
 * @ios
 * @since 3.2.0
 */
TabBarController.prototype.onPageCreate;

/**
 * This event called when a tab is chosen by the user.
 *
 * @event onSelected
 * @deprecated
 * @param index
 * @android
 * @ios
 * @since 3.2.0
 */
TabBarController.prototype.onSelected;

/**
 * Event to be implemented
 * @param {string} event - Event type to be created
 * @param {*} callback
 * @returns {Function} unlistener function. Call it to remove the event
 * @android
 * @ios
 */
 CallDetection.prototype.on = function(event, callback) {}
 /**
  * Event to be removed
  * @param {string} event - Event type to be created
  * @param {*} callback
  * @returns {Function} unlistener function. Call it to remove the event
  * @android
  * @ios
  */
CallDetection.prototype.off = function(event, callback) {}
 
 /**
  * Event to be emitted
  * @param {string} event - Event type to be triggered
  * @param {*} detail - Pass appropiate parameter to invoke the relevant event
  * @android
  * @ios
  */
CallDetection.prototype.emit = function(event, detail) {}