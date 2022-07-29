/*globals requireClass*/
import AndroidConfig from '../../util/Android/androidconfig';
import AndroidUnitConverter from '../../util/Android/unitconverter.js';
import { RangeSliderEvents } from './rangeslider-events';
import ViewAndroid from '../view/view.android';
import { IRangeSlider, RangeSliderAndroidProps, RangeSliderIOSProps } from './rangeslider';
import Color from '../color';
import { MobileOSProps } from '../../core/native-mobile-component';

const NativeSFRangeSlider = requireClass('io.smartface.android.sfcore.ui.rangeslider.SFRangeSlider');

export default class RangeSliderAndroid<TEvent extends string = RangeSliderEvents> extends ViewAndroid<TEvent | RangeSliderEvents, any, IRangeSlider> implements IRangeSlider {
  private _snapStepSize: number;
  private _minValue: number;
  private _maxValue: number;
  private _thumbSize: number;
  private _isTrackRounded: boolean;
  private _rangeEnabled: boolean;
  private _maxValueChanged: boolean;
  private _thumbBorderWidth: number;
  private _trackWeight: number;
  private _outerTrackWeight: number;
  private _trackColor: Color;
  private _outerTrackColor: Color;
  private _thumbColor: Color;
  private _thumbBorderColor: Color;
  private _onValueChange: (value: number[]) => void;
  protected preConstruct(params?: Partial<IRangeSlider<'valueChange' | 'touch' | 'touchCancelled' | 'touchEnded' | 'touchMoved', MobileOSProps<RangeSliderIOSProps, RangeSliderAndroidProps>>>): void {
    this._snapStepSize = 1;
    this._minValue = 0;
    this._maxValue = 5;
    this._thumbSize = 5;
    this._isTrackRounded = true;
    this._rangeEnabled = true;
    this._maxValueChanged = false;

    super.preConstruct(params);
  }
  createNativeObject() {
    return new NativeSFRangeSlider(AndroidConfig.activity);
  }
  constructor(params: Partial<IRangeSlider>) {
    super(params);

    const self = this;
    this.addAndroidProps({
      get thumbSize(): number {
        return self._thumbSize;
      },
      set thumbSize(value: number) {
        self._thumbSize = value;
        self.nativeObject.setThumbSize(AndroidUnitConverter.dpToPixel(self._thumbSize));
      },
      get thumbColor(): Color {
        return self._thumbColor;
      },
      set thumbColor(value: Color) {
        self._thumbColor = value;
        self.nativeObject.setThumbColor(self._thumbColor.nativeObject);
      },
      get thumbBorderColor(): Color {
        return self._thumbBorderColor;
      },
      set thumbBorderColor(value: Color) {
        self._thumbBorderColor = value;
        self.nativeObject.setThumbBoundaryColor(self._thumbBorderColor.nativeObject);
      },
      get thumbBorderWidth(): number {
        return self._thumbBorderWidth;
      },
      set thumbBorderWidth(value: number) {
        self._thumbBorderWidth = value;
        self.nativeObject.setThumbBoundarySize(AndroidUnitConverter.dpToPixel(self._thumbBorderWidth));
      },
      get outerTrackWeight(): number {
        return self._outerTrackWeight;
      },
      set outerTrackWeight(value: number) {
        self._outerTrackWeight = value;
        self.nativeObject.setBarWeight(AndroidUnitConverter.dpToPixel(self._outerTrackWeight));
      }
    });

    this.nativeObject.setOnValueChange({
      onValueChange: (leftPinValue: any, rightPinValue: any) => {
        const param = this._rangeEnabled ? [leftPinValue, rightPinValue] : [rightPinValue];
        this._onValueChange?.(param);
        this.emit(RangeSliderEvents.ValueChange, param);
      }
    });
  }

  get value(): number[] {
    return this.rangeEnabled ? [this.nativeObject.getLeftPinValue(), this.nativeObject.getRightPinValue()] : [this.nativeObject.getRightPinValue()];
  }
  set value(value: number[]) {
    const valueSize = value.length;
    if (this.rangeEnabled && valueSize === 2) {
      let leftItemValue = (value[0] - this.minValue) / this.snapStepSize,
        rightItemValue = (value[1] - this.minValue) / this.snapStepSize;
      this.nativeObject.setRangePinsByIndices(leftItemValue, rightItemValue);
    } else if (!this.rangeEnabled && valueSize === 1) {
      let rightItemValue = (value[0] - this.minValue) / this.snapStepSize;
      this.nativeObject.setRangePinsByIndices(0, rightItemValue);
    } else throw new Error('Value array length must be ' + (this.rangeEnabled ? '2' : '1'));
  }

  get snapStepSize(): number {
    return this._snapStepSize;
  }
  set snapStepSize(value: number) {
    this._snapStepSize = value;
    this.nativeObject.setTickInterval(value);
  }

  get minValue(): number {
    return this._minValue;
  }
  set minValue(value: number) {
    this._minValue = value;
    //This workaround is imp. to prevent min > max(default) exeption for first assign.
    if (!this._maxValueChanged) this.nativeObject.setTickEnd(this._minValue + 5);
    this.nativeObject.setTickStart(this._minValue);
  }

  get maxValue(): number {
    return this._maxValue;
  }
  set maxValue(value: number) {
    this._maxValue = value;
    this.nativeObject.setTickEnd(this._maxValue);
    this._maxValueChanged = true;
  }

  get trackWeight(): number {
    return this._trackWeight;
  }
  set trackWeight(value: number) {
    this._trackWeight = value;
    this.nativeObject.setConnectingLineWeight(AndroidUnitConverter.dpToPixel(this._trackWeight));
  }

  get isTrackRounded(): boolean {
    return this._isTrackRounded;
  }
  set isTrackRounded(value: boolean) {
    this._isTrackRounded = value;
    this.nativeObject.setBarRounded(this._isTrackRounded);
  }

  get rangeEnabled(): boolean {
    return this._rangeEnabled;
  }
  set rangeEnabled(value: boolean) {
    this._rangeEnabled = value;
    this.nativeObject.setRangeBarEnabled(this._rangeEnabled);
  }

  get trackColor(): Color {
    return this._trackColor;
  }
  set trackColor(value: Color) {
    this._trackColor = value;
    this.nativeObject.setConnectingLineColor(this._trackColor.nativeObject);
  }

  get outerTrackColor(): Color {
    return this._outerTrackColor;
  }
  set outerTrackColor(value: Color) {
    this._outerTrackColor = value;
    this.nativeObject.setBarColor(this._trackColor.nativeObject);
  }

  get onValueChange(): (value: number[]) => void {
    return this._onValueChange;
  }
  set onValueChange(value: (value: number[]) => void) {
    this._onValueChange = value;
  }
}
