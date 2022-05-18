import Color from '../../../ui/color';

export enum NavigationBarStyle {
  DARKCONTENT,
  LIGHTCONTENT
}

/**
 * @class Application.Android.NavigationBar
 *
 * This class represents Android navigation bar (includes soft keys) object. Creating instance of
 * NavigationBar is not valid since you can't use in anywhere.
 *
 * @since 4.0.0
 */
export declare class NavigationBarBase {
  color: Color;
  /**
   * Style is an enum. It defines navigation bar appearance style.
   * Gets/sets transparency of status bar.This property works only for Android version
   * OREO 8.1.0 (API 27) or above.
   *
   * @defaultValue NavigationBarStyle.DARKCONTENT
   * @android
   * @since 4.0.0
   */
  style: NavigationBarStyle;
}
