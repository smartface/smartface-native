import { ITextBox } from './textbox';
import ActionKeyType from '../shared/android/actionkeytype';
import Color from '../color';
import Font from '../font';
import KeyboardType from '../shared/keyboardtype';
import TextAlignment from '../shared/textalignment';
import ViewIOS from '../view/view.ios';
import AutoCapitalize from '../shared/autocapitalize';
import { TextBoxEvents } from './textbox-events';
import FlexLayout from '../flexlayout';
import KeyboardAppearance from '../shared/keyboardappearance';
import TextContentType from '../shared/textcontenttype';
import View from '../view';
import KeyboardAnimationDelegate from '../../util/iOS/keyboardanimationdelegate';
import Invocation from '../../util/iOS/invocation';

const IOSKeyboardTypes = {
  default: 0, // Default type for the current input method.
  asciiCapable: 1, // Displays a keyboard which can enter ASCII characters
  numbersAndPunctuation: 2, // Numbers and assorted punctuation.
  URL: 3, // A type optimized for URL entry (shows . / .com prominently).
  numberPad: 4, // A number pad with locale-appropriate digits (0-9, ۰-۹, ०-९, etc.). Suitable for PIN entry.
  phonePad: 5, // A phone pad (1-9, *, 0, #, with letters under the numbers).
  namePhonePad: 6, // A type optimized for entering a person's name or phone number.
  emailAddress: 7, // A type optimized for multiple email address entry (shows space @ . prominently).
  decimalPad: 8, // @available(iOS 4.1, *) A number pad with a decimal point.
  twitter: 9, //@available(iOS 5.0, *) A type optimized for twitter text entry (easy access to @ #)
  webSearch: 10, // @available(iOS 7.0, *) A default keyboard type with URL-oriented addition (shows space . prominently).
  asciiCapableNumberPad: 11 // @available(iOS 10.0, *) A number pad (0-9) that will always be ASCII digits.
};

const IOSReturnKeyType = {
  default: 0,
  go: 1,
  google: 2,
  join: 3,
  next: 4,
  route: 5,
  search: 6,
  send: 7,
  yahoo: 8,
  done: 9,
  emergencyCall: 10,
  continue: 11 // @available(iOS 9.0, *)
};

const NSTextAlignments = {
  left: 0,
  center: 1,
  right: 2
};

const ContentVerticalAlignments = {
  top: 1,
  center: 0,
  bottom: 2
};

const ContentVerticalAlignmentMapping = {
  [TextAlignment.TOPLEFT]: ContentVerticalAlignments.top,
  [TextAlignment.TOPCENTER]: ContentVerticalAlignments.top,
  [TextAlignment.TOPRIGHT]: ContentVerticalAlignments.top,

  [TextAlignment.MIDLEFT]: ContentVerticalAlignments.center,
  [TextAlignment.MIDCENTER]: ContentVerticalAlignments.center,
  [TextAlignment.MIDRIGHT]: ContentVerticalAlignments.center,

  [TextAlignment.BOTTOMLEFT]: ContentVerticalAlignments.bottom,
  [TextAlignment.BOTTOMCENTER]: ContentVerticalAlignments.bottom,
  [TextAlignment.BOTTOMRIGHT]: ContentVerticalAlignments.bottom
};

const TextAlignmentMapping = {
  [TextAlignment.TOPLEFT]: NSTextAlignments.left,
  [TextAlignment.TOPCENTER]: NSTextAlignments.center,
  [TextAlignment.TOPRIGHT]: NSTextAlignments.right,

  [TextAlignment.MIDLEFT]: NSTextAlignments.left,
  [TextAlignment.MIDCENTER]: NSTextAlignments.center,
  [TextAlignment.MIDRIGHT]: NSTextAlignments.right,

  [TextAlignment.BOTTOMLEFT]: NSTextAlignments.left,
  [TextAlignment.BOTTOMCENTER]: NSTextAlignments.center,
  [TextAlignment.BOTTOMRIGHT]: NSTextAlignments.right
};

