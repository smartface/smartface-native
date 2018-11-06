/**
 * @enum Application.Android.NavigationBar.Style
 * @since 0.1
 *
 * Style is an enum. It defines navigation bar appearance style.
 *
 *     @example
 *     const Application = require('sf-core/application');
 *     const NavigationBarStyle = require('sf-core/application/android/navigationbar/style');
 *     Application.android.navigationBar.style = NavigationBarStyle.DARKCONTENT;
 *
 */
var NavigationBarStyle = { };

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
NavigationBarStyle.LIGHTCONTENT = 1;