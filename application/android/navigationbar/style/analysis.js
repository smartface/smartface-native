/**
 * @enum Application.Android.NavigationBar.Style
 * @since 4.0.1
 *
 * Style is an enum. It defines navigation bar appearance style.
 *
 *     @example
 *     const Application = require('sf-core/application');
 *     Application.android.navigationBar.style = Application.NavigationBar.Style.DARKCONTENT;
 *
 */
var NavigationBarStyle = {};

/**
 * @property {Number} DARKCONTENT
 * Status bar default dark theme.
 * @static
 * @readonly
 * @since 4.0.1
 */
NavigationBarStyle.DARKCONTENT = 0;

/**
 * @property {Number} LIGHTCONTENT
 * Navigation bar light theme.
 * @static
 * @readonly
 * @since 4.0.1
 */
NavigationBarStyle.LIGHTCONTENT = 1;