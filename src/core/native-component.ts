export default abstract class NativeComponent<TNative = any, TProps extends Record<string, any> = Record<string, any>> {
  protected _nativeObject: any;
  constructor(params?: TProps) {
    const nativeObject = params?.nativeObject || this.createNativeObject(params);
    if (nativeObject) {
      this.nativeObject = nativeObject;
    }
    this.init(params);
  }

  get nativeObject(): any {
    return this._nativeObject;
  }

  set nativeObject(value: any) {
    this._nativeObject = value;
  }

  protected init(params?: Partial<TProps>): void {
    const { android = {}, ios = {}, ...rest } = params || { ios: {}, android: {} };
    /**
     * This might break default assignments in constructor.
     */
    rest && Object.assign(this, rest);
  }
  protected abstract createNativeObject(params?: Partial<TProps>): any;
}