export default class TextBoxIOS<TEvent extends string = TextBoxEvents, TNative = {}, TProps extends ITextBox = ITextBox> extends ViewIOS<TEvent | TextBoxEvents, TNative, TProps> implements ITextBox {
  private _textAligment: number;
  private _hint: string;
  private _hintTextColor: Color;
  private _clearButtonEnabled: boolean;
  private _keyboardLayout: FlexLayout | undefined;
  private keyboardanimationdelegate: KeyboardAnimationDelegate;
  private _inputView: {
    height: number;
    view: View;
  };
  private _inputViewMain: FlexLayout;
  private _onTextChanged: (e?: { insertedText: string; location: number }) => void;
  private _onClearButtonPress: () => void;
  private _onEditEnds: () => void;
  private _onActionButtonPress: (e?: { actionKeyType: ActionKeyType }) => void;

  constructor(params?: Partial<TProps>) {
    super(params);

    this.nativeObject.textBoxDelegate = (method: { name?: string; range: number; replacementString: string }) => {
      if (method.name === 'textFieldShouldBeginEditing') {
        this.keyboardanimationdelegate.textFieldShouldBeginEditing();
        this.onEditBegins?.();
        this.emit('editBegins');
      } else if (method.name === 'textFieldShouldEndEditing') {
        this.onEditEnds?.();
        this.emit('editEnds');
      } else if (method.name === 'textFieldShouldReturn') {
        this.onActionButtonPress?.({
          actionKeyType: this.actionKeyType
        });
        this.emit('actionButtonPress', {
          actionKeyType: this.actionKeyType
        });
      } else if (method.name === 'textFieldShouldClear') {
        const returnValue = this.onClearButtonPress?.();
        this.emit('clearButtonPress');
        return returnValue === undefined ? true : returnValue;
      } else if (method.name === 'shouldChangeCharactersIn:Range:ReplacementString') {
        this.onTextChanged?.({
          location: method.range,
          insertedText: method.replacementString
        });
        this.emit('textChanged', {
          location: method.range,
          insertedText: method.replacementString
        });
        return true;
      }
    };

    this.nativeObject.addKeyboardObserver();

    this.keyboardanimationdelegate = new KeyboardAnimationDelegate({
      nativeObject: this.nativeObject
    });

    this.nativeObject.onShowKeyboard = (e) => {
      if (this._inputViewMain) {
        __SF_UIView.performWithoutAnimationWrapper(() => {
          this._inputViewMain.nativeObject.yoga.applyLayoutPreservingOrigin(true);
        });
      }

      if (this._keyboardLayout) {
        __SF_UIView.performWithoutAnimationWrapper(() => {
          this._keyboardLayout?.nativeObject.yoga.applyLayoutPreservingOrigin(true);
        });
      }

      // TODO Rechcek after build
      this.keyboardanimationdelegate.keyboardShowAnimation(e.keyboardHeight, e);
    };

    this.nativeObject.addObserver(() => {
      this._keyboardLayout && this._keyboardLayout.nativeObject.yoga.applyLayoutPreservingOrigin(true);
      this._inputViewMain && this._inputViewMain.nativeObject.yoga.applyLayoutPreservingOrigin(true);
    }, __SF_UIDeviceOrientationDidChangeNotification);

    this.nativeObject.onHideKeyboard = (e) => {
      this.keyboardanimationdelegate.keyboardHideAnimation(e);
    };
  }

  protected createNativeObject() {
    return new __SF_UITextField();
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this._hintTextColor = Color.create(199, 199, 205);
    this._textAligment = TextAlignment.MIDLEFT;
    this._clearButtonEnabled = false;
    super.preConstruct(params);
    this.addIOSProps(this.iOSProps());
  }

