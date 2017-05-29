/**
 * @class UI.FloatingMenu
 * @since 1.1.10
 * Simple floating action button. Float action button position cannot be changed.
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
     * Gets/sets icon of FloatingMenu button
     *
     * @property {UI.Image} items
     * @android
     * @ios
     * @since 1.1.10
     */
    this.icon;
    
     /**
     * Gets/sets color of FloatingMenu button
     *
     * @property {UI.Color} items
     * @android
     * @ios
     * @since 1.1.10
     */
    this.color;
    
     /**
     * Click event callback function. This function only fire when items array is empty
     *
     * @since 1.1.10
     * @event onClick
     * @android
     * @ios
     */
     this.onClick = function(e) {};
     
     /**
     * Gets/sets open event callback for a FloatingMenu.
     *
     * @since 1.1.10
     * @event onOpen
     * @android
     * @ios
     */
     this.onOpen = function(e) {};
     
     /**
     * Gets/sets onClose event callback for a FloatingMenu.
     *
     * @since 1.1.10
     * @event onClose
     * @android
     * @ios
     */
     this.onClose = function(e) {};
     
     /**
     * Gets/sets open function for a FloatingMenu.
     *
     * @since 1.1.10
     * @method open
     * @android
     * @ios
     */
     this.open = function(e) {};
     
     /**
     * Gets/sets open function for a FloatingMenu.
     *
     * @since 1.1.10
     * @method close
     * @android
     * @ios
     */
     this.close = function(e) {};
}

/**
 * @class UI.FloatingMenu.ITEM
 * @since 1.1.10
 */
 
FloatingMenu.Item = function() {

        /**
         * Gets/sets title for a FloatingMenu.Item.
         *
         * @property {String} title
         * @android
         * @ios
         * @since 0.1
         */
        this.title;

        /**
         * Gets/sets icon of FloatingMenu.Item
         *
         * @property {UI.Image} items
         * @android
         * @ios
         * @since 1.1.10
         */
        this.icon;
        
         /**
         * Gets/sets color of FloatingMenu.Item button
         *
         * @property {UI.Color} items
         * @android
         * @ios
         * @since 1.1.10
         */
        this.color;

        /**
         * This event will be fired when the item is touched.
         *
         * @event onClick
         * @android
         * @ios
         * @since 1.1.2
         */
        this.onClick;
        
        /**
         * Gets/sets color of FloatingMenu.Item button
         *
         * @property {UI.Color} items
         * @android
         * @ios
         * @since 1.1.10
         */
        this.titleColor;
};

module.exports = FloatingMenu;
