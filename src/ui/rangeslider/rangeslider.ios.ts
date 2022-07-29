import { IRangeSlider } from './rangeslider';
import { Point2D } from '../../primitive/point2d';
import Color from '../color';
import Image from '../image';
import ViewIOS from '../view/view.ios';
import { RangeSliderEvents } from './rangeslider-events';
import UIControlEvents from '../../util/iOS/uicontrolevents';

export default class RangeSliderIOS<TEvent extends string = RangeSliderEvents> extends ViewIOS<TEvent | RangeSliderEvents, any, IRangeSlider> implements IRangeSlider {
  private _rangeEnabled: boolean;
  private _thumbImage: Image;
  private _onValueChange: (value: number[]) => void;
  createNativeObject() {
    return new __SF_MultiSlider();
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this.nativeObject.layer.masksToBounds = false;
    this.nativeObject.isVertical = false;
    this.nativeObject.thumbCount = 2;
    this.nativeObject.snapStepSize = 1;
    this.nativeObject.minimumValue = 0;
    this.nativeObject.maximumValue = 5;
    this._rangeEnabled = true;
    super.preConstruct(params);
    this.addIOSProps(this.getIOSProps());
  }
  constructor(params: Partial<IRangeSlider> = {}) {
    super(params);

    this.nativeObject.addJSTarget(() => {
      this.onValueChange?.(this.value);
      this.emit('valueChange', this.value);
    }, UIControlEvents.valueChanged);
  }

  private getIOSProps() {
    const self = this;

    return {
      get thumbShadowColor(): Color {
        return self.nativeObject.thumbShadowColor;
      },
      set thumbShadowColor(value: Color) {
        self.nativeObject.thumbShadowColor = value.nativeObject;
      },
      get thumbShadowOpacity(): number {
        return self.nativeObject.thumbShadowOpacity;
      },
      set thumbShadowOpacity(value: number) {
        self.nativeObject.thumbShadowOpacity = value;
      },
      get thumbShadowRadius(): number {
        return self.nativeObject.thumbShadowRadius;
      },
      set thumbShadowRadius(value: number) {
        self.nativeObject.thumbShadowRadius = value;
      },
      get thumbShadowOffset(): Point2D {
        const size = self.nativeObject.thumbShadowOffset;
        return {
          x: size.width,
          y: size.height
        };
      },
      set thumbShadowOffset(value: Point2D) {
        const size = {
          width: value.x,
          height: value.y
        };
        self.nativeObject.thumbShadowOffset = size;
      },
      get showsThumbImageShadow(): boolean {
        return self.nativeObject.showsThumbImageShadow;
      },
      set showsThumbImageShadow(value: boolean) {
        self.nativeObject.showsThumbImageShadow = value;
      },
      applyThumbViewChanges: () => {
        self.nativeObject.applyThumbViewChanges();
      },
      get thumbImage(): Image {
        return self._thumbImage;
      },
      set thumbImage(value: Image) {
        self._thumbImage = value;
        self.nativeObject.thumbImage = self._thumbImage ? self._thumbImage.nativeObject : undefined;
      },
      get isHapticSnap(): boolean {
        return self.nativeObject.isHapticSnap;
      },
      set isHapticSnap(value: boolean) {
        self.nativeObject.isHapticSnap = value;
      }
    };
  }

  get rangeEnabled(): boolean {
    return this._rangeEnabled;
  }
  set rangeEnabled(value: boolean) {
    this._rangeEnabled = value;
    this.nativeObject.thumbCount = value ? 2 : 1;
  }

  get trackColor(): Color {
    return new Color({
      color: this.nativeObject.tintColor
    });
  }
  set trackColor(value: Color) {
    this.nativeObject.tintColor = value.nativeObject;
  }

  get outerTrackColor(): Color {
    return new Color({
      color: this.nativeObject.outerTrackColor
    });
  }
  set outerTrackColor(value: Color) {
    this.nativeObject.outerTrackColor = value.nativeObject;
  }

  get trackWeight(): number {
    return this.nativeObject.trackWidth;
  }
  set trackWeight(value: number) {
    this.nativeObject.trackWidth = value;
  }

  get value(): number[] {
    return this.nativeObject.value;
  }
  set value(value: number[]) {
    if (value.length !== this.nativeObject.thumbCount) {
      throw new TypeError('Value array length must be ' + this.nativeObject.thumbCount);
    }
    this.nativeObject.value = value;
  }

  get snapStepSize(): number {
    return this.nativeObject.snapStepSize;
  }
  set snapStepSize(value: number) {
    this.nativeObject.snapStepSize = value;
  }

  get minValue(): number {
    return this.nativeObject.minimumValue;
  }
  set minValue(value: number) {
    this.nativeObject.minimumValue = value;
  }

  get maxValue(): number {
    return this.nativeObject.maximumValue;
  }
  set maxValue(value: number) {
    this.nativeObject.maximumValue = value;
  }

  get isTrackRounded(): boolean {
    return this.nativeObject.hasRoundTrackEnds;
  }
  set isTrackRounded(value: boolean) {
    this.nativeObject.hasRoundTrackEnds = value;
  }

  get onValueChange(): (value: number[]) => void {
    return this._onValueChange;
  }
  set onValueChange(value: (value: number[]) => void) {
    this._onValueChange = value;
  }
}
