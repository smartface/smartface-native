/**
 * @enum Application.Android.NavigationBar.Style
 * @since 4.0.0
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
 * Navigation bar default dark theme.
 * @android
 * @static
 * @readonly
 * @since 4.0.0
 */
NavigationBarStyle.DARKCONTENT = 0;

/**
 * @property {Number} LIGHTCONTENT
 * Navigation bar light theme.
 * @android
 * @static
 * @readonly
 * @since 4.0.0
 */
NavigationBarStyle.LIGHTCONTENT = 1;