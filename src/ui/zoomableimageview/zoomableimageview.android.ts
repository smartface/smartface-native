import AndroidConfig from '../../util/Android/androidconfig';
import ImageViewAndroid from '../imageview/imageview.android';
import { IZoomableImageView } from './zoomableimageview';

const NativePhotoViewer = requireClass('com.github.chrisbanes.photoview.PhotoView');

export default class ZoomableImageViewAndroid extends ImageViewAndroid implements IZoomableImageView {
  _animated: boolean;
  private _minimumZoomScale: number;
  private _maximumZoomScale: number;
  private _mediumZoomScale: number;
  constructor(params?: Partial<IZoomableImageView>) {
    super(params);
  }

  protected createNativeObject() {
    return new NativePhotoViewer(AndroidConfig.activity);
  }

  protected preConstruct(params?: Partial<IZoomableImageView>): void {
    this._animated = params?.animated || false;
    this.zoomScale = params?.zoomScale || 0;
    this._minimumZoomScale = 1;
    super.preConstruct(params);
    this.addAndroidProps(this.getAndroidProps());
  }

  private getAndroidProps(): IZoomableImageView['android'] {
    const self = this;
    return {
      get mediumZoomScale() {
        return self.nativeObject.getMediumScale();
      },
      set mediumZoomScale(value) {
        self._mediumZoomScale = value;
        self.checkZoomLevels(self._minimumZoomScale, self._maximumZoomScale, value);
        self.nativeObject.setMediumScale(float(value));
      },
      get zoomEnabled() {
        return self.nativeObject.isZoomEnabled();
      },
      set zoomEnabled(value) {
        self.nativeObject.setZoomable(value);
      }
    };
  }
  get maximumZoomScale(): number {
    return this.nativeObject.getMaximumScale();
  }
  set maximumZoomScale(maxScale: number) {
    this._maximumZoomScale = maxScale;
    this.checkZoomLevels(this._minimumZoomScale, maxScale, this._mediumZoomScale);
    this.nativeObject.setMaximumScale(float(maxScale));
  }
  get minimumZoomScale(): number {
    return this.nativeObject.getMinimumScale();
  }
  set minimumZoomScale(minScale: number) {
    this._minimumZoomScale = minScale;
    this.checkZoomLevels(minScale, this._maximumZoomScale, this._mediumZoomScale);
    this.nativeObject.setMinimumScale(float(minScale));
  }
  get animated(): boolean {
    return this._animated;
  }
  set animated(value: boolean) {
    this._animated = value;
  }
  get zoomScale(): number {
    return this.nativeObject.getScale();
  }
  set zoomScale(value: number) {
    if (value > this.maximumZoomScale) {
      this.nativeObject.setScale(this.maximumZoomScale, this.animated);
    } else if (value < this.minimumZoomScale) {
      this.nativeObject.setScale(this.minimumZoomScale, this.animated);
    } else {
      this.nativeObject.setScale(value, this.animated);
    }
  }
  calculateImageViewFrame(frame?: any) {}

  private checkZoomLevels(minZoom: number, maxZoom: number, midZoom: number) {
    if (minZoom >= midZoom) {
      throw new Error('Minimum zoom has to be less than Medium zoom. Assign appropriate value to minimumZoomScale property');
    } else if (midZoom >= maxZoom) {
      throw new Error('Medium zoom has to be less than Maximum zoom. Assign appropriate value to maximumZoomScale property');
    }
  }
}
