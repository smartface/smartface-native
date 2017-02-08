/**
 * @class UI.Page
 * @since 0.1
 *
 * Page class can used for different user interfaces. Every page stands for different native lifecycle.
 * Only one page could shown at once.
 *
 *     @example
 *     const Page = require('nf-core/ui/page');
 *     var myPage = new Page();
 *     myPage.onLoad = function(){            
 *         const Button = require('nf-core/ui/button');
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
     *     const Page = require('nf-core/ui/page');
     *     var myPage = new Page();
     *     myPage.onLoad = function(){            
     *         const Button = require('nf-core/ui/button');
     *         var myButton = new Button();
     *         myButton.text = "Click me!";
     *         myPage.add(myButton);
     *     }
     *
     * @event onLoad
     */
    this.onLoad = function onLoad(){};

    /**
     * Gets the main layout of Page.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     const Color = require('nf-core/ui/color');
     *     var myPage = new Page();
     *     myPage.layout.backgroundColor = Color.RED;
     *
     * @property {UI.AbsoluteLayout} layout
     * @readonly
     * @since 0.1
     */
    this.layout;

    /**
     * Gets the height of the status bar. height is a read only property. Height value will change depends on
     * device and screen density.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
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
     *     const Page = require('nf-core/ui/page');
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
     *     const Page = require('nf-core/ui/page');
     *     const Color = require('nf-core/ui/color');
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
     *     const Page = require('nf-core/ui/page');
     *     const StatusBarStyle = require('nf-core/ui/statusbarstyle');
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
     *     const Page = require('nf-core/ui/page');
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
     *     const Page = require('nf-core/ui/page');
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
     *     const Page = require('nf-core/ui/page');
     *     var page = new Page();
     *     page.android.backButtonEnabled = false;
     *
     * @property {Boolean} backButtonEnabled
     */
    this.android.backButtonEnabled = false;

    /**
     * Add view or container to the page.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     const Label = require('nf-core/ui/label');
     *     var myPage = new Page();
     *     var myLabel = new Label();
     *     myPage.add(myLabel);
     *
     * @method add
     * @deprecated 0.1 Use UI.Page#layout instead.
     */
    this.add = function(){};

    /**
     * Remove view or container to the page.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     const Label = require('nf-core/ui/label');
     *     var myPage = new Page();
     *     var myLabel = new Label();
     *     myPage.add(myLabel);
     *     myPage.remove(myLabel);
     *
     * @method remove
     * @deprecated 0.1 Use UI.Page#layout instead.
     */
    this.remove = function(){};

    /**
     * Gets/sets background color of the headerBar. If not set, headerBar will have default
     * background color depends on device's OS and OS version.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     const Color = require('nf-core/ui/color');
     *     var myPage = new Page();
     *     myPage.headerBar.backgroundColor = Color.RED;
     *
     * @property {UI.Color} [backgroundColor = Color.create("#00A1F1")]
     * @since 0.1
     */
    this.headerBar.backgroundColor = Color.create("#00A1F1");
    
    /**
     * Gets/sets background image of the headerBar.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     const Image = require('nf-core/ui/image');
     *     var myPage = new Page();
     *     myPage.headerBar.backgroundImage = Image.createFromFile('images://smartface.png');
     *
     * @property {UI.Image} [backgroundImage = null]
     * @since 0.1
     */
    this.headerBar.backgroundImage = null;
    
    /**
     * Gets/sets the navigation indicator visibility of the headerBar.
     * If false navigation indicator will not shown, otherwise will shown
     * as back icon with home as up indicator image.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     var myPage = new Page();
     *     myPage.headerBar.displayShowHomeEnabled = false;
     *
     * @property {Boolean} [displayShowHomeEnabled = false]
     * @since 0.1
     */
    this.headerBar.displayShowHomeEnabled = false;
    
    /**
     * Gets the height of the headerBar. Height is a read only property.
     * Height value may change depending on device and screen density.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     var myPage = new Page();
     *     var headerBarHeight = myPage.headerBar.height;
     *
     * @property {Number} height
     * @readonly
     * @since 0.1
     */
    this.headerBar.height;
    
    /**
     * Gets/sets home as up indicator image which will shown with home as up 
     * indicator of the headerBar. If not set, the application icon will
     * shown.This property will work only for Android.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     const Image = require('nf-core/ui/image');
     *     var myPage = new Page();
     *     var myImage = Image.createFromFile('images://smartface.png');
     *     myPage.headerBar.android.homeAsUpIndicatorImage = myImage;
     *
     * @property {UI.Image} [homeAsUpIndicatorImage = null]
     * @since 0.1
     */
    this.headerBar.android.homeAsUpIndicatorImage = null;
    
    /**
     * Gets/sets title of the headerBar. If not set, the application name will
     * shown.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     var myPage = new Page();
     *     myPage.headerBar.title = 'Hello from Smartface Headerbar!';
     *
     * @property {String} title
     * @since 0.1
     */
    this.headerBar.title = '';

    /**
     * Gets/sets title color of the headerBar. It is set to UI.Color.BLACK by default.
     * 
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     const Color = require('nf-core/ui/color');
     *     var myPage = new Page();
     *     myPage.headerBar.title = 'Smartface';
     *     myPage.headerBar.titleColor = Color.WHITE;
     * 
     * @property {UI.Color} [titleColor = Color.BLACK]
     * @since 0.1
     */
    this.headerBar.titleColor = Color.BLACK;
    
    /**
     * Gets/sets subtitle of the headerBar. If not set, will not shown. This property
     * will work only for Android.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     var myPage = new Page();
     *     myPage.headerBar.subtitle = 'Hello from Smartface Headerbar Subtitle!';
     *
     * @property {String} subtitle
     * @since 0.1
     */
    this.headerBar.android.subtitle = '';
    
    /**
     * Gets/sets visibility of the headerBar.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     var myPage = new Page();
     *     myPage.headerBar.visible = false;
     *
     * @property {Boolean} [visible = true]
     * @since 0.1
     */
    this.headerBar.visible = true;
   
    /**
     * Adds left item to headerBar.
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
     * @param {HeaderBarItem} item HeaderBarItem to add.
     */
    this.headerBar.setLeftItem = function(item){};

    /**
     * This function allows you to set header bar items to page's headerBar.
     * Given items should be instance of UI.HeaderBarItem class. Items will be
     * added to header bar in given array order starting from right of headerBar.
     * First item in the array will be leftmost item in the header bar.
     * 
     * @method setItems
     * @param {Array} [items] Array of HeaderBarItem objects to add
     * @since 0.1
     */
    this.headerBar.setItems = function(items) {};

}

module.exports = Page;