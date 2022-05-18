export default abstract class NativeComponent<TNative = any, TProps extends Record<string, any> = Record<string, any>> {
  protected _nativeObject: any;
  constructor(params?: TProps) {
    const nativeObject = params?.nativeObject || this.createNativeObject(params);
    if (nativeObject) {
      this.nativeObject = nativeObject;
    }
    this.preConstruct(params);
  }

  get nativeObject(): any {
    return this._nativeObject;
  }

  set nativeObject(value: any) {
    this._nativeObject = value;
  }

  /**
   * Executed before constuctor and after createNativeObject.
   * Use this when you have default values which needs to be set before constructor.
   */
  protected preConstruct(params?: Partial<TProps>): void {
    const { android = {}, ios = {}, ...rest } = params || { ios: {}, android: {} };
    rest && Object.assign(this, rest);
  }

  /**
   * Executed before everything.
   * This should return nativeObject since it will be assinged directly to nativeObject.
   *
   */
  protected abstract createNativeObject(params?: Partial<TProps>): any;
}
