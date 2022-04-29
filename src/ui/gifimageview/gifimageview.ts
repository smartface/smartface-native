import { IImageView } from '../imageview/imageview';

import Color from '../color';
import { GifImageViewEvents } from './gifimageview-events';
import { IImage } from '../image/image';
import { IGifImage } from '../gifimage/gifimage';

export interface IGifImageView<TEvent extends string = GifImageViewEvents> extends IImageView<TEvent | GifImageViewEvents> {
  /**
   * Gets/sets the gifImage. GifImage object can be set.
   *
   * @property {UI.GifImage}  [gifImage = undefined]
   * @android
   * @ios
   * @since 3.2.
   */
  gifImage: undefined | IGifImage;
  /**
   * Gets the currentFrame.
   *
   * @property {UI.Image}  currentFrame
   * @readonly
   * @android
   * @ios
   * @since 3.2.0
   */
  readonly currentFrame: IImage;
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
}
