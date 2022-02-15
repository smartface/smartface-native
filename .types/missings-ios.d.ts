import DocumentPicker from "../device/documentpicker";

declare class __SF_UIColor {
  static hexColor: (hex: String) => __SF_UIColor;
  constructor(r: number, g: number, b: number);
  constructor(a: number, r: number, g: number, b: number);
}

declare class __SF_UIImage {
  constructor(fileName: string);
  static createName(fileName: string): void;
  static createNSData(obj: any);
}
declare class __SF_NSInvocation {
  static createInvocationWithSelectorInstance(name: string, obj: any);
}

declare class __SF_UIView {
  static viewAppearanceSemanticContentAttribute: any;
  static performWithoutAnimationWrapper(param: any): any;
}
declare class __SF_NSUserDefaults {
  setObjectForKey(value: any, key: string): any;
  synchronize(): any;
  constructor(param: string);
}
declare class __SF_FILE {}

declare class __SF_UIFont {
  // TODO: it must be fontNamesByFamilyName
  static systemFontOfSize(size: number): number;
  static fontWithNameSize(fontFamily: string, size: number): any;
}

declare class UIFont {
  static fontNamesForFamilyName(familyName: string): string[];
  static familyNames(): string[];
}

declare class __SF_CAGradientLayer {
  static createGradient(...args: any[]): __SF_CAGradientLayer;
}

declare class __SF_Label {
  static createFromFile(path: string, size: number): any;
}

declare class __SF_UIApplication {
  static sharedApplication(): {
    statusBarFrame: { height: number };
    valueForKey: (str: string) => any;
    sf_statusBarStyle: any;
    sf_statusBarHidden: boolean;
  };
}

declare class __SF_CMMotionManager {
  constructor();
  accelerometerUpdateInterval: number;
  startAccelerometerUpdates(): void;
  stopAccelerometerUpdates(): void;
  callback: () => void;
}

declare class __SF_CallObserverDelegate {
  constructor();
  callObserverCallChanged: (observer: unknown, call: { hasEnded: boolean, hasConnected: boolean, isOutgoing: boolean } ) => void;
}

declare class __SF_CNMutableContact {
  static new(): __SF_CNMutableContactObject;
}

export class __SF_CNMutableContactObject {
  constructor();
  namePrefix: string;
  givenName: string;
  familyName: string;
  middleName: string;
  nameSuffix: string;
  jobTitle: string;
  organizationName: string;
  departmentName: string;
  nickname: string;
  imageData: string[];
  phoneNumbers: { value: { stringValue: string }}[];
  urlAddresses: { value: string }[];
  emailAddresses: { value: string }[];
  addresses: { value: Partial<__SF_CNMutablePostalAddressObject> }[];

}

declare class __SF_CNMutablePostalAddress {
  static new: () => __SF_CNMutablePostalAddressObject
}

export class __SF_CNMutablePostalAddressObject {
  constructor();
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

declare class __SF_CNLabeledValue {
  constructor(instance: __SF_CNLabelParent, value: any);
}

// This is not to be used directly
export class __SF_CNLabelParent {
  constructor();
}
declare class __SF_CNLabelPhoneNumberMain extends __SF_CNLabelParent {

}
declare class __SF_CNLabelHome extends __SF_CNLabelParent {

}
declare class __SF_CNLabelURLAddressHomePage extends __SF_CNLabelParent {

}

export class ContactNative {
  private constructor();
  mutableCopy: () => any
} 

declare class __SF_CNContactPickerDelegate {
  contactPickerDidSelectContact: (contact: ContactNative) => void;
  contactPickerDidCancel(): void;
}

declare class __SF_CNContactStore {
  static new(): __SF_CNContactStoreObject;
}

export class __SF_CNContactStoreObject {
  requestAccess: (value: () => void) => void;
  fetchAllContacts: (value: (allContactsNativeArray: ContactNative[]) => void) => void;
  executeSave(saveRequest: __SF_CNSaveRequestObject): void;
}

declare class __SF_CNPhoneNumber {
  static phoneNumberWithStringValue(string): any;
}

declare class __SF_CNContactViewControllerDelegate {
  didCompleteWithContact: (contact: ContactNative) => void;
}

declare class __SF_CNContactViewController {
  static viewControllerForNewContact(contact: ContactNative);
  contactStore: __SF_CNContactStoreObject;
  allowActions: boolean;
  delegate: __SF_CNContactViewControllerDelegate;
}

declare class __SF_CNSaveRequest {
  static new(): __SF_CNSaveRequestObject;
}
declare class __SF_CNSaveRequestObject {
  addContact(contact: ContactNative): void;
}

declare class __SF_UIDocumentPickerViewController {
  constructor(type: DocumentPicker.Types[], number: number);
  documentDelegate: __SF_UIDocumentPickerViewControllerDelegate;
  delegate: __SF_UIDocumentPickerViewControllerDelegate;
}

declare class __SF_UIDocumentPickerViewControllerDelegate {
  constructor();
  didPickDocumentsAtURLs(urls: string[]): void;
  documentPickerWasCancelled(): void;
}