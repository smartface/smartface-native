declare class __SF_UIColor extends __SF_NSOBject {
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
  static grayColor(): __SF_UIColor;
  static redColor(): __SF_UIColor;
  constructor(r: number, g: number, b: number);
  constructor(a: number, r: number, g: number, b: number);
  layerToImage(): __SF_UIImage;
  components(): { red: number; blue: number; green: number; alpha: number };
  frame: __SF_NSRect;
}

declare class __SF_Snackbar extends __SF_NSOBject {
  dismissed: () => void;
}

declare namespace SF {
  export function requireClass(name: string): any;
  export function dispatch_async(queue: any, action: () => void);
  export function dispatch_get_main_queue(): any;
  export function defineClass(name: string, methods: Record<string, Function>): any;
}

declare class __SF_UIImage extends __SF_NSOBject {
  constructor(fileName: string);
  static createName(fileName: string): __SF_UIImage;
  static createNSData(obj: any);
  static getInstance(): any;
  imageWithRenderingMode(mode: number): __SF_UIImage;
  getInstance(): __SF_UIImage;
  size: { width: number; height: number };
}

declare class __SF_UIImageView extends __SF_UIView {
  contentMode: number; /**TODO: After FillType is typed */
  image: any;
  loadImage(image: __SF_UIImage): void;
  getActualPath(): string;
  alpha: number;
  tintColor: __SF_UIColor;
  loadFromURL(url: any, placeholder: __SF_UIImage, headers: any, onSuccess: (innerFade: boolean, image: __SF_UIImage, error: any, cache: any /**TODO: ImageCacheType */, url: any) => void): void;
}
declare class __SF_NSInvocation extends __SF_NSOBject {
  static createInvocationWithSelectorInstance(name: string, obj: any): __SF_NSInvocation;
  static createClassInvocationWithSelectorInstance(name: string, obj: any): __SF_NSInvocation;
  setUIEdgeInsetsArgumentAtIndex(capinsets: __SF_NSRect, mode: number): void;
  target: __SF_NSOBject;
  setSelectorWithString(selector: string): void;
  retainArguments(): void;
  invoke(): void;
  getReturnValue(): any;
  setClassTargetFromString(target: any): void;
}

declare class __SF_SMFUILabel extends __SF_UIView {
  font: __SF_UIFont;
  minimumFontSize: number;
  adjustsFontSizeToFitWidth: boolean;
  baselineAdjustment: number;
  minimumScaleFactor: number;
  lineBreakMode: number;
  numberOfLines: number;
  text: string;
  textAlignment: number;
  textColor: __SF_UIColor;
}

declare class __SF_Dispatch {
  static mainAsyncAfter: (fun?: (...args: any[]) => void, time?: number) => void;
  static mainAsync: (fun?: (...args: any[]) => void) => void;
}

declare class __SF_UIScreen extends __SF_NSOBject {
  static mainScreen: () => { bounds: __SF_NSRect; scale: number };
}

declare class __SF_UIApplicationDidChangeStatusBarOrientationNotification { }

declare class __SF_GCRect {
  width?: number;
  height?: number;
  x: number;
  y: number;
  minX?: number;
  midX?: number;
  maxX?: number;
  minY?: number;
  midY?: number;
  maxY?: number;
}

declare class __SF_CNContactPickerViewController {
  static new(): any;
}

declare class __SF_NSRect extends __SF_GCRect { }

declare class __SF_UIView extends __SF_NSOBject {
  static setViewAppearanceSemanticContentAttribute(param?: number);
  static viewAppearanceSemanticContentAttribute(): number;
  static performWithoutAnimationWrapper(param: any): any;
  static animation(duration: number, delay: number, animations: () => void, completion?: () => void): void;

  onTouch: (e: any) => void;
  onTouchCancelled: (e: any) => void;
  onTouchMoved: (e: any) => void;
  onTouchEnded: (e: any) => void;
  addFrameObserver(): void;
  frameObserveHandler(e: { frame: __SF_NSRect }): void;
  removeFrameObserver(): void;
  scale(coordinates: { x: number; y: number }): void;
  flipHorizontally(): void;
  flipVertically(): void;
  addSubview(view: __SF_UIView): void;
  removeFromSuperview(): void;
  willRemoveSubview: (e: any) => void;
  endEditing(animated: boolean): void;
  layoutIfNeeded(): void;
  sizeToFit(): void;
  className(): any;
  becomeFirstResponder(): void;
  resignFirstResponder(): void;
  getParentViewController(): __SF_UIViewController;
  removeFromParentViewController(): void;
  parentViewController(): __SF_UIViewController;
  didScroll(e: any): void;
  widthAnchor: any;
  heightAnchor: any;
  viewControllers: __SF_UIViewController[];
  navigationBar: any; /**TODO: NavigationBar Type */
  subviews: __SF_UIView[];
  superview: __SF_UIView;
  subview: __SF_UIView;
  touchEnabled: boolean;
  tag: string;
  view: __SF_UIView;
  alpha: number;
  backgroundColor: __SF_UIColor;
  yoga: any;
  frame: __SF_NSRect;
  bounds: __SF_NSRect;
  layer: any;
  uuid: string;
}
declare class __SF_NSUserDefaults extends __SF_NSOBject {
  setObjectForKey(value: any, key: string): any;
  synchronize(): any;
  dictionaryRepresentation(): any;
  constructor(param: string);
}
declare class __SF_File {
  static create(value: string): __SF_File;
  static getDocumentsDirectory(): string;
  static getMainBundleDirectory(): string;
}

declare class __SF_FileStream {
  static createWithPathWithStreamModeWithContentMode(path: string, streamModeValue: any, contentModeValue: any): __SF_FileStream;
  streamMode: any;
  contentMode: any;
  isReadable(): any;
  isWritable(): any;
  getName(): any;
  getPath(): any;
  closeFile(): any;
  getBlob(): __SF_NSData;
  readToEnd(): any;
  seekToEnd(): any;
  writeString(content: string): any;
  writeBinary(content: __SF_NSData): any;
  offset: any;
}

declare class __SF_LAContext {
  evaluatePolicy(message: string, onSuccess: () => void, onError: () => void): void;
  canEvaluatePolicy(): boolean;
  instancesRespondToSelector(selector: string): any;
  setValueForKey(value: any, key: string): void;
  valueForKey(key: string): any;
}

declare class __SF_NSLocale extends __SF_NSOBject {
  constructor(locale: string);
  static currentLocale(): any;
}

declare class __SF_NSOperationQueue extends __SF_NSOBject {
  static mainQueue(): any;
}

declare class __SF_NSBlockOperation extends __SF_NSOBject {
  static blockOperationWithJSValue(fun?: () => void): any;
  addOperation(operation: any): void;
  operationCount: number;
  cancelAllOperations(): void;
}