  private iOSProps() {
    const self = this;
    return {
      get adjustFontSizeToFit(): boolean {
        return self.nativeObject.adjustsFontSizeToFitWidth;
      },
      set adjustFontSizeToFit(value: boolean) {
        self.nativeObject.adjustsFontSizeToFitWidth = value;
      },
      get keyboardLayout(): FlexLayout | undefined {
        return self._keyboardLayout;
      },
      set keyboardLayout(value: FlexLayout | undefined) {
        if (value === undefined) {
          self._keyboardLayout = value;
          self.nativeObject.setValueForKey(undefined, 'inputAccessoryView');
          return;
        }
        if (typeof value === 'object') {
          self._keyboardLayout = value;
          self._keyboardLayout.nativeObject.yoga.applyLayoutPreservingOrigin(true);
          // Bug : IOS-2601
          const oldOntouch = value.onTouch;
          value.onTouch = () => {
            // TODO recheck after build
            const returnValue = oldOntouch && oldOntouch();
            return typeof returnValue === 'undefined' ? true : returnValue;
          };
          self.nativeObject.setValueForKey(value.nativeObject, 'inputAccessoryView');
        }
      },
      get minimumFontSize(): number {
        return self.nativeObject.minimumFontSize;
      },
      set minimumFontSize(value: number) {
        self.nativeObject.minimumFontSize = value;
      },
      get keyboardAppearance(): KeyboardAppearance {
        return self.nativeObject.keyboardAppearance;
      },
      set keyboardAppearance(value: KeyboardAppearance) {
        self.nativeObject.keyboardAppearance = value;
      },
      get textContentType(): TextContentType {
        return self.nativeObject.textContentType;
      },
      set textContentType(value: TextContentType) {
        self.nativeObject.textContentType = value;
      },
      get clearButtonEnabled(): boolean {
        return self._clearButtonEnabled;
      },
      set clearButtonEnabled(value: boolean) {
        self._clearButtonEnabled = value;
        self.nativeObject.clearButtonMode = value ? 1 : 0;
      },
      get inputView(): { height: number; view: View } {
        return self._inputView;
      },
      set inputView(value: { height: number; view: View }) {
        self._inputView = value;

        if (self._inputView === undefined) {
          self.nativeObject.setValueForKey(undefined, 'inputView');
          return;
        }

        if (!self._inputViewMain) {
          const flexMain = new FlexLayout();
          flexMain.nativeObject.frame = {
            x: 0,
            y: 0,
            width: 0,
            height: value.height ? value.height : 0
          };
          self._inputViewMain = flexMain;
        } else {
          const childs = self._inputViewMain.getChildList();
          for (const i in childs) {
            self._inputViewMain.removeChild(childs[i]);
          }
        }

        // Bug : IOS-2601
        const oldOntouch = value.view.onTouch;
        value.view.onTouch = () => {
          const returnValue = oldOntouch && oldOntouch();
          return typeof returnValue === 'undefined' ? true : returnValue;
        };

        self._inputViewMain.addChild(value.view);

        self.nativeObject.setValueForKey(self._inputViewMain.nativeObject, 'inputView');
      }
    };
  }

  get font(): Font {
    return this.nativeObject.font;
  }
  set font(value: Font) {
    this.nativeObject.font = value;
  }

  get text(): string {
    return this.nativeObject.text;
  }
  set text(value: string) {
    this.nativeObject.text = value;
  }

  get autoCapitalize(): AutoCapitalize {
    // TODO Recheck after build
    return Invocation.invokeInstanceMethod(this.nativeObject, 'autocapitalizationType', [], 'NSInteger') as AutoCapitalize;
  }
  set autoCapitalize(value: AutoCapitalize) {
    const argCapitalizationType = new Invocation.Argument({
      type: 'NSInteger',
      value: value
    });
    Invocation.invokeInstanceMethod(this.nativeObject, 'setAutocapitalizationType:', [argCapitalizationType]);
  }

  get textAlignment(): TextAlignment {
    return this._textAligment;
  }
  set textAlignment(value: TextAlignment) {
    this._textAligment = value
    
    this.nativeObject.contentVerticalAlignment = ContentVerticalAlignmentMapping[value];
    this.nativeObject.textAlignment = TextAlignmentMapping[value];
  }

