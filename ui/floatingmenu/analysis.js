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
 *       onMenuOpen: function() {
 *         console.log("open items");
 *       },
 *       onMenuClose: function() {
 *         console.log("close items");
 *       }
 *     });
 *     page.layout.addChild(floatingMenu);
 * 
 */
function FloatingMenu(params) {};

/**
 * Gets/sets array of UI.FloatingMenu.Item of the menu.
 *
 * @property {UI.FloatingMenu.Item[]} items
 * @android
 * @ios
 * @since 1.1.10
 */
FloatingMenu.prototype.items = [];
    
/**
 * Gets/sets icon of the button
 *
 * @property {UI.Image} icon
 * @android
 * @ios
 * @since 1.1.10
 */
FloatingMenu.prototype.icon;

/**
 * Gets/sets the menu button's rotate behaviour on click.
 *
 * @property {Boolean} [rotateEnabled=true]
 * @android
 * @ios
 * @since 1.1.10
 */
FloatingMenu.prototype.rotateEnabled = true;
    
/**
 * Gets/sets color of the button
 *
 * @property {UI.Color} color
 * @android
 * @ios
 * @since 1.1.10
 */
FloatingMenu.prototype.color;
    
/**
 * Gets/sets visible of the FloatingMenu
 *
 * @property {Boolean} visible
 * @android
 * @ios
 * @since 1.1.10
 */
FloatingMenu.prototype.visible;
    
/**
 * Gets/sets click event callback function. This function is fired when items array is empty.
 *
 * @since 1.1.10
 * @event onClick
 * @android
 * @ios
 */
FloatingMenu.prototype.onClick = function() {};
     
/**
 * Gets/sets open event callback.
 *
 * @since 1.1.10
 * @event onMenuOpen
 * @android
 * @ios
 */
FloatingMenu.prototype.onMenuOpen = function() {};
     
/**
 * Gets/sets onMenuClose event callback.
 *
 * @since 1.1.10
 * @event onMenuClose
 * @android
 * @ios
 */
FloatingMenu.prototype.onMenuClose = function() {};
     
/**
 * Opens the menu.
 *
 * @since 1.1.10
 * @method open
 * @android
 * @ios
 */
FloatingMenu.prototype.open = function() {};
     
/**
 * Closes the menu.
 *
 * @since 1.1.10
 * @method close
 * @android
 * @ios
 */
FloatingMenu.prototype.close = function() {};

/**
 * @class UI.FloatingMenu.Item
 * @since 1.1.10
 */ 
FloatingMenu.Item = function() {};

/**
 * Gets/sets title.
 *
 * @property {String} title
 * @android
 * @ios
 * @since 1.1.10
 */
FloatingMenu.Item.prototype.title;

/**
 * Gets/sets icon.
 *
 * @property {UI.Image} icon
 * @android
 * @ios
 * @since 1.1.10
 */
FloatingMenu.Item.prototype.icon;
        
/**
 * Gets/sets color of the item button.
 *
 * @property {UI.Color} color
 * @android
 * @ios
 * @since 1.1.10
 */
FloatingMenu.Item.prototype.color;

/**
 * Gets/sets the click callback function. This event will be fired when the item is touched.
 *
 * @event onClick
 * @android
 * @ios
 * @since 1.1.10
 */
FloatingMenu.Item.prototype.onClick = function() {};
        
/**
 * Gets/sets color of the title.
 *
 * @property {UI.Color} titleColor
 * @android
 * @ios
 * @since 1.1.10
 */
FloatingMenu.Item.prototype.titleColor;

module.exports = FloatingMenu;