declare class __SF_UIPasteboard {
  static generalPasteboard(): any;
}

declare class __SF_UIPageViewControllerDatasource {
  viewControllerBeforeViewController: (e: any) => __SF_UIViewController | undefined;
  viewControllerAfterViewController: (e: any) => __SF_UIViewController | undefined;
}

declare class __SF_UIFont {
  static systemFontOfSize(size: number): any;
  static boldSystemFontOfSize(size: number): any;
  static fontWithNameSize(fontFamily: string, size: number): any;
  static italicSystemFontOfSize(size: number): any;
  static createFromFileWithFilenameStringSize(actualPath: string, size: number): any;
  static familyNames(): string[];
  static fontNamesForFamilyName(familyName: string): string[];
}

declare class __SF_NSData extends __SF_NSOBject {
  static base64Encoded(base64: string): string[];
  static dataFromUTF8String(utf8: string): string[];
}

declare class __SF_FLAnimatedImage {
  static animatedImageWithGIFData(blob: unknown): __SF_FLAnimatedImage;
}

declare class __SF_FLAnimatedImageView {
  animatedImage: __SF_FLAnimatedImage;
  currentFrame: number;
  animating: boolean;
  startAnimating(): void;
  stopAnimating(): void;
  setLoopCompletionBlockWithJSValue(handler: (...args: any) => void): void;
}

declare class __SF_NSIndexPath extends __SF_NSOBject {
  row: number;
  section: any;
  static indexPathForRowInSection(row: number, section: number): __SF_NSIndexPath;
  static indexPathForItemInSection(index: number, section: number): __SF_NSIndexPath;
}

declare class __SF_UIRefreshControl extends __SF_UIView {
  removeFromSuperview(): void;
  endRefreshing(): void;
  tintColor: __SF_UIColor;
  addJSTarget(value: (...args: any[]) => any, uiControlEvent: unknown /*TODO: Add after UIControlEvent on Util is complete */): void;
}

declare class __SF_MGSwipeButton extends __SF_NSOBject {
  static createMGSwipeButton(text: string, backgroundColor: __SF_UIColor, padding: number, action: (params: { index: number }) => void): __SF_MGSwipeButton;
  static createMGSwipeButtonWithIconWithTitleIconColorPaddingJsActionIsAutoHide(
    text: string,
    icon: __SF_UIImage,
    backgroundColor: __SF_UIColor,
    padding: number,
    action: (params: { index: number }) => void,
    isAutoHide: boolean
  ): __SF_MGSwipeButton;
  static createMGSwipeButtonWithTitleColorPaddingJsActionIsAutoHide(
    text: string,
    backgroundColor: __SF_UIColor,
    padding: number,
    action: (params: { index: number }) => void,
    isAutoHide: boolean
  ): __SF_MGSwipeButton;
  setTitleColor(color: __SF_UIColor, value: number): void;
  centerIconOverTextWithSpacing(textSpacing: number): void;
  titleLabel: __SF_SMFUILabel;
}

declare class __SF_UITableView extends __SF_UIScrollView {
  addSubview(refreshControl: __SF_UIRefreshControl): void;
  separatorStyle: number;
  showsVerticalScrollIndicator: boolean;
  leftToRightSwipeEnabled: boolean;
  rightToLeftSwipeEnabled: boolean;
  onRowSwiped: (e: Record<string, any>) => any[];
  itemCount: number;
  tableRowHeight: number;
  heightForRowAtIndex: (e: Record<string, any>) => number;
  cellForRowAt: (e: { cell: __SF_UICollectionViewCell; indexPath: __SF_NSIndexPath }) => void;
  cellIdentifierWithIndexPath: (e: { cell: any; indexPath: __SF_NSIndexPath }) => string;
  getUUIDByIndex: (index: number) => string;
  indexPathForCell(nativeCell: __SF_UICollectionViewCell): __SF_NSIndexPath;
  didSelectRowAt: (e: Record<string, any>) => void;
  reloadData(): void;
  deleteRowIndexAnimation(index: number, animation: any /**TODO: UITableViewRowAnimation */): void;
  getVisibleIndexArray(): number[];
  getVisibleIndexArray(): number[];
  scrollToRowAtIndexPathAtScrollPositionAnimated(indexPath: __SF_NSIndexPath, style: number, animated?: boolean): void;
  contentOffset: { x: number; y: number };
  isEditing: boolean;
  canMoveRowAt?: (value: any, e: any) => any;
  moveRowAt?: (value: any, e: any) => any;
  targetIndexPathForMoveFromRowAt?: (value: any, e: any) => any;
  js_performBatchUpdates(updates: any, completion: { e: { finished: boolean } }): void;
  actionRowRange(style: number, positionStart: number, itemCount: number, animation?: number): void;
}

declare class __SF_UICollectionView extends __SF_UIScrollView {
  constructor(layoutManager: __SF_UICollectionViewFlowLayout);
  numberOfSectionsCallback: (collectionView: any) => number;
  cellForItemAtIndexPath(indexPath: __SF_NSIndexPath): any;
  numberOfItemsInSectionCallback: (collectionView: __SF_UICollectionView, section: any) => number;
  cellForItemAtIndexPathCallback: (collectionView: __SF_UICollectionView, indexPath: __SF_NSIndexPath) => any;
  didSelectItemAtIndexPathCallback: (collectionView: __SF_UICollectionView, indexPath: __SF_NSIndexPath) => any;
  registerClassForCellWithReuseIdentifier(cell: typeof __SF_UICollectionViewCell, type: any): void;
  dequeueReusableCellWithReuseIdentifierForIndexPath(type: any, indexPath: __SF_NSIndexPath): __SF_UICollectionViewCell;
  indexPathsForVisibleItems(): __SF_NSIndexPath[];
  superview: any;
}

declare class __SF_UICollectionReusableView extends __SF_UIView { }

declare class __SF_UICollectionViewCell extends __SF_UICollectionReusableView {
  contentView: __SF_UIView;
  uuid: string;
  reuseIdentifier: any;
  row: any;
  expandSwipeAnimated(direction: any, animated?: boolean);
}

declare class __SF_UIBarButtonItem extends __SF_UIView {
  static createWithSystemItem(systemItem: any): __SF_UIBarButtonItem;
  createWithSystemItem(systemItem: any): __SF_UIBarButtonItem;
  target: __SF_UIBarButtonItem;
  containerView: any;
  title: string;
  image: any;
  tintColor: __SF_UIColor;
  enabled: boolean;
  addJSAction(action: (...args: any) => any): void;
  setTitleTextAttributesForState(font: { NSFont: __SF_UIFont }, uiControlState: number /**TODO: Add after UIControlState is there */): any;
}

declare class __SF_UICollectionViewLayout extends __SF_NSOBject { }

