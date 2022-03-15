/*globals requireClass*/
// const TextView = require('../textview');
// const KeyboardType = require('../keyboardtype');
// const ActionKeyType = require('../actionkeytype');
// const AutoCapitalize = require("./autocapitalize");
// const Events = require('./events');
// const { EventEmitterCreator } = require('../../core/eventemitter');
import { TextBoxAndroidProps, ITextBox } from '.';
import ActionKeyType from '../shared/android/actionkeytype';
import Color from '../color';
import Font from '../font';
import KeyboardType from '../shared/keyboardtype';
import TextAlignment from '../shared/textalignment';
import TextView from '../textview';
import { ViewAndroid } from '../view/view.android';
import AutoCapitalize from './autocapitalize';
import { TextBoxEvents } from './textbox-events';
import SystemServices from '../../util/Android/systemservices';
import AndroidConfig from '../../util/Android/androidconfig';

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

export default class TextBoxAndroid<TEvent extends string = TextBoxEvents, TNative = {}, TProps extends ITextBox = ITextBox>
  extends ViewAndroid<TEvent | TextBoxEvents, TNative, TProps>
  implements ITextBox
{
  private __touchEnabled: boolean = true;
  private _isPassword: boolean = false;
  private _keyboardType: KeyboardType = KeyboardType.DEFAULT;
  private _actionKeyType: ActionKeyType = ActionKeyType.DEFAULT;
  private _onTextChanged: (e?: { insertedText: string; location: number }) => void;
  private _cursorColor: Color;
  private _hintTextColor: Color;
  private _textColor: Color;
  private _font: Font;
  private _textAlignment: TextAlignment;
  private _onEditBegins: () => void;
  private _onEditEnds: () => void;
  private _onActionButtonPress: (e?: { actionKeyType: ActionKeyType }) => void;
  private _hasEventsLocked: boolean = false;
  private _autoCapitalize: AutoCapitalize = AutoCapitalize.NONE;
  private _didAddTextChangedListener: boolean = false;
  private _didSetOnEditorActionListener: boolean = false;
  private activity: any;
  constructor(params: Partial<TProps>) {
    super(params);

    this.activity = AndroidConfig.activity;
    if (!this.nativeObject) {
      //AND-3123: Due to the issue, hardware button listener added.
      const callback = {
        onKeyPreIme: (keyCode: number, keyEventAction: number) => {
          // KeyEvent.KEYCODE_BACK , KeyEvent.ACTION_DOWN
          if (keyCode === 4 && keyEventAction === 1) {
            this.nativeObject.clearFocus();
          }
          // TODO: Below code moved to SFEditText class implementation.
          // But, I am not sure this implementation doesn't causes unexpected touch handling.
          // return false;
        }
      };
      this._nativeObject = new SFEditText(this.activity, callback);
    }

    // Don't use self.multiline = false due to AND-2725 bug.
    // setMovementMethod in label-Android.js file removes the textbox cursor.
    this.nativeObject.setSingleLine(true);

    /* Override the onTouch and make default returning false to prevent bug in other listener.*/
    this.onTouch = (e) => {
      let result: boolean | void;
      if (this.onTouch) result = this.onTouch(e);
      return result === true;
    };

    // Added for https://smartface.atlassian.net/browse/AND-3869
    this.actionKeyType = ActionKeyType.DEFAULT;

    // const { android, ...restParams } = params;
    // Object.assign(this._android, this.androidProps, android);
    // Object.assign(this, restParams);
    this.addAndroidProps(this.androidProps);
  }

  private get androidProps() {
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

  get font(): Font {
    return this._font;
  }
  set font(value: Font) {
    this._font = value;
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
  }

  get textColor(): Color {
    return this._textColor;
  }
  set textColor(value: Color) {
    this._textColor = value;
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
    this.nativeObject.setOnEditBegins(value);
  }

  get cursorColor(): Color {
    return this._cursorColor;
  }
  set cursorColor(value: Color) {
    this._cursorColor = value;
    SFEditText.setCursorColor(this.nativeObject, value.nativeObject);
  }

  get hint(): string {
    return this.nativeObject.getHint()?.toString();
  }
  set hint(value: string) {
    this.nativeObject.setHint(value);
  }

  get hintTextColor(): Color {
    return this._hintTextColor;
  }
  set hintTextColor(value: Color) {
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
    this._keyboardType = value;
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
    if (!this._didAddTextChangedListener) {
      this._didAddTextChangedListener = true;
      this.nativeObject.addTextChangedListener(
        NativeTextWatcher.implement({
          // todo: Control insertedText after resolving story/AND-2508 issue.
          onTextChanged: (charSequence, start, before, count) => {
            if (!this._hasEventsLocked) {
              let insertedText = '';
              if (before === 0) {
                insertedText = charSequence.subSequence(start, start + count).toString();
              } else if (before <= count) {
                insertedText = charSequence.subSequence(before, count).toString();
              }
              if (this._onTextChanged) {
                this._onTextChanged({
                  location: insertedText === '' ? Math.abs(start + before) - 1 : Math.abs(start + before),
                  insertedText: insertedText
                });
                this.emit('textChanged', {
                  location: insertedText === '' ? Math.abs(start + before) - 1 : Math.abs(start + before),
                  insertedText: insertedText
                });
              }
            }
          },
          beforeTextChanged: function (charSequence, start, count, after) {},
          afterTextChanged: function (editable) {}
        })
      );
    }
  }

  onClearButtonPress() {}

  get onEditEnds(): () => void {
    return this._onEditEnds;
  }
  set onEditEnds(value: () => void) {
    this._onEditEnds = value;
    this.nativeObject.setOnEditEnds(value);
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
