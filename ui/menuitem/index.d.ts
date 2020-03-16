import Color = require("../color");
/**
 * @class UI.MenuItem
 * @since 0.1
 *
 * MenuItem is used to add row and action to the UI.Menu 
 *
 */
declare class MenuItem {

/**
 * Gets/sets the title of a menu item.
 *
 * @property {String} title
 * @android
 * @ios
 * @since 0.1
 */
	title: string;
	android: {
/**
 * Gets/sets the color of a menu item title.
 *
 * @property {UI.Color} titleColor
 * @android
 * @since 1.1.8
 */
		titleColor?: Color;
	};
	ios: {
/**
 * Gets/sets the style of a menu item.
 *
 * @property {UI.MenuItem.ios.Style} style
 * @ios
 * @since 1.1.8
 */
		style?: MenuItem.ios.Style;
    };
/**
 * This event is called when user selects a menu item.
 *
 * @since 0.1
 * @event onSelected
 * @android
 * @ios
 */
	onSelected: () => void;
}

declare namespace MenuItem {
	namespace ios {
/**
 * @enum {Number} UI.MenuItem.ios.Style
 * @since 0.1
 * 
 * MenuItem's style is used to specify behaviour and appearance of the item. This enumeration
 * describes available styles for iOS.
 */
		enum Style {
/**
 * @property {Number} DEFAULT
 * @ios
 * Apply the default style to the menu items's.
 * @static
 * @readonly
 * @ios
 * @since 1.1.8
 */
            DEFAULT = 0,
/**
 * @property {Number} CANCEL
 * @ios
 * Apply a style that indicates the menu item cancels the operation and leaves things unchanged.
 * @static
 * @readonly
 * @ios
 * @since 1.1.8
 */
            CANCEL = 1,
/**
 * @property {Number} DESTRUCTIVE
 * @ios
 * Apply a style that indicates the menu item might change or delete data.
 * @static
 * @readonly
 * @ios
 * @since 1.1.8
 */
			DESTRUCTIVE = 2
		}
	}
}
export = MenuItem;
