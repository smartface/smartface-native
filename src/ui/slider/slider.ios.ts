import { ISlider } from '.';
import Color from '../color';
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
  createNativeObject() {
    return new __SF_UISlider();
  }
  constructor(params?: Partial<ISlider>) {
    super(params);
    this.nativeObject.addJSTarget(this.handleValueChange.bind(this), UIControlEvents.valueChanged);
    this.nativeObject.minimumTrackTintColor = Color.DARKGRAY.nativeObject;
    this.nativeObject.maximumTrackTintColor = Color.GREEN.nativeObject;
    this.nativeObject.minimumValue = 0;
    this.nativeObject.maximumValue = 100;
  }
  skipDefaults: boolean;

  get thumbColor(): Color {
    return new Color({
      color: this.nativeObject.thumbTintColor
    });
  }
  set thumbColor(value: Color) {
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

  get minTrackColor(): Color {
    return new Color({
      color: this.nativeObject.minimumTrackTintColor
    });
  }
  set minTrackColor(value: Color) {
    this.nativeObject.minimumTrackTintColor = value.nativeObject;
  }

  get maxTrackColor(): Color {
    return new Color({
      color: this.nativeObject.maximumTrackTintColor
    });
  }
  set maxTrackColor(value: Color) {
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
    let intValue = Math.round(this.value);
    this.nativeObject.setValueAnimated(intValue, false);
    if (this._value !== intValue) {
      this._value = intValue;
      this._onValueChange?.();
      this.emit(SliderEvents.ValueChange, this._value);
    }
  }
}
