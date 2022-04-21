export default abstract class NativeComponent<TNative = any, TProps extends Record<string, any> = Record<string, any>> {
  protected _nativeObject: any;
  constructor(params?: TProps) {
    const nativeObject = params?.nativeObject || this.__createNativeObject__(params);
    if (nativeObject) {
      this.nativeObject = nativeObject;
    }
    this.__init__(params);
  }

  get nativeObject(): any {
    return this._nativeObject;
  }

  set nativeObject(value: any) {
    this._nativeObject = value;
  }

  protected __init__(params?: Partial<TProps>): void {
    const { android = {}, ios = {}, ...rest } = params || { ios: {}, android: {} };
    rest && Object.assign(this, rest);
  }
  protected abstract __createNativeObject__(params?: Partial<TProps>): any;
}
