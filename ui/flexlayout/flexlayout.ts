import { EventEmitterMixin } from 'core/eventemitter';
import NativeComponent from 'core/native-component';
import Color from '../color';
import Flex from '../../core/flex';
import { ViewGroupEvents } from 'ui/viewgroup/events';
import IView, { Border, SemanticContentAttribute } from 'ui/view/view';
import { IViewGroup } from 'ui/viewgroup/viewgroup';
import { Point2D } from 'primitive/point2d';

declare enum FlexLayoutEvents {
  /**
   * Allows you to watch events as they are dispatched to your children,
   * and take ownership of the current gesture at any point.
   *
   * @return {Boolean} Return true to steal motion events from the children
   * @android
   * @member UI.FlexLayout
   * @since 4.3.5
   */
  InterceptTouchEvent = 'interceptTouchEvent'
}

export type AndroidProps = {
  useForeground: boolean;
  rippleEnabled: boolean;
  rippleColor: Color;
  onInterceptTouchEvent: () => boolean;
  elevation: number;
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
 *     const FlexLayout = require('@smartface/native/ui/flexlayout');
 *     var myFlexLayout = new FlexLayout({
 *         flexGrow:1
 *     });
 *
 *     const Label = require('@smartface/native/ui/label');
 *     const Color = require('@smartface/native/ui/color');
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
export interface IFlexLayout extends IViewGroup<FlexLayoutEvents, {}, AndroidProps> {
  /**
   * This property specifies where items will start to be positioned.
   * If you set RTL(right to left) objects will be positioned by starting from right edge of the Flex.
   * If you set LTR(left to right) objects will be positioned by starting from left edge of the Flex.
   *
   *     @example
   *     const FlexLayout = require('@smartface/native/ui/flexlayout');
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
  flexWrap: Flex.FlexWrap;
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
  android: {
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
    rippleColor: Color;
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
     * ````
     * import FlexLayout from '@smartface/native/ui/flexlayout';
     *
     * const flexLayout = new FlexLayout();
     * flex.on(Flex.Events.InterceptTouchEvent, () => {
     * 	console.info('onInterceptTouchEvent');
     * });
     * ````
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
  };
}

const NativeEventEmitter = EventEmitterMixin(NativeComponent);

export declare class FlexLayoutBase<TEvent extends { [key: string]: any } = { [key: string]: any }> extends NativeEventEmitter<TEvent & FlexLayoutEvents> implements IFlexLayout {
  constructor(params?: Partial<IFlexLayout>);
  transitionId: string;
  accessible: boolean;
  accessibilityLabel: string;
  alpha: number;
  backgroundColor: Color;
  borderColor: Color;
  borderWidth: number;
  borderRadius: number;
  id: string;
  testId: string;
  visible: boolean;
  rotation: number;
  rotationX: number;
  rotationY: number;
  touchEnabled: boolean;
  left: number;
  top: number;
  right: number;
  bottom: number;
  height: number;
  width: number;
  minWidth: number;
  minHeight: number;
  maxWidth: number;
  maxHeight: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  padding: number;
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  margin: number;
  positionType: Flex.PositionType;
  flexGrow: number;
  aspectRatio: number;
  flexShrink: number;
  flexBasis: number;
  scale: Point2D;
  alignSelf: Flex.AlignSelf;
  bringToFront(): void;
  flipHorizontally(): void;
  flipVertically(): void;
  getScreenLocation(): Point2D;
  getParent(): IView<'touch' | 'touchCancelled' | 'touchEnded' | 'touchMoved', { [key: string]: any; }, { [key: string]: any; }>;
  onTouch: (e: Point2D) => boolean | void;
  onTouchEnded: (isInside: boolean, point: Point2D) => boolean | void;
  onTouchCancelled: (point: Point2D) => boolean | void;
  onTouchMoved: (e: boolean | { isInside: boolean; }, point?: Point2D) => boolean | void;
  dirty(): void;
  ios: Partial<{ exclusiveTouch: boolean; clipsToBounds: number; shadowOffset: Point2D; shadowRadius: number; shadowOpacity: number; shadowColor: Color; viewAppearanceSemanticContentAttribute: SemanticContentAttribute; performWithoutAnimation: (functionWithoutAnimation: Function) => void; }>;
  masksToBounds: boolean;
  maskedBorders: Border[];
  getPosition: () => { left: number; top: number; width: number; height: number; };
  nativeObject: any;
  direction: Flex.Direction;
  flexDirection: Flex.FlexDirection;
  justifyContent: Flex.JustifyContent;
  alignContent: Flex.AlignContent;
  alignItems: Flex.AlignItems;
  flexWrap: Flex.FlexWrap;
  applyLayout(): void;
  android: AndroidProps;
  addChild(view: IView<any>): void;
  removeChild(view: IView<any>): void;
  removeAll(): void;
  getChildCount(): number;
  getChildList(): IView<any>[];
  requestDisallowInterceptTouchEvent(disallow: boolean): void;
  findChildById(id: string): void;
  onViewAdded: (view: IView<any>) => void;
  onViewRemoved: (view: IView<any>) => void;
  static Direction: typeof Flex.Direction;
  static AlignItems: typeof Flex.AlignItems;
  static AlignSelf: typeof Flex.AlignSelf;
  static FlexDirection: typeof Flex.FlexDirection;
  static FlexWrap: typeof Flex.FlexWrap;
  static JustifyContent: typeof Flex.JustifyContent;
  static PositionType: typeof Flex.PositionType;
  static Events: typeof ViewGroupEvents & FlexLayoutEvents;
  // const Events: typeof FlexLayoutEvents & typeof ViewGroup.Events;
  // type Events = typeof Events;
}
export default IFlexLayout;
