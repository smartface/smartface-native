/**
 * @enum {Number} UI.StatusBarStyle
 * @since 0.1
 *
 * StatusBarStyle is an enum. It defines status bar appearance style for iOS.
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     const StatusBarStyle = require('sf-core/ui/statusbarstyle');
 *     var myPage = new Page();
 *     myPage.statusBar.ios.style = StatusBarStyle.LIGHTCONTENT;
 *
 */
var StatusBarStyle = { };

/**
 * @property {Number} DEFAULT
 * Status bar default dark theme.
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(StatusBarStyle, 'DEFAULT', {
    value: 0,
    writable: false
});

/**
 * @property {Number} LIGHTCONTENT
 * Status bar light theme.
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(StatusBarStyle, 'LIGHTCONTENT', {
    value: 1,
    writable: false
});

module.exports = StatusBarStyle;
