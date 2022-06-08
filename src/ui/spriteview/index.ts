import Timer from '../../global/timer';
import { IImage } from '../image/image';
import ImageView from '../imageview';
import { ISpriteView, IStripeViewSetSpriteOptions } from './spriteview';

/**
 * @class SpriteView
 * @copyright Smartface 2022
 * @example
 * import SpriteView from "@smartface/native/ui/spriteview";
 * import { ImageFillType } from "@smartface/native/ui/imageview/imageview";
 * const spriteView = new SpriteView({
 *     width: 150,
 *     height: 200,
 *     imageFillType: ImageFillType.ASPECTFIT
 * });
 */
export default class SpriteView extends ImageView implements ISpriteView {
  private _currentFrame: number;
  private _frameCount: number;
  private _frames: IImage[];
  private _timer?: number;

  constructor(params?: Partial<ISpriteView>) {
    super(params);
  }

  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this._currentFrame = 0;
    this._frameCount = 0;
    this._frames = [];
    //@ts-ignore Since spriteview doesn't have Android/iOS specific classes, preConstruct doesn't exist in it. Therefore, this raises error but the method is there.
    super.preConstruct(params);
  }

  /**
   * Prepares the frame with the given value.
   * @function setSprite
   * @param {SetSpriteOptions} params
   * @example
   * spriteView.setSprite({
   *      sheet: Image.createFromFile("assets://braid.png"),
   *      frameX: 7,
   *      frameY: 4,
   *      frameCount: 27
   *});
   */
  setSprite(params: IStripeViewSetSpriteOptions) {
    this._frames = [];
    this._frameCount = params.frameCount || params.frameX * params.frameY;
    const frameWidth = params.sheet.width / params.frameX;
    const frameHeight = params.sheet.height / params.frameY;
    for (let currentY = 0; currentY < params.frameY; currentY++) {
      for (let currentX = 0; currentX < params.frameX && currentX + currentY < this._frameCount; currentX++) {
        params.sheet.crop(
          Math.round(currentX * frameWidth),
          Math.round(currentY * frameHeight),
          Math.round(frameWidth),
          Math.round(frameHeight),
          (e) => {
            this._frames.push(e.image);
          },
          () => {
            throw Error('failed to parse sheet.');
          }
        );
      }
    }
  }

  /**
   * Starts the animation according to the given `duration` value.
   * @function play
   * @param {number} duration Transition speed of frames
   * @example
   * spriteView.play(1000);
   */
  play(duration: number) {
    const frameDuration = duration / this._frameCount;
    this._timer = Timer.setInterval({
      delay: frameDuration,
      task: () => this.showNextFrame()
    });
  }

  /**
   * Stops animation.
   * @function stop
   * @example
   * spriteView.stop();
   */
  stop() {
    if (typeof this._timer === 'number') {
      Timer.clearTimer(this._timer);
    }
  }

  /**
   * Goes to the next frame.
   * @function showNextFrame
   * @example
   * spriteView.showNextFrame();
   */
  showNextFrame() {
    this._currentFrame = (this._currentFrame + 1) % this._frameCount;
    this.image = this._frames[this._currentFrame];
  }
}
