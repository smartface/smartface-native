import TabBarItem from "../tabbaritem";
import Color from "../color";
import Page from "../page";
import OverScrollMode from "../android/overscrollmode";
/**
 * @class UI.TabBarController
 * @extends UI.Page
 * @since 3.2.0
 * 
 * This class extends from {@link UI.Page Page}. But you shouldn't use directly layout of the {@link UI.TabBarController TabBarController}.
 * 
 *     @example
 *     const extend = require("js-base/core/extend");
 *     const TabBarController = require('sf-core/ui/tabbarcontroller');
 *     const Color = require('sf-core/ui/color');
 *     const TabBarItem = require('sf-core/ui/tabbaritem');
 *     const Page = require('sf-core/ui/page');
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
declare interface TabBarController extends Page {
/**
 * Gets the tab bar height of the TabBarController. You can change barHeight on Android, but not iOS.
 * This property is read-only for iOS.
 * @property {Number} barHeight
 * @android
 * @ios
 * @since 3.2.0
 */
    barHeight: number;
/**
 * Gets/sets the tab bar item array of the TabBarController.
 * @property {UI.TabBarItem[]} items
 * @android
 * @ios
 * @since 3.2.0
 */
    items: TabBarItem[];

/**
 * Gets/sets the divider color of the TabBarController.
 * @property {UI.Color} [dividerColor = UI.Color.BLACK]
 * @android
 * @since 3.2.0
 */
    dividerColor: Color;
/**
 * Gets/sets the divider padding of the TabBarController.
 * @property {Number} [dividerPadding = 0]
 * @android
 * @since 3.2.0
 */
    dividerPadding: number;
/**
 * Gets/sets the divider width of the TabBarController.
 * @property {Number} [dividerWidth = 0]
 * @android
 * @since 3.2.0
 */
    dividerWidth: number;
/**
 * Gets/sets the indicator color of the TabBarController.
 * @property {UI.Color} [indicatorColor = UI.Color.create("#00A1F1")]
 * @android
 * @ios
 * @since 3.2.0
 */
    indicatorColor: Color;
/**
 * Gets/sets the auto capitalize title of the items of TabBarController.
 * @property {Boolean} [autoCapitalize = true]
 * @android
 * @ios
 * @since 3.2.1
 */
    autoCapitalize: boolean;
/**
 * Gets/sets the indicator height of the TabBarController.
 * @property {Number} indicatorHeight
 * @android
 * @ios
 * @since 3.2.0
 */
    indicatorHeight: number;
/**
 * Gets/sets over-scroll mode for top tab bar.
 *
 * @property {UI.Android.OverScrollMode} [overScrollMode = UI.Android.OverScrollMode.ALWAYS]
 * @android
 * @since 3.2.0
 */
    overScrollMode: OverScrollMode;
/**
 * Gets/sets bar color of tabs.
 * @property {UI.Color} [barColor = Color.WHITE]
 * @android
 * @ios
 * @since 3.2.0
 */
    barColor: Color;
/**
 * Gets/sets whether to enable scrollable tabs.
 * @property {Boolean} scrollEnabled
 * @android
 * @ios
 * @since 3.2.0
 */
    scrollEnabled: boolean;
/**
 * Gets the selected index of TabBarController.
 * @property {Number} selectedIndex
 * @android
 * @ios
 * @since 3.2.0
 */
    selectedIndex: number;
/**
 * Sets the selected index of TabBarController.
 * @method setSelectedIndex
 * @param {Number} index
 * @param {Boolean} [animated=true]
 * @android
 * @ios
 * @since 3.2.0
 */
    setSelectedIndex(index: number, animated: boolean): void;
/**
 * Gets/sets the icon color of the tabs. You can specify text colors for the different states (normal, selected) used for the tabs.
 * @property {UI.Color|Object} textColor
 * @android
 * @ios
 * @since 3.2.0
 */
    iconColor: Color;
/**
 * Gets/sets the text color of the tabs. You can specify text colors for the different states (normal, selected) used for the tabs.
 * @property {UI.Color|Object} textColor
 * @android
 * @ios
 * @since 3.2.0
 */
    textColor: Color;


/**
* Enables/Disables paging behavior.
*
* @property {Boolean} [pagingEnabled = true]
* @android
* @ios
* @since 4.3.2
*/
    pagingEnabled: Boolean;

/**
 * This event called when a tab is chosen by the user.
 * Returns an {@link UI.Page Page} instance based on index.
 *
 * @event onPageCreate
 * @param index
 * @return UI.Page
 * @android
 * @ios
 * @since 3.2.0
 */
    onPageCreate: (index: number) => Page;
/**
 * This event called when a tab is chosen by the user.
 *
 * @event onSelected
 * @param index
 * @android
 * @ios
 * @since 3.2.0
 */
	onSelected: (index: number) => void;
}

declare class TabBarController implements TabBarController {}
declare namespace TabBarController {
	namespace iOS {
		enum BarTextTransform {
			AUTO = 0,
			NONE = 1,
			UPPERCASE = 2
		}
	}
}
export = TabBarController;
