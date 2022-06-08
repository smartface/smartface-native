import { ConstructorOf } from '../../core/constructorof';
import { IEventEmitter } from '../../core/eventemitter';
import { MobileOSProps } from '../../core/native-mobile-component';
import Color from '../color';
import Font from '../font';
import Image from '../image';
import { IImage } from '../image/image';
import { SwipeItemEvents } from './swipeitem-events';

/**
 * Swipe Direction enums used to define allowed direction of swipe.
 * @readonly
 * @ios
 * @android
 * @since 4.1.4
 */
export enum SwipeDirection {
  /**
   * Left direction, used for swipe control.
   *
   * @property {Number} LEFTTORIGHT
   * @ios
   * @android
   * @static
   * @readonly
   * @since 4.1.4
   */
  LEFTTORIGHT,
  /**
   * Right direction, used for swipe control.
   * @property {Number} RIGHTTOLEFT
   * @ios
   * @android
   * @static
   * @readonly
   * @since 4.1.4
   */
  RIGHTTOLEFT
}

export interface ISwipeItemAndroidParams {
  /**
   * Sets/gets bottom-left corner radius of a SwipeItem.
   *
   * @property {Number} [borderBottomLeftRadius = 0]
   * @android
   * @since 4.1.4
   */
  borderBottomLeftRadius: number;
  /**
   * Sets/gets bottom-right corner radius of a SwipeItem.
   *
   * @property {Number} [borderBottomRightRadius = 0]
   * @android
   * @since 4.1.4
   */
  borderBottomRightRadius: number;
  /**
   * Sets/gets top-left corner radius of a SwipeItem.
   *
   * @property {Number} [borderTopLeftRadius = 0]
   * @android
   * @since 4.1.4
   */
  borderTopLeftRadius: number;
  /**
   * Sets/gets top-right corner radius of a SwipeItem.
   *
   * @property {Number} [borderTopRightRadius = 0]
   * @android
   * @since 4.1.4
   */
  borderTopRightRadius: number;
  /**
   * Gets/Sets the padding space on the top side of a SwipeItem.
   *
   * @property {Number} [paddingTop = 0]
   * @android
   * @since 4.1.4
   */
  paddingTop: number;
  /**
   * Gets/Sets the padding space on the bottom side of a SwipeItem.
   *
   * @property {Number} [paddingBottom = 0]
   * @android
   * @since 4.1.4
   */
  paddingBottom: number;
  /**
   * Gets/Sets the padding space on the left side of a SwipeItem.
   *
   * @property {Number} [paddingLeft = 0]
   * @android
   * @since 4.1.4
   */
  paddingLeft: number;
  /**
   * Gets/Sets the padding space on the right side of a SwipeItem.
   *
   * @property {Number} [paddingRight = 0]
   * @android
   * @since 4.1.4
   */
  paddingRight: number;
  /**
   * The fraction that the user should move the View to be considered as swiped. The fraction is calculated with respect to ListView's bounds
   *
   * @property {Number} [threshold = 0.5]
   * @android
   * @since 4.1.4
   */
  threshold: number;
}
export interface ISwipeItemIOSParams {
  /**
   * @property {Number} padding
   * @ios
   * @since 4.1.4
   */
  padding: number
  /**
   * @property {Number} [iconTextSpacing = 3] Space between icon and text.
   * @ios
   * @since 4.1.4
   */;
  iconTextSpacing: number;
  /**
   * @property {Boolean} isAutoHide = true
   * @ios
   * @since 4.1.4
   */
  isAutoHide: boolean;
}

/**
 * @class UI.ListView.SwipeItem
 * @since 4.1.4
 *
 * ListView.SwipeItem contains set of properties that define appearance of SwipeItem while drawing on swipe action.
 */
export interface ISwipeItem extends IEventEmitter<SwipeItemEvents>, MobileOSProps<ISwipeItemIOSParams, ISwipeItemAndroidParams> {
  /**
   * Set/Get text of swipe item.
   *
   * @property {String} [text = ""]
   * @android
   * @ios
   * @since 4.1.4
   */
  text: string;
  /**
   * Set/Get background color of swipe item.
   *
   * @property {UI.Color} [backgroundColor = UI.Color.GRAY]
   * @android
   * @ios
   * @since 4.1.4
   */
  backgroundColor: Color;
  /**
   * Set/Get text color of swipe item.
   *
   * @property {UI.Color} [textColor = UI.Color.WHITE ]
   * @android
   * @ios
   * @since 4.1.4
   */
  textColor: Color;
  /**
   * Set/Get icon of swipe item.
   *
   * @property {UI.Image} [icon = undefined]
   * @android
   * @ios
   * @since 4.1.4
   */
  icon?: IImage;
  /**
   * Set/Get font of swipe item.
   *
   * @property {UI.Font} [font = UI.Font.Default]
   * @android
   * @ios
   * @since 4.1.4
   */
  font: Font | null;
  /**
   * This event triggers after ListViewItem is swiped or clicked. To be aware, Android doesn't support click for now.
   *
   * @method
   * @param {Object} params
   * @param {Number} params.index
   * @android
   * @ios
   * @since 4.1.4
   */
  onPress: (params: { index: number }) => void;
}

const SwipeItem: ConstructorOf<ISwipeItem, Partial<ISwipeItem>> = require('./swipeitem').default;
type SwipeItem = ISwipeItem;
export default SwipeItem;
