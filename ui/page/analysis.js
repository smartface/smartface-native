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
    * Gets/sets background color of page. It allows setting background
    * color with string or UI.Color properties.
    *
    * @property {Color} backgroundColor Background color
    */
    this.backgroundColor = Color.WHITE;

    /**
    * Gets/sets background image of page. It allows setting background
    * image with string image path.
    *
    * @property {String} backgroundImage Background image
    */
    this.backgroundImage = "assets://smartface.png"

    /**
    * Show page to the user. This method brings your page to top og the user interface.
    *
    *     @example
    *     const Page = require('sf-core/ui/page');
    *     var myPage = new Page();
    *     myPage.show();

    *     @example
    *     const Animation = require(sf-core/ui/animation);
    *     const Page = require('sf-core/ui/page');
    *     var myPage = new Page();
    *     myPage.show(Animation.FADEIN);
    *
    * @param {Animation} animation Page change animation, if empty page will shown without animation.
    * @method show
    */
    this.show = function(animation){};

    /**
    * Gets/sets key press event for Page. This event fires when device key pressed.
    *
    *     @example
    *     const KeyEvent = require('sf-core/ui/keyevent');
    *     const Page = require('sf-core/ui/page');
    *     var myPage = new Page();
    *     myPage.onKeyPress = function(keyEvent){
    *          if(keyEvent == KeyEvent.VOLUMEUP){
    *              alert("Device Volume Up Pressed");
    *          }
    *     }
    *
    * @callback onKeyPress~onKeyPress
    * @param {KeyEvent} device key code
    */
    this.onKeyPress = function onKeyPress(){};
}

module.exports = Page;