import { ITextBox } from './textbox';
import ActionKeyType from '../shared/android/actionkeytype';
import KeyboardType from '../shared/keyboardtype';
import TextAlignment from '../shared/textalignment';
import TextView from '../textview';
import AutoCapitalize from '../shared/autocapitalize';
import { TextBoxEvents } from './textbox-events';
import SystemServices from '../../util/Android/systemservices';
import AndroidConfig from '../../util/Android/androidconfig';
import TextViewAndroid from '../textview/textview.android';
import { IColor } from '../color/color';

const NativeTextWatcher = requireClass('android.text.TextWatcher');
const NativeTextView = requireClass('android.widget.TextView');
const NativeInputFilter = requireClass('android.text.InputFilter');
const SFEditText = requireClass('io.smartface.android.sfcore.ui.textbox.SFEditText');

// Context.INPUT_METHOD_SERVICE
const { INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER } = SystemServices;

// InputMethodManager.SHOW_FORCED
const SHOW_FORCED = 2;
// InputMethodManager.HIDE_IMPLICIT_ONLY
const HIDE_IMPLICIT_ONLY = 1;
const TYPE_TEXT_VARIATION_PASSWORD = 128;
const TYPE_NUMBER_VARIATION_PASSWORD = 16;

const NativeKeyboardType = [
  1, // TYPE_CLASS_TEXT
  2, // TYPE_CLASS_NUMBER
  2 | 8192, // TYPE_CLASS_NUMBER | TYPE_NUMBER_FLAG_DECIMAL
  3, // TYPE_CLASS_PHONE
  1 | 16, // TYPE_TEXT_VARIATION_URI
  1, // TYPE_CLASS_TEXT
  160, // TYPE_TEXT_VARIATION_WEB_EDIT_TEXT
  4, // TYPE_CLASS_DATETIME
  2 | 4096, // TYPE_CLASS_NUMBER | TYPE_NUMBER_FLAG_SIGNED
  2 | 8192 | 4096, // TYPE_CLASS_NUMBER | TYPE_NUMBER_FLAG_DECIMAL | TYPE_NUMBER_FLAG_SIGNED
  65536, // TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_AUTO_COMPLETE
  32768, // TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_AUTO_CORRECT
  4096, // TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_CAP_CHARACTERS     DEPRECATED
  16384, // TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_CAP_SENTENCES	 DEPRECATED
  8192, // TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_CAP_WORDS		     DEPRECATED
  1 | 48, // TYPE_TEXT_VARIATION_EMAIL_SUBJECT
  1 | 80, // TYPE_TEXT_VARIATION_LONG_MESSAGE
  524288, // TYPE_CLASS_TEXT | TYPE_TEXT_FLAG_NO_SUGGESTIONS
  1 | 96, // TYPE_TEXT_VARIATION_PERSON_NAME
  1 | 64, // TYPE_TEXT_VARIATION_SHORT_MESSAGE
  4 | 32, // TYPE_DATETIME_VARIATION_TIME
  1 | 32 // TYPE_TEXT_VARIATION_EMAIL_ADDRESS
];

const NativeAutoCapitalize = [
  0,
  8192, // TYPE_TEXT_FLAG_CAP_WORDS
  16384, // TYPE_TEXT_FLAG_CAP_SENTENCES
  4096 // TYPE_TEXT_FLAG_CAP_CHARACTERS
];

// NativeActionKeyType corresponds android action key type.
const NativeActionKeyType = [
  6, // EditorInfo.IME_ACTION_DONE
  5, // EditorInfo.IME_ACTION_NEXT
  2, // EditorInfo.IME_ACTION_GO
  3, // EditorInfo.IME_ACTION_SEARCH
  4 // EditorInfo.IME_ACTION_SEND
];

