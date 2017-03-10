/**
 * @ignore
 * @class UI.Pages
 * @since 0.1
 *
 * Pages class can used for navigating between pages. The best practice for Pages class
 * is using one instance from it.
 * Pages class should be initialized with a root page.
 *
 *     @example
 *     const Pages = require('nf-core/ui/pages');
 *     const Page = require('nf-core/ui/page');
 *     const Label = require('nf-core/ui/label');
 *     const FlexLayout = require('nf-core/ui/flexlayout');
 *     const Color = require('nf-core/ui/color');
 *     var myLabel = new Label({
 *         text: "Smartface Label",
 *         width: "100",
 *         height: "30",
 *         textColor: Color.WHITE
 *     });
 *     var myFlexlayout = new FlexLayout({
 *         width: "200",
 *         height: "50",
 *         backgroundColor: Color.BLUE
 *     });
 *     myFlexlayout.addChild(myLabel);
 *     var myPage = new Page({
 *         onLoad: function(){
 *             myPage.layout.add(myFlexlayout);
 *         }
 *     });
 *     // Pages must be initialized with rootPage.
 *     var myPages = new Pages({
 *         rootPage: myPage
 *     });
 *
 */
function Pages(params) {

    /**
     * This function shows a page by pushing it to the UI.Pages.
     *
     *     @example
     *     const Pages = require('nf-core/ui/pages');
     *     const Page = require('nf-core/ui/page');
     *     const Button = require('nf-core/ui/button');
     *     var myPage1 = new Page();
     *     var myPage2 = new Page();
     *
     *     var myButton = new Button({
     *         text: "Go to Page 2",
     *         height: "30",
     *         width: "100",
     *         onPress: function(){
     *             myPages.push(myPage2,true);
     *         }
     *     });
     *     myPage1.layout.add(myButton);
     *     var myPages = new Pages({
     *          rootPage: myPage1
     *     });
     *
     *
     *
     * @param {UI.Page} page Page to show. Previous page will be stacked.
     * @param {Boolean} animated If true, page will be showed with default animation, otherwise there will be no animation.
     * @method push
     * @android
     * @ios
     */
    this.push = function(page, animated){};

    /**
     * This function returns to previous page in UI.Pages stack.
     *
     *     @example
     *     const Pages = require('nf-core/ui/pages');
     *     const Page = require('nf-core/ui/page');
     *     const Button = require('nf-core/ui/button');
     *     var myPage1 = new Page();
     *     var myPage2 = new Page();
     *
     *     var myButton = new Button({
     *         text: "Go to Page 2",
     *         height: "30",
     *         width: "100",
     *         onPress: function(){
     *             myPages.push(myPage2,true);
     *         }
     *     });
     *     myPage1.layout.add(myButton);
     *     var myPages = new Pages({
     *          rootPage: myPage1
     *     });
     *
     *     var myButtonPage2 = new Button({
     *         text: "Back to Page 1",
     *         height: "10",
     *         width: "100",
     *         onPress: function(){
     *             myPages.pop();
     *         }
     *     });
     *     myPage2.layout.add(myButtonPage2);
     *
     * @method pop
     * @android
     * @ios
     */
    this.pop = function(){};
}



module.exports = Pages;
