import { INativeMobileComponent, NativeMobileComponent, WithMobileOSProps } from '../../core/native-mobile-component';
import IBlob from '../../global/blob/blob';
import { Rectangle } from '../../primitive/rectangle';

/**
 * @class UI.Image
 * @since 0.1
 *
 * Image is used to store the image data read from the filesystem.
 * It can be set to UI objects' properties (e.g. UI.ImageView.image).
 *
 *     @example
 *     import Image from '@smartface/native/ui/image';
 *     import ImageView from '@smartface/native/ui/imageview';
 *
 *     var myImage = Image.createFromFile("images://smartface.png")
 *     var myImageView = new ImageView({
 *         image: myImage,
 *         width: 200, height: 200
 *     });
 *
 *     myPage.layout.addChild(myImageView);
 *
 */
export interface IImage extends INativeMobileComponent<any, WithMobileOSProps<ImageParams, ImageIOSProps, ImageAndroidProps>> {
  /**
   * Gets the height of image in pixels.
   *
   * @android
   * @ios
   * @property {Number} height
   * @readonly
   * @since 0.1
   */
  readonly height: number;
  /**
   * Gets the width of image in pixels.
   *
   * @android
   * @ios
   * @property {Number} width
   * @readonly
   * @since 0.1
   */
  readonly width: number;

  /**
   * Gets/Sets the autoMirrored of image. This property sets direction of Image automatically related to system or application direction.
   *
   * @ios
   * @android
   * @property {Boolean} autoMirrored
   * @since 3.1.3
   */
  autoMirrored: boolean;
  /**
   * Returns a Blob instance.
   *
   * @android
   * @ios
   * @method toBlob
   * @return Blob
   * @since 0.1
   */
  toBlob(): IBlob | null;

  /**
   * Creates a new image from existing image with specified width and height.
   * onSuccess and onFailure are optional parameters.
   *
   *     @example
   *     import Image from '@smartface/native/ui/image';
   *     import ImageView from '@smartface/native/ui/imageview';
   *     var myImage = Image.createFromFile("images://smartface.png")
   *     var myImageView = new ImageView();
   *     myImageView.image = myImage.resize(myImage.width/2, myImage.height/2); // resize example without callback
   *
   *
   *     import Image from '@smartface/native/ui/image';
   *     import ImageView from '@smartface/native/ui/imageview';
   *     var myImage = Image.createFromFile("images://smartface.png")
   *     var myImageView = new ImageView();
   *     myImage.resize(myImage.width/2, myImage.height/2, onSuccess);
   *
   *     function onSuccess(e) {
   *         myImageView.image = e.image
   *     }
   *
   * @method resize
   * @param {Number} width Width pixels of the new bitmap.
   * @param {Number} height Height pixels of the new bitmap.
   * @param {Function} onSuccess Callback for success situation.
   * @param {Object} onSuccess.params
   * @param {UI.Image} onSuccess.params.image Resized image
   * @param {Function} onFailure Callback for failure situation.
   * @param {Object} onFailure.params
   * @param {String} onFailure.params.message Failure message
   * @return UI.Image
   * @android
   * @ios
   * @since 0.1
   */
  resize(width: number, height: number, onSuccess?: (e: { image: IImage }) => void, onFailure?: (e?: { message: string }) => void): IImage | null | void;
  /**
   * Returns a cropped image from existing image with specified rectangle.
   * onSuccess and onFailure are optional parameters.
   *
   * @method crop
   * @param {Number} x The x pixels of the rectangle top-left corner.
   * @param {Number} y The y pixels of the rectangle top-left corner.
   * @param {Number} width Width pixels of the new bitmap.
   * @param {Number} height Height pixels of the new bitmap.
   * @param {Function} onSuccess Callback for success situation.
   * @param {Object} onSuccess.params
   * @param {UI.Image} onSuccess.params.image Cropped image
   * @param {Function} onFailure Callback for failure situation.
   * @param {Object} onFailure.params
   * @param {String} onFailure.params.message Failure message
   * @return UI.Image
   * @android
   * @ios
   * @since 0.1
   */
  crop(x: number, y: number, width: number, height: number, onSuccess?: (e: { image: IImage }) => void, onFailure?: (e?: { message: string }) => void): IImage | null | void;
  /**
   * Returns a compressed blob from existing image with given quality.
   * onSuccess and onFailure are optional parameters.
   *
   *     @example
   *     import Image from '@smartface/native/ui/image';
   *     var myImage = Image.createFromFile("images://smartface.png")
   *     var myBlob = myImage.compress(Image.Format.JPEG, 50);
   *     var myCompressedImage = Image.createFromBlob(myBlob);
   *
   * @method compress
   * @param {UI.Image.Format} format Image format.
   * @param {Number} quality Image quality is between 0 and 100.
   * @param {Function} onSuccess Callback for success situation.
   * @param {Object} onSuccess.params
   * @param {Blob} onSuccess.params.blob Compressed data
   * @param {Function} onFailure Callback for failure situation.
   * @param {Object} onFailure.params
   * @param {String} onFailure.params.message Failure message
   * @return Blob
   * @android
   * @ios
   * @since 0.1
   */
  compress(format: Format, quality: number, onSuccess?: (e: { blob: IBlob }) => void, onFailure?: (e?: { message: string }) => void): IBlob | null | void;
  /**
   * Returns a rotated image with given angle. Rotate direction is clockwise and angle is between 0-360.
   * onSuccess and onFailure are optional parameters.
   *
   * @method rotate
   * @param {Number} angle The angle value of the rectangle top-left corner.
   * @param {Function} onSuccess Callback for success situation.
   * @param {Object} onSuccess.params
   * @param {UI.Image} onSuccess.params.image Rotated image
   * @param {Function} onFailure Callback for failure situation.
   * @param {Object} onFailure.params
   * @param {String} onFailure.params.message Failure message
   * @return UI.Image
   * @android
   * @ios
   * @since 0.1
   */
  rotate(angle: number, onSuccess?: (e: { image: IImage }) => void, onFailure?: (e?: { message: string }) => void): IImage | null | void;
}

