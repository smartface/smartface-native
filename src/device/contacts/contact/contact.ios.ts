import NativeComponent from '../../../core/native-component';
import IBlob from '../../../global/blob/blob';
import BlobIOS from '../../../global/blob/blob.ios';
import { ContactIOSPostalType, IContact } from './contact';

export class ContactIOS extends NativeComponent implements IContact {
  private _email: string[] | undefined;
  private _phoneNumber: string[] | undefined;
  private _displayName: string | undefined;
  constructor(params?: Partial<ContactIOS>) {
    super(params);
  }
  protected createNativeObject() {
    return __SF_CNMutableContact.new();
  }

  get namePrefix(): string | undefined {
    return this.nativeObject.namePrefix;
  }
  set namePrefix(value: string | undefined) {
    this.nativeObject.namePrefix = value;
  }
  get firstName(): string | undefined {
    return this.nativeObject.givenName;
  }
  set firstName(value: string | undefined) {
    this.nativeObject.givenName = value;
  }
  get lastName(): string | undefined {
    return this.nativeObject.familyName;
  }
  set lastName(value: string | undefined) {
    this.nativeObject.familyName = value;
  }
  get nameSuffix(): string | undefined {
    return this.nativeObject.nameSuffix;
  }
  set nameSuffix(value: string | undefined) {
    this.nativeObject.nameSuffix = value;
  }
  get title(): string | undefined {
    return this.nativeObject.jobTitle;
  }
  set title(value: string | undefined) {
    this.nativeObject.jobTitle = value;
  }
  get organization(): string | undefined {
    return this.nativeObject.organizationName;
  }
  set organization(value: string | undefined) {
    this.nativeObject.organizationName = value;
  }
  get department(): string | undefined {
    return this.nativeObject.departmentName;
  }
  set department(value: string | undefined) {
    this.nativeObject.departmentName = value;
  }
  get nickname(): string | undefined {
    return this.nativeObject.nickname;
  }
  set nickname(value: string | undefined) {
    this.nativeObject.nickname = value;
  }
  get photo(): IBlob | null | undefined {
    return new BlobIOS(this.nativeObject.imageData);
  }
  set photo(value: IBlob | null | undefined) {
    this.nativeObject.imageData = value?.nativeObject;
  }
  get phoneNumbers(): string[] | undefined {
    const phoneNumbers: string[] = [];
    for (const number in this.nativeObject.phoneNumbers) {
      // Added this check to resolve the sonar issue.
      // hasOwnProperty() is used to filter out properties from the object's prototype chain.
      if (Object.prototype.hasOwnProperty.call(this.nativeObject.phoneNumbers, number)) {
        phoneNumbers.push(this.nativeObject.phoneNumbers[number].value.stringValue);
      }
    }
    return phoneNumbers;
  }
  set phoneNumbers(value: string[] | undefined) {
    if (!value || value.length === 0) {
      this.nativeObject.phoneNumbers = [];
      return;
    }
    const nativeArray: any = [];
    for (const property in value) {
      const phoneNumber = __SF_CNPhoneNumber.phoneNumberWithStringValue(value[property]);
      nativeArray.push(new __SF_CNLabeledValue(__SF_CNLabelPhoneNumberMain, phoneNumber));
    }

    this.nativeObject.phoneNumbers = nativeArray;
  }
  get urlAddresses(): string[] | undefined {
    const urlAddresses: string[] = [];
    for (const urlAddress in this.nativeObject.urlAddresses) {
      // Added this check to resolve the sonar issue.
      if (Object.prototype.hasOwnProperty.call(this.nativeObject.urlAddresses, urlAddress)) {
        urlAddresses.push(this.nativeObject.urlAddresses[urlAddress].value);
      }
    }
    return urlAddresses;
  }
  set urlAddresses(value: string[] | undefined) {
    if (!value || value.length === 0) {
      this.nativeObject.urlAddresses = [];
      return;
    }
    const nativeArray: any[] = [];
    for (const property in value) {
      nativeArray.push(new __SF_CNLabeledValue(__SF_CNLabelURLAddressHomePage, value[property]));
    }
    this.nativeObject.urlAddresses = nativeArray;
  }
  get middleName(): string | undefined {
    return this.nativeObject.middleName;
  }
  set middleName(value: string | undefined) {
    this.nativeObject.middleName = value;
  }
  get emailAddresses(): string[] | undefined {
    const emailAddresses: any = [];
    for (const emailAddress in this.nativeObject.emailAddresses) {
      // Added this check to resolve the sonar issue.
      if (Object.prototype.hasOwnProperty.call(this.nativeObject.emailAddresses, emailAddress)) {
        emailAddresses.push(this.nativeObject.emailAddresses[emailAddress].value);
      }
    }
    return emailAddresses;
  }
  set emailAddresses(value: string[] | undefined) {
    if (!value || value.length === 0) {
      this.nativeObject.emailAddresses = [];
      return;
    }
    const nativeArray: any[] = [];
    for (const property in value) {
      nativeArray.push(new __SF_CNLabeledValue(__SF_CNLabelHome, value[property]));
    }

    this.nativeObject.emailAddresses = nativeArray;
  }

  get addresses(): string[] | undefined {
    const addresses: any = [];
    for (const address in this.nativeObject.postalAddresses) {
      // Added this check to resolve the sonar issue.
      if (Object.prototype.hasOwnProperty.call(this.nativeObject.postalAddresses, address)) {
        const postalAddressValue = this.nativeObject.postalAddresses[address].value;
        const addressStr = `${postalAddressValue.street}' '${postalAddressValue.city} ${postalAddressValue.state} ${postalAddressValue.postalCode} ${postalAddressValue.country}`;
        addresses.push(addressStr);
      }
    }
    return addresses;
  }
  set addresses(value: string[] | undefined) {
    if (!value || value.length === 0) {
      this.nativeObject.postalAddresses = [];
      return;
    }
    const nativeArray: any = [];
    for (const property in value) {
      const addressValue = __SF_CNMutablePostalAddress.new();
      addressValue.street = value[property];
      nativeArray.push(new __SF_CNLabeledValue(__SF_CNLabelHome, addressValue));
    }

    this.nativeObject.postalAddresses = nativeArray;
  }
  givenName?: string | undefined;
  familyName?: string | undefined;
  postalAddresses: string[] | { value: ContactIOSPostalType }[];
  get address(): string | undefined {
    const firstAddress = this.postalAddresses[0];
    if (typeof firstAddress === 'string') {
      return firstAddress;
    } else {
      return firstAddress.value.street;
    }
  }
  set address(value: string | undefined) {
    this.addresses = [value || ''];
  }
  get displayName(): string | undefined {
    return this._displayName || `${this.givenName} ${this.familyName}`;
  }
  set displayName(value: string | undefined) {
    this._displayName = value;
  }
  get phoneNumber() {
    return this._phoneNumber;
  }
  set phoneNumber(value) {
    const phoneNumberStringValue = __SF_CNPhoneNumber.phoneNumberWithStringValue(value);
    this._phoneNumber = [new __SF_CNLabeledValue(__SF_CNLabelPhoneNumberMain, phoneNumberStringValue) as string];
  }
  get email() {
    return this._email;
  }
  set email(value) {
    this._email = [new __SF_CNLabeledValue(__SF_CNLabelHome, value) as string];
  }
  get urlAddress() {
    return this.urlAddresses;
  }
  set urlAddress(value) {
    this.urlAddresses = [new __SF_CNLabeledValue(__SF_CNLabelURLAddressHomePage, value) as string];
  }
}
