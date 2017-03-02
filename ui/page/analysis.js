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
     * @param {Object} parameters Parameters passed from UI.Router.go function
     * @android
     * @ios
     */
    this.onShow = function (parameters){};

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
     * loaded when back button pressed. This property works only on Android.
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
    
    /**
     * Gets/sets the orientation of the Page. This property must be set as constructor parameter. 
     * {@link UI.Page.Orientation Orientation} constants can use with bitwise or operator. The default value of the 
     * orientation defined in project.json.
     *     
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     var myPage1 = new Page({
     *          orientation: Page.Orientation.LANDSCAPELEFT
     *     });
     * 
     * @property {UI.Page.Orientation} [orientation = UI.Page.Orientation.PORTRAIT]
     * @android
     * @ios
     * @since 0.1
    */
    this.orientation = UI.Page.Orientation.PORTRAIT;
    
    /**
     * This event will be called when orientation of the Page changes.
     *
     * @event onOrientationChange
     * @android
     * @ios
     */
    this.onOrientationChange = function (){};
}

Page.Orientation = {};

/**
 * Enum corresponding to portrait orientation. 
 * 
 * @property PORTRAIT
 * @android 
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Page.Orientation,"PORTRAIT",{
    value: 1
});

/**
 * Enum corresponding to reverse portrait orientation (upside down).
 * 
 * @property UPSIDEDOWN
 * @android 
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Page.Orientation,"UPSIDEDOWN",{
    value: 2
});

/**
 * Enum corresponding to both portrait orientation controlled by sensor.
 * 
 * @property AUTOPORTRAIT
 * @android 
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Page.Orientation,"AUTOPORTRAIT",{
    value: 3
});

/**
 * Enum corresponding to landscape orientation (landspace left).
 * 
 * @property LANDSCAPELEFT
 * @android 
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Page.Orientation,"LANDSCAPELEFT",{
    value: 4
});

/**
 * Enum corresponding to reverse landscape orientation (landspace right).
 * 
 * @property LANDSCAPERIGHT
 * @android 
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Page.Orientation,"LANDSCAPERIGHT",{
    value: 8
});

/**
 * Enum corresponding to both landscape orientation controlled by sensor.
 * 
 * @property AUTOLANDSCAPE
 * @android 
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Page.Orientation,"AUTOLANDSCAPE",{
    value: 12
});

/**
 * Enum corresponding all orientation controlled by sensor.
 * 
 * @property AUTO
 * @android 
 * @ios
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Page.Orientation,"AUTO",{
    value: 15
});

module.exports = Page;
