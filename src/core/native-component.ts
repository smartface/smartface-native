import { INativeComponent } from './inative-component';

type NativeInstance = Partial<Record<any, any>>;
export default abstract class NativeComponent<TNative extends NativeInstance = NativeInstance, TProps extends Record<string, any> = Record<string, any>> {
  protected _nativeObject: any;
  constructor(params?: TProps) {
    const { android = {}, ios = {}, ...rest } = params || {ios: {}, android: {}};
    rest && Object.assign(this, rest);
  }

  get nativeObject(): any {
    return this._nativeObject;
  }

  set nativeObject(value: any) {
    this._nativeObject = value;
  }
}
