import { INativeComponent } from "./inative-component";

export default class NativeComponent implements INativeComponent {
  protected _nativeObject: any;

  get nativeObject(): any {
    return this._nativeObject;
  }

  set nativeObject(value: any) {
    this._nativeObject = value;
  }
}
