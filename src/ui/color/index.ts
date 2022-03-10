import NativeComponent from '../../core/native-component';

/**
 * This enumeration describes allowed direction types for gradient color.
 */
export enum GradientDirection {
  /**
   * Indicates gradient color will start from top point with startColor and
   * will end at bottom point with endColor.
   *
   * @android
   * @ios
   * @since 0.1
   */
  VERTICAL,
  /**
   * Indicates gradient color will start from left point with startColor and
   * will end at right point with endColor.
   *
   * @android
   * @ios
   * @since 0.1
   */
  HORIZONTAL,
  /**
   * Indicates gradient color will start from top-left point with startColor and
   * will end at bottom-right point with endColor.
   *
   * @android
   * @ios
   * @since 0.1
   */
  DIAGONAL_LEFT,
  /**
   * Indicates gradient color will start from top-right point with startColor and
   * will end at bottom-left point with endColor.
   *
   * @android
   * @ios
   * @since 0.1
   */
  DIAGONAL_RIGHT
}

/**
 * @since 0.1
 * Color is used to color UI objects and its elements. A Color instance is created by
 * passing RGB-ARGB values or hexadecimal string. There are constant and predefined colors as well.
 *
 *     @example
 *     import Color from '@smartface/native/ui/color';
 *     const myRedColor = Color.create(255, 0, 0);
 *     const myBlueColorWithAlpha = Color.create(100, 0, 0, 255);
 *     const myHEXColor = Color.create("#FFAACC");
 */
export declare class ColorBase extends NativeComponent {
  constructor(params?: { color: Color | __SF_UIColor }); //TODO: Writing iOS specific class isn't best practice. Find something better.
  /**
   * Creates a new color with RGB-ARGB or hexadecimal parameters
   *
   *     @example
   *     import Color from '@smartface/native/ui/color';
   *     const myRedColor = Color.create(255, 0, 0);
   *     const myBlueColorWithAlpha = Color.create(100, 0, 0, 255);
   *     const myHEXColor = Color.create("#FFAACC");
   *
   * @android
   * @ios
   * @since 0.1
   */
  static create(alpha: number, red: number, green: number, blue: number): ColorBase;
  /**
   * Creates a new color with RGB-ARGB or hexadecimal parameters
   *
   *     @example
   *     import Color from '@smartface/native/ui/color';
   *     const myRedColor = Color.create(255, 0, 0);
   *     const myBlueColorWithAlpha = Color.create(100, 0, 0, 255);
   *     const myHEXColor = Color.create("#FFAACC");
   *
   * @android
   * @ios
   * @since 0.1
   */
  static create(red: number, green: number, blue: number): ColorBase;
  /**
   * Creates a new color with RGB-ARGB or hexadecimal parameters
   *
   *     @example
   *     import Color from '@smartface/native/ui/color';
   *     const myRedColor = Color.create(255, 0, 0);
   *     const myBlueColorWithAlpha = Color.create(100, 0, 0, 255);
   *     const myHEXColor = Color.create("#FFAACC");
   *
   * @android
   * @ios
   * @since 0.1
   */
  static create(color: string): ColorBase;
  /**
   * @android
   * @ios
   *
   * Creates a gradient color that can be assigned to view's backgroundColor. You
   * can specify start-end colors and direction of gradient.
   * @since 0.1
   */
  static createGradient(params: { direction: GradientDirection; startColor: ColorBase; endColor: ColorBase }): ColorBase;
  red(): number;
  green(): number;
  blue(): number;
  alpha(): number;
  isGradient?: boolean;
  direction: GradientDirection;

  /**
   * @android
   * @ios
   * @since 0.1
   */
  static BLACK: ColorBase;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static BLUE: ColorBase;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static CYAN: ColorBase;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static DARKGRAY: ColorBase;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static GRAY: ColorBase;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static GREEN: ColorBase;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static LIGHTGRAY: ColorBase;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static MAGENTA: ColorBase;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static RED: ColorBase;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static TRANSPARENT: ColorBase;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static YELLOW: ColorBase;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static WHITE: ColorBase;

  /**
   * Returns the red value of a color instance.
   *
   *     @example
 *     import Color from '@smartface/native/ui/color';
   * 
   *     const myRGBColor = Color.create(99, 0, 0);
   *     const red = Color.red(myRGBColor);
   *     console.log("" + red);
   *

   * @android
   * @ios
   * @since 0.1
   */
  static red(color: ColorBase): number;
  /**
      * Returns the green value of a color instance.
      *
      *     @example
    *     import Color from '@smartface/native/ui/color';
      * 
      *     const myRGBColor = Color.create(0, 171, 0);
      *     const green = Color.green(myRGBColor);
      *     console.log("" + green);
      *
   
      * @android
      * @ios
      * @since 0.1
      */
  static green(color: ColorBase): number;
  /**
   * Returns the blue value of a color instance.
   *
   *     @example
   *     import Color from '@smartface/native/ui/color';
   *
   *     const myRGBColor = Color.create(0, 0, 155);
   *     const blue = Color.blue(myRGBColor);
   *     console.log("" + blue);
   *
   * @android
   * @ios
   * @since 0.1
   */
  static blue(color: ColorBase): number;

  /**
   * Returns the alpha value of a color instance.
   *
   *     @example
   *     import Color from '@smartface/native/ui/color';
   *
   *     var myARGBColor = Color.create(42, 0, 0, 255);
   *     var alpha = Color.alpha(myARGBColor);
   *     console.log(alpha);
   *
   * @android
   * @ios
   * @since 0.1
   */
  static alpha(color: ColorBase): number;

  static GradientDirection: GradientDirection;
}

export abstract class AbstractColor extends NativeComponent implements ColorBase {
  abstract red(): number;
  abstract green(): number;
  abstract blue(): number;
  abstract alpha(): number;
  isGradient?: boolean;
  protected colors?: ColorBase[];
  direction: GradientDirection;
}

const Color: typeof ColorBase = require(`./color.${Device.deviceOS.toLowerCase()}`).default;
type Color = ColorBase;

export default Color;
