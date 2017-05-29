/**
 * @class UI.FloatingMenu
 * @since 1.1.10
 * Simple floating menu. Its position cannot be changed.
 *
 *     @example
 *     const FloatingMenu = require('sf-core/ui/floatingmenu');
 *     const Color = require("sf-core/ui/color");
 *     
 *     var items = [
 *       new FloatingMenu.Item({
 *         title: "red",
 *         color: Color.RED,
 *         onClick: function() {
 *           console.log("clicked: RED");
 *         }
 *       }),
 *       new FloatingMenu.Item({
 *         title: "yellow",
 *         titleColor: Color.YELLOW,
 *         color: Color.YELLOW,
 *         onClick: function() {
 *           console.log("clicked: YELLOW");
 *         }
 *       }),
 *       new FloatingMenu.Item({
 *         title: "default",
 *         onClick: function() {
 *           console.log("clicked: DEFAULT");
 *         }
 *       })
 *     ];
 * 
 *     var floatingMenu = new FloatingMenu({
 *       items: items,
 *       onOpen: function() {
 *         console.log("open items");
 *       },
 *       onClose: function() {
 *         console.log("close items");
 *       }
 *     });
 *     page.layout.addChild(floatingMenu);
 * 
 */
function FloatingMenu(params) {
    /**
     * Gets/sets array of UI.FloatingMenu.Item of the menu.
     *
     * @property {Array<UI.FloatingMenu.Item>} items
     * @android
     * @ios
     * @since 1.1.10
     */
    this.items = [];
    
     /**
     * Gets/sets icon of the button
     *
     * @property {UI.Image} icon
     * @android
     * @ios
     * @since 1.1.10
     */
    this.icon;

    /**
     * Gets/sets the menu button's rotate behaviour on click.
     *
     * @property {Boolean} [rotateEnabled=true]
     * @android
     * @ios
     * @since 1.1.10
     */
    this.rotateEnabled = true;
    
    /**
     * Gets/sets color of the button
     *
     * @property {UI.Color} color
     * @android
     * @ios
     * @since 1.1.10
     */
    this.color;
    
    /**
     * Gets/sets click event callback function. This function is fired when items array is empty.
     *
     * @since 1.1.10
     * @event onClick
     * @android
     * @ios
     */
     this.onClick = function(e) {};
     
     /**
     * Gets/sets open event callback.
     *
     * @since 1.1.10
     * @event onOpen
     * @android
     * @ios
     */
     this.onOpen = function(e) {};
     
     /**
     * Gets/sets onClose event callback.
     *
     * @since 1.1.10
     * @event onClose
     * @android
     * @ios
     */
     this.onClose = function(e) {};
     
     /**
     * Opens the menu.
     *
     * @since 1.1.10
     * @method open
     * @android
     * @ios
     */
     this.open = function() {};
     
     /**
     * Closes the menu.
     *
     * @since 1.1.10
     * @method close
     * @android
     * @ios
     */
     this.close = function() {};
}

/**
 * @class UI.FloatingMenu.Item
 * @since 1.1.10
 */
 
FloatingMenu.Item = function() {

        /**
         * Gets/sets title.
         *
         * @property {String} title
         * @android
         * @ios
         * @since 1.1.10
         */
        this.title;

        /**
         * Gets/sets icon.
         *
         * @property {UI.Image} icon
         * @android
         * @ios
         * @since 1.1.10
         */
        this.icon;
        
         /**
         * Gets/sets color of the item button.
         *
         * @property {UI.Color} color
         * @android
         * @ios
         * @since 1.1.10
         */
        this.color;

        /**
         * Gets/sets the click callback function. This event will be fired when the item is touched.
         *
         * @event onClick
         * @android
         * @ios
         * @since 1.1.10
         */
        this.onClick;
        
        /**
         * Gets/sets color of the title.
         *
         * @property {UI.Color} titleColor
         * @android
         * @ios
         * @since 1.1.10
         */
        this.titleColor;
};

module.exports = FloatingMenu;
