/**
 * @class UI.MenuItem
 * @since 0.1
 *
 * 
 * // todo Add description
 */
function MenuItem(params) {
    
    /** 
    * Gets/sets title of the menu item.
    *
    * @property {String} title 
    * @since 0.1
    */
    this.title = "";
    
    /**
     * Gets/sets selected event callback for menu item.
     * 
     * @since 0.1
     * @event onLongPress
     */
    this.onSelected = function onSelected(){ };
}

module.exports = MenuItem;