import { IEventEmitter } from '../../core/eventemitter';
import { INativeComponent } from '../../core/inative-component';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import Color, { AbstractColor } from '../color';
import { IFlexLayout } from '../flexlayout';
import { SliderDrawerEvents } from './sliderdrawer-events';

export enum SliderDrawerPosition {
  /**
   * @property {Number} LEFT
   *
   * Position the SliderDrawer to left.
   *
   * @static
   * @android
   * @ios
   * @readonly
   * @since 0.1
   */
  LEFT = 0,
  /**
   * @property {Number} RIGHT
   *
   * Position the SliderDrawer to right.
   *
   * @static
   * @android
   * @ios
   * @readonly
   * @since 0.1
   */
  RIGHT = 1
}
/**
 * @enum {Number} UI.SliderDrawer.State
 * @static
 * @readonly
 * @since 1.1.8
 *
 * Define the state of SliderDrawer.
 *
 */
export enum SliderDrawerState {
  /**
   * @property {Number} OPEN
   *
   * Indicates the slider drawer is open.
   *
   * @static
   * @android
   * @ios
   * @readonly
   * @since 1.1.8
   */
  OPEN = 0,
  /**
   * @property {Number} CLOSED
   *
   * Indicates the slider drawer is closed.
   *
   * @static
   * @android
   * @ios
   * @readonly
   * @since 1.1.8
   */
  CLOSED = 1,
  /**
   * @property {Number} DRAGGED
   *
   * Indicates the slider drawer is dragged.
   *
   * @static
   * @android
   * @ios
   * @readonly
   * @since 1.1.8
   */
  DRAGGED = 2
}

export declare interface ISliderDrawer<TEvent extends string = SliderDrawerEvents> extends IEventEmitter<TEvent | SliderDrawerEvents>, INativeComponent {
  /**
   * Gets/sets position of the SliderDrawer.
   *
   * @property {UI.SliderDrawer.Position} [drawerPosition = UI.SliderDrawer.Position.LEFT]
   * @android
   * @ios
   * @since 0.1
   */
  drawerPosition: SliderDrawerPosition;
  /**
   * Gets state of the SliderDrawer.
   *
   * @property {UI.SliderDrawer.State} state
   * @android
   * @ios
   * @readonly
   * @since 1.1.8
   */
  readonly state: SliderDrawerState;
  /**
   * Gets/sets layout of the SliderDrawer.
   *
   * @property {UI.FlexLayout} [layout = UI.FlexLayout]
   * @android
   * @ios
   * @readonly
   * @since 0.1
   */
  readonly layout: IFlexLayout;
  /**
   * Enables/disables the SliderDrawer.
   *
   * @property {Boolean} [enabled = true]
   * @android
   * @ios
   * @since 0.1
   */
  enabled: boolean;
  /**
   * This function allows you to show SliderDrawer on the screen.
   *
   * @method show
   * @android
   * @ios
   * @since 0.1
   */
  show(): void;
  /**
   * This function allows you to hide SliderDrawer if it is on the screen.
   *
   * @method hide
   * @android
   * @ios
   * @since 0.1
   */
  hide(): void;
  /**
   * This event is called user opens the SliderDrawer.
   *
   * @event onShow
   * @deprecated
   * @android
   * @ios
   * @since 0.1
   * @example
   * ````
   * import SliderDrawer from '@smartface/native/ui/sliderdrawer';
   *
   * const sliderDrawer = new SliderDrawer();
   * sliderDrawer.on(SliderDrawer.Events.Show, () => {
   * 	console.info('onShow');
   * });
   * ````
   */
  onShow: () => void | null;
  /**
   * This event is called when user closes the SliderDrawer.
   *
   * @event onHide
   * @deprecated
   * @android
   * @ios
   * @since 0.1
   * @example
   * ````
   * import SliderDrawer from '@smartface/native/ui/sliderdrawer';
   *
   * const sliderDrawer = new SliderDrawer();
   * sliderDrawer.on(SliderDrawer.Events.Hide, () => {
   * 	console.info('onHide');
   * });
   * ````
   */
  onHide: () => void | null;
  /**
   * This event is called when SliderDrawer begins to load.
   *
   * @event onLoad
   * @deprecated
   * @android
   * @ios
   * @since 0.1
   * @example
   * ````
   * import SliderDrawer from '@smartface/native/ui/sliderdrawer';
   *
   * const sliderDrawer = new SliderDrawer();
   * sliderDrawer.on(SliderDrawer.Events.Load, () => {
   * 	console.info('onLoad');
   * });
   * ````
   */
  onLoad: () => void | null;
  height: number;
  width: number;
  backgroundColor: Color;
}

export declare class AbstractSliderDrawer<TEvent extends string = SliderDrawerEvents>
  extends NativeEventEmitterComponent<TEvent | SliderDrawerEvents>
  implements ISliderDrawer<TEvent | SliderDrawerEvents>
{
  constructor(params?: Partial<ISliderDrawer>);
  backgroundColor: AbstractColor;
  readonly state: SliderDrawerState;
  width: number;
  height: number;
  drawerPosition: SliderDrawerPosition;
  readonly layout: IFlexLayout;
  enabled: boolean;
  show(): void;
  hide(): void;
  onShow: () => void;
  onHide: () => void;
  onLoad: () => void;
  static State: typeof SliderDrawerState;
  static Position: typeof SliderDrawerPosition;
}

const SliderDrawer: typeof AbstractSliderDrawer = require(`./sliderdrawer.${Device.deviceOS.toLowerCase()}`).default;
type SliderDrawer = AbstractSliderDrawer;
export default SliderDrawer;
