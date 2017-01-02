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
     *     label.android.backButtonEnabled = false;
     *
     * @property {Boolean} backButtonEnabled Back button effect status for pages.
     */
    this.android.backButtonEnabled = false;

    /**
     * Gets root container of page.
     *
     *     @example
     *     const Page = require('sf-core/ui/page');
     *     const Label = require('sf-core/ui/label');
     *     var myPage = new Page();
     *     var myLabel = new Label({
     *          text: "Smartface Label"
     *     });
     *     myPage.rootContainer.addChild(myLabel);
     *
     * @property {ViewGroup} viewgroup Root container of page.
     */
    this.viewgroup = new ViewGroup();
}

module.exports = Page;