const TextAlignmentDic = {
  [TextAlignment.TOPLEFT]: 48 | 3, // Gravity.TOP | Gravity.LEFT
  [TextAlignment.TOPCENTER]: 48 | 1, //Gravity.TOP | Gravity.CENTER_HORIZONTAL
  [TextAlignment.TOPRIGHT]: 48 | 5, //Gravity.TOP | Gravity.RIGHT
  [TextAlignment.MIDLEFT]: 16 | 3, // Gravity.CENTER_VERTICAL | Gravity.LEFT
  [TextAlignment.MIDCENTER]: 17, //Gravity.CENTER
  [TextAlignment.MIDRIGHT]: 16 | 5, // Gravity.CENTER_VERTICAL | Gravity.RIGHT
  [TextAlignment.BOTTOMLEFT]: 80 | 3, // Gravity.BOTTOM | Gravity.LEFT
  [TextAlignment.BOTTOMCENTER]: 80 | 1, // Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL
  [TextAlignment.BOTTOMRIGHT]: 80 | 5 // Gravity.BOTTOM | Gravity.RIGHT
};
export default class TextBoxAndroid<TEvent extends string = TextBoxEvents, TNative = {}, TProps extends ITextBox = ITextBox> extends TextViewAndroid<TEvent | TextBoxEvents> implements ITextBox {
  private __touchEnabled: boolean;
  private _isPassword: boolean;
  private _keyboardType: KeyboardType;
  private _actionKeyType: ActionKeyType;
  private _onTextChanged: (e?: { insertedText: string; location: number }) => void;
  private _cursorColor: IColor;
  private _hintTextColor: IColor;
  private _onEditBegins: () => void;
  private _onEditEnds: () => void;
  private _onActionButtonPress: (e?: { actionKeyType: ActionKeyType }) => void;
  private _hasEventsLocked: boolean;
  private _autoCapitalize: AutoCapitalize;
  private _didSetOnEditorActionListener: boolean;
  constructor(params?: Partial<TProps>) {
    super(params);
    /* Override the onTouch and make default returning false to prevent bug in other listener.*/
    this._touchCallbacks.onTouch = (x, y) => {
      let result: boolean | undefined;
      if (this.onTouch) {
        result = this.onTouch({ x, y });
      }
      return result === true;
    };

    this.nativeObject.addTextChangedListener(
      NativeTextWatcher.implement({
        // todo: Control insertedText after resolving story/AND-2508 issue.
        onTextChanged: (charSequence: any, start: number, before: number, count: number) => {
          if (!this._hasEventsLocked) {
            let insertedText = '';
            if (before === 0) {
              insertedText = charSequence.subSequence(start, start + count).toString();
            } else if (before <= count) {
              insertedText = charSequence.subSequence(before, count).toString();
            }
            this.onTextChanged?.({
              location: insertedText === '' ? Math.abs(start + before) - 1 : Math.abs(start + before),
              insertedText: insertedText
            });
            this.emit('textChanged', {
              location: insertedText === '' ? Math.abs(start + before) - 1 : Math.abs(start + before),
              insertedText: insertedText
            });
          }
        },
        beforeTextChanged: function (charSequence, start, count, after) {},
        afterTextChanged: function (editable) {}
      })
    );

    this.actionKeyType = ActionKeyType.DEFAULT; // Added for https://smartface.atlassian.net/browse/AND-3869

    this.addAndroidProps(this.androidProps());
  }

  protected preConstruct(params?: Partial<TProps>): void {
    this.__touchEnabled = true;
    this._isPassword = false;
    this._keyboardType = KeyboardType.DEFAULT;
    this._actionKeyType = ActionKeyType.DEFAULT;
    this._textAlignment = TextAlignment.MIDLEFT;
    this._hasEventsLocked = false;
    this._autoCapitalize = AutoCapitalize.NONE;
    this._didSetOnEditorActionListener = false;
    super.preConstruct(params);
  }
  protected createNativeObject() {
    //AND-3123: Due to the issue, hardware button listener added.
    const callback = {
      onKeyPreIme: (keyCode: number, keyEventAction: number) => {
        // KeyEvent.KEYCODE_BACK , KeyEvent.ACTION_DOWN
        if (keyCode === 4 && keyEventAction === 1) {
          this.nativeObject.clearFocus();
        }
        // TODO: Below code moved to SFEditText class implementation.
        // But, I am not sure this implementation doesn't cause unexpected touch handling.
        // return false;
      }
    };
    // Don't use self.multiline = false due to AND-2725 bug.
    // setMovementMethod in label.android.ts file removes the textbox cursor.

    const nativeObject = new SFEditText(AndroidConfig.activity, callback);
    nativeObject.setSingleLine(true);
    return nativeObject;
  }