declare class __SF_UICollectionViewFlowLayout extends __SF_UICollectionViewLayout {
  prepareLayoutCallback: () => void;
  targetContentOffsetForProposedContentOffsetWithScrollingVelocityCallback: (proposedContentOffset: { x: number; y: number }, velocity: { x: number; y: number }) => { x: number; y: number };
}

declare class UIFont {
  static fontNamesForFamilyName(familyName: string): string[];
  static familyNames(): string[];
}

declare class __SF_CAGradientLayer extends __SF_UIView {
  static createGradient(startColor: __SF_UIColor, endColor: __SF_UIColor, pointStart: { x: number; y: number }, pointEnd: { x: number; y: number }): __SF_CAGradientLayer;
  setBackgroundImage(image: __SF_UIImage, state: unknown): void;
  setBackgroundColor(color: __SF_UIColor, state: unknown): void;
}

declare class __SF_Label {
  static createFromFile(path: string, size: number): any;
}

declare class __SF_UIWindow extends __SF_NSOBject {
  addSubview(view: __SF_UIView): void;
  rootViewController: any;
  makeKeyAndVisible: (...args: any[]) => void;
}

declare class __SF_UIApplication extends __SF_NSOBject {
  static statusBarFrame: __SF_NSRect;
  static statusBarOrientation: number;
  static sf_statusBarStyle: any;
  static sf_statusBarHidden: boolean;
  static userInterfaceLayoutDirection: number;
  static statusBarOrientationAnimationDuration: number;
  static keyWindow: __SF_UIWindow;
  static scheduleLocalNotification(localNotification: __SF_UILocalNotification): void;
  static presentLocalNotificationNow(localNotification: __SF_UILocalNotification): void;
  static cancelLocalNotification(localNotification: __SF_UILocalNotification): void;
  static cancelAllLocalNotifications(): void;
  static applicationIconBadgeNumber: number;
  static scheduledLocalNotifications: __SF_UILocalNotification[];
  static registerUserNotificationSettings(notificationSettings: __SF_UIUserNotificationSettings): void;
  static registerForRemoteNotifications(): void;
  static unregisterForRemoteNotifications(): void;

  static sharedInstance(): __SF_UIApplication;
  static sharedApplication(): __SF_UIApplication;
  static onAppShortcutReceive: (params: { data: Record<string, any> }) => void;
  static onUnhandledError: (error: UnhandledError) => void;
  static onReceivedNotification: (data: { remote: Record<string, any>; local: Record<string, any> }) => void;
  static onApplicationCallReceived: (params: { data: Record<string, any> }) => void;
  static onAppShortcutReceived: (params: { data: Record<string, any> }) => void;
  static onUserActivityCallback: (params: { userActivity: __SF_NSOBject }) => void;
  static onMaximize: () => void;
  static onMinimize: () => void;
  static onExit: () => void;
  static canOpenUrl(url: string): boolean; //TODO: This should be wrong, check with iOS team
  static canOpenURL(url: __SF_NSURL): boolean;
  static exit(): void;
  static restart(): void;
  static dataCounters(): { WiFiSent: number; WWANSent: number; WWANReceived: number; WiFiReceived: number };
  static call(uriScheme: string, data: Record<string, any>, onSuccess?: (...args: any[]) => void, onFailure?: (...args: any[]) => void): void;
  static isEmulator(): boolean;
}

declare class __SF_CMMotionManager {
  constructor();
  accelerometerUpdateInterval: number;
  startAccelerometerUpdates(): void;
  stopAccelerometerUpdates(): void;
  callback: (e?: any) => void;
}

declare class __SF_CallObserverDelegate {
  constructor();
  callObserverCallChanged: (observer: unknown, call: { hasEnded: boolean; hasConnected: boolean; isOutgoing: boolean }) => void;
}

declare class __SF_CNMutableContact {
  static getShareableFilePathWithContactArrayFileName(_itemsNativeObject: __SF_CNMutableContact[], filename: string): any;
  static new(): __SF_CNMutableContact;
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
  addresses: { value: Partial<__SF_CNMutablePostalAddress> }[];
}

