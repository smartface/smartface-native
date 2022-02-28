import TextDirection from 'ui/android/textdirection';
import Color from '../color';
import EllipsizeMode from '../ellipsizemode';
import Font from '../font';
import TextAlignment from '../textalignment';
import { ViewAndroid } from '../view/view.android';
import { AbstractLabel, ILabel } from './label';
import { TypeUtil, TypeValue } from '../../util';
import { ViewEvents } from '../view/view-event';

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
const MIDLEFT_GRAVITY = 16 | 3;
const MIDCENTER_GRAVITY = 17;
const MINIMUM_FONT_SIZE = 7;

export default class LabelAndroid<TEvent extends string = ViewEvents> extends ViewAndroid<TEvent> implements ILabel {
  private _ellipsizeMode: AbstractLabel['ellipsizeMode'];
  protected _android: AbstractLabel['android'];
  protected _textAlignment: TextAlignment;
  protected viewNativeDefaultTextAlignment: number = null;
  private skipDefaults: boolean;
  private _adjustFontSizeToFit = false;
  private _minimumFontSize = MINIMUM_FONT_SIZE;
  private _textDirection: TextDirection;
  private _adjustableFontSizeStep = 1;
  private fontInitial: Font = null;
  private _textColor: AbstractLabel['textColor'] = Color.BLUE;
  constructor(params: Partial<LabelAndroid> = {}) {
    super(params);
    if (!this.nativeObject) {
      throw new Error("Can't create instance from ViewGroup. It is an abstract class.");
    }

    this.initWithlabelType();
    this.initAndroidProps();
  }

  get android() {
    return this._android;
  }

  toString() {
    return 'Label';
  }

  private initWithlabelType() {
    if (!this.nativeObject) {
      this._nativeObject = new NativeTextView(AndroidConfig.activity);
      this._textAlignment = TextAlignment.MIDLEFT;
      this.nativeObject.setGravity(MIDLEFT_GRAVITY);
      this.viewNativeDefaultTextAlignment = MIDLEFT_GRAVITY;
    } else {
      if (!this.skipDefaults) {
        this._textAlignment = TextAlignment.MIDCENTER;
        this.nativeObject.setGravity(MIDCENTER_GRAVITY);
        this.viewNativeDefaultTextAlignment = MIDCENTER_GRAVITY;
      }
    }
  }

  private initAndroidProps() {
    const self = this;
    this._android = {
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
    };
  }

  private setAutoSizeTextTypeUniformWithConfiguration() {
    const maximumTextSize = AndroidUnitConverter.pixelToDp(this.nativeObject.getTextSize());
    if (maximumTextSize <= this.minimumFontSize) {
      throw new Error(`Maximum auto-size text size (${maximumTextSize}) is less or equal to minimum auto-size text size (${this.minimumFontSize})`);
    }
    NativeTextViewCompat.setAutoSizeTextTypeUniformWithConfiguration(this.nativeObject, this.minimumFontSize, maximumTextSize, this.android.adjustableFontSizeStep, TypeValue.COMPLEX_UNIT_DIP);
  }

  private createColorStateList(textColors: Record<string, Color> /**TODO: Change this after Button color states are done */) {
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
  set font(value: AbstractLabel['font']) {
    this.fontInitial = value;
    this.nativeObject.setTypeface(value.nativeObject);
    if (value.size && typeof value.size === 'number') {
      this.nativeObject.setTextSize(TypeValue.COMPLEX_UNIT_DIP, value.size);
    }
  }
  get multiline(): AbstractLabel['multiline'] {
    return this.nativeObject.getMaxLines() !== 1;
  }
  set multiline(value: AbstractLabel['multiline']) {
    this.nativeObject.setSingleLine(!value);
  }
  get maxLines(): AbstractLabel['maxLines'] {
    const mMaxLines = this.nativeObject.getMaxLines();
    return mMaxLines === MAX_INT_VALUE ? 0 : mMaxLines;
  }
  set maxLines(value: AbstractLabel['maxLines']) {
    this.nativeObject.setMaxLines(value === 0 ? MAX_INT_VALUE : value);
  }
  get ellipsizeMode(): AbstractLabel['ellipsizeMode'] {
    return this._ellipsizeMode;
  }
  set ellipsizeMode(value: AbstractLabel['ellipsizeMode']) {
    this._ellipsizeMode = value;
    this.nativeObject.setEllipsize(NativeEllipsizeMode[value]);
  }
  get text(): AbstractLabel['text'] {
    return this.nativeObject.getText().toString();
  }
  set text(value: AbstractLabel['text']) {
    this.nativeObject.setText(String(value));
  }
  get textAlignment(): AbstractLabel['textAlignment'] {
    return this._textAlignment;
  }
  set textAlignment(value: AbstractLabel['textAlignment']) {
    this._textAlignment = value;
    this.nativeObject.setGravity(TextAlignmentDic[this._textAlignment]);
  }
  get textColor(): AbstractLabel['textColor'] {
    return this._textColor;
  }
  set textColor(value: AbstractLabel['textColor']) {
    if (value.nativeObject && value instanceof Color) {
      this._textColor = value;
      this.nativeObject.setTextColor(value.nativeObject);
    } else if (TypeUtil.isObject(value)) {
      this._textColor = value;
      const textColorStateListDrawable = this.createColorStateList(value as Record<string, Color>); /**TODO: Look after button typescript is finished */
      this.nativeObject.setTextColor(textColorStateListDrawable);
    }
  }
  get adjustFontSizeToFit(): AbstractLabel['adjustFontSizeToFit'] {
    return this._adjustFontSizeToFit;
  }
  set adjustFontSizeToFit(value: AbstractLabel['adjustFontSizeToFit']) {
    this._adjustFontSizeToFit = value;
    if (value) {
      this.setAutoSizeTextTypeUniformWithConfiguration();
    } else {
      NativeTextViewCompat.setAutoSizeTextTypeWithDefaults(this.nativeObject, AUTO_SIZE_TEXT_TYPE_NONE);
    }
  }
  get minimumFontSize(): AbstractLabel['minimumFontSize'] {
    return this._minimumFontSize;
  }
  set minimumFontSize(value: AbstractLabel['minimumFontSize']) {
    this._minimumFontSize = value;
    if (this.adjustFontSizeToFit) {
      this.setAutoSizeTextTypeUniformWithConfiguration();
    }
  }

  get padding() {
    return this.paddingLeft;
  }
  set padding(value: AbstractLabel['padding']) {
    const paddingNative = AndroidUnitConverter.dpToPixel(value);
    this.nativeObject.setPaddingRelative(paddingNative, paddingNative, paddingNative, paddingNative);
  }
  get paddingLeft() {
    return AndroidUnitConverter.pixelToDp(this.nativeObject.getPaddingLeft());
  }
  set paddingLeft(value: AbstractLabel['paddingLeft']) {
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
  set paddingRight(value: AbstractLabel['paddingRight']) {
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
  set paddingTop(value: AbstractLabel['paddingTop']) {
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
  set paddingBottom(value: AbstractLabel['paddingBottom']) {
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
