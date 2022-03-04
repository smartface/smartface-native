import { INativeComponent } from './inative-component';

export default abstract class NativeComponent<TNative extends {[key: string]: any} = {}, TNativeProps extends { ios?: {[key: string]: any}, android?: {[key: string]: any} } = {}, TAND extends Record<string, any> = {}> implements INativeComponent<TNative> {
  protected _nativeObject: TNative;
  constructor(params: any = {}) {
    const { android = {}, ios = {}, ...rest } = params;
    Object.assign(this, rest);
  }
  get nativeObject(): TNative {
    return this._nativeObject;
  }

  set nativeObject(value: TNative) {
    this._nativeObject = value;
  }
}
