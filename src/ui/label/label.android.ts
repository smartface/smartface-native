import Color from '../color';
import Font from '../font';
import TextAlignment from '../shared/textalignment';
import ViewAndroid from '../view/view.android';
import { ILabel, LabelAndroidProps } from './label';
import { ViewEvents } from '../view/view-events';
import ViewState, { IViewState } from '../shared/viewState';
import EllipsizeMode from '../shared/ellipsizemode';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import TextDirection from '../shared/textdirection';
import AndroidConfig from '../../util/Android/androidconfig';
import TypeValue from '../../util/Android/typevalue';
import TypeUtil from '../../util/type';
import isViewState from '../../util/isViewState';

const NativeTextView = requireClass('androidx.appcompat.widget.AppCompatTextView');
const NativeTextViewCompat = requireClass('androidx.core.widget.TextViewCompat');
const NativeColorStateList = requireClass('android.content.res.ColorStateList');
const NativeTextUtils = requireClass('android.text.TextUtils');

const TextAlignmentDic = {
  [TextAlignment.MIDLEFT]: 16 | 3, // Gravity.CENTER_VERTICAL | Gravity.LEFT
  [TextAlignment.MIDCENTER]: 17, // Gravity.CENTER
  [TextAlignment.MIDRIGHT]: 16 | 5 // Gravity.CENTER_VERTICAL | Gravity.RIGHT
};

const NativeEllipsizeMode = {
  [EllipsizeMode.START]: NativeTextUtils.TruncateAt.START,
  [EllipsizeMode.MIDDLE]: NativeTextUtils.TruncateAt.MIDDLE,
  [EllipsizeMode.END]: NativeTextUtils.TruncateAt.END,
  [EllipsizeMode.NONE]: null
};

const MAX_INT_VALUE = 2147483647;
const AUTO_SIZE_TEXT_TYPE_NONE = 0;
const MINIMUM_FONT_SIZE = 7;

export default class LabelAndroid<TEvent extends string = ViewEvents, TNative = LabelAndroidProps, TProps extends ILabel = ILabel> extends ViewAndroid<TEvent, TNative, TProps> implements ILabel {
  private _ellipsizeMode: ILabel['ellipsizeMode'];
  protected _textAlignment: TextAlignment;
  protected viewNativeDefaultTextAlignment: number;
  private skipDefaults: boolean;
  private _adjustFontSizeToFit: boolean;
  private _minimumFontSize: number;
  private _textDirection: TextDirection;
  private _adjustableFontSizeStep: number;
  private fontInitial: Font | null;
  protected _textColor: ILabel['textColor'];
  constructor(params: Partial<TProps>) {
    super(params);
  }
  protected preConstruct(params?: Partial<TProps>): void {
    super.preConstruct(params);
    this._adjustFontSizeToFit = false;
    this._minimumFontSize = MINIMUM_FONT_SIZE;
    this._adjustableFontSizeStep = 1;
    this.fontInitial = null;
    this._textColor = Color.BLUE;
    this.viewNativeDefaultTextAlignment = TextAlignmentDic[TextAlignment.MIDLEFT];
    this.textAlignment = TextAlignment.MIDLEFT;
    super.preConstruct(params);
    this.initAndroidProps();
  }

  protected createNativeObject() {
    return new NativeTextView(AndroidConfig.activity);
  }

  toString() {
    return 'Label';
  }

  private initAndroidProps() {
    const self = this;
    this.addAndroidProps({
      get textDirection(): TextDirection {
        return self._textDirection;
      },
      set textDirection(value: TextDirection) {
        self._textDirection = value;
        self.nativeObject.setTextDirection(value);
      },
      get adjustableFontSizeStep(): LabelAndroid['_adjustableFontSizeStep'] {
        return self._adjustableFontSizeStep;
      },
      set adjustableFontSizeStep(value: LabelAndroid['_adjustableFontSizeStep']) {
        self._adjustableFontSizeStep = value;
        if (value) {
          self.setAutoSizeTextTypeUniformWithConfiguration();
        }
      }
    });
  }

