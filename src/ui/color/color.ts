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

type ConstructorParams = { color: AbstractColor | __SF_UIColor };

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
export abstract class AbstractColor extends NativeComponent {
  constructor(params?: ConstructorParams) {
    super(params);
  }
  protected createNativeObject() {
    return null;
  }
  //TODO: Writing iOS specific class isn't best practice. Find something better.
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
  static create(alpha: number, red: number, green: number, blue: number): AbstractColor;
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
  static create(red: number, green: number, blue: number): AbstractColor;
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
  static create(color: string): AbstractColor;
  static create(color: any): AbstractColor {
    throw new Error('Not implemented');
  }
  /**
   * @android
   * @ios
   *
   * Creates a gradient color that can be assigned to view's backgroundColor. You
   * can specify start-end colors and direction of gradient.
   * @since 0.1
   */
  static createGradient(params: { direction: GradientDirection; startColor: AbstractColor; endColor: AbstractColor }): AbstractColor {
    throw new Error('Not implemented');
  }

  abstract red(): number;
  abstract green(): number;
  abstract blue(): number;
  abstract alpha(): number;
  isGradient?: boolean;
  direction: GradientDirection;

  /**
   * @android
   * @ios
   * @since 0.1
   */
  static BLACK: AbstractColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static BLUE: AbstractColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static CYAN: AbstractColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static DARKGRAY: AbstractColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static GRAY: AbstractColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static GREEN: AbstractColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static LIGHTGRAY: AbstractColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static MAGENTA: AbstractColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static RED: AbstractColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static TRANSPARENT: AbstractColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static YELLOW: AbstractColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static WHITE: AbstractColor;

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
  static red(color: AbstractColor): number {
    throw new Error('Not implemented');
  }
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
  static green(color: AbstractColor): number {
    throw new Error('Not implemented');
  }
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
  static blue(color: AbstractColor): number {
    throw new Error('Not implemented');
  }

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
  static alpha(color: AbstractColor): number {
    throw new Error('Not implemented');
  }

  static GradientDirection: typeof GradientDirection;
}

/**
 * Only to use type of export
 */
export declare class ColorImpl extends AbstractColor {
  red(): number;
  green(): number;
  blue(): number;
  alpha(): number;
}
