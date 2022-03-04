import { iOSProps, ITextArea } from '.';
import TextBoxIOS from '../textbox/textbox.ios';
import { TextAreaEvents } from './textarea-events';
import { UIScrollViewInheritance } from '../../util';
import TextAlignment from '../textalignment';
import ActionKeyType from '../actionkeytype';
import KeyboardType from '../keyboardtype';

export default class TextAreaIOS<TEvent extends string = TextAreaEvents, TNative = iOSProps> extends TextBoxIOS<TEvent | TextAreaEvents, TNative> implements ITextArea<TEvent, TNative> {
  private _bounces: boolean;
  private __hint: string;
  private _actionKeyType: ActionKeyType;
  private _keyboardType: KeyboardType;
  private _isPassword: boolean;
  private _adjustFontSizeToFit: boolean;
  private _minimumFontSize: number;
  private __clearButtonEnabled: boolean;
  constructor(params: Partial<ITextArea> = {}) {
    super(params);

    if (!this.nativeObject) {
      this._nativeObject = new __SF_UITextView();
    }

    UIScrollViewInheritance.addPropertiesAndMethods.call(this);

    const { ios, ...restParams } = params;
    ios.showScrollBar = false;
    Object.assign(this._ios, ios, this.iosProps);
    Object.assign(this, restParams);
  }

  get iosProps() {
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
      get clearButtonEnabled(): ITextArea['ios']['clearButtonEnabled'] {
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
