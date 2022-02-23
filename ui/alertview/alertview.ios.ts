import NativeComponent from '../../core/native-component';
import { ButtonType, IAlertView } from './alertview';

enum MethodNames {
  onDismiss = 'onDismiss'
}

export default class AlertViewIOS extends NativeComponent implements IAlertView {
  private delegate: (method: { name: string }) => void;
  private _onDismiss: (alertView: AlertViewIOS) => void;
  android = {};
  constructor(params: Partial<IAlertView> = {}) {
    super();
    this.nativeObject = __SF_UIAlertController.createAlertController(1);
    this.title = '';
    this.delegate = (method: { name: string }) => {
      if (method.name === MethodNames.onDismiss) {
        this.onDismiss();
      }
    };

    for (const param in params) {
      this[param] = params[param];
    }
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
    __SF_UIAlertController.dismissAlert(this.nativeObject, this.delegate);
  }
  get textBoxes(): { text: string }[] {
    const returnArray = [];
    if (Array.isArray(this.nativeObject.textFields)) {
      this.nativeObject.textFields.forEach((textfield: __SF_UITextField) => {
        returnArray.push({ text: textfield.valueForKey('text') });
      });
    }
    return returnArray;
  }
  addButton(params: Partial<Parameters<IAlertView['addButton']>['0']>): void {
    const action = __SF_UIAlertAction.createAction(params.text, params.index, params.onClick);
    this.nativeObject.addAction(action);
  }
  addTextBox(params: Partial<Parameters<IAlertView['addTextBox']>['0']>): void {
    __SF_UIAlertController.addTextFieldArea(this.nativeObject, params.text, params.hint, params.isPassword);
  }

  static Android = {
    ButtonType: ButtonType
  };
}
