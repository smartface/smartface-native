/**
 * @class UI.Menu
 * @since 0.1
 * 
 * // todo Add description
 * 
 *     @example
 *     const Page = require("nf-core/ui/page");
 *     const Menu = require("nf-core/ui/menu");
 *     const MenuItem = require("nf-core/ui/menuitem");
 * 
 *     var myPage = new Page();
 *     
 *     var item1 = new MenuItem( {
 *         title: "Reply"
 *     });
 * 
 *     var item2 = new MenuItem( {
 *         title: "Reply All"
 *     });
 * 
 *     var items = [item1, item2];
 *     var myMenu = new Menu();
 *     myMenu.items = items;
 * 
 *     var myButton = new Button({
 *         text: "Show Menu"
 *     });
 *     
 *     var myContextMenu = { 
 *         view: myButton,
 *         menu: myMenu
 *     }
 *     myPage.registerContextMenu(myContextMenu);
 */
function Menu(params) {
    /** 
     * Gets/sets menu header title.
     *
     * @property {String} headerTitle 
     * @since 0.1
     */
    this.headerTitle = "";
    
    
    /** 
     * Gets/sets items of the menu.
     *
     * @property {Array} items 
     * @since 0.1
     */
    this.items = null;
}

module.exports = Menu;