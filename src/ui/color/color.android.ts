import Color, { AbstractColor, GradientDirection } from '.';

const NativeColor = requireClass('android.graphics.Color');
const NativeGradientDrawable = requireClass('android.graphics.drawable.GradientDrawable');
const NativeBuild = requireClass('android.os.Build');

const GradientDrawableDirection = [
  NativeGradientDrawable.Orientation.TOP_BOTTOM,
  NativeGradientDrawable.Orientation.LEFT_RIGHT,
  NativeGradientDrawable.Orientation.TL_BR,
  NativeGradientDrawable.Orientation.TR_BL
];

interface GradientParams {
  startColor: Color;
  endColor: Color;
  direction: Color['direction'];
}

interface ColorAndroidConstructorParams {
  color: any;
  isGradient: Color['isGradient'];
}

export default class ColorAndroid extends AbstractColor {
  static create(alpha: number, red: number, green: number, blue: number): ColorAndroid;
  static create(red: number, green: number, blue: number): ColorAndroid;
  static create(hexCode: string): ColorAndroid;
  static create(hexOrAlphaOrRed: number | string, redOrGreen?: number, greenOrBlue?: number, blue?: number): any {
    if (arguments.length === 1 && typeof hexOrAlphaOrRed === 'string') {
      // Color created with hex value
      if (hexOrAlphaOrRed.charAt(0) !== '#') {
        throw new TypeError('Hex parameter must start with "#" character');
      }
      return new ColorAndroid({
        color: hexOrAlphaOrRed
      });
    } else if (arguments.length === 3 && typeof hexOrAlphaOrRed === 'number') {
      if (NativeBuild.VERSION.SDK_INT >= 26) {
        return new ColorAndroid({
          color: NativeColor.rgb(float(hexOrAlphaOrRed / 255), float(redOrGreen! / 255), float(greenOrBlue! / 255))
        });
      } else {
        return new ColorAndroid({
          color: NativeColor.rgb(hexOrAlphaOrRed, redOrGreen, greenOrBlue)
        });
      }
    } else if (arguments.length === 4 && typeof hexOrAlphaOrRed === 'number') {
      const alpha = (hexOrAlphaOrRed / 100) * 255;
      if (NativeBuild.VERSION.SDK_INT >= 26) {
        return new ColorAndroid({
          color: NativeColor.argb(float(alpha / 255), float(redOrGreen! / 255), float(greenOrBlue! / 255), float(blue! / 255))
        });
      } else {
        return new ColorAndroid({
          color: NativeColor.argb(int(alpha), int(redOrGreen), int(greenOrBlue), int(blue))
        });
      }
    }
  }
  static createGradient(params: GradientParams): ColorAndroid {
    const newParams: Partial<ColorAndroidConstructorParams & GradientParams> = { ...params };
    newParams.isGradient = true;
    return new ColorAndroid(newParams);
  }
  static red(color: ColorAndroid): number {
    return NativeColor.red(color.nativeObject);
  }
  static green(color: ColorAndroid): number {
    return NativeColor.green(color.nativeObject);
  }
  static blue(color: ColorAndroid): number {
    return NativeColor.blue(color.nativeObject);
  }
  static alpha(color: ColorAndroid): number {
    return NativeColor.alpha(color.nativeObject);
  }

  static BLACK = new ColorAndroid({
    color: NativeColor.BLACK
  });
  static BLUE = new ColorAndroid({
    color: NativeColor.BLUE
  });
  static CYAN = new ColorAndroid({
    color: NativeColor.CYAN
  });
  static DARKGRAY = new ColorAndroid({
    color: NativeColor.DARKGRAY
  });
  static GRAY = new ColorAndroid({
    color: NativeColor.GRAY
  });
  static GREEN = new ColorAndroid({
    color: NativeColor.GREEN
  });
  static LIGHTGRAY = new ColorAndroid({
    color: NativeColor.LTGRAY
  });
  static MAGENTA = new ColorAndroid({
    color: NativeColor.MAGENTA
  });
  static RED = new ColorAndroid({
    color: NativeColor.RED
  });
  static TRANSPARENT = new ColorAndroid({
    color: NativeColor.TRANSPARENT
  });
  static YELLOW = new ColorAndroid({
    color: NativeColor.YELLOW
  });
  static WHITE = new ColorAndroid({
    color: NativeColor.WHITE
  });
  colors: any[];
  static GradientDirection = GradientDirection;
  constructor(params: Partial<ColorAndroidConstructorParams & GradientParams> = {}) {
    super();
    if (params.isGradient && params.startColor && params.endColor) {
      this.colors = [params.startColor.nativeObject, params.endColor.nativeObject];
      const index = params.direction || 0;
      this.direction = GradientDrawableDirection[index];
      this.nativeObject = new NativeGradientDrawable(this.direction, array(this.colors, 'int'));
    } else if (params.color) {
      this.nativeObject = params.color;
    }
  }

  red(): number {
    return NativeColor.red(this.nativeObject);
  }
  green(): number {
    return NativeColor.green(this.nativeObject);
  }
  blue(): number {
    return NativeColor.blue(this.nativeObject);
  }
  alpha(): number {
    return NativeColor.alpha(this.nativeObject);
  }
}