  get textColor(): Color {
    return new Color({
      color: this.nativeObject.textColor
    });
  }
  set textColor(value: Color) {
    this.nativeObject.textColor = value.nativeObject;
  }

  get cursorPosition(): { start: number; end: number } {
    const selectedTextRange = this.nativeObject.valueForKey('selectedTextRange');
    let startPosition;
    const invocationStartPosition = __SF_NSInvocation.createInvocationWithSelectorInstance('start', selectedTextRange);
    if (invocationStartPosition) {
      invocationStartPosition.target = selectedTextRange;
      invocationStartPosition.setSelectorWithString('start');
      invocationStartPosition.retainArguments();
      invocationStartPosition.invoke();
      startPosition = invocationStartPosition.getReturnValue();
    }
    let endPosition;
    const invocationEndPosition = __SF_NSInvocation.createInvocationWithSelectorInstance('end', selectedTextRange);
    if (invocationEndPosition) {
      invocationEndPosition.target = selectedTextRange;
      invocationEndPosition.setSelectorWithString('end');
      invocationEndPosition.retainArguments();
      invocationEndPosition.invoke();
      endPosition = invocationEndPosition.getReturnValue();
    }
    const beginningOfDocument = this.nativeObject.valueForKey('beginningOfDocument');
    let offsetStart = 0;
    const invocationOffsetFromPosition = __SF_NSInvocation.createInvocationWithSelectorInstance('offsetFromPosition:toPosition:', this.nativeObject);
    if (invocationOffsetFromPosition) {
      invocationOffsetFromPosition.target = this.nativeObject;
      invocationOffsetFromPosition.setSelectorWithString('offsetFromPosition:toPosition:');
      invocationOffsetFromPosition.retainArguments();
      invocationOffsetFromPosition.setNSObjectArgumentAtIndex(beginningOfDocument, 2);
      invocationOffsetFromPosition.setNSObjectArgumentAtIndex(startPosition, 3);
      invocationOffsetFromPosition.invoke();
      offsetStart = invocationOffsetFromPosition.getNSIntegerReturnValue();
    }
    let offsetEnd = 0;
    const invocationEndOffsetFromPosition = __SF_NSInvocation.createInvocationWithSelectorInstance('offsetFromPosition:toPosition:', this.nativeObject);
    if (invocationEndOffsetFromPosition) {
      invocationEndOffsetFromPosition.target = this.nativeObject;
      invocationEndOffsetFromPosition.setSelectorWithString('offsetFromPosition:toPosition:');
      invocationEndOffsetFromPosition.retainArguments();
      invocationEndOffsetFromPosition.setNSObjectArgumentAtIndex(beginningOfDocument, 2);
      invocationEndOffsetFromPosition.setNSObjectArgumentAtIndex(endPosition, 3);
      invocationEndOffsetFromPosition.invoke();
      offsetEnd = invocationEndOffsetFromPosition.getNSIntegerReturnValue();
    }
    return {
      start: offsetStart,
      end: offsetEnd
    };
  }
  set cursorPosition(value: { start: number; end: number }) {
    if (value && value.start === parseInt(String(value.start), 10) && value.end === parseInt(String(value.end), 10)) {
      const beginningOfDocument = this.nativeObject.valueForKey('beginningOfDocument');
      let startPosition;
      const invocationPositionFromPosition = __SF_NSInvocation.createInvocationWithSelectorInstance('positionFromPosition:offset:', this.nativeObject);
      if (invocationPositionFromPosition) {
        invocationPositionFromPosition.target = this.nativeObject;
        invocationPositionFromPosition.setSelectorWithString('positionFromPosition:offset:');
        invocationPositionFromPosition.retainArguments();
        invocationPositionFromPosition.setNSObjectArgumentAtIndex(beginningOfDocument, 2);
        invocationPositionFromPosition.setNSIntegerArgumentAtIndex(value.start, 3);
        invocationPositionFromPosition.invoke();
        startPosition = invocationPositionFromPosition.getReturnValue();
      }
      let endPosition;
      const invocationEndPositionFromPosition = __SF_NSInvocation.createInvocationWithSelectorInstance('positionFromPosition:offset:', this.nativeObject);
      if (invocationEndPositionFromPosition) {
        invocationEndPositionFromPosition.target = this.nativeObject;
        invocationEndPositionFromPosition.setSelectorWithString('positionFromPosition:offset:');
        invocationEndPositionFromPosition.retainArguments();
        invocationEndPositionFromPosition.setNSObjectArgumentAtIndex(beginningOfDocument, 2);
        invocationEndPositionFromPosition.setNSIntegerArgumentAtIndex(value.end, 3);
        invocationEndPositionFromPosition.invoke();
        endPosition = invocationEndPositionFromPosition.getReturnValue();
      }
      let characterRange;
      const invocationTextRangeFromPosition = __SF_NSInvocation.createInvocationWithSelectorInstance('textRangeFromPosition:toPosition:', this.nativeObject);
      if (invocationTextRangeFromPosition) {
        invocationTextRangeFromPosition.target = this.nativeObject;
        invocationTextRangeFromPosition.setSelectorWithString('textRangeFromPosition:toPosition:');
        invocationTextRangeFromPosition.retainArguments();
        invocationTextRangeFromPosition.setNSObjectArgumentAtIndex(startPosition, 2);
        invocationTextRangeFromPosition.setNSObjectArgumentAtIndex(endPosition, 3);
        invocationTextRangeFromPosition.invoke();
        characterRange = invocationTextRangeFromPosition.getReturnValue();
      }
      this.nativeObject.setValueForKey(characterRange, 'selectedTextRange');
    }
  }

