import copyObjectPropertiesWithDescriptors from '../util/copyObjectPropertiesWithDescriptors';
import { INativeComponent } from './inative-component';
import NativeComponent from './native-component';

export type MobileOSProps<TIOS = { [key: string]: any }, TAND = { [key: string]: any }> = {
  ios: Partial<TIOS>;
  android: Partial<TAND>;
};
export type WithMobileOSProps<
  TProps extends Record<string, any> = {},
  TIOS extends { [key: string]: any } = { [key: string]: any },
  TAND extends { [key: string]: any } = { [key: string]: any }
> = MobileOSProps<TIOS, TAND> & TProps;

export interface INativeMobileComponent<TNative = any, TProps extends WithMobileOSProps = WithMobileOSProps> extends INativeComponent<TNative> {
  readonly ios: TProps['ios'];
  readonly android: TProps['android'];
}

export abstract class NativeMobileComponent<TNative = any, TProps extends WithMobileOSProps = WithMobileOSProps> extends NativeComponent<TNative> {
  private _ios: TProps['ios'];
  private _android: TProps['android'];
  constructor(params: Partial<TProps> = {}) {
    super(params);

    /**
     * If you have any android/ios specific errors and if it led you here, replace the `params: Partial<TProps> = {}` at constructor with this code:
     * constructor({ android = {}, ios = {}, ...rest }: Partial<TProps> = {}) {
     *   super(rest);
     * Note that it will break android and ios setting on constructor
     */
  }
  protected __init__(params?: Partial<Record<string, any>>): void {
    this._android = {};
    this._ios = {};
    super.__init__(params);
    const { android = {}, ios = {} } = params || { ios: {}, android: {} };
    this.addAndroidProps(android);
    this.addIOSProps(ios);
  }
  protected addAndroidProps(props: TProps['android']) {
    this._android && props && copyObjectPropertiesWithDescriptors(this._android, props);
  }
  protected addIOSProps(props: TProps['ios']) {
    this._ios && props && copyObjectPropertiesWithDescriptors(this._ios, props);
  }
  get ios(): TProps['ios'] {
    return this._ios;
  }
  get android(): TProps['android'] {
    return this._android;
  }
}