  private setAutoSizeTextTypeUniformWithConfiguration() {
    const maximumTextSize = AndroidUnitConverter.pixelToDp(this.nativeObject.getTextSize());
    if (maximumTextSize <= this.minimumFontSize) {
      throw new Error(`Maximum auto-size text size (${maximumTextSize}) is less or equal to minimum auto-size text size (${this.minimumFontSize})`);
    }
    NativeTextViewCompat.setAutoSizeTextTypeUniformWithConfiguration(this.nativeObject, this.minimumFontSize, maximumTextSize, this.android.adjustableFontSizeStep, TypeValue.COMPLEX_UNIT_DIP);
  }

  private createColorStateList(textColors: IViewState<Color>) {
    const colorsSets: Color[] = [];
    const statesSet: any[] = [];
    if (textColors.normal) {
      statesSet.push(ViewAndroid.State.STATE_NORMAL);
      colorsSets.push(textColors.normal.nativeObject);
    }
    if (textColors.disabled) {
      statesSet.push(ViewAndroid.State.STATE_DISABLED);
      colorsSets.push(textColors.disabled.nativeObject);
    }
    if (textColors.selected) {
      statesSet.push(ViewAndroid.State.STATE_SELECTED);
      colorsSets.push(textColors.selected.nativeObject);
    }
    if (textColors.pressed) {
      statesSet.push(ViewAndroid.State.STATE_PRESSED);
      colorsSets.push(textColors.pressed.nativeObject);
    }
    if (textColors.focused) {
      statesSet.push(ViewAndroid.State.STATE_FOCUSED);
      colorsSets.push(textColors.focused.nativeObject);
    }
    return new NativeColorStateList(array(statesSet), array(colorsSets, 'int'));
  }

  get font() {
    const nativeTypeface = this.nativeObject.getTypeface();
    const textSize = AndroidUnitConverter.pixelToDp(this.nativeObject.getTextSize());
    return new Font({
      nativeObject: nativeTypeface,
      size: textSize
    });
  }
  set font(value: ILabel['font']) {
    this.fontInitial = value;
    this.nativeObject.setTypeface(value.nativeObject);
    if (value.size && typeof value.size === 'number') {
      this.nativeObject.setTextSize(TypeValue.COMPLEX_UNIT_DIP, value.size);
    }
  }
  get multiline(): ILabel['multiline'] {
    return this.nativeObject.getMaxLines() !== 1;
  }
  set multiline(value: ILabel['multiline']) {
    this.nativeObject.setSingleLine(!value);
  }
  get maxLines(): ILabel['maxLines'] {
    const mMaxLines = this.nativeObject.getMaxLines();
    return mMaxLines === MAX_INT_VALUE ? 0 : mMaxLines;
  }
  set maxLines(value: ILabel['maxLines']) {
    const valueInt = isNaN(value) ? 0 : value;
    this.nativeObject.setMaxLines(valueInt === 0 ? MAX_INT_VALUE : valueInt);
  }
  get ellipsizeMode(): ILabel['ellipsizeMode'] {
    return this._ellipsizeMode;
  }
  set ellipsizeMode(value: ILabel['ellipsizeMode']) {
    this._ellipsizeMode = value;
    this.nativeObject.setEllipsize(NativeEllipsizeMode[value]);
  }
  get text(): ILabel['text'] {
    return this.nativeObject.getText().toString();
  }
  set text(value: ILabel['text']) {
    this.nativeObject.setText(String(value));
  }
  get textAlignment(): ILabel['textAlignment'] {
    return this._textAlignment;
  }
  set textAlignment(value: ILabel['textAlignment']) {
    this._textAlignment = value;
    this.nativeObject.setGravity(TextAlignmentDic[this._textAlignment]);
  }
  get textColor(): ILabel['textColor'] {
    return this._textColor;
  }
  set textColor(value: ILabel['textColor']) {
    if (value instanceof Color && value.nativeObject) {
      this._textColor = value;
      this.nativeObject.setTextColor(value.nativeObject);
    } else if (isViewState(value)) {
      this._textColor = value;
      const textColorStateListDrawable = this.createColorStateList(value);
      this.nativeObject.setTextColor(textColorStateListDrawable);
    }
  }
  get adjustFontSizeToFit(): ILabel['adjustFontSizeToFit'] {
    return this._adjustFontSizeToFit;
  }
  set adjustFontSizeToFit(value: ILabel['adjustFontSizeToFit']) {
    this._adjustFontSizeToFit = value;
    if (value) {
      this.setAutoSizeTextTypeUniformWithConfiguration();
    } else {
      NativeTextViewCompat.setAutoSizeTextTypeWithDefaults(this.nativeObject, AUTO_SIZE_TEXT_TYPE_NONE);
    }
  }
  get minimumFontSize(): ILabel['minimumFontSize'] {
    return this._minimumFontSize;
  }
  set minimumFontSize(value: ILabel['minimumFontSize']) {
    this._minimumFontSize = value;
    if (this.adjustFontSizeToFit) {
      this.setAutoSizeTextTypeUniformWithConfiguration();
    }
  }