/**
 * @enum {Number} UI.Image.Format
 * @static
 * @since 0.1
 *
 * Specifies image compression type.
 *
 */
export enum Format {
  /**
   * @property {Number} JPEG
   * @android
   * @ios
   * @static
   * @readonly
   * @since 0.1
   */
  JPEG = 0,
  /**
   * @property {Number} PNG
   * @android
   * @ios
   * @static
   * @readonly
   * @since 0.1
   */
  PNG = 1
}

/**
 * @enum {Number} UI.Image.iOS.RenderingMode
 * @since 3.1.3
 * @ios
 */
export enum RenderingMode {
  /**
   * Use the default rendering mode for the context where the image is used.
   *
   * @property {Number} AUTOMATIC
   * @static
   * @ios
   * @readonly
   * @since 3.1.3
   */
  AUTOMATIC = 0,
  /**
   * Always draw the original image, without treating it as a template.
   *
   * @property {Number} ORIGINAL
   * @static
   * @ios
   * @readonly
   * @since 3.1.3
   */
  ORIGINAL = 1,
  /**
   * Always draw the image as a template image, ignoring its color information.
   *
   * @property {Number} TEMPLATE
   * @static
   * @ios
   * @readonly
   * @since 3.1.3
   */
  TEMPLATE = 2
}

export interface ImageAndroidProps {
  /**
   * Returns an image with rounded corners. This method returns the original image for iOS.
   *
   * @method round
   * @param {Number} radius Corner radius
   * @return UI.Image
   * @android
   * @since 2.0.10
   */
  round(radius: number): IImage;
  systemIcon: string | number;
}

export interface ImageIOSProps {
  /**
   * Determines how an image is rendered.
   *
   * @method imageWithRenderingMode
   * @param {UI.Image.iOS.RenderingMode} renderingMode
   * @ios
   * @return UI.Image
   * @since 3.1.3
   */
  imageWithRenderingMode(mode: RenderingMode): IImage;
  /**
   * Returns the image of automatically related to system or application direction.
   *
   * @method imageFlippedForRightToLeftLayoutDirection
   * @ios
   * @return UI.Image
   * @since 3.1.3
   */
  imageFlippedForRightToLeftLayoutDirection(): IImage;

  /**
   * Gets the renderingMode of image.
   *
   * @ios
   * @property {UI.Image.iOS.RenderingMode} renderingMode
   * @readonly
   * @since 3.2.0
   */
  renderingMode: RenderingMode;
  /**
   * A Boolean value that indicates whether the image should flip in a right-to-left layout.
   *
   * @ios
   * @property {Boolean} flipsForRightToLeftLayoutDirection
   * @readonly
   * @since 3.2.0
   */
  flipsForRightToLeftLayoutDirection: boolean;
  /**
   * Specifies the possible resizing modes for an image.
   *
   * @method resizableImageWithCapInsetsResizingMode
   * @ios
   * @param {Object} insets
   * @param {Number} insets.top
   * @param {Number} insets.left
   * @param {Number} insets.width  Width in pixels
   * @param {Number} insets.height Height in pixels
   * @param {Number} mode &emsp;UIImageResizingModeTile = 0 <br />&emsp;UIImageResizingModeStretch = 1
   * @return UI.Image
   * @since 1.1.18
   */
  resizableImageWithCapInsetsResizingMode(insets: Rectangle, mode: number): IImage;
}

export interface ImageParams {
  bitmap?: any;
  roundedBitmapDrawable?: any;
  drawable: any;
  path: any;
  name?: string;
  blob?: IBlob;
  image?: IImage;
}
/**
 * @since 4.5.0
 */
