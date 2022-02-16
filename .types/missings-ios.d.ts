import ActivityIndicator from '../ui/activityindicator';
import DocumentPicker from '../device/documentpicker';

declare class __SF_UIColor {
  static hexColor: (hex: String) => __SF_UIColor;
  static blackColor(): __SF_UIColor;
  static blueColor(): __SF_UIColor;
  static cyanColor(): __SF_UIColor;
  static darkGrayColor(): __SF_UIColor;
  static greenColor(): __SF_UIColor;
  static lightGrayColor(): __SF_UIColor;
  static magentaColor(): __SF_UIColor;
  static clearColor(): __SF_UIColor;
  static yellowColor(): __SF_UIColor;
  static whiteColor(): __SF_UIColor;
  constructor(r: number, g: number, b: number);
  constructor(a: number, r: number, g: number, b: number);
  layerToImage(): __SF_UIImage;
  frame: unknown;
}

declare class __SF_UIImage {
  constructor(fileName: string);
  static createName(fileName: string): void;
  static createNSData(obj: any);
  getInstance(): __SF_UIImage;
}
declare class __SF_NSInvocation {
  static createInvocationWithSelectorInstance(name: string, obj: any);
}

declare class __SF_Dispatch {
  static mainAsyncAfter: () => void;
  static mainAsync: () => void;
}

declare class __SF_UIScreen {
  mainScreen: () => { bounds: { width: number; heigth: number }; scale: number };
}

declare class __SF_UIApplicationDidChangeStatusBarOrientationNotification {}

declare class __SF_UIView {
  static viewAppearanceSemanticContentAttribute(): number;
  static performWithoutAnimationWrapper(param: any): any;
  static animation(duration: number, delay: number, animations: () => void, completion?: () => void): void;
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
  static createGradient(startColor: __SF_UIColor, endColor: __SF_UIColor, pointStart: { x: number; y: number }, pointEnd: { x: number; y: number }): __SF_CAGradientLayer;
  addFrameObserver(): void;
  frameObserveHandler(handler: (e: { frame: unknown }) => void): void;
  setBackgroundImage(image: __SF_UIImage, state: unknown);
  setBackgroundColor(color: __SF_UIColor, state: unknown);
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
    userInterfaceLayoutDirection: number;
    statusBarOrientationAnimationDuration: number;
    keyWindow: { addSubView(view: __SF_UIView): void };
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
  callObserverCallChanged: (observer: unknown, call: { hasEnded: boolean; hasConnected: boolean; isOutgoing: boolean }) => void;
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
  phoneNumbers: { value: { stringValue: string } }[];
  urlAddresses: { value: string }[];
  emailAddresses: { value: string }[];
  addresses: { value: Partial<__SF_CNMutablePostalAddressObject> }[];
}

declare class __SF_CNMutablePostalAddress {
  static new: () => __SF_CNMutablePostalAddressObject;
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
declare class __SF_CNLabelPhoneNumberMain extends __SF_CNLabelParent {}
declare class __SF_CNLabelHome extends __SF_CNLabelParent {}
declare class __SF_CNLabelURLAddressHomePage extends __SF_CNLabelParent {}

export class ContactNative {
  private constructor();
  mutableCopy: () => any;
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

declare class __SF_UIActivityIndicatorView {
  constructor(style: ActivityIndicator.iOS.ActivityIndicatorViewStyle);
  startAnimating(): void;
  color: __SF_UIColor; //TODO: Add nativeobject of color
  visible: boolean;
  activityIndicatorViewStyle: ActivityIndicator.iOS.ActivityIndicatorViewStyle;
}

declare class __SF_UIAlertController {
  static createAlertController(style: number);
  static present(view: __SF_UIAlertControllerView);
  static dismissAlert(view: __SF_UIAlertControllerView, delegate: any /* TODO: Add delegate type */);
  static addTextFieldArea(view: __SF_UIAlertControllerView, text: string, hint: string, isPassword: boolean);
}

export class __SF_UIAlertControllerView {
  title: string;
  message: string;
  addAction(action: __SF_UIAlertAction);
}

declare class __SF_UIAlertAction {
  static createAction(text: string, index: number, onClick: () => void): __SF_UIAlertAction;
}

declare class __SF_SMFVisualEffectView {
  constructor(style: number);
  setBlurStyle(style: number): void;
}

declare class __SF_UITabBarAppearance {
  configureWithOpaqueBackground(): void;
  backgroundColor: __SF_UIColor;
}

declare class __SF_UIButton {
  setEnabled: boolean;
  textAlignmentNumber: number;
  contentVerticalAlignment: number;
  contentHorizontalAlignment: number;
  titleLabel: { font: __SF_UIFont /*TODO: This might not be this font type, check */ };
  setTitleColor(textColor: __SF_UIColor, buttonState: number /*TODO: Use ButtonState enum when button is converted*/): void;
  removeFrameObserver(): void;
  addJSTarget(value: (...args: any[]) => any, uiControlEvent: unknown /*TODO: Add after UIControlEvent on Util is complete */): void;
}

declare class __SF_UIDatePicker {
  onSelected: (e: { date: Date }) => void;
  onCancelled: () => void;
  defaultDate: Date;
  minimumDate: Date;
  maximumDate: Date;
  textColor: __SF_UIColor;
  dialogBackgroundColor: __SF_UIColor;
  dialogLineColor: __SF_UIColor;
  datePickerMode: boolean;
  show(
    title: string | undefined,
    titleColor: __SF_UIColor | undefined,
    titleFont: __SF_UIFont | undefined,
    cancelColor: __SF_UIColor | undefined,
    cancelHighlightedColor: __SF_UIColor | undefined,
    cancelFont: __SF_UIFont | undefined,
    okColor: __SF_UIColor | undefined,
    okHighlightedColor: __SF_UIColor | undefined,
    okFont: __SF_UIFont | undefined,
    okText: string | undefined,
    cancelText: string | undefined
  ): void;
}
