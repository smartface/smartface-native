/**
 * @class UI.Pages
 * @since 0.1
 *
 * Pages class can used for navigating between pages. The best practise for Pages class
 * is using one instance from it. 
 * Pages class should initialized with root page. 
 *
 *     @example
 *     const Pages = require('nf-core/ui/pages');
 *     const Page = require('nf-core/ui/page');
 *     const Label = require('nf-core/ui/label');
 *     const AbsoluteLayout = require('nf-core/ui/absolutelayout');
 *     const Color = require('nf-core/ui/color');
 *     var myLabel = new Label({
 *         text: "Smartface Label",
 *         width: "50%", 
 *         height: "10%",
 *         left: "25%",
 *         textColor: Color.WHITE
 *     });
 *     var myAbsoluteLayout = new AbsoluteLayout({
 *         width: "100%", 
 *         height: "100%",
 *         backgroundColor: Color.BLUE
 *     });
 *     myAbsoluteLayout.addChild(myLabel);
 *     var myPage = new Page({
 *         onLoad: function(){
 *             myPage.add(myAbsoluteLayout);
 *         }
 *     });
 *     // Must initialized with rootPage.
 *     var myPages = new Pages({
 *         rootPage: myPage
 *     });
 * 
 */
function Pages(params) {

    /**
     * Show page with pushing to pages stack. 
     *
     *     @example
     *     const Pages = require('nf-core/ui/pages');
     *     const Page = require('nf-core/ui/page');
     *     const Button = require('nf-core/ui/button');
     *     var myPage1 = new Page();
     *     var myButtonPage1 = new Button({
     *         text: "Go to Page 2",
     *         height: "15%",
     *         width: "30%",
     *         top: "30%",
     *         left: "35%",
     *         onPress: function(){
     *             myPages.push(myPage2,true);
     *         }
     *     });
     *     myPage1.add(myButtonPage1);
     *     var myPages = new Pages({
     *          rootPage: myPage1  
     *     });
     * 
     *     var myPage2 = new Page();
     *     var myButtonPage2 = new Button({
     *         text: "Back to Page 1",
     *         height: "15%",
     *         width: "30%",
     *         top: "30%",
     *         left: "35%",
     *         onPress: function(){
     *             myPages.pop();
     *         }
     *     });
     *     myPage2.add(myButtonPage2);
     *     
     * @param {UI.Page} page Page to show. Previous page will be stacked.
     * @param {Boolean} animated If true, page will showed with default animation, otherwise will showed without animation.  
     * @method push
     */
    this.push = function(page, animated){};

    /**
     * Show page with poping from pages stack.
     *
     *     @example
     *     const Pages = require('nf-core/ui/pages');
     *     const Page = require('nf-core/ui/page');
     *     const Button = require('nf-core/ui/button');
     *     var myPage1 = new Page();
     *     var myButtonPage1 = new Button({
     *         text: "Go to Page 2",
     *         height: "15%",
     *         width: "30%",
     *         top: "30%",
     *         left: "35%",
     *         onPress: function(){
     *             myPages.push(myPage2,true,"Page2");
     *         }
     *     });
     *     myPage1.add(myButtonPage1);
     *     var myPages = new Pages({
     *          rootPage: myPage1  
     *     });
     * 
     *     var myPage2 = new Page();
     *     var myButtonPage2 = new Button({
     *         text: "Back to Page 1",
     *         height: "15%",
     *         width: "30%",
     *         top: "30%",
     *         left: "35%",
     *         onPress: function(){
     *             myPages.pop();
     *         }
     *     });
     *     myPage2.add(myButtonPage2);
     *
     * @method pop
     */
    this.pop = function(){};
}

/**
 * Gets/sets sliderDrawer of the Pages.
 *
 *     @example
 *     const Pages = require('nf-core/ui/pages');
 *     const SliderDrawer = require('nf-core/ui/sliderdrawer');
 *     var mySliderDrawer = new SliderDrawer();
 *     Pages.sliderDrawer = mySliderDrawer;
 *
 * @property {UI.SliderDrawer} [sliderDrawer = null]
 * @static
 * @since 0.1
 */
Object.defineProperty(Pages, 'sliderDrawer', {
    value: null
});

module.exports = Pages;