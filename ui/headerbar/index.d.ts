import AttributedString from '../../global/attributedstring';
import Color from '../color';
import Font from '../font';
import View, { IView } from '../view';
import HeaderBarItem from '../headerbaritem';
import Page, { AbstractPage, LargeTitleDisplayMode } from '../page';
import Image from '../image';

/**
 * @class UI.HeaderBar
 *
 * HeaderBar class represents Navigation Bar for iOS and Action Bar for Android. It is a bar
 * shown on top of page under statusBar object. You can manage application navigation by setting
 * buttons and you can show title of page on HeaderBar.
 *
 * Creating instance of HeaderBar class is not valid. You can access header bar of page
 * via UI.Page.headerBar property. Some properties should change from parentController of page for iOS.
 *
 * On iOS you should work with header bar in scope of onLoad and onShow callbacks, otherwise
 * behaviour is undefined.
 *
 * If the HeaderBar is visible, the pages starts under the HeaderBar, otherwise you should check
 * behaviour of the {@link UI.StatusBar}.
 *
 *     @example
 *     const Page = require('@smartface/native/ui/page');
 *     const Color = require('@smartface/native/ui/color');
 *     const HeaderBarItem = require('@smartface/native/ui/headerbaritem');
 *
 *     var myPage = new Page({
 *         onLoad: function() {
 *             var page = this;
 *             var headerBar = System.OS === "Android" ? page.headerBar : page.parentController.headerBar;
 *             headerBar.backgroundColor = Color.MAGENTA;
 *             page.headerBar.title = "Header Bar";
 *
 *             var myItem = new HeaderBarItem({
 *                 title: "Done",
 *                 onPress: function() {
 *                     console.log("You pressed Done item!");
 *                 }
 *             });
 *             this.headerBar.setItems([myItem]);
 *         },
 *         onShow: function() {
 *             var page = this;
 *             var headerBar = System.OS === "Android" ? page.headerBar : page.parentController.headerBar;
 *             headerBar.visible = true;
 *         }
 *     });
 *
 */
