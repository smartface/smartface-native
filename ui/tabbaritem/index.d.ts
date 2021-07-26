import Font from "../font";
import Image from "../image";
import Badge from "../badge";
import AttributedString from "../../global/attributedstring";
/**
 * @class UI.TabBarItem
 * @since 1.1.10
 *
 * This class represents the page controller when added to a bottom tab bar. Router navigates 
 * UI.TabBarItem.page when the tab bar item is clicked.
 *
 *     @example
 *     const TabBarItem = require('sf-core/ui/tabbaritem');
 *     const BottomTabBar = require('sf-core/ui/bottomtabbar');
 *     const Image = require('sf-core/ui/image');
 *     
 *     var myHomeImage = Image.createFromFile("images://home.png");
 *     var myTab = new BottomTabBar();
 *     var myItem = new TabBarItem({
 *         title: "Home",
 *         icon: myHomeImage,
 *         route: 'pages/pgHome'
 *     });
 *     myTab.add('home', myItem);
 */
export = TabBarItem;
declare class TabBarItem extends NativeComponent {
    constructor(params?: any);
    /**
     * Gets/sets the title of tab item. 
     *
     * @property {String} title
     * @android
     * @ios
     * @since 1.1.10
     */
    title: string;
    /**
     * Gets/sets the icon  of tab item. 
     *
     * @property {Object} icon
     * @property {UI.Image | String} icon.normal 
     * @property {UI.Image | String} icon.selected
     * @android
     * @ios
     * @since 1.1.10
     */
    icon: Image;
    /**
     * Gets badge of tab bar item. Badge that is displayed in the upper-right corner of the item with a surrounding red oval. Badge usage isn't currently supported if this TabBarItem is belongs to TabBarController. 
     * For iOS, when tabBarItem icon size is big, default position of badge might be wrong. You should call move function for fix this problem. Badge should not be given in constructor.
     *
     *     @example
     *     page.parentController.tabBar.items[0].badge.text = "5"; //ParentController must be BottomTabbarController
     *     page.parentController.tabBar.items[0].badge.visible = true;
     * 
     * @property {UI.Badge} badge
     * @android
     * @ios
     * @readonly
     * @since 4.0.1
     */
    badge: Badge;
    /**
     * Gets/sets the route related to tab item. When an tab bar item is pressed, its route is shown. 
     *
     * @property {String/UI.Navigator} route
     * @android
     * @ios
     * @since 1.1.10
     */
    route: string;

    public readonly android: {
        /**
         * Gets/sets attributed title of tab bar item. 
         * 
         * @property {UI.AttributedString} attributedTitle
         * @android
         * @since 4.0.2
         */
        attributedTitle: AttributedString;
        /**
         * Gets/sets the system icon  of tab item. Built-in icons can be set with the corresponding systemIcon value.
         * 
         *     @example
         *     var myItem = new TabBarItem({
         *         android: {
         *             systemIcon: 17301545   // OR 'ic_dialog_email'
         *         },
         *         title: "Page1"
         *     });
         * 
         * 
         * @property {Number | String} systemIcon
         * @android
         * @see https://developer.android.com/reference/android/R.drawable
         * @since 4.0.2
         */
        systemIcon: number | string;
    }
    public readonly ios: {
        /**
         * Gets/sets font of tab bar item.
         *
         * @property {UI.Font} font
         * @ios
         * @since 4.0.2
         */
        font: Font;
    }
}
