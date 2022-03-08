import { ITextArea } from '.';
import ActionKeyType from '../shared/android/actionkeytype';
import KeyboardType from '../shared/keyboardtype';
import TextAlignment from '../shared/textalignment';
import TextBoxIOS from '../textbox/textbox.ios';
import { TextAreaEvents } from './textarea-events';

export default class TextAreaIOS<TEvent extends string = TextAreaEvents, TNative = __SF_UITextView, TProps extends ITextArea = ITextArea>
  extends TextBoxIOS<TEvent | TextAreaEvents, TNative, TProps>
  implements ITextArea<TEvent>
{
  private _bounces: boolean;
  private __hint: string;
  private _actionKeyType: ActionKeyType;
  private _keyboardType: KeyboardType;
  private _isPassword: boolean;
  private _adjustFontSizeToFit: boolean;
  private _minimumFontSize: number;
  private __clearButtonEnabled: boolean;
  constructor(params?: Partial<TProps>) {
    super(params);

    if (!this.nativeObject) {
      this._nativeObject = new __SF_UITextView();
    }


    // UIScrollViewInheritance.addPropertiesAndMethods.call(this);
    this.addIOSProps(this.iosProps);
    this.ios.showScrollBar = false;
  }
  enabled?: boolean;

  get iosProps(): ITextArea['ios'] {
    const self = this;
    return {
      get showScrollBar(): ITextArea['ios']['showScrollBar'] {
        return self.nativeObject.showsHorizontalScrollIndicator;
      },
      set showScrollBar(value: ITextArea['ios']['showScrollBar']) {
        self.nativeObject.showsHorizontalScrollIndicator = value;
        self.nativeObject.showsVerticalScrollIndicator = value;
      },
      get adjustFontSizeToFit(): ITextArea['ios']['adjustFontSizeToFit'] {
        return self._adjustFontSizeToFit;
      },
      set adjustFontSizeToFit(value: ITextArea['ios']['adjustFontSizeToFit']) {
        self._adjustFontSizeToFit = value;
      },
      get minimumFontSize(): ITextArea['ios']['minimumFontSize'] {
        return self._minimumFontSize;
      },
      set minimumFontSize(value: ITextArea['ios']['minimumFontSize']) {
        self._minimumFontSize = value;
      },
      get clearButtonEnabled(): boolean {
        return self.__clearButtonEnabled;
      },
      set clearButtonEnabled(value: ITextArea['ios']['clearButtonEnabled']) {
        self.__clearButtonEnabled = value;
      }
    };
  }

  get bounces(): boolean {
    return this._bounces;
  }
  set bounces(value: boolean) {
    this._bounces = value;
  }

  get textAlignment(): TextAlignment {
    return this.nativeObject.textAlignmentNumber;
  }
  set textAlignment(value: TextAlignment) {
    this.nativeObject.textAlignmentNumber = value;
  }

  get hint(): string {
    return this.__hint;
  }
  set hint(value: string) {
    this.__hint = value;
  }

  get actionKeyType(): ActionKeyType {
    return this._actionKeyType;
  }
  set actionKeyType(value: ActionKeyType) {
    this._actionKeyType = value;
  }

  get keyboardType(): KeyboardType {
    return this._keyboardType;
  }
  set keyboardType(value: KeyboardType) {
    this._keyboardType = value;
  }

  get isPassword(): boolean {
    return this._isPassword;
  }
  set isPassword(value: boolean) {
    this._isPassword = value;
  }
}
