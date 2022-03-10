import Color from '../color';
import FlexLayout from '../flexlayout';
import { AbstractView, IView } from '../view';
import { ViewEvents } from '../view/view-event';

export enum ShimmeringDirection {
  /**
   * Highlight sweeps from  bottom to top.
   *
   * @property UP
   * @static
   * @android
   * @ios
   * @readonly
   * @since 3.1.3
   */
  UP,
  /**
   * Highlight sweeps from right to left.
   *
   * @property LEFT
   * @static
   * @android
   * @ios
   * @readonly
   * @since 3.1.3
   */
  LEFT,
  /**
   * Highlight sweeps from top to bottom.
   *
   * @property DOWN
   * @static
   * @android
   * @ios
   * @readonly
   * @since 3.1.3
   */
  DOWN,
  /**
   * Highlight sweeps from left to right.
   *
   * @property RIGHT
   * @static
   * @android
   * @ios
   * @readonly
   * @since 3.1.3
   */
  RIGHT
}

export enum ShimmerHighlight {
  /**
   * The shimmer will be specified alpha.
   *
   * @property AlphaHighlight
   * @static
   * @android
   * @readonly
   * @since 3.1.3
   */
  AlphaHighlight,
  /**
   * The shimmer will be specified color.
   *
   * @property ColorHighlight
   * @static
   * @android
   * @readonly
   * @since 3.1.3
   */
  ColorHighlight
}

export interface ShimmerFlexLayoutAndroidParams {
  /**
   * Builds the shimmer based on your assigned properties by given UI.ShimmerFlexLayout.Android.Shimmer. This method must be used after all other
   * propertis of ShimmerFlexLayout is assigned.
   *
   * @method build
   * @param {UI.ShimmerFlexLayout.Android.Shimmer} shimmerType
   * @android
   * @since 3.1.3
   */
  build(shimmerType: typeof AbstractShimmerFlexLayout.Android.Shimmer): void;
  /**
   * Sets the animation duration.
   *
   * @property {Number} duration
   * @android
   * @since 3.1.3
   */
  duration: number;
  /**
   * Controls the brightness of the highlight at the center.
   *
   * @property {Number} [intensity = 0]
   * @android
   * @since 3.1.3
   */
  intensity: number;

  /**
   * Set animation repeat count.
   *
   * @property {Number} repeatCount
   * @android
   * @since 3.1.3
   */
  repeatCount: number;
  /**
   * Angle at which the highlight is tilted, measured in degrees.
   *
   * @property {Number} [tilt = 20]
   * @android
   * @since 3.1.3
   */
  tilt: number;
  /**
   * Set the shimmer's highlight color. This property must be used if given shimmer type is UI.ShimmerFlexLayout.Android.Shimmer.ColorHighlight
   *
   * @property {UI.Color} highlightColor
   * @android
   * @since 3.1.3
   */
  highlightColor: Color;
  /**
   * Set base  color of content. This property must be used if given shimmer type is UI.ShimmerFlexLayout.Android.Shimmer.ColorHighlight
   *
   * @property {UI.Color} baseColor
   * @android
   * @since 3.1.3
   */
  baseColor: Color;
  /**
   * Set the alpha of the shimmer highlight.
   *
   * @property {UI.Color} highlightAlpha
   * @android
   * @since 3.1.3
   */
  highlightAlpha: Color;
}

export interface ShimmerFlexLayoutIOSParams {
  /**
   * The highlight length of shimmering. Range of [0,1], defaults to 1.0.
   *
   * @property {Number} [highlightLength = 1.0]
   * @ios
   * @since 3.1.3
   */
  highlightLength: number;
  /**
   * The alpha of the content while it is shimmering. Defaults to 0.5.
   *
   * @property {Number} [animationAlpha = 0.5]
   * @ios
   * @since 3.1.3
   */
  animationAlpha: number;
  /**
   * The speed of shimmering, in points per second. Defaults to 230.
   *
   * @property {Number} [speed = 230]
   * @ios
   * @since 3.1.3
   */
  speed: number;
  /**
   * The duration of the fade used when shimmer begins. Defaults to 100.
   *
   * @property {Number} [beginFadeDuration = 100]
   * @ios
   * @since 3.1.3
   */
  beginFadeDuration: number;
  /**
   * The duration of the fade used when shimmer ends. Defaults to 300.
   *
   * @property {Number} [endFadeDuration = 300]
   * @ios
   * @since 3.1.3
   */
  endFadeDuration: number;
}

