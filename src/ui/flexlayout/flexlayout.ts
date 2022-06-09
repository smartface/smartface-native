import { FlexLayoutEvents } from './flexlayout-events';
import { AbstractViewGroup, IViewGroup, ViewGroupAndroidProps } from '../viewgroup/viewgroup';
import { MobileOSProps } from '../../core/native-mobile-component';
import Flex from '../shared/Flex';
import { ViewIOSProps } from '../view/view';
import { IColor } from '../color/color';

export interface FlexLayoutIOSProps extends ViewIOSProps {}
export interface FlexLayoutAndroidProps extends ViewGroupAndroidProps {
  /**
   * Gets/sets foreground of the view for ripple effect. This property should be set before rippleColor.
   * This property only supported for api level 23 and above.
   *
   * @property {Boolean} [useForeground = false]
   * @android
   * @member UI.View
   * @since 4.0.2
   */
  useForeground: boolean;
  /**
   * Gets/sets ripple effect enabled for view. You should set {@link UI.View#rippleColor rippleColor}
   * to see the effect.
   *
   * @property {Boolean} [rippleEnabled = false]
   * @android
   * @member UI.View
   * @since 3.2.1
   */
  rippleEnabled: boolean;
  /**
   * Gets/sets ripple effect color for view.
   *
   * @property {UI.Color} rippleColor
   * @android
   * @member UI.View
   * @since 3.2.1
   */
  rippleColor: IColor;
  /**
   * Allows you to watch events as they are dispatched to your children,
   * and take ownership of the current gesture at any point.
   *
   * @event onInterceptTouchEvent
   * @deprecated
   * @return {Boolean} Return true to steal motion events from the children
   * @android
   * @member UI.FlexLayout
   * @since 0.1
   * @example
   * ```
   * import FlexLayout from '@smartface/native/ui/flexlayout';
   *
   * const flexLayout = new FlexLayout();
   * flex.on(Flex.Events.InterceptTouchEvent, () => {
   * 	console.info('onInterceptTouchEvent');
   * });
   * ```
   */
  onInterceptTouchEvent: () => boolean;

  /**
   * Gets/Sets the elevation of the view. For the views that has
   * StateListAnimator natively like Button, will lost its own
   * StateListAnimation when elevation value changed.
   * For details : https://developer.android.com/training/material/shadows-clipping.html
   *
   * @property {Number} elevation
   * @android
   * @member UI.FlexLayout
   * @see https://developer.android.com/training/material/shadows-clipping.html
   * @see https://developer.android.com/reference/android/view/View.html#setStateListAnimator(android.animation.StateListAnimator)
   * @since 1.1.12
   */
  elevation: number;
  /**
   * Gets/sets the depth location of the view relative to its elevation. To put view over button,
   * you have to change zIndex value after Android Lollipop. On android, default elevation value of button is bigger than other view.
   * This property affects after Android Lollipop. No-op before api level 21.
   *
   * @property {Number} zIndex
   * @android
   * @member UI.FlexLayout
   * @since 2.0.8
   */
  zIndex: number;
}

/**
 * @class UI.FlexLayout
 * @since 0.1
 * @extends UI.ViewGroup
 *
 * FlexLayout is a viewgroup which has same behaviour of Flexbox on CSS.
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes
 * Its purpose is to provide a easy way to scale, align and distribute space among items in a container,
 * even when their size is unknown and/or dynamic. FlexLayout has the ability to alter its item's width/height to
 * fill the available space.
 *
 *     @example
 *     import FlexLayout from '@smartface/native/ui/flexlayout';
 *     var myFlexLayout = new FlexLayout({
 *         flexGrow:1
 *     });
 *
 *     import Label from '@smartface/native/ui/label';
 *     import Color from '@smartface/native/ui/color';
 *     var myLabel1 = new Label({
 *         width: 100,
 *         height: 50,
 *         text: "First label",
 *         backgroundColor: Color.RED
 *     });
 *     myFlex.addChild(myLabel1);
 *     var myLabel2 = new Label({
 *         width: 100,
 *         height: 50,
 *         text: "Second label",
 *         backgroundColor: Color.CYAN
 *     });
 *     myFlex.addChild(myLabel2);
 *
 *     page.layout.addChild(myFlexLayout);
 *
 */
