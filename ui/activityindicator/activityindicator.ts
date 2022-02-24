import Color from '../color';
import { AbstractView } from '../view';
import { ViewEvents } from '../view/view-event';

enum ActivityIndicatorViewStyle {
  /**
   * @property {Number} LARGE
   * @ios
   * @static
   * @readonly
   * @since 3.2.1
   */
  LARGE = 0,
  /**
   * @property {Number} NORMAL
   * @ios
   * @static
   * @readonly
   * @since 3.2.1
   */
  NORMAL = 1
}
export class AbstractActivityIndicator<TEvent extends string = ViewEvents> extends AbstractView<TEvent> {
  /**
   * Gets/sets color of the activity indicator.
   *
   * @android
   * @ios
   * @since 0.1
   */
  color: Color;
  static iOS = {
    ...AbstractView.iOS,
    /**
     * Gets/sets style of the activity indicator.
     *
     * @ios
     * @since 3.2.1
     */
    ActivityIndicatorViewStyle: ActivityIndicatorViewStyle
  };
}