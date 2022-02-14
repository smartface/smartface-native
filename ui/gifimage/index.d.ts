import Blob from '../../global/blob';
import Image from '../image';
/**
 * @class UI.GifImage
 * @since 3.2.0
 *
 * GifImage is used to store the gif data read from the filesystem.
 * It can be set to UI objects' properties (e.g. UI.GifImageView.gifImage).
 * GifImage's file should not be in images folder. You can use assets folder.
 *
 *     @example
 *     const GifImage = require('@smartface/native/ui/gifimage');
 *     const GifImageView = require('@smartface/native/ui/gifimageview');
 *
 *     var myGifImage = GifImage.createFromFile("assets://smartface.gif")
 *     var myGifImageView = new GifImageView({
 *         gifImage: myGifImage,
 *         width: 200, height: 200
 *     });
 *
 *     myPage.layout.addChild(myGifImageView);
 *
 */
declare class GifImage extends NativeComponent {
  constructor(params?: Partial<GifImage>);
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
  static createFromBlob(blob: Blob): GifImage;
  /**
   * Creates an GifImage instance from given file path. GifImage's file should not be in images folder. You can use assets folder.
   *
   *     @example
   *     const GifImage = require('@smartface/native/ui/gifimage');
   *     var myGifImage = GifImage.createFromFile("assets://smartface.gif");
   *
   * @param {String|IO.File} path GifImage file path
   * @method createFromFile
   * @return {UI.GifImage} An GifImage instance.
   * @android
   * @ios
   * @static
   * @since 3.2.0
   */
  static createFromFile(path: string, width?: number, height?: number): GifImage;
  /**
   * Gets/Sets the loopCount of gifImage. This property is readonly on iOS.
   *
   * @android
   * @ios
   * @property {Number} loopCount
   * @since 3.2.0
   */
  loopCount: number;
  /**
   * Gets/Sets the frameCount of gifImage.
   *
   * @android
   * @ios
   * @readonly
   * @property {Number} frameCount
   * @since 3.2.0
   */
  frameCount: number;
  /**
   * Gets/Sets the posterImage of gifImage.
   *
   * @android
   * @ios
   * @readonly
   * @property {UI.Image} posterImage
   * @since 3.2.0
   */
  posterImage: Image;
  /**
   * Gets the frameCacheSizeCurrent of gifImage.
   *
   * @ios
   * @readonly
   * @property {Number} frameCacheSizeCurrent
   * @since 3.2.0
   */
  readonly frameCacheSizeCurrent: number;
  /**
   * Gets/Sets the instrinsicSize of gifImage.
   *
   * @android
   * @ios
   * @readonly
   * @property {Object} instrinsicSize
   * @property {Number} instrinsicSize.width
   * @property {Number} instrinsicSize.height
   * @since 3.2.0
   */
  readonly instrinsicSize: { width: number; height: number };
  /**
   * Returns a Blob instance.
   *
   * @android
   * @ios
   * @method toBlob
   * @return Blob
   * @since 3.2.0
   */
  toBlob(): Blob;
  /**
   * Returns delay times for indexes.
   *
   * @ios
   * @method getDelayTimesForIndexes
   * @return {Object}
   * @since 3.2.0
   */
  getDelayTimesForIndexes(): any;
  /**
   * Restarts the GifImage.
   *
   * @method reset
   * @android
   * @since 3.2.0
   */
  reset(): void;
  /**
   * Seeks animation to given absolute position.
   *
   * @property {Number} seekTo
   * @android
   * @since 3.2.0
   */
  seekTo: number;
  /**
   * Sets/Gets new animation speed factor. For example, set 2 to speed up double into current speed.
   *
   * @property {Number} speed
   * @android
   * @since 3.2.0
   */
  speed: number;
}

export = GifImage;