export declare interface IShimmerFlexLayout<TEvent extends string = ViewEvents, TIOS = ShimmerFlexLayoutIOSParams, TAND = ShimmerFlexLayoutAndroidParams>
  extends IView<TEvent, TIOS & Partial<ShimmerFlexLayoutIOSParams>, TAND & Partial<ShimmerFlexLayoutAndroidParams>> {
  /**
   * Starts the shimmer animation
   *
   * @method  startShimmer
   * @android
   * @ios
   * @since 3.1.3
   */
  startShimmering(): void;
  /**
   * Stops the shimmer animation
   *
   * @method  stopShimmer
   * @android
   * @ios
   * @since 3.1.3
   */
  stopShimmering(): void;
  /**
   * Assign the content flexlayout for shimmering.
   *
   * @property {UI.FlexLayout} contentLayout
   * @ios
   * @android
   * @since 3.1.3
   */
  contentLayout: FlexLayout;

  /**
   * Gives information about whether the shimmer animation started or not.
   *
   * @property {Boolean} isShimmering
   * @readonly
   * @ios
   * @android
   * @since 3.1.3
   */
  get isShimmering(): boolean;
  /**
   * Set alpha for unhighlighted view over which the highlight is drawn.
   *
   * @property {Number} [baseAlpha = 1]
   * @android
   * @ios
   * @since 3.1.3
   */
  baseAlpha: number;

  /**
   * Set animation repeat delay.
   *
   * @property {Number} [pauseDuration = 400]
   * @android
   * @ios
   * @since 3.1.3
   */
  pauseDuration: number;
  shimmeringDirection: ShimmeringDirection;
}

/**
 * @class UI.ShimmerFlexLayout
 * @extends UI.View
 * @since 3.1.3
 *
 * This class provides an easy way to add a shimmer effect to  any view. It is useful as an unobtrusive loading indicator.
 *
 *
 *     @example
 *     import FlexLayout from '@smartface/native/ui/flexlayout';
 *     import Color from '@smartface/native/ui/color';
 *
 *     const flex = new FlexLayout();
 *     flex.flexGrow = 1;
 *     flex.flexDirection = FlexLayout.FlexDirection.ROW;
 *     var flexImage = new FlexLayout();
 *     flexImage.flexGrow = 0.5;
 *     flexImage.margin = 20;
 *     flexImage.marginRight = 10;
 *     flexImage.borderRadius = 10;
 *     flexImage.backgroundColor = Color.LIGHTGRAY;
 *
 *     flex.addChild(flexImage);
 *
 *     const flexLabels = new FlexLayout();
 *     flexLabels.flexGrow = 1;
 *
 *     const labelTop = new FlexLayout();
 *     labelTop.height = 20;
 *     labelTop.margin = 20;
 *     labelTop.marginBottom = 10;
 *     labelTop.borderRadius = 10;
 *     labelTop.backgroundColor = Color.LIGHTGRAY;
 *     flexLabels.addChild(labelTop);
 *
 *     const labelCenter = new FlexLayout();
 *     labelCenter.height = 20;
 *     labelCenter.margin = 20;
 *     labelCenter.marginTop = 0;
 *     labelCenter.borderRadius = 10;
 *     labelCenter.marginRight = 100;
 *     labelCenter.backgroundColor = Color.LIGHTGRAY;
 *     flexLabels.addChild(labelCenter);
 *
 *     const labelBottom = new FlexLayout();
 *     labelBottom.positionType = FlexLayout.PositionType.ABSOLUTE;
 *     labelBottom.bottom = 20;
 *     labelBottom.left = 20;
 *     labelBottom.height = 20;
 *     labelBottom.right = 40;
 *     labelBottom.borderRadius = 10;
 *     labelBottom.backgroundColor = Color.LIGHTGRAY;
 *
 *     flexLabels.addChild(labelBottom);
 *
 *     flex.addChild(flexLabels);
 *
 *     const shimmer = new ShimmerFlexLayout();
 *     shimmer.height = 200;
 *
 *     shimmer.ios.animationAlpha = 0.2;
 *     shimmer.baseAlpha = 0.5;
 *     shimmer.pauseDuration = 500;
 *     shimmer.android.highlightAlpha = 1;
 *
 *     shimmer.android.build(ShimmerFlexLayout.Android.Shimmer.AlphaHighlight);
 *     shimmer.contentLayout = flex
 *     myPage.layout.addChild(shimmer);
 *     shimmer.startShimmering();
 *
 */
export declare class AbstractShimmerFlexLayout<TEvent extends string = ViewEvents> extends AbstractView<TEvent> implements IShimmerFlexLayout {
  constructor(params?: Partial<IShimmerFlexLayout>);
  shimmeringDirection: ShimmeringDirection;
  startShimmering(): void;
  stopShimmering(): void;
  contentLayout: FlexLayout;
  get isShimmering(): boolean;
  baseAlpha: number;
  pauseDuration: number;

  static Android: {
    Shimmer: typeof ShimmerHighlight;
  };
  static ShimmeringDirection: typeof ShimmeringDirection;
}

const ShimmerFlexLayout: typeof AbstractShimmerFlexLayout = require(`./shimmerflexlayout.${Device.deviceOS.toLowerCase()}`).default;
type ShimmerFlexLayout = IShimmerFlexLayout;
export default ShimmerFlexLayout;
