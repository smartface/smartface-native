/**
 * @enum {Number} UI.StatusBarStyle
 * @since 0.1
 *
 * StatusBarStyle is an enum. It defines status bar appearance style.
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     const Application = require('sf-core/application');
 *     const StatusBarStyle = require('sf-core/ui/statusbarstyle');
 *     var myPage = new Page();
 *     Application.statusBar.style = StatusBarStyle.LIGHTCONTENT;
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
StatusBarStyle.DEFAULT = 0;

/**
 * @property {Number} LIGHTCONTENT
 * Status bar light theme.
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
StatusBarStyle.LIGHTCONTENT = 1;

module.exports = Object.freeze(StatusBarStyle);