  onEditBegins: () => void;

  get cursorColor(): Color {
    return new Color({
      color: this.nativeObject.valueForKey('tintColor')
    });
  }
  set cursorColor(value: Color) {
    this.nativeObject.setValueForKey(value.nativeObject, 'tintColor');
  }

  get hint(): string {
    return this._hint;
  }
  set hint(value: string) {
    this._hint = value;
    const allocNSAttributedString = Invocation.invokeClassMethod('NSAttributedString', 'alloc', [], 'id');

    const argString = new Invocation.Argument({
      type: 'NSString',
      value: value
    });

    const argAttributes = new Invocation.Argument({
      type: 'id',
      value: {
        NSColor: this._hintTextColor.nativeObject
      }
    });
    const nativeAttributeString = Invocation.invokeInstanceMethod(allocNSAttributedString!, 'initWithString:attributes:', [argString, argAttributes], 'NSObject');
    this.nativeObject.setValueForKey(nativeAttributeString, 'attributedPlaceholder');
  }

  get hintTextColor(): Color {
    return this._hintTextColor;
  }
  set hintTextColor(value: Color) {
    this._hintTextColor = value;
    this.hint = this.hint;
  }

  get isPassword(): boolean {
    return this.nativeObject.isSecure;
  }
  set isPassword(value: boolean) {
    this.nativeObject.isSecure = value;
  }

