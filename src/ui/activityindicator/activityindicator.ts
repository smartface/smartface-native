import { MobileOSProps } from '../../core/native-mobile-component';
import { AbstractView, IView, ViewIOSProps } from '../view/view';
import { ViewEvents } from '../view/view-events';

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

export interface ActivityIndicatorIOSProps extends ViewIOSProps {
  /**
   * Gets/sets style of the activity indicator.
   *
   * @ios
   * @since 3.2.1
   */
  activityIndicatorViewStyle: ActivityIndicatorViewStyle;
}

export interface IActivityIndicator extends IView<ViewEvents, any, MobileOSProps<ActivityIndicatorIOSProps, {}>> {}
export declare class ActivityIndicatorBase<TEvent extends string = ViewEvents> extends AbstractView<TEvent, any, IActivityIndicator> {
  static iOS: {
    ActivityIndicatorViewStyle: typeof ActivityIndicatorViewStyle;
  };
}
