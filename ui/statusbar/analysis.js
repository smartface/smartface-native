/** @enum {Number} UI.StatusBar.StatusBarStyle
 * @since 0.1
 * StatusBarStyle is an enum. It defines status bar font style for iOS.
 *
 *     @example
 *     const StatusBar = require('sf-core/ui/statusbar').StatusBar;
 *     const StatusBarStyle = require('sf-core/ui/statusbar').StatusBarStyle;
 *     StatusBar.ios.style = StatusBarStyle.DEFAULT
 *
 */
var StatusBarStyle = { };

/**
 * @property {Number} DEFAULT
 * Status bar dark theme.
 * @static
 * @readonly
 * @since 0.1
 */
StatusBarStyle.DEFAULT = 0;

/**
 * @property {Number} LIGHTCONTENT
 * Status bar light theme.
 * @static
 * @readonly
 * @since 0.1
 */
StatusBarStyle.LIGHTCONTENT = 1;


/**
 * @class UI.StatusBar
 * @since 0.1
 *
 * StatusBar class represents the area on the top of the application.
 * 
 *     @example
 *     const StatusBar = require('sf-core/ui/statusbar').StatusBar;
 *     const StatusBarStyle = require('sf-core/ui/statusbar').StatusBarStyle;
 *     const Color = require('sf-core/ui/color');
 *     StatusBar.android.color = Color.RED;
 *     StatusBar.ios.style = StatusBarStyle.DEFAULT;
 *     var statusBarHeight = StatusBar.height;
 *
 */
function StatusBar(params) {};

/**
 * Gets/sets color of the status bar. This property will work only for Android
 * KitKat (API 19) or above.
 *
 *     @example
 *     const StatusBar = require('sf-core/ui/statusbar').StatusBar;
 *     const Color = require('sf-core/ui/color');
 *     StatusBar.android.color = Color.RED;
 * @property {Color} color
 * @static
 * @since 0.1
 */
StatusBar.android = {
    color : Color.create("#FF757575")
}

/**
 * Gets/sets status bar style. This property will work only for iOS
 *
 *     @example
 *     const StatusBar = require('sf-core/ui/statusbar').StatusBar;
 *     const StatusBarStyle = require('sf-core/ui/statusbar').StatusBarStyle;
 *     StatusBar.ios.style = StatusBarStyle.DEFAULT;
 *
 * @property {StatusBarStyle} style
 * @static
 * @since 0.1
 */
StatusBar.ios = {
    style : StatusBarStyle.DEFAULT
}

/**
 * Gets the height of the status bar. height is a read only property.
 *
 *     @example
 *     const StatusBar = require('sf-core/ui/statusbar').StatusBar;
 *     var statusBarHeight = StatusBar.height;
 *
 * @property {Number} height
 * @static
 * @readonly
 * @since 0.1
 */
StatusBar.height = 30; // read only

/**
 * Gets/sets visibility of the status bar.
 *
 *     @example
 *     const StatusBar = require('sf-core/ui/statusbar').StatusBar;
 *     StatusBar.visible = true;
 *
 * @property {Boolean} visible
 * @static
 * @since 0.1
 */
StatusBar.visible = true;

module.exports = {StatusBar: StatusBar, StatusBarStyle: StatusBarStyle};