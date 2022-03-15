import NativeComponent from '../../core/native-component';
import { Size } from '../../primitive/size';

export enum FontStyle {
  DEFAULT = 'DEFAULT',
  IOS_SYSTEM_FONT = 'iOS-System-Font',
  NORMAL = 1,
  BOLD = 2,
  ITALIC = 4,
  BOLD_ITALIC = 6
}

export abstract class AbstractFont extends NativeComponent {
  constructor(params?: Partial<AbstractFont>) {
    super(params);
  }
  /**
   * Gets size of font.
   *
   * @android
   * @ios
   * @since 4.2.3
   */
  private _size: number;

  get size(): number {
    return this._size;
  }

  set size(value: number) {
    this._size = value;
  }

  /**
   * This method returns the string size
   *
   * @android
   * @ios
   * @since 1.1.18
   */
  abstract sizeOfString(string: string, maxWidth: number): Size;

  /**
   * @android
   * @ios
   * @since 0.1
   * Creates a font instance with the given family name, size and style.
   * Assigning font style is deprecated usage (may not work mostly) instead
   * font name parameter must be specified according to actual name of font.
   * To obtain actual font name for iOS, use {@link UI.Font#allFontNames  allFontNames} method.
   * The actual name is same as named of font file in Android.
   *
   *     @example
   *     import Font from '@smartface/native/ui/font';
   *     import Label from '@smartface/native/ui/label';
   *     const myLabel = new Label({
   *         font: Font.create("Arial-ItalicMT", 16)
   *     });
   *     myLabel.text = "Label text";
   */

  static create(fontFamily: string, size: number, style?: FontStyle): AbstractFont | null {
    throw new Error('Method not implemented');
  }
  /**
   * @android
   * @ios
   * Creates a font instance with the given file path and size.
   *
   *     @example
   *     import Font from '@smartface/native/ui/font';
   *     import Label from '@smartface/native/ui/label';
   *     const myLabel = new Label({
   *         font: Font.createFromFile("assets://MyFont.ttf", 16)
   *     });
   *     myLabel.text = "Label text";
   *
   * @since 0.1
   *
   * @static
   */
  static createFromFile(path: string, size: number): AbstractFont {
    throw new Error('Method not implemented');
  }

  /**
   * iOS Only Static Properties
   */
  static ios: Partial<{
    /**
     * @method allFontNames
     * @ios
     * Returns supported font names.
     *
     *     @example
     *     import Font from '@smartface/native/ui/font';
     *     const fontNames = Font.ios.allFontNames();
     *     for (const index in fontNames) {
     *         console.log(fontNames[index]);
     *     }
     *
     * @since 0.1
     */
    allFontNames(): string[];
  }>;

  /**
   * Default font family. This might be different for Android and iOS.
   *
   * @android
   * @ios
   * @since 0.1
   */
  static DEFAULT: FontStyle.DEFAULT;

  static IOS_SYSTEM_FONT: FontStyle.IOS_SYSTEM_FONT;
  /**
   * Represents normal font style
   *
   * @android
   * @ios
   * @since 0.1
   */
  static NORMAL: FontStyle.NORMAL;
  /**
   * Represents bold font style
   *
   * @android
   * @ios
   * @since 0.1
   */
  static BOLD: FontStyle.BOLD;
  /**
   * Represents italic font style
   *
   * @android
   * @ios
   * @readonly
   * @since 0.1
   */
  static ITALIC: FontStyle.ITALIC;
  /**
   * Represents both bold and italic font style
   *
   * @android
   * @ios
   * @since 0.1
   */
  static BOLD_ITALIC: FontStyle.BOLD_ITALIC;
}
