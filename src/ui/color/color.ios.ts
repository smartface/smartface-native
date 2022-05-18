import { GradientDirection, AbstractColor } from './color';

export default class ColorIOS extends AbstractColor {
  static create(alpha: number, red: number, green: number, blue: number): ColorIOS;
  static create(red: number, green: number, blue: number): ColorIOS;
  static create(hexCode: string): ColorIOS;
  static create(hexOrAlphaOrRed: number | string, redOrGreen?: number, greenOrBlue?: number, blue?: number): ColorIOS | undefined {
    if (arguments.length === 1 && typeof hexOrAlphaOrRed === 'string') {
      // Color created with hex value
      if (hexOrAlphaOrRed.charAt(0) !== '#') {
        throw new TypeError('Hex parameter must start with "#" character');
      }
      return new ColorIOS({
        color: __SF_UIColor.hexColor(hexOrAlphaOrRed)
      });
    } else if (arguments.length === 3 && typeof hexOrAlphaOrRed === 'number' && typeof redOrGreen === 'number' && typeof greenOrBlue === 'number') {
      // Color created with rgb value
      return new ColorIOS({
        color: new __SF_UIColor(hexOrAlphaOrRed / 255, redOrGreen / 255, greenOrBlue / 255, 1)
      });
    } else if (arguments.length === 4 && typeof hexOrAlphaOrRed === 'number' && typeof blue === 'number' && typeof redOrGreen === 'number' && typeof greenOrBlue === 'number') {
      // Color created with rgba value
      return new ColorIOS({
        color: new __SF_UIColor(redOrGreen / 255, greenOrBlue / 255, blue / 255, hexOrAlphaOrRed / 100)
      });
    }
  }
  static createGradient(params: { direction: GradientDirection; startColor: ColorIOS; endColor: ColorIOS }): ColorIOS {
    const pointStart = {
      x: params.direction === GradientDirection.DIAGONAL_RIGHT ? 1 : 0,
      y: 0
    };
    const pointEnd = {
      x: params.direction === GradientDirection.DIAGONAL_LEFT || params.direction === GradientDirection.HORIZONTAL ? 1 : 0,
      y: params.direction === GradientDirection.HORIZONTAL ? 0 : 1
    };
    return new ColorIOS({
      color: __SF_CAGradientLayer.createGradient(params.startColor.nativeObject, params.endColor.nativeObject, pointStart, pointEnd) as any
    });
  }
  static red(color: ColorIOS): number {
    return color.nativeObject.components().red * 255;
  }
  static green(color: ColorIOS): number {
    return color.nativeObject.components().green * 255;
  }
  static blue(color: ColorIOS): number {
    return color.nativeObject.components().blue * 255;
  }
  static alpha(color: ColorIOS): number {
    return color.nativeObject.components().alpha * 255;
  }

  static BLACK = new ColorIOS({
    color: __SF_UIColor.blackColor()
  });
  static BLUE = new ColorIOS({
    color: __SF_UIColor.blueColor()
  });
  static CYAN = new ColorIOS({
    color: __SF_UIColor.cyanColor()
  });
  static DARKGRAY = new ColorIOS({
    color: __SF_UIColor.darkGrayColor()
  });
  static GRAY = new ColorIOS({
    color: __SF_UIColor.grayColor()
  });
  static GREEN = new ColorIOS({
    color: __SF_UIColor.greenColor()
  });
  static LIGHTGRAY = new ColorIOS({
    color: __SF_UIColor.lightGrayColor()
  });
  static MAGENTA = new ColorIOS({
    color: __SF_UIColor.magentaColor()
  });
  static RED = new ColorIOS({
    color: __SF_UIColor.redColor()
  });
  static TRANSPARENT = new ColorIOS({
    color: __SF_UIColor.clearColor()
  });
  static YELLOW = new ColorIOS({
    color: __SF_UIColor.yellowColor()
  });
  static WHITE = new ColorIOS({
    color: __SF_UIColor.whiteColor()
  });
  static GradientDirection = GradientDirection;

  constructor(params: { color: __SF_UIColor | __SF_CAGradientLayer }) {
    super();
    this._nativeObject = params.color;
  }

  red(): number {
    return this.nativeObject.components().red * 255;
  }
  green(): number {
    return this.nativeObject.components().green * 255;
  }
  blue(): number {
    return this.nativeObject.components().blue * 255;
  }
  alpha(): number {
    return this.nativeObject.components().alpha * 255;
  }
}
