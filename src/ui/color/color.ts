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

type ConstructorParams = { color: IColor | __SF_UIColor };

export interface IColor extends NativeComponent {
  /**
   * Gets the red value of the color
   */
  red(): number;
  /**
   * Gets the green value of the color
   */
  green(): number;
  /**
   * Gets the blue value of the color
   */
  blue(): number;
  /**
   * Gets the alpha value of the color
   */
  alpha(): number;
  /**
   * Please only pass this property in constructor.
   * @android
   * @private
   */
  isGradient?: boolean;
  /**
   * Get/sets the direction of the gradient image.
   */
  direction: GradientDirection;
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
export abstract class AbstractColor extends NativeComponent implements IColor {
  constructor(params?: ConstructorParams) {
    super(params);
  }
  red(): number {
    throw new Error('Method not implemented.');
  }
  green(): number {
    throw new Error('Method not implemented.');
  }
  blue(): number {
    throw new Error('Method not implemented.');
  }
  alpha(): number {
    throw new Error('Method not implemented.');
  }
  isGradient?: boolean | undefined;
  direction: GradientDirection;
  protected createNativeObject(params: any) {
    return;
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
  static create(alpha: number, red: number, green: number, blue: number): IColor;
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
  static create(red: number, green: number, blue: number): IColor;
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
  static create(color: string): IColor;
  static create(color: any): IColor {
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
  static createGradient(params: { direction: GradientDirection; startColor: IColor; endColor: IColor }): IColor {
    throw new Error('Not implemented');
  }

  /**
   * @android
   * @ios
   * @since 0.1
   */
  static BLACK: IColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static BLUE: IColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static CYAN: IColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static DARKGRAY: IColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static GRAY: IColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static GREEN: IColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static LIGHTGRAY: IColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static MAGENTA: IColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static RED: IColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static TRANSPARENT: IColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static YELLOW: IColor;
  /**
   * @android
   * @ios
   * @since 0.1
   */
  static WHITE: IColor;

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
  static red(color: IColor): number {
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
  static green(color: IColor): number {
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
  static blue(color: IColor): number {
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
  static alpha(color: IColor): number {
    throw new Error('Not implemented');
  }

  static GradientDirection: typeof GradientDirection;
}