  get keyboardType(): KeyboardType {
    let returnValue: KeyboardType;

    switch (this.nativeObject.keyboardType) {
      case IOSKeyboardTypes.default:
        returnValue = KeyboardType.DEFAULT;
        break;
      case IOSKeyboardTypes.decimalPad:
        returnValue = KeyboardType.DECIMAL;
        break;
      case IOSKeyboardTypes.numberPad:
        returnValue = KeyboardType.NUMBER;
        break;
      case IOSKeyboardTypes.phonePad:
        returnValue = KeyboardType.PHONE;
        break;
      case IOSKeyboardTypes.URL:
        returnValue = KeyboardType.URL;
        break;
      case IOSKeyboardTypes.twitter:
        returnValue = KeyboardType.ios.TWITTER;
        break;
      case IOSKeyboardTypes.webSearch:
        returnValue = KeyboardType.ios.WEBSEARCH;
        break;
      case IOSKeyboardTypes.emailAddress:
        returnValue = KeyboardType.EMAILADDRESS;
        break;
      default:
        returnValue = KeyboardType.DEFAULT;
    }
    return returnValue;
  }
  set keyboardType(value: KeyboardType) {
    switch (value) {
      case KeyboardType.DECIMAL:
        this.nativeObject.keyboardType = IOSKeyboardTypes.decimalPad;
        break;
      case KeyboardType.NUMBER:
        this.nativeObject.keyboardType = IOSKeyboardTypes.numberPad;
        break;
      case KeyboardType.PHONE:
        this.nativeObject.keyboardType = IOSKeyboardTypes.phonePad;
        break;
      case KeyboardType.URL:
        this.nativeObject.keyboardType = IOSKeyboardTypes.URL;
        break;
      case KeyboardType.ios.TWITTER:
        this.nativeObject.keyboardType = IOSKeyboardTypes.twitter;
        break;
      case KeyboardType.ios.WEBSEARCH:
        this.nativeObject.keyboardType = IOSKeyboardTypes.webSearch;
        break;
      case KeyboardType.EMAILADDRESS:
        this.nativeObject.keyboardType = IOSKeyboardTypes.emailAddress;
        break;
      default:
        this.nativeObject.keyboardType = IOSKeyboardTypes.default;
    }
  }

  get actionKeyType(): ActionKeyType {
    let returnValue: ActionKeyType;
    switch (this.nativeObject.returnKeyType) {
      case IOSReturnKeyType.default:
        returnValue = ActionKeyType.DEFAULT;
        break;
      case IOSReturnKeyType.next:
        returnValue = ActionKeyType.NEXT;
        break;
      case IOSReturnKeyType.go:
        returnValue = ActionKeyType.GO;
        break;
      case IOSReturnKeyType.search:
        returnValue = ActionKeyType.SEARCH;
        break;
      case IOSReturnKeyType.send:
        returnValue = ActionKeyType.SEND;
        break;
      default:
        returnValue = ActionKeyType.DEFAULT;
    }
    return returnValue;
  }
  set actionKeyType(value: ActionKeyType) {
    switch (value) {
      case ActionKeyType.NEXT:
        this.nativeObject.returnKeyType = IOSReturnKeyType.next;
        break;
      case ActionKeyType.GO:
        this.nativeObject.returnKeyType = IOSReturnKeyType.go;
        break;
      case ActionKeyType.SEARCH:
        this.nativeObject.returnKeyType = IOSReturnKeyType.search;
        break;
      case ActionKeyType.SEND:
        this.nativeObject.returnKeyType = IOSReturnKeyType.send;
        break;
      default:
        this.nativeObject.returnKeyType = IOSReturnKeyType.default;
    }
  }

  showKeyboard(): void {
    this.nativeObject.becomeFirstResponder();
  }

  hideKeyboard(): void {
    this.nativeObject.resignFirstResponder();
  }

  requestFocus(): void {
    this.nativeObject.becomeFirstResponder();
  }

  removeFocus(): void {
    this.nativeObject.resignFirstResponder();
  }

  get onTextChanged(): (e?: { insertedText: string; location: number }) => void {
    return this._onTextChanged;
  }
  set onTextChanged(value: (e?: { insertedText: string; location: number }) => void) {
    this._onTextChanged = value;
  }

  get onClearButtonPress(): () => void {
    return this._onClearButtonPress;
  }
  set onClearButtonPress(value: () => void) {
    this._onClearButtonPress = value;
  }

  get onEditEnds(): () => void {
    return this._onEditEnds;
  }
  set onEditEnds(value: () => void) {
    this._onEditEnds = value;
  }

  get onActionButtonPress(): (e?: { actionKeyType: ActionKeyType }) => void {
    return this._onActionButtonPress;
  }
  set onActionButtonPress(value: (e?: { actionKeyType: ActionKeyType }) => void) {
    this._onActionButtonPress = value;
  }
}