export interface IFlexLayout<
  TEvent extends string = FlexLayoutEvents,
  TMobileProps extends MobileOSProps<FlexLayoutIOSProps, FlexLayoutAndroidProps> = MobileOSProps<FlexLayoutIOSProps, FlexLayoutAndroidProps>
> extends IViewGroup<TEvent | FlexLayoutEvents, any, TMobileProps> {
  /**
   * This property specifies where items will start to be positioned.
   * If you set RTL(right to left) objects will be positioned by starting from right edge of the Flex.
   * If you set LTR(left to right) objects will be positioned by starting from left edge of the Flex.
   *
   *     @example
   *     import FlexLayout from '@smartface/native/ui/flexlayout';
   *     var myFlexLayout = new FlexLayout({
   *         flexGrow : 1
   *         direction: Flex.Direction.RTL
   *     });
   *
   * @property {UI.Flex.Direction} [direction = UI.Flex.Direction.INHERIT]
   * @since 0.1
   */
  direction: Flex.Direction;
  /**
   * This property specifies how children will be placed(horizontally or vertical) in Flex.
   * It defines the main axis.
   * It works like flex-direction on CSS.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
   *
   *
   * @property {UI.Flex.FlexDirection} [flexDirection = UI.Flex.FlexDirection.ROW]
   * @android
   * @ios
   * @since 0.1
   */
  flexDirection: Flex.FlexDirection;
  /**
   * This property specifies the distribution of children along the main-axis.
   * It works like justify-content on CSS.
   * See:  https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content
   *
   * @property {UI.Flex.JustifyContent} [justifyContent = UI.Flex.JustifyContent.FLEX_START]
   * @since 0.1
   */
  justifyContent: Flex.JustifyContent;
  /**
   * This property aligns FlexLayout rows when there is space available in the cross-axis,
   * similar to how justify-content aligns individual child within the main-axis.
   * This property has no effect when there is only one row of children.
   *
   *
   * @property {UI.Flex.AlignContent} [alignContent = UI.Flex.AlignContent.STRETCH]
   * @android
   * @ios
   * @since 0.1
   */
  alignContent: Flex.AlignContent;
  /**
   * This property aligns children along the cross-axis of their container.
   * If UI.Flex.FlexDirection is row, this property controls the alignment in vertical direction.
   * It works like align-items on CSS.
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/align-items
   *
   * @property {UI.Flex.AlignItems} [alignItems = UI.Flex.AlignItems.STRETCH]
   * @android
   * @ios
   * @since 0.1
   */
  alignItems: Flex.AlignItems;
  /**
   * This property specifies whether children of FlexLayout are forced into a single row
   * or can be wrapped onto other rows
   * It works like flex-wrap on CSS.
   * See:  https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap
   *
   *
   * @property {UI.Flex.FlexWrap} [flexWrap = UI.Flex.FlexWrap.NO_WRAP]
   * @android
   * @ios
   * @since 0.1
   */
  flexWrap: Flex.FlexWrap | null;
  /**
   * This functions recalculates the positioning parameters.
   * It is useful to call this method when you want to change layout parameters on runtime.
   * If you change view's position, you should call applyLayout from the Page.layout. You shouldn't call applyLayout from its parent or itself
   *
   * @method applyLayout
   * @android
   * @ios
   */
  applyLayout(): void;
}

export declare class FlexLayoutBase<TEvent extends string = FlexLayoutEvents, TNative = any> extends AbstractViewGroup<TEvent | FlexLayoutEvents, TNative, IFlexLayout> implements IFlexLayout {
  direction: Flex.Direction;
  flexDirection: Flex.FlexDirection;
  justifyContent: Flex.JustifyContent;
  alignContent: Flex.AlignContent;
  alignItems: Flex.AlignItems;
  flexWrap: Flex.FlexWrap | null;
  static Direction: typeof Flex.Direction;
  static FlexDirection: typeof Flex.FlexDirection;
  static JustifyContent: typeof Flex.JustifyContent;
  static AlignContent: typeof Flex.AlignContent;
  static FlexWrap: typeof Flex.FlexWrap;
  static AlignItems: typeof Flex.AlignItems;
  static AlignSelf: typeof Flex.AlignSelf;
  static PositionType: typeof Flex.PositionType;
}
