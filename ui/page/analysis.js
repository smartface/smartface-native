/**
 * @class Page
 * @since 0.1
 *
 * Page class can used for different user interfaces. Every page stands for different native lifecycle.
 * Only one page could shown at once.
 *
 */
function Page(params) {


    /**
     * Gets the height of the status bar. height is a read only property. Height value will change depends on
     * device and screen density.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     var myPage = new Page();
     *     var statusBarHeight = myPage.statusBar.height;
     *
     * @property {Number} height
     * @static
     * @readonly
     * @since 0.1
     */
    this.statusBar.height;

    /**
     * Gets/sets visibility of the status bar.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     var myPage = new Page();
     *     myPage.statusBar.visible = true;
     *
     * @property {Boolean} visible
     * @static
     * @since 0.1
     */
    this.statusBar.visible = true;

    /**
     * Gets/sets color of the status bar. This property will work only for Android
     * KitKat (API 19) or above.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     const Color = require('sf-core/ui/color');
     *     var myPage = new Page();
     *     myPage.statusBar.android.color = Color.RED;
     *
     * @property {Color} color
     * @static
     * @since 0.1
     */
    this.statusBar.android.color = Color.create("#FF757575");

    /**
     * Gets/sets status bar style. This property will work only for iOS
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     const StatusBarStyle = require('sf-core/ui/statusbarstyle');
     *     var myPage = new Page();
     *     myPage.statusBar.ios.style = StatusBarStyle.DEFAULT;
     *
     * @property {StatusBarStyle} style
     * @static
     * @since 0.1
     */
    this.statusBar.ios.style = StatusBarStyle.DEFAULT;

    /**
     * Gets/sets key on show event callback for Page. This event fires when page appears from user interface.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     var myPage = new Page();
     *     myPage.onShow = function(){
     *         alert("Page Showed!");
     *     }
     *
     * @callback Page~onShow
     */
    this.onShow = function onShow(){};

    /**
     * Gets/sets key on hide event callback for Page. This event fires when page disappears from user interface.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     var myPage = new Page();
     *     myPage.onHide = function(){
     *         alert("Page Hided!");
     *     }
     *
     * @callback Page~onHide
     */
    this.onHide = function onHide(){};

    /**
     * Gets/sets back button effects on pages. If true previous page will be loaded on back button press.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     var page = new Page();
     *     page.android.backButtonEnabled = false;
     *
     * @property {Boolean} backButtonEnabled. Back button effect status for pages.
     */
    this.android.backButtonEnabled = false;

    /**
     * Add view or container to the page.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     const Label = require('sf-core/ui/label');
     *     var myPage = new Page();
     *     var myLabel = new Label();
     *     myPage.add(myLabel);
     *
     * @method add
     */
    this.add = function(){};

    /**
     * Remove view or container to the page.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     const Label = require('sf-core/ui/label');
     *     var myPage = new Page();
     *     var myLabel = new Label();
     *     myPage.add(myLabel);
     *     myPage.remove(myLabel);
     *
     * @method remove
     */
    this.remove = function(){};
}

module.exports = Page;