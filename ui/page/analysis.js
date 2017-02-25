/**
 * @class UI.Page
 * @since 0.1
 *
 * Page class stands for showing different user interfaces. Every page has its own lifecycle: load,
 * show and hide. Application should have at least one page otherwise what user will see is just
 * a black screen.
 *
 * Page has an embedded layout inside which you can use for adding views into page.
 *
 * Please refer to guides for best practices of page usages and page navigation.
 *
 * See also {@link UI.Pages} to see how to show a created page on screen.
 *
 *     @example
 *     const Pages = require('nf-core/ui/pages');
 *     const Page = require('nf-core/ui/page');
 *     var myPage = new Page({
 *         onLoad: function() {
 *             const Button = require('nf-core/ui/button');
 *             var myButton = new Button({
 *                 width: 150,
 *                 height: 80,
 *                 text: "Click me!"
 *             });
 *             this.layout.addChild(myButton);
 *         },
 *         onShow: function() {
 *             this.headerBar.visible = true;
 *             this.headerBar.title = "Page Example";
 *         }
 *     });
 *
 *     // After next expression created page will be shown on screen
 *     global.Router = new Pages({
 *         rootPage: myPage
 *     });
 *
 */
function Page(params) {
    /**
     * This event is called once when page is created.
     * You can create views and add them to page in this callback.
     *
     * @event onLoad
     * @android
     * @ios
     */
    this.onLoad = function (){};

    /**
     * Gets the main layout of Page which is an instance of UI.FlexLayout. You
     * should add views to the layout of the page.
     *
     * @property {UI.FlexLayout} layout
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    this.layout;

    /**
     * This event is called when a page appears on the screen (everytime).
     * It will be better to set headerBar and statusBar properties in this callback.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     var myPage = new Page({
     *         onShow: function() {
     *             this.headerBar.visible = true;
     *             this.statusBar.visible = true;
     *         }
     *     });
     *
     * @event onShow
     * @android
     * @ios
     */
    this.onShow = function (){};

    /**
     * This event is called when a page disappears from the screen.
     *
     * @event onHide
     * @android
     * @ios
     */
    this.onHide = function (){};

    /**
     * Gets/sets back button enabled status on page. If it is set to true previous page will be
     * loaded when back button pressed. This property only works on Android
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     var page = new Page();
     *     page.android.backButtonEnabled = false;
     *
     * @property {Boolean} backButtonEnabled
     * @android
     * @since 0.1
     */
    this.android.backButtonEnabled = false;

    /**
     * Gets status bar object. This property is readonly, you can not set
     * status bar to a page but you can change properties of page's status bar.
     *
     * @property {UI.StatusBar} statusBar
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    this.statusBar;

    /**
     * Gets header bar object of a  page. This property is readonly, you can not
     * set header bar to a page but you can change properties of page's header bar.
     *
     * @property {UI.HeaderBar} headerBar
     * @android
     * @ios
     * @readonly
     * @since 0.1
     */
    this.headerBar;

}

module.exports = Page;
