declare class iOSBaseClass {
  setValueForKey(value: any, key: string): void;
  valueForKey(key: string): any;
}

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
  imageWithRenderingMode(mode: number): __SF_UIImage;
  getInstance(): __SF_UIImage;
}

declare class __SF_UIImageView {
  contentMode: number; /**TODO: After FillType is typed */
  image: any;
  loadImage(image: __SF_UIImage): void;
  getActualPath(): __SF_NSIndexPath;
  alpha: number;
  tintColor: __SF_UIColor;
  loadFromURL(url: any, placeholder: __SF_UIImage, headers: any, onSuccess: (innerFade: boolean, image: __SF_UIImage, error: any, cache: any /**TODO: ImageCacheType */, url: any) => void): void;
}
declare class __SF_NSInvocation {
  static createInvocationWithSelectorInstance(name: string, obj: any): any;
}

declare class __SF_SMFUILabel {
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
  static mainAsyncAfter: () => void;
  static mainAsync: () => void;
}

declare class __SF_UIScreen {
  mainScreen: () => { bounds: { width: number; heigth: number }; scale: number };
}

declare class __SF_UIApplicationDidChangeStatusBarOrientationNotification {}

declare class __SF_UIView extends iOSBaseClass {
  static viewAppearanceSemanticContentAttribute(): number;
  static performWithoutAnimationWrapper(param: any): any;
  static animation(duration: number, delay: number, animations: () => void, completion?: () => void): void;
  yoga: any;
  frame: {
    width: number;
    heigth: number;
  };
  bounds: {
    x: number;
    y: number;
  };
  layer: any;
  onTouch: (e: any) => void;
  onTouchCancelled: (e: any) => void;
  onTouchMoved: (e: any) => void;
  onTouchEnded: (e: any) => void;
  alpha: number;
  backgroundColor: __SF_UIColor;
  addFrameObserver(): void;
  frameObserveHandler(handler: (e: { frame: unknown }) => void): void;
  removeFrameObserver(): void;
  tag: string;
  scale(coordinates: { x: number; y: number }): void;
  touchEnabled: boolean;
  flipHorizontally(): void;
  flipVertically(): void;
  superview: __SF_UIView;
  addSubView(view: __SF_UIView): void;
  removeFromSuperview(): void;
  willRemoveSubview: (e: any) => void;
  widthAnchor: any;
  heightAnchor: any;
  viewControllers: __SF_UIViewController[];
  navigationBar: any; /**TODO: NavigationBar Type */
  endEditing(animated: boolean): void;
  layoutIfNeeded(): void;
  sizeToFit(): void;
  subviews: __SF_UIView[];
  className(): any;
  becomeFirstResponder(): void;
  resignFirstResponder(): void;
  removeFromParentViewController(): void;
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
  static boldSystemFontOfSize(size: number): number;
  static fontWithNameSize(fontFamily: string, size: number): any;
  static italicSystemFontOfSize(size: number): number;
  static createFromFileWithFilenameStringSize(actualPath: __SF_NSIndexPath, size: number): any; /*TODO: change the typing when you are doing font.createFromFile */
}

