import { copyObjectPropertiesWithDescriptors } from '../util';
import { INativeComponent } from './inative-component';

export default abstract class NativeComponent<TNative = any, TIOS extends Record<string, any> = {}, TAND extends Record<string, any> = {}> implements INativeComponent<TNative> {
  protected _nativeObject: TNative;
  private _ios: Partial<TIOS>;
  private _android: Partial<TAND> = {};
  constructor(params: any = {}) {
    const { android = {}, ios = {}, ...rest } = params;

    copyObjectPropertiesWithDescriptors(this._ios, ios);
    copyObjectPropertiesWithDescriptors(this._android, android);
    Object.assign(this, rest);
  }
  protected addAndroidProps(props: Partial<TAND>) {
    copyObjectPropertiesWithDescriptors(this._android, props);
  }
  protected addIOSProps(props: Partial<TIOS>) {
    copyObjectPropertiesWithDescriptors(this._ios, props);
  }
  protected abstract getIOSProps(): Partial<TIOS>;
  protected abstract getAndroidProps(): Partial<TAND>;
  get nativeObject(): TNative {
    return this._nativeObject;
  }

  set nativeObject(value: TNative) {
    this._nativeObject = value;
  }

  get ios(): Partial<TIOS> {
    return this._ios;
  }
  get android(): Partial<TAND> {
    return this._android;
  }
}
