import { ConstructorOf } from '../../core/constructorof';
import { IEventEmitter } from '../../core/eventemitter';
import { MobileOSProps } from '../../core/native-mobile-component';
import Color from '../color';
import Font from '../font';
import Image from '../image';
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
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  paddingTop: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  threshold: number;
}
export interface ISwipeItemIOSParams {
  padding: number;
  iconTextSpacing: number;
  isAutoHide: boolean;
}

export interface ISwipeItem extends IEventEmitter<SwipeItemEvents>, MobileOSProps<ISwipeItemIOSParams, ISwipeItemAndroidParams> {
  text: string;
  backgroundColor: Color;
  textColor: Color;
  icon?: Image;
  font: Font | null;
  onPress: (params: { index: number }) => void;
}

const SwipeItem: ConstructorOf<ISwipeItem, Partial<ISwipeItem>> = require(`./swipeitem`).default;
type SwipeItem = ISwipeItem;
export default SwipeItem;
