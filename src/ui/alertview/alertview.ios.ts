import { NativeMobileComponent } from '../../core/native-mobile-component';
import { ButtonType, IAlertView } from './alertview';

enum MethodNames {
  onDismiss = 'onDismiss'
}

export default class AlertViewIOS extends NativeMobileComponent<any, IAlertView> implements IAlertView {
  private _onDismiss: (alertView: AlertViewIOS) => void;
  constructor(params?: Partial<IAlertView>) {
    super(params);
  }
  protected createNativeObject() {
    return __SF_UIAlertController.createAlertController(1);
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this.title = '';
    super.preConstruct(params);
  }
  isShowing(): void {
    return this.nativeObject.isBeingPresented;
  }
  show(): void {
    __SF_UIAlertController.present(this.nativeObject);
  }
  get title(): IAlertView['title'] {
    return this.nativeObject.title;
  }
  set title(value: IAlertView['title']) {
    this.nativeObject.title = value;
  }
  get message(): IAlertView['message'] {
    return this.nativeObject.message;
  }
  set message(value: IAlertView['message']) {
    this.nativeObject.message = value;
  }
  get onDismiss(): IAlertView['onDismiss'] {
    return this._onDismiss;
  }
  set onDismiss(value: IAlertView['onDismiss']) {
    this._onDismiss = value;
  }
  dismiss(): void {
    __SF_UIAlertController.dismissAlert(this.nativeObject, (method: { name: string }) => {
      if (method.name === MethodNames.onDismiss) {
        this.onDismiss();
      }
    });
  }
  get textBoxes(): { text: string }[] {
    const returnArray: any[] = [];
    if (Array.isArray(this.nativeObject.textFields)) {
      this.nativeObject.textFields.forEach((textfield: __SF_UITextField) => {
        returnArray.push({ text: textfield.valueForKey('text') });
      });
    }
    return returnArray;
  }
  addButton(params: Parameters<IAlertView['addButton']>['0']): void {
    if (params.text) {
      const action = __SF_UIAlertAction.createAction(params.text, params.index || 0, params.onClick);
      this.nativeObject.addAction(action);
    }
  }
  addTextBox(params: Parameters<IAlertView['addTextBox']>['0']): void {
    __SF_UIAlertController.addTextFieldArea(this.nativeObject, params.text, params.hint, params.isPassword);
  }

  static Android = {
    ButtonType: ButtonType
  };
}
