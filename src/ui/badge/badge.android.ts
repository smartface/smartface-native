import { IBadge } from './badge';
import NativeComponent from '../../core/native-component';
import Color from '../color';
import ViewAndroid from '../view/view.android';
import ViewState, { IViewState } from '../shared/viewState';
import Font from '../font';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import AndroidConfig from '../../util/Android/androidconfig';
import TypeValue from '../../util/Android/typevalue';
import isViewState from '../../util/isViewState';

const NativeGradientDrawable = requireClass('android.graphics.drawable.GradientDrawable');
const NativeColorStateList = requireClass('android.content.res.ColorStateList');
const NativeTextView = requireClass('android.widget.TextView');

const CENTER = 17;

const TextViewContentPadding = {
  start: AndroidUnitConverter.dpToPixel(5),
  top: AndroidUnitConverter.dpToPixel(1),
  end: AndroidUnitConverter.dpToPixel(5),
  bottom: AndroidUnitConverter.dpToPixel(1)
};

export default class BadgeAndroid extends NativeComponent implements IBadge {
  protected createNativeObject() {
    return new NativeTextView(AndroidConfig.activity);
  }
  private _borderColor = Color.WHITE;
  private _visible = false;
  private _text = '';
  private _backgroundColor: IBadge['backgroundColor'];
  private _textColor: IBadge['textColor'];
  private _font: IBadge['font'];
  private _borderRadius: number = AndroidUnitConverter.dpToPixel(10);
  private _borderWidth: number = AndroidUnitConverter.dpToPixel(2);
  private nativeGradientDrawable = new NativeGradientDrawable();
  constructor(params: Partial<IBadge> = {}) {
    super(params);

    this.nativeObject.setGravity(CENTER);
    this.nativeObject.setPaddingRelative(TextViewContentPadding.start, TextViewContentPadding.top, TextViewContentPadding.end, TextViewContentPadding.bottom);

    this.nativeGradientDrawable = new NativeGradientDrawable();
    this.nativeGradientDrawable.setCornerRadius(this._borderRadius);

    this.setDefaults();
  }

  move(x: number, y: number): void {
    this.nativeObject.setTranslationX(AndroidUnitConverter.dpToPixel(x));
    this.nativeObject.setTranslationY(AndroidUnitConverter.dpToPixel(y));
  }

  get text(): IBadge['text'] {
    return this._text;
  }
  set text(value: IBadge['text']) {
    this._text = value;
    this.nativeObject.setText(String(value));
  }
  get visible(): IBadge['visible'] {
    return this._visible;
  }
  set visible(value: IBadge['visible']) {
    this.nativeObject.setVisibility(value ? 0 : 4);
  }
  get backgroundColor(): IBadge['backgroundColor'] | null {
    return this._backgroundColor;
  }
  set backgroundColor(value: IBadge['backgroundColor'] | null) {
    this._backgroundColor = value;
    if (this.nativeObject && value) {
      this.nativeGradientDrawable.setColor(value.nativeObject);
    } else if (value?.nativeObject) {
      this.nativeGradientDrawable.mutate(); //Makes mutable, applied to fix unexpected behavior
      this.nativeGradientDrawable.setStroke(this._borderWidth, this.borderColor?.nativeObject);
    }
    this.nativeObject.setBackground(this.nativeGradientDrawable);
  }
  get textColor(): IBadge['textColor'] {
    return this._textColor;
  }
  set textColor(value: IBadge['textColor']) {
    this._textColor = value;
    if (this.nativeObject && value instanceof Color) {
      this.nativeObject.setTextColor(value.nativeObject);
    } else if (isViewState(value)) {
      const textColorStateListDrawable = this.createColorStateList(value);
      this.nativeObject.setTextColor(textColorStateListDrawable);
    }
  }
  get font(): IBadge['font'] {
    return this._font;
  }
  set font(value: IBadge['font']) {
    this._font = value;
    if (this.nativeObject && value) {
      this.nativeObject.setTypeface(value.nativeObject);
      if (typeof value.size === 'number') {
        this.nativeObject.setTextSize(TypeValue.COMPLEX_UNIT_DIP, value.size);
      }
    }
  }
  get borderColor(): IBadge['borderColor'] {
    return this._borderColor;
  }
  set borderColor(value: IBadge['borderColor']) {
    if (!(value instanceof Color)) {
      return;
    }

    this._borderColor = value;
    this.backgroundColor = null; //re-set Drawable
  }
  get borderWidth(): IBadge['borderWidth'] {
    return this._borderWidth;
  }
  set borderWidth(value: IBadge['borderWidth']) {
    if (typeof value !== 'number') {
      return;
    }
    this._borderWidth = AndroidUnitConverter.dpToPixel(value);
    this.backgroundColor = null; //re-set Drawable
  }
  private createColorStateList(textColors: IViewState<Color>) {
    const statesSet: any[] = [];
    const colorsSets: any[] = [];
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

  private setDefaults() {
    if (!this.nativeObject) {
      //sets default values
      this.backgroundColor ||= Color.RED;
      this.font ||= Font.create('Arial', 11, Font.NORMAL);
      this.textColor ||= Color.WHITE;
      this.visible = false;
    }
  }
}