  get padding() {
    return this.paddingLeft;
  }
  set padding(value: ILabel['padding']) {
    const paddingNative = AndroidUnitConverter.dpToPixel(value);
    this.nativeObject.setPaddingRelative(paddingNative, paddingNative, paddingNative, paddingNative);
  }
  get paddingLeft() {
    return AndroidUnitConverter.pixelToDp(this.nativeObject.getPaddingLeft());
  }
  set paddingLeft(value: ILabel['paddingLeft']) {
    const paddingBottom = this.paddingBottom;
    const paddingRight = this.paddingRight;
    const paddingTop = this.paddingTop;
    this.nativeObject.setPaddingRelative(
      AndroidUnitConverter.dpToPixel(value),
      AndroidUnitConverter.dpToPixel(paddingTop),
      AndroidUnitConverter.dpToPixel(paddingRight),
      AndroidUnitConverter.dpToPixel(paddingBottom)
    );
  }
  get paddingRight() {
    return AndroidUnitConverter.pixelToDp(this.nativeObject.getPaddingRight());
  }
  set paddingRight(value: ILabel['paddingRight']) {
    const paddingLeft = this.paddingLeft;
    const paddingBottom = this.paddingBottom;
    const paddingTop = this.paddingTop;
    this.nativeObject.setPaddingRelative(
      AndroidUnitConverter.dpToPixel(paddingLeft),
      AndroidUnitConverter.dpToPixel(paddingTop),
      AndroidUnitConverter.dpToPixel(value),
      AndroidUnitConverter.dpToPixel(paddingBottom)
    );
  }
  get paddingTop() {
    return AndroidUnitConverter.pixelToDp(this.nativeObject.getPaddingTop());
  }
  set paddingTop(value: ILabel['paddingTop']) {
    const paddingLeft = this.paddingLeft;
    const paddingBottom = this.paddingBottom;
    const paddingRight = this.paddingRight;
    this.nativeObject.setPaddingRelative(
      AndroidUnitConverter.dpToPixel(paddingLeft),
      AndroidUnitConverter.dpToPixel(value),
      AndroidUnitConverter.dpToPixel(paddingRight),
      AndroidUnitConverter.dpToPixel(paddingBottom)
    );
  }
  get paddingBottom() {
    return AndroidUnitConverter.pixelToDp(this.nativeObject.getPaddingBottom());
  }
  set paddingBottom(value: ILabel['paddingBottom']) {
    const paddingLeft = this.paddingLeft;
    const paddingTop = this.paddingTop;
    const paddingRight = this.paddingRight;
    this.nativeObject.setPaddingRelative(
      AndroidUnitConverter.dpToPixel(paddingLeft),
      AndroidUnitConverter.dpToPixel(paddingTop),
      AndroidUnitConverter.dpToPixel(paddingRight),
      AndroidUnitConverter.dpToPixel(value)
    );
  }
}
