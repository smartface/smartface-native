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
     * Gets/sets load event's callback of page. This event fires once page
     * created. Within onLoad you may create views and add them to page.
     *
     * @event onLoad
     */
    this.onLoad = function (){};

    /**
     * Gets the main layout of Page which is an instance of UI.AbsoluteLayout. You
     * should use layout of page to add view into page.
     *
     * @property {UI.AbsoluteLayout} layout
     * @readonly
     * @since 0.1
     */
    this.layout;

    /**
     * Gets/sets show event's callback of page. This event fires when page appears on screen.
     * You may set headerBar and statusBar properties in this callback.
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
     */
    this.onShow = function (){};

    /**
     * Gets/sets hide event's callback for Page. This event fires when page disappears from screen.
     *
     * @event onHide
     */
    this.onHide = function (){};

    /**
     * Gets/sets back button enabled status on page. If it is set to true previous page will be
     * loaded when back button pressed.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     var page = new Page();
     *     page.android.backButtonEnabled = false;
     *
     * @property {Boolean} backButtonEnabled
     * @since 0.1
     */
    this.android.backButtonEnabled = false;

    /**
     * Gets status bar object. This property is readonly, you can not set
     * status bar to a page but you can change properties of page's status bar.
     * 
     * @property {UI.StatusBar} statusBar
     * @readonly
     * @since 0.1
     */
    this.statusBar;

    /**
     * Gets header bar object for page. This property is readonly, you can not
     * set header bar to a page but you can change properties of page's header bar.
     * 
     * @property {UI.HeaderBar} headerBar
     * @readonly
     * @since 0.1
     */
    this.headerBar;
    
    
    /**
     * This method registers a menu to given view.
     * 
     * @param {Object} params Object contains menu and view
     * @param {UI.Menu} [params.menu] Menu object
     * @param {UI.View} [params.view] View object
     * @method registerContextMenu
     * @since 0.1
     */
    this.registerContextMenu = function(params){}
}

module.exports = Page;