export abstract class AbstractImage<
    TNative extends { [key: string]: any } = any,
    TProps extends WithMobileOSProps<Partial<ImageParams>, ImageIOSProps, ImageAndroidProps> = WithMobileOSProps<ImageParams, ImageIOSProps, ImageAndroidProps>
  >
  extends NativeMobileComponent<TNative, TProps>
  implements IImage
{
  constructor(params: Partial<TProps>) {
    super(params);
  }
  compress(format: Format, quality: number, onSuccess?: (e: { blob: IBlob }) => void, onFailure?: (e?: { message: string }) => void): IBlob | null | void {
    throw new Error('Method not implemented.');
  }
  rotate(angle: number, onSuccess?: (e: { image: IImage }) => void, onFailure?: (e?: { message: string }) => void): IImage | null | void {
    throw new Error('Method not implemented.');
  }
  resize(width: number, height: number, onSuccess?: (e: { image: IImage }) => void, onFailure?: (e?: { message: string }) => void): null | IImage | void {
    throw new Error('Method not implemented.');
  }
  crop(x: number, y: number, width: number, height: number, onSuccess: (e: { image: IImage }) => void, onFailure: (e?: { message: string }) => void): null | IImage | void {
    throw new Error('Method not implemented.');
  }

  get height(): number {
    return this.nativeObject.size.height;
  }
  get width(): number {
    return this.nativeObject.size.width;
  }
  get autoMirrored(): boolean {
    throw new Error('Method not implemented.');
  }
  set autoMirrored(value: boolean) {
    throw new Error('Method not implemented.');
  }

  toBlob(): IBlob | null {
    throw new Error('Method not implemented.');
  }

  toString() {
    return 'Image';
  }
  static android: {
    createRoundedImage(params): IImage | null;
    /**
     * Creates an Image object which built-in icon is created corresponding systemIcon value.
     * This method is Android only.
     *
     * @android
     * @static
     * @method createSystemIcon
     * @param {Number | String} systemIcon
     * @see https://developer.android.com/reference/android/R.drawable
     * @since 4.0.2
     */
    createSystemIcon(icon: number | string): IImage;
  };

  /**
   * Creates an image object from given a blob.
   *
   * @param {Blob} blob Contains image datas.
   * @method createFromBlob
   * @return UI.Image
   * @static
   * @android
   * @ios
   * @since 0.1
   */
  static createFromBlob(blob: IBlob): IImage | null {
    throw new Error('Method not implemented.');
  }

  /**
   * Used privately inside framework
   * Creates an image object from image.nativeobject.
   *
   * @param {NativeObject} image Contains image datas.
   * @method createFromImage
   * @return UI.Image
   * @static
   * @android
   * @ios
   * @since 0.1
   */
  static createFromImage(image: any): IImage {
    throw new Error('Method not implemented.');
  }

  /**
   * Used privately inside framework
   * Creates an image object from file path or image.
   *
   * @param {IImage | string} path Contains image datas.
   * @method createImageFromPath
   * @return UI.Image
   * @static
   * @android
   * @ios
   * @since 0.1
   */
  static createImageFromPath(path: IImage | string): IImage {
    throw new Error('Method not implemented.');
  }

  /**
   * Creates a rounded image object from given path. This method works for only Android. It returns undefined for iOS.
   *
   * @param {Object} params
   * @param {String} params.path Image path
   * @param {Number} params.radius Image corner radius
   * @method createRoundedImage
   * @return UI.Image
   * @static
   * @android
   * @since 2.0.10
   */
  static createRoundedImage(params: { path: string; radius?: number }): IImage {
    throw new Error('Method not implemented.');
  }

  /**
   * Creates an Image instance from given file path. Large bitmap loading causes OutOfMemory exception on Android.
   * width and height parameters works for only Android. No-op for iOS.
   * These parameters are used loading large bitmaps efficiently. If you pass these parameters, the bitmap will scaled down.
   *
   *     @example
   *     import Image from '@smartface/native/ui/image';
   *     var myImage = Image.createFromFile("images://smartface.png");
   *
   * @param {String} path Image file path
   * @param {Number} width Width in pixels
   * @param {Number} height Height in pixels
   * @method createFromFile
   * @return {UI.Image} An Image instance.
   * @android
   * @ios
   * @static
   * @since 0.1
   * @see https://developer.android.com/topic/performance/graphics/load-bitmap.html
   */
  static createFromFile(path: string, width?: number, height?: number): IImage | null {
    throw new Error('Method not implemented.');
  }
  static systemDrawableId(systemIcon: number) {
    throw new Error('Method not implemented.');
  }

  protected createNativeObject() {
    throw new Error('Method not implemented.');
  }

  /**
   * iOS Specific Properties.
   * @class UI.Image.iOS
   * @since 3.1.3
   */
  static readonly iOS = {
    RenderingMode,
    Format
  };
}
