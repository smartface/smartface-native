import { INativeComponent } from '../../../core/inative-component';
import IBlob from '../../../global/blob/blob';

export interface ContactIOSPostalType {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IContact extends INativeComponent {
  phoneNumbers?: string[];
  phoneNumber?: string[]; // coming from old type
  emailAddresses?: string[];
  givenName?: string;
  familyName?: string;
  addresses?: string[];
  address?: string; // coming from old type
  urlAddresses?: string[];
  firstName?: string;
  lastName?: string;
  middleName?: string;
  namePrefix?: string;
  nameSuffix?: string;
  title?: string;
  organization?: string;
  department?: string;
  nickname?: string;
  displayName?: string;
  photo?: IBlob | null;
  postalAddresses: string[] | { value: ContactIOSPostalType }[]; // String on Android and object on iOS
}
