import NativeComponent from '../../../core/native-component';
import IBlob from '../../../global/blob/blob';
import { ContactIOSPostalType, IContact } from './contact';

export default class ContactAndroid extends NativeComponent implements IContact {
  phoneNumbers?: string[] | undefined;
  phoneNumber?: string[] | undefined;
  emailAddresses?: string[] | undefined;
  givenName?: string | undefined;
  familyName?: string | undefined;
  addresses?: string[] | undefined;
  address?: string | undefined;
  urlAddresses?: string[] | undefined;
  firstName?: string | undefined;
  lastName?: string | undefined;
  middleName?: string | undefined;
  namePrefix?: string | undefined;
  nameSuffix?: string | undefined;
  title?: string | undefined;
  organization?: string | undefined;
  department?: string | undefined;
  nickname?: string | undefined;
  displayName?: string | undefined;
  photo?: IBlob | null | undefined;
  postalAddresses: string[] | { value: ContactIOSPostalType }[];
  constructor(params?: Partial<IContact>) {
    super(params);
  }
  protected createNativeObject() {
    return null;
  }
}
