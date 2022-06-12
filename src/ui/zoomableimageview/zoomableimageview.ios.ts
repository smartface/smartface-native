import ImageIOS from '../image/image.ios';
import ImageViewIOS from '../imageview/imageview.ios';
import ViewIOS from '../view/view.ios';
import { IZoomableImageView } from './zoomableimageview';
import { IImageView } from '../imageview/imageview';

export default class ZoomableImageViewIOS extends ViewIOS implements IZoomableImageView {
  private _zoomScale: number;
  private _animated: boolean;
  private _imageView: IImageView; // This is a mock native object.
  private _frame: __SF_NSRect;

  constructor(params?: any) {
    super(params);
  }
  loadFromUrl(params?: any): void {
    return this._imageView.loadFromUrl(params);
  }
  loadFromFile(params: any): void {
    return this._imageView.loadFromFile(params);
  }
  fetchFromUrl(params: any): void {
    return this._imageView.fetchFromUrl(params);
  }

  protected createNativeObject() {
    return new __SF_UIScrollView();
  }

  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this._imageView = new ImageViewIOS();
    this._animated = params?.animated || false;
    this.zoomScale = params?.zoomScale || 0;
    this._imageView.nativeObject.yoga.isEnabled = false;
    this._imageView.nativeObject.layer.masksToBounds = false;
    this._imageView.nativeObject.layer.clipsToBounds = false;
    this._imageView.nativeObject.imageDidSet = () => this.calculateImageViewFrame();
    this.nativeObject.addSubview(this._imageView.nativeObject);
    this.nativeObject.showsHorizontalScrollIndicator = false;
    this.nativeObject.showsVerticalScrollIndicator = false;
    this.nativeObject.viewForZoomingCallback = this._imageView.nativeObject;
    this.nativeObject.maximumZoomScale = 3.0; //Default
    this.nativeObject.setValueForKey(false, 'bounces'); //Default
    this.nativeObject.setValueForKey(false, 'bouncesZoom'); //Default
    this.nativeObject.setValueForKey(2, 'contentInsetAdjustmentBehavior');
    this._frame = {} as any;
    this.nativeObject.addFrameObserver();
    this.nativeObject.frameObserveHandler = (e: { frame: __SF_NSRect }) => {
      if (JSON.stringify(this._frame) !== JSON.stringify(e.frame)) {
        this.calculateImageViewFrame(e.frame);
      }
    };
    super.preConstruct(params);
    this.addIOSProps(this.getIOSProperty());
  }
  get image(): IZoomableImageView['image'] {
    return this._imageView.image;
  }

  set image(value) {
    this._imageView.image = value;
  }

  get tintColor(): IZoomableImageView['tintColor'] {
    return this._imageView.tintColor;
  }

  set tintColor(value) {
    this._imageView.tintColor = value;
  }

  get imageFillType() {
    return this._imageView.imageFillType;
  }

  set imageFillType(value) {
    this._imageView.imageFillType = value;
    this.calculateImageViewFrame();
  }

  get minimumZoomScale(): number {
    return this.nativeObject.minimumZoomScale;
  }

  set minimumZoomScale(value: number) {
    this.nativeObject.minimumZoomScale = value;
  }

  get maximumZoomScale(): number {
    return this.nativeObject.maximumZoomScale;
  }

  set maximumZoomScale(value: number) {
    this.nativeObject.maximumZoomScale = value;
  }

  get animated(): boolean {
    return this._animated;
  }

  set animated(value: boolean) {
    this._animated = value;
  }

  get zoomScale(): number {
    return this.nativeObject.zoomScale;
  }

  set zoomScale(value: number) {
    if (value > this.maximumZoomScale) {
      this.nativeObject.setZoomScaleAnimated(this.maximumZoomScale, this.animated);
    } else if (value < this.minimumZoomScale) {
      this.nativeObject.setZoomScaleAnimated(this.minimumZoomScale, this.animated);
    } else {
      this.nativeObject.setZoomScaleAnimated(value, this.animated);
    }
  }

  private getIOSProperty(): IZoomableImageView['ios'] {
    const self = this;
    return {
      get minimumNumberOfTouches() {
        return self.nativeObject.panGestureRecognizer.minimumNumberOfTouches;
      },
      set minimumNumberOfTouches(value) {
        self.nativeObject.panGestureRecognizer.minimumNumberOfTouches = value;
      },
      get maximumNumberOfTouches() {
        return self.nativeObject.panGestureRecognizer.maximumNumberOfTouches;
      },
      set maximumNumberOfTouches(value) {
        self.nativeObject.panGestureRecognizer.maximumNumberOfTouches = value;
      },
      get bounces() {
        return self.nativeObject.valueForKey('bounces');
      },
      set bounces(value) {
        self.nativeObject.setValueForKey(value, 'bounces');
      },
      get bouncesZoom() {
        return self.nativeObject.valueForKey('bouncesZoom');
      },
      set bouncesZoom(value) {
        self.nativeObject.setValueForKey(value, 'bouncesZoom');
      }
    };
  }

  private calculateImageViewFrame(frame?: __SF_NSRect) {
    this.nativeObject.zoomScale = 1;
    if (this.imageFillType === ImageViewIOS.FillType.ASPECTFILL || this.imageFillType === ImageViewIOS.FillType.STRETCH || this.imageFillType === ImageViewIOS.FillType.ASPECTFIT) {
      const innerFrame = frame || this.nativeObject.frame;
      this._imageView.nativeObject.frame = innerFrame;
      this.nativeObject.contentSize = {
        width: innerFrame.width,
        height: innerFrame.height
      } as any;
    } else if (this.image instanceof ImageIOS && this.image?.nativeObject?.size) {
      const innerFrame = frame || this.nativeObject.frame;
      const image = this.image;
      const width = Math.max(innerFrame.width || 0, image.width);
      const height = Math.max(innerFrame.height || 0, image.height);
      this._imageView.nativeObject.frame = {
        x: 0,
        y: 0,
        width: width,
        height: height
      };
      this.nativeObject.contentSize = { width: width, height: height } as any;
      this.nativeObject.contentOffset = { x: 0, y: 0 };
    }
  }
}
