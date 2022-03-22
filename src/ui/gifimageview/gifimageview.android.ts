import { IGifImageView } from '.';
import GifImage from '../gifimage';
import ImageAndroid from '../image/image.android';
import ImageViewAndroid from '../imageview/imageview.android';
import { GifImageViewEvents } from './gifimageview-events';

export default class GifImageViewAndroid<TEvent extends string = GifImageViewEvents> extends ImageViewAndroid<TEvent | GifImageViewEvents> implements IGifImageView {
  private _gifImage: GifImage;
  constructor(params: Partial<IGifImageView> = {}) {
    super(params);
  }

  get gifImage(): GifImage {
    return this._gifImage;
  }
  set gifImage(value: GifImage) {
    // We don't use backgroundImage of view. Because, it breaks image fill type.
    if (!(value instanceof GifImage)) return;
    this._gifImage = value;
    this.nativeObject.setImageDrawable(null);
    this.nativeObject.setImageDrawable(this._gifImage.nativeObject);
  }

  get currentFrame(): ImageAndroid {
    // TODO Recheck after build
    return new ImageAndroid({
      bitmap: this.gifImage.nativeObject.getCurrentFrame()
    });
  }

  get currentFrameIndex(): number {
    return this.gifImage.nativeObject.getCurrentFrameIndex();
  }

  get isAnimating(): boolean {
    return this.gifImage.nativeObject.isPlaying();
  }

  startAnimating(): void {
    this.gifImage.nativeObject.start();
  }

  stopAnimating(): void {
    this.gifImage.nativeObject.stop();
  }

  loopCompletionCallback(loopCountRemain: number): void {
    // TODO Old version has not loopCompletionCallback function
  }
}
