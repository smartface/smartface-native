/**
 * @class UI.HeaderBar
 *
 * HeaderBar class represents Navigation Bar for iOS and Action Bar for Android. It is a bar
 * shown on top of page under statusBar object. You can manage application navigation by setting
 * buttons and you can show title of page on HeaderBar.
 *
 * Creating instance of HeaderBar class is not valid. You can access header bar of page
 * via UI.Page.headerBar property.
 *
 * On iOS you should work with header bar in scope of onLoad and onShow callbacks, otherwise
 * behaviour is undefined.
 * 
 * If the HeaderBar is visible, the pages starts under the HeaderBar, otherwise you should check 
 * behaviour of the {@link UI.StatusBar}.
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     const Color = require('sf-core/ui/color');
 *     const HeaderBarItem = require('sf-core/ui/headerbaritem');
 *
 *     var myPage = new Page({
 *         onLoad: function() {
 *             this.headerBar.backgroundColor = Color.MAGENTA;
 *             this.headerBar.title = "Header Bar";
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
 *             this.headerBar.visible = true;
 *         }
 *     });
 *
 */
function HeaderBar() {}

/**
 * Gets/sets background color of the header bar. If not set, header bar will have default
 * background color depending on device's OS and OS version.
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     const Color = require('sf-core/ui/color');
 *     var myPage = new Page({
 *         onLoad: function() {
 *             this.headerBar.backgroundColor = Color.RED;
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
 * Gets/sets item color of the header bar. This property will change color of the left item and color of all header bar items.
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     const Color = require('sf-core/ui/color');
 *     var myPage = new Page({
 *         onLoad: function() {
 *             this.headerBar.itemColor = Color.BLUE;
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
 * Gets/sets background image of the HeaderBar.
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     const Image = require('sf-core/ui/image');
 *     var myPage = new Page({
 *         onLoad: function() {
 *             this.headerBar.backgroundImage = Image.createFromFile('images://smartface.png');
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
 * Gets the height of the header bar. Height is a read only property and
 * its value may change depending on device and screen density.
 *
 * @property {Number} height
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
HeaderBar.prototype.height;

/**
 * Gets/sets the logo of the HeaderBar image which will shown left
 * side of the left item. You should enable the logo with logoEnabled.
 * If log is not set, the logo image will not shown. 
 * This property will work only for Android.
 * 
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     const Image = require('sf-core/ui/image');
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
 * Gets/sets subtitle of the header bar. If not set subtitle will not show.
 * This property will work only for Android.
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     var myPage = new Page();
 *     myPage.headerBar.android.subtitle = 'Hello from HeaderBar Subtitle!';
 *
 * @property {String} subtitle
 * @android
 * @since 0.1
 */
HeaderBar.prototype.android.subtitle = '';

/**
 * Gets/sets backBarButtonItem of the header bar.
 * When it set, it will change the next page's back button appearance.
 * This change can be observed only on the pages that added to navigator style router.
 * Default value is undefined, it gets title value from previous page's header bar title property.
 * Setting onPress callback of HeaderBarItem will not effect backBarButtonItem's onPress behaviour.
 * This property will work only for iOS.
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     var myPage = new Page();
 *	   const HeaderBarItem = require('sf-core/ui/headerbaritem');
 *     var backBarButtonItem = new HeaderBarItem({
 *          title : "Back",
 *     });
 *     myPage.headerBar.ios.backBarButtonItem = backBarButtonItem;
 *
 * @property {HeaderBarItem} backBarButtonItem
 * @ios
 * @since 0.1
 */
HeaderBar.prototype.ios.backBarButtonItem = undefined;

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
 * Gets/sets title color of the header bar.
 *
 * @property {UI.Color} [titleColor = Color.BLACK]
 * @android
 * @ios
 * @since 0.1
 */
HeaderBar.prototype.titleColor = Color.BLACK;

/**
 * Gets/sets visibility of the header bar.
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
 *      const Page = require('sf-core/ui/page');
 *      const HeaderBarItem = require('sf-core/ui/headerbaritem');
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
HeaderBar.prototype.setLeftItem = function(item){};

module.exports = HeaderBar;