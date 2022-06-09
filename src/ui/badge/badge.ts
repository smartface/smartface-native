import { IColor } from '../color/color';
import Font from '../font';
import { INativeComponent } from '../../core/inative-component';
import ViewState from '../shared/viewState';

export declare interface IBadge extends INativeComponent {
  /**
   * Gets/sets text of badge.
   *
   * @property {String} text
   * @android
   * @ios
   * @since 3.1.0
   */
  text: string;
  /**
   * Gets/sets visible of badge.
   *
   * @property {Boolean} visible
   * @android
   * @ios
   * @since 3.1.0
   */
  visible: boolean;
  /**
   * Gets/sets backgroundColor of badge.
   *
   * @property {UI.Color} backgroundColor
   * @android
   * @ios
   * @since 3.1.0
   */
  backgroundColor: IColor | null;
  /**
   * Gets/sets textColor of badge.
   *
   * @property {UI.Color} textColor
   * @android
   * @ios
   * @since 3.1.0
   */
  textColor: ViewState<IColor> | null;
  /**
   * Gets/sets font of badge.
   *
   * @property {UI.Font} font
   * @android
   * @ios
   * @since 3.1.0
   */
  font: Font | null;
  /**
   * Gets/sets border color of badge.
   *
   * @property {UI.Color} borderColor
   * @android
   * @ios
   * @since 3.1.0
   */
  borderColor: IColor | null;
  /**
   * Gets/sets border width of badge.
   *
   * @property {Number} borderWidth
   * @android
   * @ios
   * @since 3.1.0
   */
  borderWidth: number;
  /**
   * Set Badge offset, Badge center point defaults to the top right corner of its parent. When using badge in tab bar items, this method must be implement
   * at the initialize time.
   *
   * @method move
   * @param {Number} x
   * @param {Number} y
   * @android
   * @ios
   * @since 3.0.0
   */
  move(x: number, y: number): void;
}
