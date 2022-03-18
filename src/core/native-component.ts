import { INativeComponent } from './inative-component';

export default abstract class NativeComponent<TNative = any, TProps extends Record<string, any> = Record<string, any>> {
  protected _nativeObject: any;
  constructor(params?: TProps) {
    const { android = {}, ios = {}, ...rest } = params || { ios: {}, android: {} };
    const nativeObject = this.createNativeObject();
    if (nativeObject) {
      this.nativeObject = nativeObject;
    }
    rest && Object.assign(this, rest);
  }

  get nativeObject(): any {
    return this._nativeObject;
  }

  set nativeObject(value: any) {
    this._nativeObject = value;
  }

  protected abstract createNativeObject(): any;
}