  private androidProps() {
    const self = this;
    return {
      maxLength(value: number): void {
        const filterArray = toJSArray(self.nativeObject.getFilters());
        for (let i = 0; i < filterArray.length; i++) {
          if ((filterArray[i] + '').includes('android.text.InputFilter$LengthFilter')) {
            filterArray.splice(i, 1);
            break;
          }
        }
        filterArray.push(new NativeInputFilter.LengthFilter(value));
        self.nativeObject.setFilters(array(filterArray, 'android.text.InputFilter'));
      }
    };
  }
  get text(): string {
    return this.nativeObject.getText().toString();
  }
  set text(value: string) {
    this._hasEventsLocked = true;
    if (typeof value !== 'string') value = '';

    this.nativeObject.setText('' + value);

    this.nativeObject.setSelection(value.length);

    this._hasEventsLocked = false;
  }

  get autoCapitalize(): AutoCapitalize {
    return this._autoCapitalize;
  }
  set autoCapitalize(value: AutoCapitalize) {
    const prevAutoCapitalize = this.autoCapitalize;
    this._autoCapitalize = value;
    this.updateInputType(prevAutoCapitalize, NativeAutoCapitalize[this.autoCapitalize]);
  }

  get textAlignment(): TextAlignment {
    return this._textAlignment;
  }
  set textAlignment(value: TextAlignment) {
    this._textAlignment = value;
    this._textAlignment = value in TextAlignmentDic ? value : (this._textAlignment = TextAlignment.MIDLEFT);
    this.nativeObject.setGravity(TextAlignmentDic[this._textAlignment]);
  }

  get textColor(): IColor {
    return this._textColor as any;
  }
  set textColor(value: IColor) {
    this._textColor = value;
    this.nativeObject.setTextColor(value.nativeObject);
  }

  get cursorPosition(): { start: number; end: number } {
    return {
      start: this.nativeObject.getSelectionStart(),
      end: this.nativeObject.getSelectionEnd()
    };
  }
  set cursorPosition(value: { start: number; end: number }) {
    if (value && value.start === parseInt(String(value.start), 10) && value.end === parseInt(String(value.end), 10)) {
      if (value.start > this.text.length) {
        value.start = 0;
      }
      if (value.end > this.text.length) {
        value.end = 0;
      }
      this.nativeObject.setSelection(value.start, value.end);
    }
  }

  get touchEnabled(): boolean {
    return this.__touchEnabled;
  }
  set touchEnabled(value: boolean) {
    this.__touchEnabled = value;
    this.nativeObject.setFocusable(value);
    this.nativeObject.setFocusableInTouchMode(value);
    this.nativeObject.setLongClickable(value);
  }

  get onEditBegins(): () => void {
    return this._onEditBegins;
  }
  set onEditBegins(value: () => void) {
    this._onEditBegins = value;
    this.nativeObject.setOnEditBegins(value.bind(this));
  }

  get cursorColor(): IColor {
    return this._cursorColor;
  }
  set cursorColor(value: IColor) {
    this._cursorColor = value;
    SFEditText.setCursorColor(this.nativeObject, value.nativeObject);
  }

  get hint(): string {
    return this.nativeObject.getHint()?.toString();
  }
  set hint(value: string) {
    this.nativeObject.setHint(value);
  }

  get hintTextColor(): IColor {
    return this._hintTextColor;
  }
  set hintTextColor(value: IColor) {
    this._hintTextColor = value;
    this.nativeObject.setHintTextColor(value.nativeObject);
  }

