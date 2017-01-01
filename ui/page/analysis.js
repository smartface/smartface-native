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
    * Gets/sets page enter animation.
    *     @example
    *     const Animation = require(sf-core/ui/animation);
    *     const Page = require('sf-core/ui/page');
    *     var myPage = new Page();
    *     myPage.enterAnimation = Animation.LEFTTORIGHT;
    *
    * @property {Animation} enterAnimation Page show animation
    */
    this.enterAnimation = Animation.LEFTTORIGHT;

    /**
    * Gets/sets page exit animation.
    *     @example
    *     const Animation = require(sf-core/ui/animation);
    *     const Page = require('sf-core/ui/page');
    *     var myPage = new Page();
    *     myPage.exitAnimation = Animation.RIGHTTOLEFT;
    *
    * @property {Animation} exitAnimation Page hide animation
    */
    this.exitAnimation = Animation.RIGHTTOLEFT

    /**
    * Show page to the user. This method brings your page to top of the user interface.
    *
    *     @example
    *     const Page = require('sf-core/ui/page');
    *     var myPage = new Page();
    *     myPage.show();
    *
    * @method show
    */
    this.show = function(){};

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
}

module.exports = Page;