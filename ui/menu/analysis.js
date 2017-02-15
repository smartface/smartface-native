/**
 * @class UI.Menu
 * @since 0.1
 * 
 * // todo Add description
 * 
 *     
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
    
    /**
     * Shows menu on the page.
     * 
     * @param {UI.Page} page 
     * @method show
     * @since 0.1
     */
    this.show = function(e) {};
}

module.exports = Menu;