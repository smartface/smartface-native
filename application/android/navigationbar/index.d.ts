import NavigationbarStyle from "./style";
import Color from "sf-core/ui/color";
/**
 * @class Application.Android.NavigationBar
 *
 * This class represents Android navigation bar (includes soft keys) object. Creating instance of
 * NavigationBar is not valid since you can't use in anywhere.
 * 
 * @since 4.0.0
 */
declare class Navigationbar {
  color: Color;
/**
 * Gets/sets transparency of status bar.This property works only for Android version 
 * OREO 8.1.0 (API 27) or above.
 *
 * @property {Application.Android.NavigationBar.Style} [style = Application.Android.NavigationBar.Style.DARKCONTENT]
 * @android
 * @since 4.0.0
 */
  style: NavigationbarStyle
}

export =  Navigationbar;
