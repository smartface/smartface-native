import { IImage } from '../image/image';
import { IImageView } from '../imageview/imageview';

export interface IStripeViewSetSpriteOptions {
  /**
   * Image for the frame. It is highly recommended to use the sheet from "assets" folder instead of generating the image.
   * The reason for that is, iOS resizes the images in order to make a better fit, which hinders with the sprite quality.
   */
  sheet: IImage;
  /**
   * Frame X count
   * Distinct image count on X axis
   */
  frameX: number;
  /**
   * Frame Y count
   * Distinct image count on Y axis
   */
  frameY: number;
  /**
   * Frame count of the image. If no value is given, it takes the multiply frameX by frameY value.
   */
  frameCount?: number;
}

export interface ISpriteView extends IImageView {
  setSprite(options: IStripeViewSetSpriteOptions): void;
  play(duration: number): void;
  stop(): void;
  showNextFrame(): void;
}