  get isPassword(): boolean {
    return this._isPassword;
  }
  set isPassword(value: boolean) {
    this._isPassword = value;
    const typeface = this.nativeObject.getTypeface();
    const currentInputType = this.nativeObject.getInputType();

    let passwordType;
    if ((currentInputType & NativeKeyboardType[KeyboardType.DEFAULT]) !== 0) passwordType = TYPE_TEXT_VARIATION_PASSWORD;
    else passwordType = TYPE_NUMBER_VARIATION_PASSWORD;

    const removeTags = TYPE_TEXT_VARIATION_PASSWORD | TYPE_NUMBER_VARIATION_PASSWORD;
    if (this._isPassword) this.updateInputType(removeTags, passwordType);
    else this.updateInputType(removeTags, 0);
    // Some devices might change the font.
    this.nativeObject.setTypeface(typeface);
  }

  get keyboardType(): KeyboardType {
    return this._keyboardType;
  }
  set keyboardType(value: KeyboardType) {
    const prevKeyboardType = NativeKeyboardType[this._keyboardType];
    const newKeyboardType = NativeKeyboardType[value];
    this._keyboardType = isNaN(newKeyboardType) ? KeyboardType.DEFAULT : value;

    this.updateInputType(prevKeyboardType, newKeyboardType);
  }

  get actionKeyType(): ActionKeyType {
    return this._actionKeyType;
  }
  set actionKeyType(value: ActionKeyType) {
    this._actionKeyType = value;
    this.nativeObject.setImeOptions(NativeActionKeyType[this._actionKeyType]);
  }

  showKeyboard(): void {
    this.requestFocus();
  }

  hideKeyboard(): void {
    this.removeFocus();
  }

  requestFocus(): void {
    this.nativeObject.requestFocus();
    // Due to the requirements we should show keyboard when focus requested.
    const inputMethodManager = AndroidConfig.getSystemService(INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER);
    inputMethodManager.toggleSoftInput(SHOW_FORCED, HIDE_IMPLICIT_ONLY);
  }

  removeFocus(): void {
    this.nativeObject.clearFocus();
    // Due to the requirements we should hide keyboard when focus cleared.
    const inputMethodManager = AndroidConfig.getSystemService(INPUT_METHOD_SERVICE, INPUT_METHOD_MANAGER);
    const windowToken = this.nativeObject.getWindowToken();
    inputMethodManager.hideSoftInputFromWindow(windowToken, 0);
  }

  get onTextChanged(): (e?: { insertedText: string; location: number }) => void {
    return this._onTextChanged;
  }
  set onTextChanged(value: (e?: { insertedText: string; location: number }) => void) {
    this._onTextChanged = value;
  }

  onClearButtonPress() {}

  get onEditEnds(): () => void {
    return this._onEditEnds;
  }
  set onEditEnds(value: () => void) {
    this._onEditEnds = value;
    this.nativeObject.setOnEditEnds(value.bind(this));
  }

  get onActionButtonPress(): (e?: { actionKeyType: ActionKeyType }) => void {
    return this._onActionButtonPress;
  }
  set onActionButtonPress(value: (e?: { actionKeyType: ActionKeyType }) => void) {
    this._onActionButtonPress = value;

    // TODO Old version has not declaration for this variable
    if (this._didSetOnEditorActionListener) return;

    this.nativeObject.setOnEditorActionListener(
      NativeTextView.OnEditorActionListener.implement({
        onEditorAction: (textView: TextView, actionId: number, event: any) => {
          if (actionId === NativeActionKeyType[this._actionKeyType]) {
            value?.({
              actionKeyType: this._actionKeyType
            });
          }
          return false;
        }
      })
    );

    this._didSetOnEditorActionListener = true;
  }

  toString(): string {
    return 'TextBox';
  }

  updateInputType(unsetFlags: number, setFlags: number) {
    const currentInputType = this.nativeObject.getInputType();
    this.nativeObject.setInputType((currentInputType & ~unsetFlags) | setFlags);
  }
}
