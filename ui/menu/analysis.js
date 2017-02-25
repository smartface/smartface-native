/**
 * @class UI.Menu
 * @since 0.1
 *
 * Menu is a dialog UI that presents a set of alternatives to the user for how to
 * proceed with a given task.
 *
 *    @example
 *    const Menu    = require('nf-core/ui/menu');
 *    const MenuItem    = require('nf-core/ui/menuitem');
 *
 *    var menu = new Menu();
 *    menu.headerTitle = "My Menu Title";
 *    var menuItem1    = new MenuItem({title : "Menu Item 1"});
 *    var menuItem2   = new MenuItem({title : "Menu Item 2"});
 *    menuItem1.onSelected = function(){
 *        console.log("menu item 1 clicked")
 *    }
 *
 *    menuItem2.onSelected = function(){
 *        console.log("menu item 2 clicked")
 *    }
 *
 *    menu.items = [menuItem1,menuItem2];
 *    menu.show(myPage);
 *
 */
function Menu(params) {
    /**
     * Gets/sets header title of Menu
     *
     * @property {String} headerTitle
     * @android
     * @ios
     * @since 0.1
     */
    this.headerTitle = "";


    /**
     * Gets/sets array of UI.MenuItem of the menu.
     *
     * @property {Array<UI.MenuItem>} items
     * @android
     * @ios
     * @since 0.1
     */
    this.items = null;

    /**
     * This function shows menu on the given UI.Page.
     *
     * @param {UI.Page} page This is the page that menu will be shown.
     * @android
     * @ios
     * @method show
     * @since 0.1
     */
    this.show = function(e) {};
}

module.exports = Menu;
