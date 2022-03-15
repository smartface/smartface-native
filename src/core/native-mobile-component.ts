import copyObjectPropertiesWithDescriptors from '../util/copyObjectPropertiesWithDescriptors';
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
export abstract class NativeMobileComponent<
  TNative extends Record<string, any> = Record<string, any>,
  TProps extends WithMobileOSProps<{ [key: string]: any }> = WithMobileOSProps<{ [key: string]: any }>
> extends NativeComponent<TNative> {
  private _ios: TProps['ios'] = {};
  protected _android: TProps['android'] = {};
  constructor({ android = {}, ios = {}, ...rest }: Partial<TProps> = {}) {
    super(rest);

    this._ios && copyObjectPropertiesWithDescriptors(this._ios, ios);
    this._android && copyObjectPropertiesWithDescriptors(this._android, android);
  }
  protected addAndroidProps(props: TProps['android']) {
    this._android && copyObjectPropertiesWithDescriptors(this._android, props);
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
