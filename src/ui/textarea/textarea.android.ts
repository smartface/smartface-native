import { ITextArea } from './textarea';
import ActionKeyType from '../shared/android/actionkeytype';
import KeyboardType from '../shared/keyboardtype';
import TextBoxAndroid from '../textbox/textbox.android';
import { TextAreaEvents } from './textarea-events';

export default class TextAreaAndroid<TEvent extends string = TextAreaEvents, TNative = any, TProps extends ITextArea = ITextArea>
  extends TextBoxAndroid<TEvent | TextAreaEvents, TNative, TProps>
  implements ITextArea<TEvent>
{
  private __hint: string;
  private __actionKeyType: ActionKeyType;
  private __keyboardType: KeyboardType;
  private __isPassword: boolean;
  private __onActionButtonPress: ITextArea['onActionButtonPress'];
  constructor(params?: Partial<TProps>) {
    super(params);
    this.addAndroidProps(this.getAndroidProps());
    this.nativeObject.setSingleLine(false);
  }

  private getAndroidProps() {
    const self = this;
    return {
      get hint(): string {
        return self.nativeObject.getHint();
      },
      set hint(value: string) {
        self.nativeObject.setHint(value);
      }
    };
  }

  get isPassword(): boolean {
    return this.__isPassword;
  }
  set isPassword(value: boolean) {
    this.__isPassword = value;
  }

  get actionKeyType(): ActionKeyType {
    return this.__actionKeyType;
  }
  set actionKeyType(value: ActionKeyType) {
    this.__actionKeyType = value;
  }

  get keyboardType(): KeyboardType {
    return this.__keyboardType;
  }
  set keyboardType(value: KeyboardType) {
    this.__keyboardType = value;
  }

  get hint(): string {
    return this.__hint;
  }
  set hint(value: string) {
    this.__hint = value;
  }
  get onActionButtonPress(): ITextArea['onActionButtonPress'] {
    return this.__onActionButtonPress;
  }
  set onActionButtonPress(value: ITextArea['onActionButtonPress']) {
    this.__onActionButtonPress = value;
  }
}
