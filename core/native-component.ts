import { INativeComponent } from './inative-component';

export default class NativeComponent<TNative = any> implements INativeComponent<TNative> {
  protected _nativeObject: TNative;

  get nativeObject(): TNative {
    return this._nativeObject;
  }

  set nativeObject(value: TNative) {
    this._nativeObject = value;
  }
}
