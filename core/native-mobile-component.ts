import { copyObjectPropertiesWithDescriptors } from '../util';
import NativeComponent from './native-component';

export type WithMobileOSProps<TProps extends { [key: string]: any } = {}, TIOS extends { [key: string]: any } = {}, TAND extends { [key: string]: any } = {}> = {
  ios?: TIOS;
  android?: TAND;
} & TProps;
export abstract class NativeMobileComponent<
  TNative = any,
  TProps extends WithMobileOSProps<{ [key: string]: any }> = {},
> extends NativeComponent<TNative> {
  private _ios: Partial<TProps['ios']> = {};
  private _android: Partial<TProps['android']> = {};
  constructor({ android={}, ios={}, ...rest }: TProps ) {
    super(rest);

    copyObjectPropertiesWithDescriptors(this._ios, ios);
    copyObjectPropertiesWithDescriptors(this._android, android);
  }
  protected addAndroidProps(props: Partial<TProps['android']>) {
    copyObjectPropertiesWithDescriptors(this._android, props);
  }
  protected addIOSProps(props: Partial<TProps['ios']>) {
    copyObjectPropertiesWithDescriptors(this._ios, props);
  }
  get ios(): Partial<TProps['ios']> {
    return this._ios;
  }
  get android(): Partial<TProps['android']> {
    return this._android;
  }
}
