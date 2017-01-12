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
     * @callback Page~onLoad
     */
    this.onLoad = function onLoad(){};

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