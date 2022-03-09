import Color from '../color';
import { AbstractView, IView } from '../view';
import { ViewEvents } from '../view/view-event';

export enum ActivityIndicatorViewStyle {
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

export interface IActivityIndicator extends IView<undefined, any, IActivityIndicator> {
  ios: IView['ios'] & {
    /**
     * Gets/sets style of the activity indicator.
     *
     * @ios
     * @since 3.2.1
     */
    activityIndicatorViewStyle: ActivityIndicatorViewStyle;
  };
  android: IView['android'];
}
export declare class ActivityIndicatorBase<TEvent extends string = ViewEvents> extends AbstractView<TEvent> {
  /**
   * Gets/sets color of the activity indicator.
   *
   * @android
   * @ios
   * @since 0.1
   */
  color: Color;
  static iOS: {
    ActivityIndicatorViewStyle: typeof ActivityIndicatorViewStyle;
  };
}
