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
 *     @example
 *     const Page = require('nf-core/ui/page');
 *     const Color = require('nf-core/ui/color');
 *     const HeaderBarItem = require('nf-core/ui/headerbaritem');
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
function HeaderBar() {
    /**
     * Gets/sets background color of the header bar. If not set, header bar will have default
     * background color depending on device's OS and OS version.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     const Color = require('nf-core/ui/color');
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
    this.backgroundColor = Color.create("#00A1F1");

    /**
     * Gets/sets background image of the HeaderBar.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     const Image = require('nf-core/ui/image');
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
    this.backgroundImage = null;

    /**
     * Gets/sets the navigation indicator visibility of the headerBar.
     * If false navigation indicator will not show, otherwise will show
     * as back icon with home as up indicator image.
     *
     * @property {Boolean} [displayShowHomeEnabled = false]
     * @android
     * @ios
     * @since 0.1
     */
    this.displayShowHomeEnabled = false;

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
    this.height;

    /**
     * Gets/sets home as up indicator image which will shown with home as up
     * indicator of the headerBar. If not set, the application icon will
     * shown. This property will work only for Android.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     const Image = require('nf-core/ui/image');
     *     var myPage = new Page();
     *     var myImage = Image.createFromFile('images://icon.png');
     *     myPage.headerBar.android.homeAsUpIndicatorImage = myImage;
     *
     * @property {UI.Image} [homeAsUpIndicatorImage = null]
     * @android
     * @since 0.1
     */
    this.android.homeAsUpIndicatorImage = null;

    /**
     * Gets/sets subtitle of the header bar. If not set subtitle will not show.
     * This property will work only for Android.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     var myPage = new Page();
     *     myPage.headerBar.android.subtitle = 'Hello from HeaderBar Subtitle!';
     *
     * @property {String} subtitle
     * @android
     * @since 0.1
     */
    this.android.subtitle = '';

    /**
     * Gets/sets title of the header bar.
     *
     * @property {String} title
     * @android
     * @ios
     * @since 0.1
     */
    this.title = '';

    /**
     * Gets/sets title color of the header bar.
     *
     * @property {UI.Color} [titleColor = Color.BLACK]
     * @android
     * @ios
     * @since 0.1
     */
    this.titleColor = Color.BLACK;

    /**
     * Gets/sets visibility of the header bar.
     *
     * @property {boolean} [visible = true]
     * @android
     * @ios
     * @since 0.1
     */
    this.visible = true;

    /**
     * This function allows you to set header bar items to the right of page's headerBar.
     * Given items should be instance of UI.HeaderBarItem class. Items will be
     * added to header bar in given array order starting from right of header bar.
     *
     * @method setItems
     * @param {Array<UI.HeaderBarItem>} items Array of HeaderBarItem objects to add
     * @since 0.1
     */
    this.setItems = function(items) {};

    /**
     * Sets left item of header bar to given item.
     *
     *     @example
     *      const Page = require('nf-core/ui/page');
     *      const HeaderBarItem = require('nf-core/ui/headerbaritem');
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
    this.setLeftItem = function(item){};
}
