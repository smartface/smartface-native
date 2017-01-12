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