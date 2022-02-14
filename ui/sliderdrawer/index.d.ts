import ViewGroup from '../viewgroup';
import FlexLayout from '../flexlayout';
import { IFlexLayout } from '../../primitive/iflexlayout';

declare enum SliderDrawerEvents {
  /**
   * This event is called when user closes the SliderDrawer.
   *
   * @event onHide
   * @android
   * @ios
   * @since 0.1
   */
  Hide = 'hide',
  /**
   * This event is called when SliderDrawer begins to load.
   *
   * @event onLoad
   * @android
   * @ios
   * @since 0.1
   */
  Load = 'load',
  /**
   * This event is called user opens the SliderDrawer.
   *
   * @event onShow
   * @android
   * @ios
   * @since 0.1
   */
  Show = 'show'
}

/**
 * @class UI.SliderDrawer
 * @since 0.1
 * @extends UI.ViewGroup
 *
 * SliderDrawer is an object that displays a custom UI as a panel on the left or right edge of the screen.
 * It is hidden most of the time, when user swipes a finger from the left or right edge of the screen it will appear.
 *
 *
 *     @example
 *     const SliderDrawer = require('@smartface/native/ui/sliderdrawer');
 *     const FlexLayout = require('@smartface/native/ui/flexlayout');
 *     const Button = require('@smartface/native/ui/button');
 *     const Application = require('@smartface/native/application');
 *
 *     var mySliderDrawer = new SliderDrawer({
 *         width: 200
 *     });
 *     var myButton = new Button({
 *         height: 40,
 *         width: 100,
 *         left: 50,
 *         top: 50,
 *         text: "Smartface Button",
 *         positionType: FlexLayout.PositionType.ABSOLUTE
 *     });
 *     mySliderDrawer.drawerPosition = SliderDrawer.Position.LEFT;
 *     mySliderDrawer.layout.addChild(myButton);
 *     Application.sliderDrawer = mySliderDrawer;
 *
 */
declare class SliderDrawer extends ViewGroup<SliderDrawerEvents> implements IFlexLayout {
  /**
   * Gets/sets position of the SliderDrawer.
   *
   * @property {UI.SliderDrawer.Position} [drawerPosition = UI.SliderDrawer.Position.LEFT]
   * @android
   * @ios
   * @since 0.1
   */
  drawerPosition: SliderDrawer.Position;
  /**
   * Gets state of the SliderDrawer.
   *
   * @property {UI.SliderDrawer.State} state
   * @android
   * @ios
   * @readonly
   * @since 1.1.8
   */
  state: SliderDrawer.State;
  /**
   * Gets/sets layout of the SliderDrawer.
   *
   * @property {UI.FlexLayout} [layout = UI.FlexLayout]
   * @android
   * @ios
   * @readonly
   * @since 0.1
   */
  layout: FlexLayout;
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
}

declare namespace SliderDrawer {
  const Events: typeof SliderDrawerEvents & typeof ViewGroup.Events;
  type Events = typeof Events;
  /**
   * @enum {Number} UI.SliderDrawer.Position
   * @static
   * @readonly
   * @since 0.1
   *
   * Define the position of SliderDrawer left or right.
   *
   */
  enum Position {
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
  enum State {
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
}

export = SliderDrawer;
