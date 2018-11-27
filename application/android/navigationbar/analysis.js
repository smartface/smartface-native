/**
 * @class Application.Android.NavigationBar
 *
 * This class represents Android navigation bar (includes soft keys) object. Creating instance of
 * NavigationBar is not valid since you can't use in anywhere.
 * 
 * @since 4.0.1
 */
function NavigationBar() {}

/**
 * Gets/sets color of the navigation bar. This property works only for Android version 
 * LOLLIPOP (API 21) or above.
 *
 * @property {UI.Color} color
 * @android
 * @since 4.0.1
 */
NavigationBar.prototype.color;

/**
 * Gets/sets transparency of status bar.This property works only for Android version 
 * OREO (API 26) or above.
 *
 * @property {Application.Android.NavigationBar.Style} [style = Application.Android.NavigationBar.Style.DARKCONTENT]
 * @android
 * @since 4.0.1
 */
NavigationBar.prototype.style;

module.exports = NavigationBar;