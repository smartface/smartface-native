import { IMaterialTextBox } from '.';
import { Point2D } from '../../primitive/point2d';
import { AndroidConfig, UnitConverter } from '../../util';
import Color from '../color';
import FlexLayout from '../flexlayout';
import Font from '../font';
import TextBox from '../textbox';
import TextBoxAndroid from '../textbox/textbox.android';
import { MaterialTextBoxEvents } from './materialtextbox-events';

const SFMaterialTextBoxWrapper = requireClass('io.smartface.android.sfcore.ui.materialtextbox.SFMaterialTextBoxWrapper');
const NativeColorStateList = requireClass('android.content.res.ColorStateList');

const activity = AndroidConfig.activity;
const hintTextColorFieldName = 'defaultHintTextColor';
const hintFocusedTextColorFieldName = 'focusedTextColor';

const WRAP_CONTENT = -2;
const MATCH_PARENT = -1;
const state_focused = 16842908;
const state_unfocused = -16842908;
// const GRAVITY_END = 8388613;
// const MaterialTextbox = extend(View)( //Actually this class behavior is InputLayout.

export default class MaterialTextBoxAndroid<TEvent extends string = MaterialTextBoxEvents>
  extends TextBoxAndroid<TEvent | MaterialTextBoxEvents, any, IMaterialTextBox>
  implements IMaterialTextBox
{
  private sfTextBox: TextBox;
  private textBoxNativeObject: any;
  private __hintTextColor: Color;
  private _hintFocusedTextColor: Color;
  private _errorText: string;
  private _lineColorObj: { normal: Color; selected: Color };
  private _errorColor: Color;
  private _characterRestrictionColor: Color;
  private __font: Font;
  private _rightLayout: FlexLayout = null;
  private _rightLayoutWidth: number;
  private _enableCounterMaxLength: number = 10;
  private _enableCounter: boolean = false;
  private _enableErrorMessage: boolean = false;
  private _enableCharacterRestriction: boolean = false;
  private _touchEnable: boolean = true;
  private nativeTextInputEditText: {
    getHeight: () => number;
    setHeight: (value: number) => void;
    getMaxHeight: () => number;
    setMaxHeight: (value: number) => void;
    setSupportBackgroundTintList: (params: any) => void;
  };
  constructor(params: Partial<IMaterialTextBox> = {}) {
    super(params);
    this._nativeObject = new SFMaterialTextBoxWrapper(activity);

    this.textBoxNativeObject = this.nativeObject.getTextInputEditTextInstance();
    this.sfTextBox = new TextBox({ nativeObject: this.textBoxNativeObject });

    if (!AndroidConfig.isEmulator) {
      let SFMaterialTextBoxHintAppearance_ID = AndroidConfig.getResourceId('SFMaterialTextBoxHintAppearance', 'style');
      this.nativeObject.getInstance().setHintTextAppearance(SFMaterialTextBoxHintAppearance_ID);
    }

    //Defaults
    this.multiline = false;

    // const { android, ...restParams } = params;
    // Object.assign(this._android, this.androidFields, android);
    // Object.assign(this, restParams);
    this.addAndroidProps(this.androidFields);
  }

  get androidFields() {
    const self = this;
    return {
      get labelsFont(): Font {
        return self.__font;
      },
      set labelsFont(value: Font) {
        self.__font = value;
        self.nativeObject.setTypeface(value.nativeObject);
      },
      get textBoxHeight(): number {
        return self.nativeTextInputEditText.getHeight();
      },
      set textBoxHeight(value: number) {
        self.nativeTextInputEditText.setHeight(UnitConverter.dpToPixel(value));
      },
      get textBoxMaxHeight(): number {
        return self.nativeTextInputEditText.getMaxHeight();
      },
      set textBoxMaxHeight(value: number) {
        self.nativeTextInputEditText.setMaxHeight(UnitConverter.dpToPixel(value));
      },
      get enableErrorMessage(): boolean {
        return self._enableErrorMessage;
      },
      set enableErrorMessage(value: boolean) {
        self._enableErrorMessage = value;
        self.nativeObject.setErrorEnabled(self._enableErrorMessage);
        if (value === true && !AndroidConfig.isEmulator) {
          const SFMaterialTextBoxErrorTextAppearance_ID = AndroidConfig.getResourceId('SFMaterialTextBoxErrorTextAppearance', 'style');
          self.nativeObject.getInstance().setErrorTextAppearance(SFMaterialTextBoxErrorTextAppearance_ID);
        }
      },
      get maxLines(): number {
        return self.textBoxNativeObject.getMaxLines();
      },
      set maxLines(value: number) {
        self.textBoxNativeObject.setMaxLines(value);
      }
    };
  }

  get hint(): string {
    return this.nativeObject.getHint().toString();
  }
  set hint(value: string) {
    //Why are we need to look at the error text ?
    const enableHintMessage = this._errorText !== '';
    this.nativeObject.setHintEnabled(enableHintMessage);
    this.nativeObject.setHint(value);
  }

  get hintTextColor(): Color {
    return this.__hintTextColor;
  }
  set hintTextColor(value: Color) {
    this.__hintTextColor = value;
    this.nativeObject.changedErrorTextColor(hintTextColorFieldName, value.nativeObject);
  }

  get selectedHintTextColor(): Color {
    return this._hintFocusedTextColor;
  }
  set selectedHintTextColor(value: Color) {
    this._hintFocusedTextColor = value;
    this.nativeObject.changedErrorTextColor(hintFocusedTextColorFieldName, value.nativeObject);
  }

  get lineColor(): { normal: Color; selected: Color } {
    return this._lineColorObj;
  }
  set lineColor(value: { normal: Color; selected: Color }) {
    this._lineColorObj = value;

    const jsColorArray = [];
    const jsStateArray = [];
    if (this._lineColorObj.normal) {
      jsColorArray.push(this.lineColor.normal.nativeObject);
      jsStateArray.push(array([state_unfocused], 'int'));
    }

    if (this.lineColor.selected) {
      jsColorArray.push(this.lineColor.selected.nativeObject);
      jsStateArray.push(array([state_focused], 'int'));
    }
    const javaTwoDimensionArray = array(jsStateArray);
    const javaColorArray = array(jsColorArray, 'int');

    const lineColorListState = new NativeColorStateList(javaTwoDimensionArray, javaColorArray);

    this.nativeTextInputEditText.setSupportBackgroundTintList(lineColorListState);
  }

  get lineCount(): number {
    return this.textBoxNativeObject.getMinLines();
  }
  set lineCount(value: number) {
    this.textBoxNativeObject.setMinLines(value);
  }

  get multiline(): boolean {
    return !this.textBoxNativeObject.isSingleLine();
  }
  set multiline(value: boolean) {
    this.textBoxNativeObject.setSingleLine(!value);
  }

  get errorColor(): Color {
    return this._errorColor;
  }
  set errorColor(value: Color) {
    this._errorColor = value;
    if (this._enableErrorMessage !== true) this.android.enableErrorMessage = true;
    const errorView = this.nativeObject.getReCreatedErrorView();
    errorView.setTextColor(value.nativeObject);
  }

  get labelsFont(): Font {
    return this.__font;
  }
  set labelsFont(value: Font) {
    this.__font = value;
    this.nativeObject.setTypeface(value.nativeObject);
    this.nativeObject.setExpandedHintTextSize(UnitConverter.dpToPixel(value.size));
  }

  get testId(): any {
    return !AndroidConfig.isEmulator ? activity.getResources().getResourceEntryName(this.nativeObject.getId()) : '';
  }
  set testId(value: any) {
    const id = activity.getResourceId(value);
    const editTextId = activity.getResourceId(value + '_textBox');
    id > 0 && this.nativeObject.setId(id);
    editTextId > 0 && this.sfTextBox.nativeObject.setId(editTextId);
  }

  get touchEnabled(): boolean {
    return this._touchEnable;
  }
  set touchEnabled(value: boolean) {
    this._touchEnable = value;
    // TODO
    this.sfTextBox.enabled = value;
  }

  get rightLayout(): { view: FlexLayout; width: number; height?: number } {
    return {
      view: this._rightLayout,
      width: this._rightLayoutWidth
    };
  }
  set rightLayout(value: { view: FlexLayout; width: number; height?: number }) {
    this._rightLayout = value.view;
    this._rightLayoutWidth = value.width || 30;
    const parentFL = new FlexLayout();
    this.nativeObject.setRightLayout(this._rightLayout.nativeObject, this._rightLayout.android?.yogaNode, parentFL.nativeObject, this._rightLayoutWidth);
  }

  get onTouch(): (e?: Point2D) => boolean | void {
    return this._onTouch;
  }
  set onTouch(value: (e?: Point2D) => boolean | void) {
    // TODO setTouchHandlers function not found
    this._onTouch = value;
    // @ts-ignore
    // TODO: Ask why setTouchHandlers is used here
    this.setTouchHandlers();
    
    // @ts-ignore
    this.sfTextBox._onTouch = value;
    // @ts-ignore
    // TODO: Ask why setTouchHandlers is used here
    this.sfTextBox.setTouchHandlers();
  }

  get onTouchEnded(): (isInside: boolean, point: Point2D) => boolean | void {
    return this._onTouchEnded;
  }
  set onTouchEnded(value: (isInside: boolean, point: Point2D) => boolean | void) {
    this._onTouchEnded = value;
    // TODO: Ask why setTouchHandlers is used here. It must emit an touch event
    // @ts-ignore
    this.setTouchHandlers();
    // @ts-ignore
    this.sfTextBox._onTouchEnded = value;
    // @ts-ignore
    this.sfTextBox.setTouchHandlers();
  }

  get onTouchMoved(): (e: boolean | { isInside: boolean }, point?: Point2D) => boolean | void {
    return this._onTouchMoved;
  }
  set onTouchMoved(value: (e: boolean | { isInside: boolean }, point?: Point2D) => boolean | void) {
    // TODO: Ask why setTouchHandlers is used here. It must emit an touch event
    this._onTouchMoved = value;
    // @ts-ignore
    this.setTouchHandlers();
    // @ts-ignore
    this.sfTextBox._onTouchMoved = value;
    // @ts-ignore
    this.sfTextBox.setTouchHandlers();
  }

  get onTouchCancelled(): (point: Point2D) => boolean | void {
    return this._onTouchCancelled;
  }
  set onTouchCancelled(value: (point: Point2D) => boolean | void) {
    // TODO: Ask why setTouchHandlers is used here. It must emit an touch event
    this._onTouchCancelled = value;
    // @ts-ignore
    this.setTouchHandlers();
    // @ts-ignore
    this.sfTextBox._onTouchCancelled = value;
    // @ts-ignore
    this.sfTextBox.setTouchHandlers();
  }

  get errorMessage(): string {
    return this.nativeObject.getError()?.toString() || '';
  }
  set errorMessage(value: string) {
    this._errorText = value;

    //Must re-set all settings. TextInputLayout  re-creates everytime enabling.
    if (!this._enableErrorMessage && this._errorText.length !== 0) this.android.enableErrorMessage = true;

    if (this._errorColor) this.errorColor = this._errorColor;

    this.nativeObject.setError(this._errorText);
  }

  get characterRestriction(): number {
    return this.nativeObject.getCounterMaxLength();
  }
  set characterRestriction(value: number) {
    this._enableCounterMaxLength = value;
    this._enableCounter = this._enableCounterMaxLength !== 0 ? true : false;

    //Must re-set all settings. TextInputLayout  re-creates everytime enabling.
    if (this._enableCharacterRestriction !== true) this.enableCharacterRestriction = true;

    if (this._characterRestrictionColor) this.characterRestrictionColor = this._characterRestrictionColor;

    this.nativeObject.setCounterMaxLength(this._enableCounterMaxLength);
  }

  get characterRestrictionColor(): Color {
    return this._characterRestrictionColor;
  }
  set characterRestrictionColor(value: Color) {
    this._characterRestrictionColor = value;

    if (this._enableCounter !== true) this.enableCharacterRestriction = true;

    const counterView = this.nativeObject.getReCreatedCounterView();
    counterView.setTextColor(this._characterRestrictionColor.nativeObject);
  }

  get enableCharacterRestriction(): boolean {
    return this._enableCharacterRestriction;
  }
  set enableCharacterRestriction(value: boolean) {
    this._enableCharacterRestriction = value;
    this.nativeObject.setCounterEnabled(this._enableCharacterRestriction);
  }
}
