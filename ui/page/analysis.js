/**
 * @class UI.Page
 * @since 0.1
 *
 * Page class can used for different user interfaces. Every page stands for different native lifecycle.
 * Only one page could shown at once.
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     var myPage = new Page();
 *     myPage.onLoad = function(){            
 *         const Button = require('sf-core/ui/button');
 *         var myButton = new Button();
 *         myButton.text = "Click me!";
 *         myPage.add(myButton);
 *     
 *     }
 */
function Page(params) {
    /**
     * It is a load callback for Page. It is called when the page is first created.
     * Below example creates a button inside the page.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     var myPage = new Page();
     *     myPage.onLoad = function(){            
     *         const Button = require('sf-core/ui/button');
     *         var myButton = new Button();
     *         myButton.text = "Click me!";
     *         myPage.add(myButton);
     *     }
     *
     * @event onLoad
     */
    this.onLoad = function onLoad(){};


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
     * @event onShow
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
     * @event onHide
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
    
    /**
     * Gets/sets background color of the actionbar. If not set, actionbar will have default
     * background color depends on device's OS and OS version.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     const Color = require('sf-core/ui/color');
     *     var myPage = new Page();
     *     myPage.actionbar.backgroundColor = Color.RED;
     *
     * @property {UI.Color} backgroundColor
     * @since 0.1
     */
    this.actionbar.backgroundColor = UI.Color.LIGHTGRAY;
    
    /**
     * Gets/sets background image of the actionbar.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     const Image = require('sf-core/ui/image');
     *     var myPage = new Page();
     *     myPage.actionbar.backgroundImage = Image.createFromFile('images://smartface.png');
     *
     * @property {UI.Image} [backgroundImage = null]
     * @since 0.1
     */
    this.actionbar.backgroundImage = null;
    
    /**
     * Gets/sets the navigation indicator visibility of the actionbar.
     * If false navigation indicator will not shown, otherwise will shown
     * as back icon with home as up indicator image.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     var myPage = new Page();
     *     var headerbarHeight = myPage.actionbar.height;
     *
     * @property {Boolean} [displayShowHomeEnabled = false]
     * @since 0.1
     */
    this.actionbar.displayShowHomeEnabled = false;
    
    /**
     * Gets/sets the title visibility of the actionbar. If false title will
     * not shown, otherwise title will shown.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     var myPage = new Page();
     *     var headerbarHeight = myPage.actionbar.height;
     *
     * @property {Boolean} [displayShowTitleEnabled = false]
     * @since 0.1
     */
    this.actionbar.displayShowTitleEnabled = false;
    
    /**
     * Gets the height of the actionbar. Height is a read only property.
     * Height value will change depends on device and screen density.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     var myPage = new Page();
     *     var headerbarHeight = myPage.actionbar.height;
     *
     * @property {Number} height
     * @readonly
     * @since 0.1
     */
    this.actionbar.height = 30;
    
    /**
     * Gets/sets home as up indicator image which will shown with home as up 
     * indicator of the actionbar. If not set, the application icon will
     * shown.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     const Image = require('sf-core/ui/image');
     *     var myPage = new Page();
     *     var myImage = Image.createFromFile('images://smartface.png');
     *     myPage.actionbar.homeAsUpIndicatorImage = myImage;
     *
     * @property {UI.Image} [homeAsUpIndicatorImage = null]
     * @since 0.1
     */
    this.actionbar.homeAsUpIndicatorImage = null;
    
    /**
     * Gets/sets title of the actionbar. If not set, the application name will
     * shown.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     var myPage = new Page();
     *     myPage.actionbar.title = 'Hello from Smartface Headerbar!';
     *
     * @property {String} title
     * @since 0.1
     */
    this.actionbar.title = '';
    
    /**
     * Gets/sets subtitle of the actionbar. If not set, will not shown.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     var myPage = new Page();
     *     myPage.actionbar.subtitle = 'Hello from Smartface Headerbar Subtitle!';
     *
     * @property {String} subtitle
     * @since 0.1
     */
    this.actionbar.subtitle = '';
    
    /**
     * Gets/sets visibility of the actionbar.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     var myPage = new Page();
     *     myPage.actionbar.visible = false;
     *
     * @property {Boolean} [visible = true]
     * @since 0.1
     */
    this.actionbar.visible = true;
}

module.exports = Page;