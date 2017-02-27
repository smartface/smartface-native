/**
 * @class UI.MenuItem
 * @since 0.1
 *
 * MenuItem is used to add row and action to the UI.Menu 
 *
 */
function MenuItem(params) {

    /**
    * Gets/sets the title of a menu item.
    *
    * @property {String} title
    * @android
    * @ios
    * @since 0.1
    */
    this.title = "";

    /**
     * This event is called when user selects a menu item.
     *
     * @since 0.1
     * @event onSelected
     * @android
     * @ios
     */
    this.onSelected = function onSelected(){ };
}

module.exports = MenuItem;
