import { IImageView } from '../imageview/imageview';
import GifImage from '../gifimage';
import Image from '../image';
import Color from '../color';
import { GifImageViewEvents } from './gifimageview-events';

export interface IGifImageView<TEvent extends string = GifImageViewEvents> extends IImageView<TEvent | GifImageViewEvents> {
  /**
   * Gets/sets the gifImage. GifImage object can be set.
   *
   * @property {UI.GifImage}  [gifImage = undefined]
   * @android
   * @ios
   * @since 3.2.0
   */
  gifImage: undefined | GifImage;
  /**
   * Gets the currentFrame.
   *
   * @property {UI.Image}  currentFrame
   * @readonly
   * @android
   * @ios
   * @since 3.2.0
   */
  readonly currentFrame: Image;
  /**
   * Gets the currentFrameIndex.
   *
   * @property {Number}  currentFrameIndex
   * @readonly
   * @android
   * @ios
   * @since 3.2.0
   */
  readonly currentFrameIndex: number;
  /**
   * Gets the isAnimating.
   *
   * @property {Boolean}  isAnimating
   * @readonly
   * @android
   * @ios
   * @since 3.2.0
   */
  isAnimating: boolean;
  /**
   * You should call this method when you want start gif's animation.
   *
   * @method startAnimating
   * @android
   * @ios
   * @since 3.2.0
   */
  startAnimating(): void;
  /**
   * You should call this method when you want stop gif's animation.
   *
   * @method stopAnimating
   * @android
   * @ios
   * @since 3.2.0
   */
  stopAnimating(): void;
  /**
   * This event is called when every gif's loop ends.
   *
   * @event loopCompletionCallback
   * @param {Number} loopCountRemaining
   * @ios
   * @since 3.2.0
   */
  loopCompletionCallback: (loopCountRemain: number) => void;
  /**
   * Gets/sets the tintColor. Must create a new image object with the imageWithRenderingMode(Image.iOS.RenderingMode.TEMPLATE) method to work correctly on the iOS.
   *
   * @property {UI.Color} tintColor
   * @android
   * @removed
   * @ios
   * @since 3.2.0
   */
  tintColor: Color;
  /**
   * Load image from the server and place the returned image into the ImageView.
   * If you pass any image to placeHolder parameter, placeHolder image will shown until image loaded.
   *
   * @method loadFromUrl
   * @param {Object} object
   * @param {String} object.url
   * @param {UI.Image} object.placeholder
   * @param {Boolean} object.fade = true
   * @param {Function} object.onSuccess
   * @param {Function} object.onError
   * @android
   * @removed
   * @ios
   * @since 3.2.0
   */
  loadFromUrl(params: { url: string; placeholder?: Image; fade?: boolean; onSuccess?: () => void; onError?: () => void }): void;
}