declare class __SF_NSData {
  static base64Encoded(base64: string): unknown; /** return type of blob.createfrombase64 */
  static dataFromUTF8String(utf8: string): unknown; /** return type of blob.createFromUTF8String */
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

declare class __SF_NSIndexPath {}

declare class __SF_UIRefreshControl extends __SF_UIView {
  removeFromSuperview(): void;
  endRefreshing(): void;
  tintColor: __SF_UIColor;
  addJSTarget(value: (...args: any[]) => any, uiControlEvent: unknown /*TODO: Add after UIControlEvent on Util is complete */): void;
}

declare class __SF_UITableView extends __SF_UIScrollView {
  addSubView(refreshControl: __SF_UIRefreshControl): void;
  separatorStyle: number;
  showsVerticalScrollIndicator: boolean;
  leftToRightSwipeEnabled: boolean;
  rightToLeftSwipeEnabled: boolean;
  onRowSwiped: (e: Record<string, any>) => any[];
  itemCount: number;
  tableRowHeight: number;
  heightForRowAtIndex: (e: Record<string, any>) => number;
  cellForRowAt: (e: Record<string, any>) => void;
  cellIdentifierWithIndexPath: (e: Record<string, any>) => string;
  getUUIDByIndex: (index: number) => string;
  indexPathForCell(nativeCell: __SF_UICollectionViewCell): any;
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
  js_performBatchUpdates(updates: any, completion: any): void;
  actionRowRange(style: number, positionStart: number, itemCount: number, animation?: boolean): void;
}

declare class __SF_UICollectionView {
  constructor(layoutManager: __SF_UICollectionViewFlowLayout);
  numberOfSectionsCallback: (collectionView: any) => number;
  cellForItemAtIndexPath(indexPath: __SF_NSIndexPath): any;
  numberOfItemsInSectionCallback: (collectionView: any, section: any) => any;
  cellForItemAtIndexPathCallback: (collectionView: any, indexPath: __SF_NSIndexPath) => any;
  didSelectItemAtIndexPathCallback: (collectionView: any, indexPath: __SF_NSIndexPath) => any;
  registerClassForCellWithReuseIdentifier(cell: __SF_UICollectionViewCell, type: any): void;
  dequeueReusableCellWithReuseIdentifierForIndexPath(type: any, indexPath: __SF_NSIndexPath): __SF_UICollectionViewCell;
  superview: any;
}

declare class __SF_UICollectionViewCell {
  contentView: __SF_UIView;
  uuid: string;
  reuseIdentifier: any;
  row: any;
}

declare class __SF_UIBarButtonItem extends __SF_UIView {
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

declare class __SF_UICollectionViewFlowLayout {
  prepareLayoutCallback: () => void;
  targetContentOffsetForProposedContentOffsetWithScrollingVelocityCallback: (proposedContentOffset: { x: number; y: number }, velocity: number) => number;
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

declare class __SF_UIApplication extends iOSBaseClass {
  static sharedApplication(): {
    statusBarFrame: { height: number };
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
declare class __SF_CNLabelPhoneNumberMain extends __SF_CNLabelParent {}
declare class __SF_CNLabelHome extends __SF_CNLabelParent {}
declare class __SF_CNLabelURLAddressHomePage extends __SF_CNLabelParent {}

declare class ContactNative {
  private constructor();
  mutableCopy: () => any;
}

declare class __SF_CNContactPickerDelegate {
  contactPickerDidSelectContact: (contact: ContactNative) => void;
  contactPickerDidCancel(): void;
}

declare class __SF_CNContactStore {
  static new(): __SF_CNContactStore;
  requestAccess: (value: () => void) => void;
  fetchAllContacts: (value: (allContactsNativeArray: ContactNative[]) => void) => void;
  executeSave(saveRequest: __SF_CNSaveRequest): void;
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
  delegate: __SF_UIDocumentPickerViewControllerDelegate;
}

declare class __SF_UIDocumentPickerViewControllerDelegate {
  constructor();
  didPickDocumentsAtURLs(urls: string[]): void;
  documentPickerWasCancelled(): void;
}

declare class __SF_UIActivityIndicatorView {
  constructor(style: any /**TODO: ActivityIndicatiorStyle*/);
  startAnimating(): void;
  color: __SF_UIColor; //TODO: Add nativeobject of color
  visible: boolean;
  activityIndicatorViewStyle: any; //TODO: ActivityIndicatorStyle;
}

declare class __SF_UIAlertController extends iOSBaseClass {
  static createAlertController(style: number): __SF_UIAlertController;
  static present(view: __SF_UIAlertControllerView): any;
  static dismissAlert(view: __SF_UIAlertControllerView, delegate: any /* TODO: Add delegate type */): any;
  static addTextFieldArea(view: __SF_UIAlertControllerView, text: string, hint: string, isPassword: boolean): any;
  title: string;
  addAction(action: __SF_UIAlertAction): void;
}

declare class __SF_UIAlertControllerView {
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
  constructor();
  canSendMail(): boolean;
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

declare class __SF_UITapGestureRecognizer {}

declare class __SF_UILongPressGestureRecognizer {}

declare class __SF_Cluster {
  static createCluster(): __SF_Cluster;
  fillColor: __SF_UIColor;
  borderColor: __SF_UIColor;
  padding: number;
  borderWidth: number;
  textColor: __SF_UIColor;
  size: { width: number; heigth: number };
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

declare class __SF_MDCTextField extends __SF_UITextField {}

declare class __SF_MDCTextInputControllerUnderline {
  textInput: any;
}

declare class __SF_UINavigationBarAppearance {
  configureWithOpaqueBackground(): void;
  titleTextAttributes: any;
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
  dismissViewController(completionBlock: () => void, animated: boolean): void;
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

declare class __SF_UIViewController {
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
}

declare class __SF_UINavigationItem {
  title: string;
  titleView: __SF_UIView;
  largeTitleDisplayMode: number;
  backBarButtonItem: __SF_UIBarButtonItem;
  hidesBackButton: boolean;
  leftBarButtonItem: __SF_UIBarButtonItem;
  rightBarButtonItems: __SF_UIBarButtonItem[];
}

declare class __SF_NSOBject {
  instancesRespondToSelector(selector: string): any;
}

declare class __SF_NSURL {
  static URLWithString(value: string): __SF_NSURL;
  static fileURLWithPath(actualPath: __SF_NSIndexPath): __SF_NSURL;
}

declare class __SF_NSURLRequest {
  requestWithURL(url: __SF_NSURL): any;
}

declare class __SF_UITabBarController extends __SF_UINavigationController {
  static new(): __SF_UITabBarController;
  delegate: __SF_UITabBarControllerDelegate;
  selectedIndex: number;
}
declare class __SF_UITabBarControllerDelegate {}

declare class __SF_UIDevice {
  static currentDevice(): any;
  static modelName(): any;
}

declare class __SF_UITabbarItem {
  title: string;
  image: __SF_UIImage;
  selectedImage: __SF_UIImage;
  setTitleTextAttributesForState(font: { NSFont: any }, uiControlState: number /**TODO: Add after UIControlState is there */): any;
}

declare class __SF_UIActivityViewController {
  delegate: __SF_UIActivityViewControllerDelegate;
  static new(): __SF_UIActivityViewController;
}

declare class __SF_UIActivityViewControllerDelegate {}

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
  thumbShadowOffset: { x: number; y: number };
  applyThumbViewChanges(): void;
  hasRoundTrackEnds: boolean;
  showsThumbImageShadow: boolean;
  addJSTarget(value: (...args: any[]) => any, uiControlEvent: unknown /*TODO: Add after UIControlEvent on Util is complete */): void;
}

declare class __SF_UIScrollView extends __SF_UIView {
  didScroll: () => void;
  showsHorizontalScrollIndicator: boolean;
  onScrollBeginDecelerating: (scrollView: any) => void;
  onScrollViewWillBeginDragging: (scrollView: any) => void;
  onScrollEndDecelerating: (scrollView: any) => void;
  onScrollViewDidEndDraggingWillDecelerate: (scrollView: any, decelerate?: any) => void;
  onScrollViewWillEndDraggingWithVelocityTargetContentOffset: (scrollView: any, velocity: number, targetContentOffset: any) => void;
  setContentOffsetAnimated(e: { x: number; y: number }): void;
  scrollToBottom(): void;
  scrollToRight(): void;
  contenSize: { width: number; heigth: number };
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

declare class __SF_UIControlStateNormal {}

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
  show(): void;
}

declare class __SF_UIPageViewController extends __SF_UIView {
  static createWithTransitionStyleNavigationOrientation(transitionStyle: any, navigationOrientation: any): __SF_UIPageViewController;
}

declare class __SF_UISwitch {
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
  indicatorHeigth: number;
  barHeight: number;
  pagingEnabled: boolean;
  scrollEnabled: boolean;
}

declare class __SF_UITextView extends __SF_UIView {
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

declare class __SF_NSTextContainer {
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
  restoreUserInterfaceForPictureInPictureStopWithCompletionHandler: boolean;
}

declare class __SF_SMFSFSafariViewController {
  static create(url: __SF_NSURL, animated: boolean): __SF_SMFSFSafariViewController;
}

declare class __SF_WKWebView extends __SF_UIView {
  scrollView: __SF_UIScrollView;
  load(urlRequest: __SF_NSURLRequest): void;
  getActualPath(): __SF_NSIndexPath;
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

declare class __SF_AVAudioSession {
  static sharedInstance(): any;
}

declare class __SF_CLLocationManager {
  static locationServicesEnabled(): boolean;
  delegate: __SF_CLLocationManagerDelegate;
  startUpdatingLocation(): void;
  startUpdatingLocation(): void;
  lastKnownLocation(): void;
  requestWhenInUseAuthorization(): void;
}

declare class __SF_CLLocationManagerDelegate {
  didUpdateLocations: (...args: any) => void;
  didChangeAuthorizationStatus: (status: any) => void;
}

declare class __SF_UIImagePickerController extends __SF_UINavigationController {
  mediaTypes: any;
  allowsEditing: boolean;
  sourceType: any;
  cameraDevice: any;
  cameraFlashMode: any;
  delegate: __SF_UIImagePickerControllerDelegate;
  static convertToMP4WithPresetQualityWithShouldOptimizeForNetworkUseVideoFilePathFileNameCallback(
    quality: number,
    optimize: boolean,
    path: __SF_NSIndexPath,
    fileName: string,
    callBack: (e: any) => void
  ): void;
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
}
