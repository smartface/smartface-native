import { INativeComponent } from '../../core/inative-component';
import { MobileOSProps, NativeMobileComponent } from '../../core/native-mobile-component';
import Blob from '../../global/blob';
import IBlob from '../../global/blob/blob';
import File from '../../io/file';
import { Size } from '../../primitive/size';
import Image from '../image';
import { IImage } from '../image/image';

export type iOSProps = {
  /**
   * Gets the frameCacheSizeCurrent of gifImage.
   * @ios
   * @since 3.2.0
   */
  frameCacheSizeCurrent?: number;

  /**
   * Returns delay times for indexes.
   * @ios
   * @since 3.2.0
   */
  getDelayTimesForIndexes?(): any;
};

export type AndroidProps = {
  /**
   * Seeks animation to given absolute position.
   * @android
   * @since 3.2.0
   */
  seekTo?: number;

  /**
   * Sets/Gets new animation speed factor. For example, set 2 to speed up double into current speed.
   * @android
   * @since 3.2.0
   */
  speed?: number;

  drawable?: any;

  content?: File | Blob;

  /**
   * Restarts the GifImage.
   * @android
   * @since 3.2.0
   */
  reset?(): void;
};

export interface IGifImage extends INativeComponent, MobileOSProps<iOSProps, AndroidProps> {
  /**
   * Gets/Sets the loopCount of gifImage. This property is readonly on iOS.
   * @android
   * @ios
   * @since 3.2.0
   */
  loopCount: number;

  /**
   * Gets/Sets the frameCount of gifImage.
   * @android
   * @ios
   * @since 3.2.0
   */
  frameCount: number;

  /**
   * Gets/Sets the posterImage of gifImage.
   * @android
   * @ios
   * @since 3.2.0
   */
  posterImage: IImage;

  /**
   * Gets/Sets the instrinsicSize of gifImage.
   * @android
   * @ios
   * @since 3.2.0
   */
  instrinsicSize: Size;

  /**
   * Returns a Blob instance.
   * @android
   * @ios
   * @since 3.2.0
   */
  toBlob(): IBlob | null;
}

export abstract class AbstractGifImage extends NativeMobileComponent<any, IGifImage> implements IGifImage {
  constructor(params?: Partial<IGifImage>) {
    super(params);
  }

  /**
   * Creates an gifImage object from given a blob.
   *
   * @param {Blob} blob Contains gif datas.
   * @method createFromBlob
   * @return UI.GifImage
   * @static
   * @android
   * @ios
   * @since 3.2.0
   */
  static createFromBlob(blob: Blob): IGifImage | null {
    throw new Error('Method not implemented.');
  }

  /**
   * Creates an GifImage instance from given file path. GifImage's file should not be in images folder. You can use assets folder.
   *
   *     @example
   *     import GifImage from '@smartface/native/ui/gifimage';
   *     const myGifImage = GifImage.createFromFile("assets://smartface.gif");
   *
   * @param {String|IO.File} path GifImage file path
   * @method createFromFile
   * @return {UI.GifImage} An GifImage instance.
   * @android
   * @ios
   * @static
   * @since 3.2.0
   */
  static createFromFile(path: string, width?: number, height?: number): IGifImage | null {
    throw new Error('Method not implemented.');
  }

  abstract get loopCount(): number;
  abstract set loopCount(value: number);
  abstract get frameCount(): number;
  abstract get posterImage(): IImage;
  abstract get instrinsicSize(): Size;
  abstract toBlob(): IBlob | null;
  static get android(): AndroidProps | undefined {
    throw new Error('Method not implemented.');
  }
  static get ios(): iOSProps | undefined {
    throw new Error('Method not implemented.');
  }
  protected abstract createNativeObject(params?: Partial<IGifImage>): any;
}

/**
 * @class UI.GifImage
 * @since 3.2.0
 *
 * GifImage is used to store the gif data read from the filesystem.
 * It can be set to UI objects' properties (e.g. UI.GifImageView.gifImage).
 * GifImage's file should not be in images folder. You can use assets folder.
 *
 *     @example
 *     import GifImage from '@smartface/native/ui/gifimage';
 *     import GifImageView from '@smartface/native/ui/gifimageview';
 *
 *     const myGifImage = GifImage.createFromFile("assets://smartface.gif")
 *     const myGifImageView = new GifImageView({
 *         gifImage: myGifImage,
 *         width: 200, height: 200
 *     });
 *
 *     myPage.layout.addChild(myGifImageView);
 *
 */
export class GifImageImpl extends AbstractGifImage {
  get loopCount(): number {
    throw new Error('Method not implemented.');
  }
  set loopCount(value: number) {
    throw new Error('Method not implemented.');
  }
  get frameCount(): number {
    throw new Error('Method not implemented.');
  }
  get posterImage(): IImage {
    throw new Error('Method not implemented.');
  }
  get instrinsicSize(): Size {
    throw new Error('Method not implemented.');
  }
  toBlob(): IBlob | null {
    throw new Error('Method not implemented.');
  }
  protected createNativeObject(params?: Partial<IGifImage>) {
    throw new Error('Method not implemented.');
  }
}
