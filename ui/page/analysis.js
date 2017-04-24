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
 *     const extend = require("js-base/core/extend");
 *     const Router = require('sf-core/ui/router');
 *     const Page = require('sf-core/ui/page');
 *     var page1 = new extend(Page)(
 *         function(_super,params)
 *         {
 *             var self = this;
 *             _super(this,{
 *                 onShow: function() {
 *                     this.headerBar.visible = true;
 *                     this.headerBar.title = "Smartface Page";
 *                 },
 *                 onLoad: function(){
 *                     const Button = require('sf-core/ui/button');
 *                     var myButton = new Button({
 *                         width: 150,
 *                         height: 80,
 *                         text: "Smartface Button"
 *                     });
 *                     this.layout.addChild(myButton);
 *                 }
 *             });
 *         }
 *     );
 *
 *     Router.add('myPage',page1);
 *     Router.go('myPage');
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
     *     const Page = require('sf-core/ui/page');
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
     * This event will be triggered when user clicks back button on the Device.
     *
     * @event onBackButtonPressed
     * @android
     * @since 0.1
     */
    this.android.onBackButtonPressed = function (){};

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
     *     const Page = require('sf-core/ui/page');
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
/**
 * @enum {Number} UI.Page.Orientation
 * @static
 * @since 0.1
 *
 * Orientation is an enum that defines page orientation.
 *
 */
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
Page.Orientation.PORTRAIT = 1;

/**
 * Enum corresponding to reverse portrait orientation (upside down).
 * 
 * @property UPSIDEDOWN
 * @android 
 * @ios
 * @readonly
 * @since 0.1
 */
Page.Orientation.UPSIDEDOWN = 2;

/**
 * Enum corresponding to both portrait orientation controlled by sensor.
 * 
 * @property AUTOPORTRAIT
 * @android 
 * @ios
 * @readonly
 * @since 0.1
 */
Page.Orientation.AUTOPORTRAIT = 3;

/**
 * Enum corresponding to landscape orientation (landspace left).
 * 
 * @property LANDSCAPELEFT
 * @android 
 * @ios
 * @readonly
 * @since 0.1
 */
Page.Orientation.LANDSCAPELEFT = 4;

/**
 * Enum corresponding to reverse landscape orientation (landspace right).
 * 
 * @property LANDSCAPERIGHT
 * @android 
 * @ios
 * @readonly
 * @since 0.1
 */
Page.Orientation.LANDSCAPERIGHT = 8;

/**
 * Enum corresponding to both landscape orientation controlled by sensor.
 * 
 * @property AUTOLANDSCAPE
 * @android 
 * @ios
 * @readonly
 * @since 0.1
 */
Page.Orientation.AUTOLANDSCAPE = 12;

/**
 * Enum corresponding all orientation controlled by sensor.
 * 
 * @property AUTO
 * @android 
 * @ios
 * @readonly
 * @since 0.1
 */
Page.Orientation.AUTO = 15;

module.exports = Page;
