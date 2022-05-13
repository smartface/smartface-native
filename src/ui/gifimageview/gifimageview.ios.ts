import { GifImageViewEvents } from './gifimageview-events';
import ImageViewIOS from '../imageview/imageview.ios';
import { IGifImageView } from './gifimageview';
import ImageiOS from '../image/image.ios';
import { IFile } from '../../io/file/file';
import GifImageIOS from '../gifimage/gifimage.ios';
import { IGifImage } from '../gifimage/gifimage';
import { WithMobileOSProps } from '../../core/native-mobile-component';
import { ImageParams, ImageIOSProps, ImageAndroidProps, IImage } from '../image/image';
import ImageCacheType from '../shared/imagecachetype';

export default class GifImageViewIOS<TEvent extends string = GifImageViewEvents> extends ImageViewIOS<TEvent | GifImageViewEvents> implements IGifImageView {
  private _gifimage: IGifImage;
  private _loopCompletionCallback: (loopCountRemain: number) => void;
  private _isAnimating: boolean;
  constructor(params?: IGifImageView) {
    super(params);
  }

  createNativeObject(): any {
    return new __SF_FLAnimatedImageView();
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this._isAnimating = false;
    super.preConstruct(params);
  }
  get gifImage(): IGifImage {
    return this._gifimage;
  }
  set gifImage(value: IGifImage) {
    this._gifimage = value;
    this.nativeObject.animatedImage = value.nativeObject;
    this._isAnimating = true;
  }

  get currentFrame(): IImage {
    // TODO Recheck again after build
    return ImageiOS.createFromImage(this.nativeObject.currentFrame);
  }

  get currentFrameIndex(): number {
    return this.nativeObject.currentFrameIndex;
  }

  get isAnimating(): boolean {
    return this._isAnimating;
  }

  startAnimating(): void {
    this.nativeObject.startAnimating();
    this._isAnimating = true;
  }

  stopAnimating(): void {
    this.nativeObject.stopAnimating();
    this._isAnimating = false;
  }

  get loopCompletionCallback(): (loopCountRemain: number) => void {
    return this._loopCompletionCallback;
  }
  set loopCompletionCallback(value: (loopCountRemain: number) => void) {
    this._loopCompletionCallback = value;
    this.nativeObject.setLoopCompletionBlockWithJSValue(this.loopCompletionCallback);
  }

  loadFromFile(params: { file: IFile; fade?: boolean | undefined; width?: number | undefined; height?: number | undefined; android?: { useMemoryCache?: boolean | undefined } | undefined }): void {
    if (!params?.file) {
      return;
    }
    const file = params.file;
    const filePath = file.nativeObject.getActualPath();
    const gifImage = GifImageIOS.createFromFile(filePath);
    this.gifImage = gifImage;
  }

  loadFromUrl(): void {}

  fetchFromUrl(): void {}
}
