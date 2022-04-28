import { ISlider } from './slider';
import ColorIOS from '../color/color.ios';
import ViewIOS from '../view/view.ios';
import { SliderEvents } from './slider-events';
import UIControlEvents from '../../util/iOS/uicontrolevents';
import Image from '../image';

enum SliderState {
  normal,
  disabled,
  selected,
  pressed,
  focused // #available(iOS 9.0, *)
}

export default class SliderIOS<TEvent extends string = SliderEvents> extends ViewIOS<TEvent | SliderEvents, any, ISlider> implements ISlider {
  private _thumbImage: Image;
  private _value: number = 0;
  private _onValueChange: () => void;
  constructor(params?: Partial<ISlider>) {
    super(params);
    this.nativeObject.addJSTarget(this.handleValueChange.bind(this), UIControlEvents.valueChanged);
    // this.nativeObject.addJSTarget(this.handleEndTracking.bind(this), UIControlEvents.touchDragExit);
    // this.nativeObject.addJSTarget(this.handleStartTracking.bind(this), UIControlEvents.touchDragEnter);
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this.minTrackColor = ColorIOS.create('#00A1F1');
    this.maxTrackColor = ColorIOS.create(100, 183, 183, 183);
    this.minValue = 0;
    this.maxValue = 100;
    super.preConstruct(params);
  }

  createNativeObject() {
    return new __SF_UISlider();
  }
  skipDefaults: boolean;

  get thumbColor(): ColorIOS {
    return new ColorIOS({
      color: this.nativeObject.thumbTintColor
    });
  }
  set thumbColor(value: ColorIOS) {
    this.nativeObject.thumbTintColor = value.nativeObject;
  }

  get thumbImage(): Image {
    return this._thumbImage;
  }
  set thumbImage(value: Image) {
    this._thumbImage = value;
    this.nativeObject.setThumbImage(value.nativeObject, SliderState.normal);
    this.nativeObject.setThumbImage(value.nativeObject, SliderState.pressed);
  }

  get minTrackColor(): ColorIOS {
    return new ColorIOS({
      color: this.nativeObject.minimumTrackTintColor
    });
  }
  set minTrackColor(value: ColorIOS) {
    this.nativeObject.minimumTrackTintColor = value.nativeObject;
  }

  get maxTrackColor(): ColorIOS {
    return new ColorIOS({
      color: this.nativeObject.maximumTrackTintColor
    });
  }
  set maxTrackColor(value: ColorIOS) {
    this.nativeObject.maximumTrackTintColor = value.nativeObject;
  }

  get value(): number {
    return this.nativeObject.value;
  }
  set value(value: number) {
    this.nativeObject.value = value;
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

  get enabled(): boolean {
    return this.nativeObject.setEnabled;
  }
  set enabled(value: boolean) {
    this.nativeObject.setEnabled = value;
  }

  get onValueChange(): () => void {
    return this._onValueChange;
  }
  set onValueChange(value: () => void) {
    this._onValueChange = value;
  }

  handleValueChange() {
    const intValue = Math.round(this.value);
    this.nativeObject.setValueAnimated(intValue, false);
    if (this._value !== intValue) {
      this._value = intValue;
      this._onValueChange?.();
      this.emit('valueChange', this._value);
    }
  }

  handleStartTracking() {
    this.emit('trackStart');
  }

  handleEndTracking() {
    this.emit('trackEnd');
  }
}