type HeaderBar = {
  removeViewFromHeaderBar(view: IView): void;
  addViewToHeaderBar(view: IView): void;
  /**
   * Defines the opacity of a view. The value of this property is a float number between 0.0 and 1.0. For iOS, you should access this property from page.parentController.
   * 0 represents view is completely transparent and 1 represents view is completely opaque.
   *
   * @property {Number} [alpha = 1]
   * @android
   * @ios
   * @since 4.0.0
   */
  alpha: number;
  /**
   * Gets/sets transparency of header bar. For iOS, you should access this property from page.parentController.
   *
   * @property {Boolean} [transparent = true]
   * @ios
   * @android
   * @since 4.0.0
   */
  transparent: boolean;
  /**
   * Gets/sets border visibility of headerbar. For iOS, you should access this property from page.parentController.
   *
   * @property {Boolean} [borderVisibility = true]
   * @android
   * @ios
   * @since 3.0.3
   */
  borderVisibility: boolean;
  /**
   * Gets/sets background color of the header bar. If not set, header bar will have default
   * background color depending on device's OS and OS version. For iOS, you should access this property from page.parentController.
   *
   *     @example
   *     const Page = require('@smartface/native/ui/page');
   *     const Color = require('@smartface/native/ui/color');
   *     var myPage = new Page({
   *         onLoad: function() {
   *             var page = this;
   *             var headerBar = System.OS === "Android" ? page.headerBar : page.parentController.headerBar;
   *             headerBar.backgroundColor = Color.RED;
   *         }
   *     });
   *
   * @property {UI.Color} [backgroundColor = Color.create("#00A1F1")]
   * @android
   * @ios
   * @since 0.1
   */
  backgroundColor: Color;
  /**
   * Gets/sets item color of the header bar. This property will change color of the left item and color of all header bar items. For iOS, you should access this property from page.parentController.
   *
   *     @example
   *     const Page = require('@smartface/native/ui/page');
   *     const Color = require('@smartface/native/ui/color');
   *     var myPage = new Page({
   *         onLoad: function() {
   *             var page = this;
   *             var headerBar = System.OS === "Android" ? page.headerBar : page.parentController.headerBar;
   *             headerBar.itemColor = Color.BLUE;
   *         }
   *     });
   *
   * @property {UI.Color} [itemColor = Color.WHITE]
   * @android
   * @ios
   * @since 0.1
   */
  itemColor: Color;
  /**
   * Gets/sets background image of the HeaderBar. For iOS, you should access this property from page.parentController.
   *
   *     @example
   *     const Page = require('@smartface/native/ui/page');
   *     const Image = require('@smartface/native/ui/image');
   *     var myPage = new Page({
   *         onLoad: function() {
   *             var page = this;
   *             var headerBar = System.OS === "Android" ? page.headerBar : page.parentController.headerBar;
   *             headerBar.backgroundImage = Image.createFromFile('images://smartface.png');
   *         }
   *     });
   *
   * @property {UI.Image} [backgroundImage = null]
   * @android
   * @ios
   * @since 0.1
   */
  backgroundImage: Image;
  /**
   * Gets/sets the navigation indicator visibility of the headerBar.
   * If false navigation indicator will not show, otherwise will show
   * as back icon if left item not set.
   *
   * @property {Boolean} [leftItemEnabled = false]
   * @android
   * @ios
   * @since 0.1
   */
  leftItemEnabled: boolean;

  /**
   * Gets the height of the header bar. Height is a read only property and
   * its value may change depending on device and screen density. For iOS, you should access this property from page.parentController.
   *
   * @property {Number} height
   * @android
   * @ios
   * @readonly
   * @since 0.1
   */
  height: number;
  /**
   * Gets/sets the title layout of the HeaderBar. Title layout allows you to assign custom view.
   * For iOS, layouts are centered on the header bar and may be resized to fit.
   *
   * @property {UI.View} titleLayout
   * @android
   * @ios
   * @since 3.2.1
   */
  // TODO: if it can be only FlexLayout its type must be FlexLayout instead of View
  titleLayout: View<any>;
  /**
   * Gets/sets title of the header bar.
   *
   * @property {String} title
   * @android
   * @ios
   * @since 0.1
   */
  title: string;
  /**
   * Gets/sets title color of the header bar. For iOS, you should access this property from page.parentController.
   *
   * @property {UI.Color} [titleColor = Color.BLACK]
   * @android
   * @ios
   * @since 0.1
   */
  titleColor: Color;
  /**
   * Gets/sets visibility of the header bar. For iOS, you should access this property from page.parentController.
   *
   * @property {boolean} [visible = true]
   * @android
   * @ios
   * @since 0.1
   */
  visible: boolean;
  /**
   * This function allows you to set header bar items to the right of page's headerBar.
   * Given items should be instance of UI.HeaderBarItem class. Items will be
   * added to header bar in given array order starting from right of header bar.
   *
   * @method setItems
   * @param {Array<UI.HeaderBarItem>} items Array of HeaderBarItem objects to add
   * @since 0.1
   */
  setItems(items: HeaderBarItem[]): void;

  /**
   * Sets left item of header bar to given item.
   *
   *     @example
   *      const Page = require('@smartface/native/ui/page');
   *      const HeaderBarItem = require('@smartface/native/ui/headerbaritem');
   *      var myPage = new Page();
   *      myPage.onLoad = function(e){
   *          var leftItem = new HeaderBarItem();
   *          leftItem.title = "Left Item";
   *          myPage.headerBar.setLeftItem(leftItem);
   *      }
   *
   * @method setLeftItem
   * @param {UI.HeaderBarItem} item HeaderBarItem to add.
   */
  setLeftItem(item: HeaderBarItem): void;
  android: Partial<{
    /**
     * Gets/sets attributed title of the header bar.
     *
     * @property {UI.AttributedString} attributedTitle
     * @android
     * @since 4.0.0
     */
    attributedTitle?: AttributedString;
    /**
     * Gets/sets attributed subtitle of the header bar.
     *
     * @property {UI.AttributedString} attributedSubtitle
     * @android
     * @since 4.0.0
     */
    attributedSubtitle?: AttributedString;

    /**
     * Gets/sets titleFont of header bar subtitle.
     *
     * @property {UI.Font} subtitleFont
     * @android
     * @since 4.0.0
     */
    subtitleFont?: Font;

    /**
     * Gets/sets the content inset of headerbar. Minimum API Level 21 required. The content inset affects the valid area for Headerbar content other than
     * the navigation button and menu. Insets define the minimum margin for these custom views like {@link UI.HeaderBar#titleLayout titleLayout}  and
     * can be used to effectively align HeaderBar content along well-known gridlines.
     *
     * @property {Object} contentInset
     * @property {Number} contentInset.left
     * @property {Number} contentInset.right
     * @android
     * @since 3.2.1
     */
    contentInset: {
      left: number;
      right: number;
    };
    /**
     * Gets/sets the logo of the HeaderBar image which will shown left
     * side of the left item. You should enable the logo with logoEnabled.
     * If log is not set, the logo image will not shown.
     * This property will work only for Android.
     *
     *     @example
     *     const Page = require('@smartface/native/ui/page');
     *     const Image = require('@smartface/native/ui/image');
     *     var myPage = new Page();
     *     var myImage = Image.createFromFile('images://icon.png');
     *     myPage.headerBar.android.logoEnabled = true;
     *     myPage.headerBar.android.logo = myImage;
     *
     * @property {UI.Image} [logo = null]
     * @android
     * @since 0.1
     */
    logo?: Image | null;
    /**
     * Gets/sets the logo visibility of the HeaderBar. If logo is disable,
     * logo image will newer shown. This property will work only for Android.
     *
     * @property {Boolean} [logoEnabled = false]
     * @android
     * @since 0.1
     */
    logoEnabled?: boolean | null;
    /**
     * Gets/sets subtitle of the header bar. If not set subtitle will not show.
     * This property will work only for Android.
     *
     *     @example
     *     import Page from '@smartface/native/ui/page';
     *     const myPage = new Page();
     *     myPage.headerBar.android.subtitle = 'Hello from HeaderBar Subtitle!';
     *
     * @property {String} subtitle
     * @android
     * @since 0.1
     */
    subtitle?: string;
    /**
     * Gets/sets subtitle color of the header bar. If not set subtitle will not show.
     * This property will work only for Android.
     *
     *     @example
     *     import Page from '@smartface/native/ui/page';
     *     const myPage = new Page();
     *     myPage.headerBar.android.subtitleColor = Color.create('#00A1F1');
     *
     * @property {Color} subtitleColor
     * @android
     * @since 0.1
     */
    subtitleColor?: Color;

    /**
     * Gets/sets elevation of the header bar.
     *
     *     @example
     *     const Page = require('@smartface/native/ui/page');
     *     var myPage = new Page();
     *     myPage.headerBar.android.elevation = 10;
     *
     * @property {Number} elevation
     * @android
     * @since 3.2.2
     */
    elevation?: number;

    /**
     * Gets/sets the space between left item and title of headerbar. Minimum API Level 24 required.
     *
     * @property {Number} [contentInsetStartWithNavigation = 0]
     * @android
     * @since 4.3.6
     * @see https://material.io/components/app-bars-top#specs
     */
    contentInsetStartWithNavigation?: number;

    /**
     * Gets/Sets the padding space on the all sides of a headerbar.
     *
     * @property {Object} [padding = { top : 0, left : 0, right : 4, bottom : 0 }]
     * @property {Number} padding.top padding space on the top side of a headerbar
     * @property {Number} padding.left padding space on the left side of a headerbar
     * @property {Number} padding.right padding space on the right side of a headerbar
     * @property {Number} padding.bottom padding space on the bottom side of a headerbar
     *
     * @android
     * @since 4.3.6
     */
    padding?: { top?: number; left?: number; right?: number; bottom?: number };
  }>;
  ios: Partial<{
    /**
     * Gets/sets titleFont of header bar title. You should access this property from page.parentController.
     *
     *     @example
     *     const Page = require('@smartface/native/ui/page');
     *     const Font = require("@smartface/native/ui/font");
     *     var myPage = new Page({
     *         onLoad: function() {
     *             this.parentController.headerBar.ios.titleFont = Font.create(Font.DEFAULT, 10);
     *         }
     *     });
     *
     * @property {UI.Font} titleFont
     * @ios
     * @since 4.0.0
     */
    titleFont?: Font;
    /**
     * A Boolean value that indicates whether the header bar is translucent. For iOS, you should access this property from page.parentController.
     *
     * @property {Boolean} translucent
     * @ios
     * @since 4.0.2
     */
    translucent: boolean;
    /**
     * Gets/sets backBarButtonItem of the header bar.
     * When it set, it will change the next page's back button appearance.
     * This change can be observed only on the pages that added to navigator style router.
     * Default value is undefined, it gets title value from previous page's header bar title property.
     * Setting onPress callback of HeaderBarItem will not effect backBarButtonItem's onPress behaviour.
     * This property will work only for iOS.
     *
     *     @example
     *      const HeaderBarItem = require('@smartface/native/ui/headerbaritem');
     *     const Page = require('@smartface/native/ui/page');
     *
     *     var myPage = new Page();
     *     var backBarButtonItem = new HeaderBarItem({
     *          title : "Back"
     *     });
     *     myPage.headerBar.ios.backBarButtonItem = backBarButtonItem;
     *
     * @property {HeaderBarItem} backBarButtonItem
     * @ios
     * @since 0.1
     */
    backBarButtonItem?: HeaderBarItem;
    /**
     * Gets/sets the mode to use how to display title of header bar.
     * This property will work only for iOS.
     * If "prefersLargeTitles" property of navigator is false, this property has no effect and title will display as small title.
     *
     *     @example
     *     const Page = require('@smartface/native/ui/page');
     *     var myPage = new Page();
     *     myPage.headerBar.ios.largeTitleDisplayMode = Page.iOS.LargeTitleDisplayMode.ALWAYS;
     *
     * @property {Page.iOS.LargeTitleDisplayMode} largeTitleDisplayMode
     * @ios
     * @since 0.1
     */
    largeTitleDisplayMode?: LargeTitleDisplayMode;

    /**
     * Used to add a different Image in place of iOS default back action on NavigationController
     * Setting this will also set backIndicatorTransitionMaskImage as true.
     * Setting this as something else(like null) will set the backIndicatorTransitionMaskImage as false.
     *
     * @example
     *     const Page = require('@smartface/native/ui/page');
     *     var myPage = new Page();
     *     myPage.headerBar.ios.backIndicatorImage = Image.createFromFile("images://smartface.png");
     *
     * @property {Page.iOS.PrefersLargeTitles}
     * @ios
     * @since 0.1
     */
    backIndicatorImage?: Image;
    /**
     * The image used as a mask for content during push and pop transitions.
     * This property will be set automatically if backIndicatorImage is set as a valid image.
     *
     * @example
     *     const Page = require('@smartface/native/ui/page');
     *     var myPage = new Page();
     *     myPage.headerBar.ios.backIndicatorImage = Image.createFromFile("images://smartface.png");
     *     //myPage.headerBar.ios.backIndicatorTransitionMaskImage = true; //Above line will set this to true, therefore no need to state this.
     *
     * @property {Page.iOS.PrefersLargeTitles}
     * @ios
     * @since 0.1
     */
    backIndicatorTransitionMaskImage?: Image;
    /**
     * When this property is set to true, the navigation bar allows the title to be displayed out-of-line and using a larger font.
     * The navigation item used to build the bar must specify whether it wants its title displayed in the large or small format.
     * Use the largeTitleDisplayMode property to configure the title's appearance.
     *
     * @example
     *     const Page = require('@smartface/native/ui/page');
     *     var myPage = new Page();
     *     myPage.headerBar.ios.prefersLargeTitles = true;
     *
     * @property {Page.iOS.PrefersLargeTitles}
     * @ios
     * @since 0.1
     */
    prefersLargeTitles?: boolean;
  }>;
};

export = HeaderBar;
