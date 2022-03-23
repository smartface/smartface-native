import { MobileOSProps } from '../../core/native-mobile-component';
import Color from '../color';
import View, { AbstractView, IView, ViewAndroidProps, ViewIOSProps } from '../view';
import { BlurViewEvents } from './blurview-events';

/**
 * Blur styles
 * @enum {Number} UI.BlurView.iOS.EffectStyle
 * @since 4.3.1
 * @ios
 */
export enum BlurViewEffectStyle {
  EXTRALIGHT,
  LIGHT,
  DARK,
  REGULAR,
  PROMINENT,
  SYSTEMULTRATHINMATERIAL,
  SYSTEMTHINMATERIAL,
  SYSTEMMATERIAL,
  SYSTEMTHICKMATERIAL,
  SYSTEMCHROMEMATERIAL,
  SYSTEMULTRATHINMATERIALLIGHT,
  SYSTEMTHINMATERIALLIGHT,
  SYSTEMMATERIALLIGHT,
  SYSTEMTHICKMATERIALLIGHT,
  SYSTEMCHROMEMATERIALLIGHT,
  SYSTEMULTRATHINMATERIALDARK,
  SYSTEMTHINMATERIALDARK,
  SYSTEMMATERIALDARK,
  SYSTEMTHICKMATERIALDARK,
  SYSTEMCHROMEMATERIALDARK
}

export enum BlurViewSemanticContentAttribute {
  /**
   * Layout direction will be the same as the device direction. You can use {@link Application#userInterfaceLayoutDirection userInterfaceLayoutDirection} property to check device direction.
   *
   * @property {Number} AUTO
   * @static
   * @ios
   * @readonly
   * @since 3.1.3
   */
  AUTO = 0,
  /**
   * Layout direction is always left to right.
   *
   * @property {Number} FORCELEFTTORIGHT
   * @static
   * @ios
   * @readonly
   * @since 3.1.3
   */
  FORCELEFTTORIGHT = 3,
  /**
   * Layout direction is always right to left.
   *
   * @property {Number} FORCERIGHTTOLEFT
   * @static
   * @ios
   * @readonly
   * @since 3.1.3
   */
  FORCERIGHTTOLEFT = 4
}

export interface BlurViewiOSProps extends ViewIOSProps {
  /**
   * Gets/sets blur style.
   * @property {UI.BlurView.iOS.EffectStyle} effectStyle
   * @ios
   * @since 4.3.1
   */
  effectStyle?: BlurViewEffectStyle;
}

export interface BlurViewAndroidProps extends ViewAndroidProps {
  /**
   * Gets/sets the blur radius. The value range is between (0, 25].
   * @property {Number} [blurRadius=16]
   * @android
   * @since 4.3.1
   */
  blurRadius: number;
  /**
   * Gets/sets the root to start blur from.
   * @property {UI.FlexLayout} rootView
   * @android
   * @since 4.3.1
   */
  rootView: View;
  /**
   * Gets/sets the color overlay to be drawn on top of blurred content.
   * @property {UI.Color} overlayColor
   * @android
   * @since 4.3.1
   */
  overlayColor: Color;
}

export declare interface IBlurView<TEvent extends string = BlurViewEvents> extends IView<TEvent | BlurViewEvents, any, MobileOSProps<BlurViewiOSProps, BlurViewAndroidProps>> {}

export declare class AbstractBlurView<TEvent extends string = BlurViewEvents> extends AbstractView<TEvent, any, IBlurView> implements IBlurView<TEvent> {
  static iOS: {
    /**
     * Blur styles
     * @enum {Number} UI.BlurView.iOS.EffectStyle
     * @since 4.3.1
     * @ios
     */
    EffectStyle: typeof BlurViewEffectStyle;
    SemanticContentAttribute: typeof BlurViewSemanticContentAttribute;
  };
}

/**
 * BlurView that blurs its underlying content.
 *
 * @example
 * import BlurView '@smartface/native/ui/blurview';
 * import FlexLayout from '@smartface/native/ui/flexlayout';
 *
 * const myBlurView = new BlurView({
 *     top: 0,
 *     right: 0,
 *     left: 0,
 *     bottom: 0,
 *     positionType: FlexLayout.PositionType.ABSOLUTE
 * });
 *
 * myBlurView.android.rootView = page.layout;
 *
 * page.layout.addChild(myBlurView);
 *
 * @since 4.3.1
 */
const BlurView: typeof AbstractBlurView = require(`./blurview.${Device.deviceOS.toLowerCase()}`).default;
type BlurView = AbstractBlurView;

export default BlurView;
