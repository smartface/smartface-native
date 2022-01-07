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
function HeaderBar() {}


/**
 * Defines the opacity of a view. The value of this property is a float number between 0.0 and 1.0. For iOS, you should access this property from page.parentController.
 * 0 represents view is completely transparent and 1 represents view is completely opaque.
 *
 * @property {Number} [alpha = 1]
 * @android
 * @ios
 * @since 4.0.0
 */
HeaderBar.prototype.alpha = 1;

/**
 * Gets/sets transparency of header bar. For iOS, you should access this property from page.parentController.
 *
 * @property {Boolean} [transparent = true]
 * @ios
 * @android
 * @since 4.0.0
 */
HeaderBar.prototype.transparent = false;

/**
 * Gets/sets border visibility of headerbar. For iOS, you should access this property from page.parentController.
 *
 * @property {Boolean} [borderVisibility = true]
 * @android
 * @ios
 * @since 3.0.3
 */
HeaderBar.prototype.borderVisibility = true;


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
HeaderBar.prototype.backgroundColor = Color.create("#00A1F1");

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
HeaderBar.prototype.itemColor = Color.WHITE;

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
HeaderBar.prototype.backgroundImage = null;

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
HeaderBar.prototype.leftItemEnabled = false;

/**
 * Gets/sets titleFont of header bar subtitle.
 * 
 * @property {UI.Font} subtitleFont
 * @android
 * @since 4.0.0
 */
HeaderBar.prototype.subtitleFont = undefined;

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
HeaderBar.prototype.titleFont = undefined;

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
HeaderBar.prototype.height;

/**
 * A Boolean value that indicates whether the header bar is translucent. For iOS, you should access this property from page.parentController.
 *
 * @property {Boolean} translucent
 * @ios
 * @since 4.0.2
 */
HeaderBar.prototype.translucent = false;

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
HeaderBar.prototype.android.logo = null;

/**
 * Gets/sets the logo visibility of the HeaderBar. If logo is disable, 
 * logo image will newer shown. This property will work only for Android.
 *
 * @property {Boolean} [logoEnabled = false]
 * @android
 * @since 0.1
 */
HeaderBar.prototype.android.logoEnabled = null;


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
HeaderBar.prototype.android.padding = { top : 0, left : 0, right : 4, bottom : 0 };

/**
 * Gets/sets the space between left item and title of headerbar. Minimum API Level 24 required.
 * 
 * @property {Number} [contentInsetStartWithNavigation = 0]
 * @android
 * @since 4.3.6
 * @see https://material.io/components/app-bars-top#specs
 */
HeaderBar.prototype.android.contentInsetStartWithNavigation = 0;

/**
 * Gets/sets the title layout of the HeaderBar. Title layout allows you to assign custom view.
 * For iOS, layouts are centered on the header bar and may be resized to fit.
 *
 * @property {UI.View} titleLayout
 * @android
 * @ios
 * @since 3.2.1
 */
HeaderBar.prototype.titleLayout;

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
HeaderBar.prototype.contentInset = {};

/**
 * Gets/sets subtitle of the header bar. If not set subtitle will not show.
 * This property will work only for Android.
 *
 *     @example
 *     const Page = require('@smartface/native/ui/page');
 *     var myPage = new Page();
 *     myPage.headerBar.android.subtitle = 'Hello from HeaderBar Subtitle!';
 *
 * @property {String} subtitle
 * @android
 * @since 0.1
 */
HeaderBar.prototype.android.subtitle = '';


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
HeaderBar.prototype.android.elevation;

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
HeaderBar.prototype.ios.backBarButtonItem = undefined;

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
HeaderBar.prototype.ios.largeTitleDisplayMode = Page.iOS.LargeTitleDisplayMode.AUTOMATIC;

/**
 * Gets/sets title of the header bar.
 *
 * @property {String} title
 * @android
 * @ios
 * @since 0.1
 */
HeaderBar.prototype.title = '';

/**
 * Gets/sets attributed title of the header bar.
 *
 * @property {UI.AttributedString} attributedTitle
 * @android
 * @since 4.0.0
 */
HeaderBar.prototype.attributedTitle;

/**
 * Gets/sets attributed subtitle of the header bar.
 *
 * @property {UI.AttributedString} attributedSubtitle
 * @android
 * @since 4.0.0
 */
HeaderBar.prototype.attributedSubtitle;

/**
 * Gets/sets title color of the header bar. For iOS, you should access this property from page.parentController.
 *
 * @property {UI.Color} [titleColor = Color.BLACK]
 * @android
 * @ios
 * @since 0.1
 */
HeaderBar.prototype.titleColor = Color.BLACK;

/**
 * Gets/sets visibility of the header bar. For iOS, you should access this property from page.parentController.
 *
 * @property {boolean} [visible = true]
 * @android
 * @ios
 * @since 0.1
 */
HeaderBar.prototype.visible = true;

/**
 * This function allows you to set header bar items to the right of page's headerBar.
 * Given items should be instance of UI.HeaderBarItem class. Items will be
 * added to header bar in given array order starting from right of header bar.
 *
 * @method setItems
 * @param {Array<UI.HeaderBarItem>} items Array of HeaderBarItem objects to add
 * @since 0.1
 */
HeaderBar.prototype.setItems = function(items) {};

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
HeaderBar.prototype.setLeftItem = function(item) {};

module.exports = HeaderBar;