declare class __SF_CNMutablePostalAddress {
  static new: () => __SF_CNMutablePostalAddress;
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
declare class __SF_CNLabelParent {
  constructor();
}
declare class __SF_CNLabelPhoneNumberMain extends __SF_CNLabelParent { }
declare class __SF_CNLabelHome extends __SF_CNLabelParent { }
declare class __SF_CNLabelURLAddressHomePage extends __SF_CNLabelParent { }

declare interface ContactNative {
  mutableCopy: () => any;
  [key: string]: any;
}

declare class __SF_CNContactPickerDelegate<TContact = ContactNative> {
  contactPickerDidSelectContact: (contact: TContact) => void;
  contactPickerDidCancel(): void;
}

declare class __SF_CNContactStore {
  static new(): __SF_CNContactStore;
  requestAccess: (value: () => void, failure: (...args: any[]) => void) => void;
  fetchAllContacts: <TContact = ContactNative>(value: (allContactsNativeArray: TContact[]) => void, failure: (...args: any[]) => void) => void;
  executeSave(saveRequest: __SF_CNSaveRequest): any;
}

declare class __SF_CNPhoneNumber {
  static phoneNumberWithStringValue(string): any;
}

declare class __SF_CNContactViewControllerDelegate {
  didCompleteWithContact: (contact: ContactNative) => void;
}

declare class __SF_CNContactViewController {
  static viewControllerForNewContact(contact: ContactNative);
  contactStore: __SF_CNContactStore;
  allowActions: boolean;
  delegate: __SF_CNContactViewControllerDelegate;
}

declare class __SF_CNSaveRequest {
  addContact(contact: ContactNative): void;
  static new(): __SF_CNSaveRequest;
}

declare class __SF_UIDocumentPickerViewController {
  constructor(type: any[], number: number);
  documentDelegate: __SF_UIDocumentPickerViewControllerDelegate;
  delegate?: __SF_UIDocumentPickerViewControllerDelegate;
}

declare class __SF_UIDocumentPickerViewControllerDelegate {
  constructor();
  didPickDocumentsAtURLs(urls: { path: string }[]): void;
  documentPickerWasCancelled(): void;
}

declare class __SF_UIActivityIndicatorView extends __SF_UIView {
  constructor(style: any /**TODO: ActivityIndicatiorStyle*/);
  startAnimating(): void;
  color: __SF_UIColor; //TODO: Add nativeobject of color
  visible: boolean;
  activityIndicatorViewStyle: any; //TODO: ActivityIndicatorStyle;
}

declare class __SF_UIAlertController extends __SF_NSOBject {
  static createAlertController(style: number): __SF_UIAlertController;
  static present(view: __SF_UIAlertControllerView): any;
  static dismissAlert(view: __SF_UIAlertControllerView, delegate: any /* TODO: Add delegate type */): any;
  static addTextFieldArea(view: __SF_UIAlertControllerView, text: string, hint: string, isPassword: boolean): any;
  title: string;
  addAction(action: __SF_UIAlertAction): void;
}

declare class __SF_UIAlertControllerView extends __SF_UIView {
  title: string;
  message: string;
  addAction(action: __SF_UIAlertAction): any;
}

declare class __SF_UIAlertAction {
  static createAction(text: string, index: number, onClick: () => void): __SF_UIAlertAction;
}

declare class __SF_SMFVisualEffectView {
  constructor(style: number);
  setBlurStyle(style: number): void;
}

declare class __SF_UITabBarAppearance extends __SF_UIView {
  configureWithOpaqueBackground(): void;
}

declare class __SF_UIButton extends __SF_SMFUILabel {
  setEnabled: boolean;
  textAlignmentNumber: number;
  contentVerticalAlignment: number;
  contentHorizontalAlignment: number;
  titleLabel: { font: __SF_UIFont /*TODO: This might not be this font type, check */ };
  setTitleColor(textColor: __SF_UIColor, buttonState: number /*TODO: Use ButtonState enum when button is converted*/): void;
  removeFrameObserver(): void;
  addJSTarget(value: (...args: any[]) => any, uiControlEvent: unknown /*TODO: Add after UIControlEvent on Util is complete */): void;
  setTitle(title: string, state: number);
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
  datePickerMode: number;
  show(
    title?: string | undefined,
    titleColor?: __SF_UIColor | undefined,
    titleFont?: __SF_UIFont | undefined,
    cancelColor?: __SF_UIColor | undefined,
    cancelHighlightedColor?: __SF_UIColor | undefined,
    cancelFont?: __SF_UIFont | undefined,
    okColor?: __SF_UIColor | undefined,
    okHighlightedColor?: __SF_UIColor | undefined,
    okFont?: __SF_UIFont | undefined,
    okText?: string | undefined,
    cancelText?: string | undefined
  ): void;
}

declare class __SF_MFMailComposeViewController {
  static canSendMail(): boolean;
  constructor();
  setCcRecipients(cc: any): void;
  setBccRecipients(bcc: any): void;
  setToRecipients(to: any): void;
  setMessageBodyIsHTML(message: string, isHtmlText: boolean): void;
  setSubject(subject: any): void;
  addAttachmentDataMimeTypeFileName(blob: any /*TODO: Blob */, mimeType: string, fileName: string): void;
  dismissViewController(callback: () => void): void;
  mailComposeDelegate: __SF_SMFMFMailComposeViewControllerDelegate;
}

declare class __SF_SMFMFMailComposeViewControllerDelegate {
  didFinishWithResult: (e: unknown) => void;
}

declare class __SF_NodePublisher {
  setCameraPreviewCameraIdFrontMirror(view: __SF_UIView, cameraId: number, cameraFrontMirror: boolean): void;
  setVideoParamPresetFpsBitrateProfileFrontMirror(preset: number, fps: number, bitrate: number, profile: number, videoFrontMirror: boolean): void;
  setAudioParamBitrateProfileSampleRate(bitrate: number, profile: number, samplerate: number): void;
  nodePublisherDelegate: __SF_NodePlayerDelegateClass;
  audioEnable: boolean;
  videoEnable: boolean;
  outputUrl: string;
  flashEnable: boolean;
  start(): void;
  stop(): void;
  startPreview(): void;
  stopPreview(): void;
  switchCamera(): void;
}

declare class __SF_NodePlayerDelegateClass {
  onEventCallbackEventMsg: (e: any) => void;
}

declare class __SF_MKMapView extends __SF_UIView {
  setCenter(lat: number, lng: number, animated: boolean): void;
  convertToCoordinateFromView(point: any, mapView: __SF_MKMapView): { latitude: number; longitude: number };
  addGestureRecognizer(tapGesture: __SF_UITapGestureRecognizer): void;
  mapViewFinishRender: () => void;
  getTopLeftCoordinate(): number;
  getTopRightCoordinate(): number;
  getBottomLeftCoordinate(): number;
  getBottomRightCoordinate(): number;
  mapType: any;
  scrollEnabled: boolean;
  showsUserLocation: boolean;
  rotateEnabled: boolean;
  zoomEnabled: boolean;
  showsCompass: boolean;
  isClusterEnabled: boolean;
  getCluster(): __SF_Cluster;
  getRegion(): any;
  regionWillChangeAnimated: () => void;
  regionDidChangeAnimated: () => void;
  centerLocation: Partial<{
    latitudeDelta: any;
    longitudeDelta: any;
    latitude: number;
    longitude: number;
    animated: boolean;
  }>;
}

declare class __SF_UIGesture {
  handle: (e: any) => void;
}

declare class __SF_UITapGestureRecognizer extends __SF_UIGesture { }

declare class __SF_UILongPressGestureRecognizer extends __SF_UIGesture { }

declare class __SF_Cluster {
  static createCluster(): __SF_Cluster;
  fillColor: __SF_UIColor;
  borderColor: __SF_UIColor;
  padding: number;
  borderWidth: number;
  textColor: __SF_UIColor;
  size: { width: number; height: number };
  onPress: (e: any) => void;
  addAnnotation(annotation: __SF_Annotation): void;
  removeAnnotation(annotation: __SF_Annotation): void;
  removeAnnotations(annotations: __SF_Annotation[]): void;
  uuid: string;
  title: string;
  subtitle: string;
  canShowCallout: boolean;
  count: number;
}

declare class __SF_Annotation {
  uuid: string;
  static createAnnotation(): __SF_Annotation;
  setCoordinate: any;
  enableInfoWindow: boolean;
  tag: number;
  title: string;
  subtitle: string;
  color: __SF_UIColor;
  image: __SF_UIImage;
  visible: boolean;
  onPress: () => void;
  onInfoWindowPress: () => void;
}
declare class __SF_MDCMultilineTextField extends __SF_UITextField {
  textView: __SF_UITextField;
}

declare class __SF_MDCTextField extends __SF_UITextField { }

declare class __SF_MDCTextInputControllerUnderline {
  constructor(nativeObject: any);
  textInput: any;
  expandsOnOverflow?: boolean;
  minimumLines?: number;
  characterCountMax?: number;
  trailingUnderlineLabelTextColor?: __SF_UIColor;
  textInputClearButtonTintColor?: __SF_UIColor | any;
  leadingUnderlineLabelFont?: __SF_UIFont;
  trailingUnderlineLabelFont?: __SF_UIFont | any;
  inlinePlaceholderFont?: __SF_UIFont | any;
  textInputFont?: __SF_UIFont | any;
  floatingPlaceholderActiveColor?: __SF_UIColor;
  inlinePlaceholderColor?: __SF_UIColor;
  floatingPlaceholderNormalColor?: __SF_UIColor;
  placeholderText?: string;
  leadingViewTrailingPaddingConstantJS?: number;
  trailingViewTrailingPaddingConstantJS?: number;
  normalColor?: __SF_UIColor;
  activeColor?: __SF_UIColor;
  underlineHeightNormal?: number;
  underlineHeightActive?: number;
  errorColor?: __SF_UIColor;
  leadingViewRectForBounds: (bounds?: Object, defaultRect?: Object) => Object;
  trailingViewRectForBounds: (bounds?: Object, defaultRect?: Object) => Object;
  setErrorTextErrorAccessibilityValue(errorMessage: string, replaceErrorMessage: string): void;
  setErrorTextNil(): void;
}

declare class __SF_UINavigationBarAppearance {
  configureWithOpaqueBackground(): void;
  titleTextAttributes: { NSColor: __SF_UIColor; NSFont: __SF_UIFont };
  backgroundColor: __SF_UIColor;
  barTintColor: __SF_UIColor;
}

declare class __SF_UINavigationController {
  view: __SF_UIView;
  viewControllers: __SF_UIViewController[];
  pushViewControllerAnimated(uiViewController: __SF_UIViewController, animated: boolean): void;
  popToViewControllerAnimated(uiViewController: __SF_UIViewController, animated: boolean): void;
  popViewControllerAnimated(animated: boolean): void;
  presentViewController(controllerToPresent: __SF_UIViewController, completionBlock: () => void, animated: boolean): void;
  dismissViewController(completionBlock?: () => void, animated?: boolean): void;
  delegate: __SF_SMFNavigationControllerDelegate;
  navigationBar: __SF_UINavigationBar;
}

declare class __SF_UINavigationBar extends __SF_UIView {
  standardAppearance: __SF_UINavigationBarAppearance;
  scrollEdgeAppearance: __SF_UINavigationBarAppearance;
  setNavigationBarHiddenAnimated(hidden: boolean, animated?: boolean): void;
  backgroundImage: __SF_UIImage;
  shadowImage: __SF_UIImage;
  prefersLargeTitles: any;
  backIndicatorImage: __SF_UIImage;
  backIndicatorTransitionMaskImage: __SF_UIImage;
}

declare class __SF_SMFNavigationControllerDelegate {
  navigationControllerWillShowViewControllerAnimated?: (navigationController: __SF_UINavigationController, viewController: __SF_UIViewController, animated: boolean) => void;
  navigationControllerDidShowViewControllerAnimated?: (navigationController: __SF_UINavigationController, viewController: __SF_UIViewController, animated: boolean) => void;
}

declare class __SF_UIViewController extends __SF_NSOBject {
  automaticallyAdjustsScrollViewInsets: boolean;
  onViewSafeAreaInsetsDidChange: (e: any) => void;
  presentViewController(controllerToPresent: __SF_UIViewController, completionBlock: () => void, animated: boolean): void;
  modalTransitionStyle: number;
  dismissViewController(completionBlock: () => void, animationNeed: boolean): void;
  onViewLayoutSubviews: () => void;
  onViewDidAppear: () => void;
  onViewLoad: () => __SF_UIView;
  navigationController: __SF_UINavigationController;
  viewWillTransition: () => void;
  onLoad: () => void;
  onShow: () => void;
  onHide: () => void;
  orientations: any;
  navigationItem: __SF_UINavigationItem;
  view: __SF_UIView;
  statusBarHidden: boolean;
  statusBarStyle: any;
  tabBarController: __SF_UITabBarController;
}

declare class __SF_UINavigationItem {
  title: string;
  titleView: __SF_UIView;
  largeTitleDisplayMode: number;
  backBarButtonItem: __SF_UIBarButtonItem;
  hidesBackButton: boolean;
  leftBarButtonItem: __SF_UIBarButtonItem;
  rightBarButtonItems: __SF_UIBarButtonItem[];
  static instancesRespondToSelector(selector: string): boolean;
}

declare class __SF_NSOBject {
  instancesRespondToSelector(selector: string): any;
  setValueForKey(value: any, key: string): void;
  valueForKey(key: string): any;
  static alloc(): __SF_NSOBject;
  [key: string]: any;
}

declare class __SF_NSURL extends __SF_NSOBject {
  static URLWithString(value: string): __SF_NSURL;
  static fileURLWithPath(actualPath: string): __SF_NSURL;
}

declare class __SF_NSURLRequest extends __SF_NSOBject {
  static requestWithURL(url: __SF_NSURL): any;
}

declare class __SF_UITabBarController extends __SF_UINavigationController {
  static new(): __SF_UITabBarController;
  delegate: __SF_UITabBarControllerDelegate;
  selectedIndex: number;
  tabBar: {
    frame: __SF_NSRect;
  };
}
declare class __SF_UITabBarControllerDelegate { }

declare interface iOSCurrentDevice {
  UUID: string;
  model: string;
  name: string;
  orientation: number;
  batteryMonitoringEnabled: boolean;
  batteryState: number;
  systemVersion: string;
  batteryLevel: number;
}

declare class __SF_UIDevice {
  static currentDevice(): iOSCurrentDevice;
  static modelName(): string;
  static currentReachabilityStatus(): number;
  static getIFAddresses(): string[];
  static vibrate(): void;
  static takeSnapShot(): __SF_UIImage;
  static forceTouchAvaliable(): boolean;
  static changeOrientation(orientation: number): void;
}

declare class __SF_UIAccessibility {
  static isVoiceOverRunning(): boolean;
}

declare class __SF_UITabBarItem {
  title: string;
  image: __SF_UIImage;
  selectedImage: __SF_UIImage;
  setTitleTextAttributesForState(font: { NSFont: any }, uiControlState: number /**TODO: Add after UIControlState is there */): any;
  static new(): __SF_UITabBarItem;
}

declare class __SF_UIActivityViewController extends __SF_NSOBject {
  delegate: __SF_UIActivityViewControllerDelegate;
  static new(): __SF_UIActivityViewController;
}

declare class __SF_UIActivityViewControllerDelegate { }

declare class __SF_UIPickerView extends __SF_UIView {
  items: any[];
  reloadAllComponents(): void;
  selectRowInComponentAnimated(currentIndex: number, defaultCOmponentIndex: number, animated: boolean): void;
  dataSource: __SF_UIPickerViewDataSource;
  delegate: __SF_UIPickerViewDelegate;
  textColor: __SF_UIColor;
  dialogBackgroundColor: __SF_UIColor;
  dialogLineColor: __SF_UIColor;
  show(
    nativeObject: __SF_UIPickerView,
    title: string | undefined,
    cancelFunc: (e: any) => void,
    okFunc: (e: any) => void,
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

declare class __SF_UIPickerViewDataSource {
  numberOfComponents: () => number;
  numberOfRowsInComponent: () => number;
}

declare class __SF_UIPickerViewDelegate {
  titleForRow: (e: any) => any;
  didSelectRow: (e: any) => any;
  rowHeight: number;
}

declare class __SF_QLPreviewController {
  document: __SF_NSURL[];
  titleColor: __SF_UIColor;
  itemColor: __SF_UIColor;
}

declare class __SF_MultiSlider extends __SF_UIView {
  isVertical: boolean;
  thumbCount: number;
  snapStepSize: number;
  minimumValue: number;
  maximumValue: number;
  tintColor: __SF_UIColor;
  outerTrackColor: __SF_UIColor;
  thumbShadowColor: __SF_UIColor;
  trackWidth: number;
  value: number[];
  thumbImage: __SF_UIImage;
  isHapticSnap: boolean;
  thumbShadowOpacity: number;
  thumbShadowRadius: number;
  thumbShadowOffset: __SF_NSRect;
  applyThumbViewChanges(): void;
  hasRoundTrackEnds: boolean;
  showsThumbImageShadow: boolean;
  addJSTarget(value: (...args: any[]) => any, uiControlEvent: unknown /*TODO: Add after UIControlEvent on Util is complete */): void;
}

declare class __SF_UIScrollView extends __SF_UIView {
  didScroll: (params: { translation: __SF_NSRect; contentOffset: __SF_NSRect }) => void;
  showsHorizontalScrollIndicator: boolean;
  onScrollBeginDecelerating: (scrollView: any) => void;
  onScrollViewWillBeginDragging: (scrollView: any) => void;
  onScrollEndDecelerating: (scrollView: any) => void;
  onScrollViewDidEndDraggingWillDecelerate: (scrollView: any, decelerate?: any) => void;
  onScrollViewWillEndDraggingWithVelocityTargetContentOffset: (scrollView: any, velocity: { x?: number | null; y?: number | null }, targetContentOffset: any) => void;
  setContentOffsetAnimated(e: __SF_NSRect): void;
  scrollToBottom(): void;
  scrollToRight(): void;
  contentSize: __SF_NSRect;
  contentOffset: __SF_NSRect;
  contentInsetDictionary: any;
  decelerationRate: number;
}

declare class __SF_SMFUISearchBar extends __SF_UIView {
  text: string;
  activityIndicatorTrailingConstraint: any;
  textColor: __SF_UIColor;
  barTintColor: __SF_UIColor;
  setSearchFieldBackgroundImage(image: __SF_UIImage, style: number): void;
  setShowsCancelButtonAnimated(show: boolean, animated: boolean): void;
  setSearchFieldBackgroundImage(iconImage: __SF_UIImage, style: any, controlState: __SF_UIControlStateNormal): void;
  setIconImage(iconImage: __SF_UIImage, style: any, controlState: __SF_UIControlStateNormal): void;

  activityIndicator: __SF_UIActivityIndicatorView;
  searchBarStyle: any;
  delegate: __SF_UISearchBarDelegate;
}

declare class __SF_UIControlStateNormal { }

declare class __SF_UISearchBarDelegate {
  cancelButtonClicked: (e: any) => void;
  didBeginEditing: () => void;
  didEndEditing: () => void;
  textDidChange: (searchText: string) => void;
  searchButtonClicked: () => void;
}

declare class __SF_FBShimmeringView extends __SF_UIView {
  shimmering: boolean;
  shimmeringDirection: any;
  contentView: __SF_UIView;
  shimmeringHighlightLength: number;
  shimmeringPauseDuration: number;
  shimmeringOpacity: number;
  shimmeringSpeed: number;
  shimmeringBeginFadeDuration: number;
  shimmeringAnimationOpacity: number;
  shimmeringEndFadeDuration: number;
}

declare class __SF_UISlider extends __SF_UIView {
  minimumTrackTintColor: __SF_UIColor;
  maximumTrackTintColor: __SF_UIColor;
  minimumValue: number;
  maximumValue: number;
  setEnabled: boolean;
  thumbTintColor: __SF_UIColor;
  setThumbImage(image: __SF_UIImage, sliderState: any): void;
  value: any;
  setValueAnimated(value: number, animated: boolean): void;
}

declare class __SF_SliderDrawer {
  static new(): __SF_SliderDrawer;
  position: any;
  state: number;
  enabled: boolean;
  onDrag: () => void;
  onShow: () => void;
  onHide: () => void;
  onLoad: () => void;
  show(): void;
  hide(): void;
  onViewLoad: () => __SF_UIView;
  onViewLayoutSubviews: () => void;
}

declare class __SF_UIPageViewController extends __SF_UIView {
  static createWithTransitionStyleNavigationOrientation(transitionStyle: any, navigationOrientation: any): __SF_UIPageViewController;
  scrollToPageDirectionAnimatedCompletion(page: __SF_UIViewController, direction: number, animated: boolean, completion: () => void): void;
  view: __SF_UIView;
  dataSource: __SF_UIPageViewControllerDatasource;
  delegate: __SF_UIPageViewControllerDelegate;
}

declare class __SF_UIPageViewControllerDelegate {
  willTransitionToViewControllers(e: any): void;
  didFinishAnimating(e: any): void;
}

declare class __SF_UIControl extends __SF_UIView { }

declare class __SF_UISwitch extends __SF_UIControl {
  setEnabled: boolean;
  isOn: boolean;
  thumbTintColor: __SF_UIColor;
  toggleOnColor: __SF_UIColor;
  setOnAnimated(value: boolean, animated: boolean): void;
}

declare class __SF_TopTabViewController extends __SF_UIViewController {
  viewControllerForIndex: (index: number) => __SF_UIViewController;
  tabWillSelectAtIndex: (index: number) => void;
  setSelectedIndexWithAnimated(index: number, animated: boolean): void;
  topBar: any;
  topBarBackgroundColor: __SF_UIColor;
  indicatorColor: __SF_UIColor;
  iconColor: __SF_UIColor;
  selectedIconColor: __SF_UIColor;
  titleColor: __SF_UIColor;
  selectedTitleColor: __SF_UIColor;
  indicatorheight: number;
  barHeight: number;
  pagingEnabled: boolean;
  scrollEnabled: boolean;
}

declare class __SF_UITextView extends __SF_SMFUILabel {
  setSelectable: boolean;
  setEditable: boolean;
  setDelaysContentTouches: boolean;
  didTapLinkWithURL: (e: any) => void;
  htmlText: string;
  text: string;
  showsHorizontalScrollIndicator: boolean;
  scrollEnabled: boolean;
  font: __SF_UIFont;
  textContainer: __SF_NSTextContainer;
}

declare class __SF_UITextField extends __SF_UIView {
  textBoxDelegate: any;
  isSecureTextEntry: boolean;
  isSecure: boolean;
  translatesAutoresizingMaskIntoConstraints: boolean;
  text: string;
  textColor: __SF_UIColor;
  contentVerticalAlignment: any;
  textAlignment: any;
  adjustsFontSizeToFitWidth: boolean;
  minimumFontSize: number;
  textContentType: any;
  keyboardAppearance: any;
  returnKeyType: any;
  keyboardType: any;
  clearButtonMode: number;
  addKeyboardObserver(): void;
  onShowKeyboard: (e: any) => void;
  addObserver: () => void;
}

declare class __SF_NSTextContainer extends __SF_NSOBject {
  maximumNumberOfLines: number;
  lineBreakMode: number;
}

declare class __SF_AVPlayerViewController extends __SF_UIView {
  static createWithBackgroundMode(backgroundMode: boolean): __SF_AVPlayerViewController;
  didStopPictureInPicture(): void;
  didStartPictureInPicture(): void;
  willStopPictureInPicture(): void;
  willStartPictureInPicture(): void;
  shouldAutomaticallyDismissAtPictureInPictureStart: boolean;
  restoreUserInterfaceForPictureInPictureStopWithCompletionHandler(callback?: (shouldFinish?: boolean) => void): void;
}

declare class __SF_SMFSFSafariViewController {
  static create(url: __SF_NSURL, animated: boolean): __SF_SMFSFSafariViewController;
  instancesRespondToSelector(selector: string): any;
  setValueForKey(value: any, key: string): void;
  valueForKey(key: string): any;
}

declare class __SF_WKWebView extends __SF_UIView {
  scrollView: __SF_UIScrollView;
  load(urlRequest: __SF_NSURLRequest): void;
  getActualPath(): string;
  loadHTMLStringBaseURL(html: string, e: any): void;
  onLoad: (e: any) => void;
  onShow: (e: any) => void;
  onError: (e: any) => void;
  onOpenNewWindow: (e: any) => void;
  onChangedURL: (e: any) => void;
  reload(): void;
  goBack(): void;
  goForward(): void;
  evaluateJavaScript(javascript: string, result: (...args: any) => any): void;
  zoomEnabled: boolean;
  safeAreaInsetsCallback: (...args: any) => void;
  serverTrustPolicies: any[];
}

declare class __SF_AVAudioSession extends __SF_NSOBject {
  static sharedInstance(): any;
  setCategory(category: string, callback: (e) => void): void;
  setMode(category: string, callback: (e) => void): void;
  setActiveWithOptions(active: boolean, option: number, callback: (e) => void): void;
}

declare class __SF_CLLocationManager {
  static locationServicesEnabled(): boolean;
  delegate?: __SF_CLLocationManagerDelegate;
  startUpdatingLocation(): void;
  stopUpdatingLocation(): void;
  lastKnownLocation(): any;
  requestWhenInUseAuthorization(): void;
}

declare class __SF_CLLocationManagerDelegate {
  didUpdateLocations: (...args: any) => void;
  didChangeAuthorizationStatus: (status: any) => void;
}

declare class __SF_UIImagePickerController extends __SF_UINavigationController {
  static fixVideoOrientation(url: __SF_NSURL, callback: (e) => void): void;
  mediaTypes: any;
  allowsEditing: boolean;
  sourceType: any;
  cameraDevice: any;
  cameraFlashMode: any;
  delegate: __SF_UIImagePickerControllerDelegate;
  static convertToMP4WithPresetQualityWithShouldOptimizeForNetworkUseVideoFilePathFileNameCallback(
    quality: number,
    optimize: boolean,
    path: string,
    fileName: string,
    callBack: (e: any) => void
  ): void;
  setValueForKey(value: any, key: string): void;
}

declare class __SF_UIImagePickerControllerDelegate extends __SF_SMFNavigationControllerDelegate {
  imagePickerControllerDidCancel?: () => void;
  didFinishPickingMediaWithInfo?: (param: any) => void;
}

declare class __SF_YPImagePickerConfiguration {
  showsPhotoFilters: boolean;
  startOnScreen: number;
  hidesStatusBar: boolean;
  libraryItemOverlayType: number;
  screens: number[];
  showsVideoTrimmer: boolean;
  videoCompression: 'AVAssetExportPresetPassthrough';
  galleryHidesRemoveButton: boolean;
  librarySkipSelectionsGallery: true;
  videoLibraryTimeLimit: number;
  isSquareByDefault: boolean;
  libraryMediaType: number;
  maxNumberOfItems: number;
}

declare class __SF_YPImagePicker {
  constructor(pickerConfig: __SF_YPImagePickerConfiguration);
  didFinishPicking(data: any): void;
  picker: __SF_UIImagePickerController;
}

declare class __SF_TOCropViewController {
  static createWithCroppingStyleImage(e: any, imageNativeObject?: any): __SF_TOCropViewController;
  title: string;
  setCustomAspect(e: { width: number; height: number }): void;
  delegate: __SF_TOCropViewControllerDelegate;
  delegateStrong: __SF_TOCropViewControllerDelegate;
  aspectRatioLockEnabled: boolean;
  aspectRatioPickerButtonHidden: boolean;
  resetAspectRatioEnabled: boolean;
  aspectRatioLockDimensionSwapEnabled: boolean;
  resetButtonHidden: boolean;
  rotateButtonsHidden: boolean;
  showOnlyIcons: boolean;
  doneButtonTitle: string;
  cancelButtonTitle: string;
  doneButtonColor: string;
  cancelButtonColor: string;
  dismissViewController(completionBlock?: () => void, animated?: boolean): void;
}

declare class __SF_TOCropViewControllerDelegate {
  didCropToImage(data: any): void;
  didCropToCircularImage(data: any): void;
  didFinishCancelled(data: any): void;
}

declare class __SF_CTTelephonyNetworkInfo {
  subscriberCellularProvider: {
    carrierName: string;
  };
}

declare class __SF_SMFReachability {
  static reachabilityForInternetConnection(): __SF_SMFReachability;
  observeFromNotificationCenter(): void;
  currentReachabilityStatus(): number;
  reachabilityChangedCallback: () => void;
  startNotifier(): void;
  removeObserver(): void;
  stopNotifier(): void;
}

declare class __SF_Timer {
  scheduledTimer(delay: number, callback: () => void, repeat: boolean): any;
  invalidate(): void;
}

declare class __SF_SMFServerTrustPolicy {
  static createServerTrustPolicyWithHostCertificateURLsValidateCertificateChainValidateHost(
    host: any,
    nSURLCertificates: any,
    validateCertificateChain: boolean,
    validateHost: boolean
  ): __SF_SMFServerTrustPolicy;
}

declare class __SF_Http {
  timeoutIntervalForRequest: number;
  defaultHTTPHeaders: any;
  serverTrustPolicies: __SF_SMFServerTrustPolicy;
  cancelAll(): void;
  requestFile(url: __SF_NSURL, fileName: string, onSuccess: (e: any) => void, onFailure?: (e: any) => void): any;
  requestImage(url: __SF_NSURL, onSuccess: (e: any) => void, onFailure?: (e: any) => void): any;
  requestString(url: __SF_NSURL, onSuccess: (e: any) => void, onFailure?: (e: any) => void): any;
  requestJSON(url: __SF_NSURL, onSuccess: (e: any) => void, onFailure?: (e: any) => void): any;
  request(params: any, onSuccess: (e: any) => void, onFailure?: (e: any) => void): any;
  upload(params: any, onSuccess: (e: any) => void, onFailure?: (e: any) => void): any;
}

declare class __SF_XMLHttpRequest {
  createTask(url: string, method: string): void;
  dataToJSON(data: any)
  getHeaderField(response: any, headerField: string): string
  getAllHeaderFields(response: any): [String:String]
}

declare class __SF_URLSessionTask {
  suspend(): void;
  cancel(): void;
  resume(): void;
}

declare class __SF_SFSpeechRecognizer {
  constructor(locale: __SF_NSLocale);
  static supportedLocalesToArray(): any[];
  static speechRequestAuthorization(callback: (e: any) => void);
  delegate: __SF_SFSpeechRecognizerDelegate;
  recognitionTask(recognitionRequest: any, callback: (e) => void): void;
}

declare class __SF_SFSpeechRecognizerDelegate {
  speechRecognizerAvailabilityDidChange: (e: any) => void;
}

declare class __SF_AVAudioEngine {
  inputNode: any;
  isRunning: boolean;
  stop(): void;
  prepare(): void;
  start(onError: (e: any) => void);
}

declare class __SF_SFSpeechAudioBufferRecognitionRequest {
  shouldReportPartialResults: boolean;
  appendBuffer(buffer: any): void;
}

declare class __SF_AVPlayerItem {
  static createFromUrl(url: __SF_NSURL): __SF_AVPlayerItem;
  static createFromURL(url: __SF_NSURL): __SF_AVPlayerItem;
}

declare class __SF_NodePlayer { }

declare class __SF_AVPlayer {
  constructor(avPlayerItem: __SF_AVPlayerItem);
  static createFromURL(url: __SF_NSURL): __SF_AVPlayer;
  addObserver(): void;
  removeObserver(): void;
  replaceCurrentItem(avPlayer: __SF_AVPlayerItem): void;
  play(): void;
  seekToMillisecond(milliseconds: number): void;
  pause(): void;
  seekTo(to: number): void;
  duration(): number;
  getCurrentTime(): number;
  onItemReady: () => void;
  AVPlayerItemDidPlayToEndTime: () => void;
  onItemFailed: () => void;
  volume: number;
  rate: number;
}

declare class __SF_SMFCrypto {
  generateAESKey(length: number): any;
  generateKeyPair(keySize: number): any;
  encrypt(plainText: string, key: string): string;
  decrypt(plainText: string, key: string): string;
  getExportedPublicKey(key: string): string;
  encryptAES(plainText: string, key: string, ivSize: number, onComplete: (...args: any[]) => void, onFailure: (...args: any[]) => void): void;
  decryptAES(encryptedText: string, key: string, iv: string, onComplete: (...args: any[]) => void, onFailure: (...args: any[]) => void): void;
}

declare class __SF_Database {
  constructor(path: string);
  errorHandler: (e: any) => void;
  run(sqlCommand: string): void;
  prepare(sqlCommand: string): void;
}

declare class __SF_UNUserNotificationCenter {
  static currentNotificationCenter(): __SF_UNUserNotificationCenter;
  delegate: __SF_SMFUNUserNotificationCenterDelegate;
  removeAllDeliveredNotifications(): void;
}

declare class __SF_UILocalNotification {
  alertBody: string;
  alertAction: string;
  soundName: string;
  alertLaunchImage: string;
  fireDate: any;
  repeatInterval: number;
  applicationIconBadgeNumber: number;
  hasAction: boolean;
  userInfo: Record<string, any>;
}

declare class __SF_UIUserNotificationSettings {
  static settingsForTypesCategories(type: number, param?: any): __SF_UIUserNotificationSettings;
}

declare class __SF_UIUserNotificationTypeSound { }

declare class __SF_UIUserNotificationTypeBadge { }

declare class __SF_UIUserNotificationTypeAlert { }

declare class __SF_SearchBarContainerView {
  static createWithSearchBar(nativeObject: any): any;
}

declare class __SF_SMFUNUserNotificationCenterDelegate {
  static willPresentNotification: (e: any) => number;
  static didReceiveNotificationResponse: (e: any) => void;
}

declare class __SF_KeychainPasswordItem {
  constructor(service: any, account: any, option: any);
  readPasswordWithBlock(callback: (e: any) => void): void;
  deleteItemWithBlock(callback: (e: any) => void): void;
  savePasswordWithBlock(value: any, callback: (e: any) => void): void;
}

declare class __SF_UIApplicationWillResignActiveNotification { }

declare class __SF_UIDeviceOrientationDidChangeNotification { }

declare const __SF_UIScrollViewDecelerationRateNormal: number;
declare const __SF_UIScrollViewDecelerationRateFast: number;

declare const __SF_UITextContentTypeName: string;
declare const __SF_UITextContentTypeNamePrefix: string;
declare const __SF_UITextContentTypeGivenName: string;
declare const __SF_UITextContentTypeMiddleName: string;
declare const __SF_UITextContentTypeFamilyName: string;
declare const __SF_UITextContentTypeNameSuffix: string;
declare const __SF_UITextContentTypeNickname: string;
declare const __SF_UITextContentTypeJobTitle: string;
declare const __SF_UITextContentTypeOrganizationName: string;
declare const __SF_UITextContentTypeLocation: string;
declare const __SF_UITextContentTypeFullStreetAddress: string;
declare const __SF_UITextContentTypeStreetAddressLine1: string;
declare const __SF_UITextContentTypeStreetAddressLine2: string;
declare const __SF_UITextContentTypeAddressCity: string;
declare const __SF_UITextContentTypeAddressState: string;
declare const __SF_UITextContentTypeAddressCityAndState: string;
declare const __SF_UITextContentTypeSublocality: string;
declare const __SF_UITextContentTypeCountryName: string;
declare const __SF_UITextContentTypePostalCode: string;
declare const __SF_UITextContentTypeTelephoneNumber: string;
declare const __SF_UITextContentTypeEmailAddress: string;
declare const __SF_UITextContentTypeURL: string;
declare const __SF_UITextContentTypeCreditCardNumber: string;
declare const __SF_UITextContentTypeUsername: string;
declare const __SF_UITextContentTypePassword: string;
declare const __SF_UITextContentTypeNewPassword: string;
declare const __SF_UITextContentTypeOneTimeCode: string;
