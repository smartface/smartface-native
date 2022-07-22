import Location from '../device/location';
import Accelerometer from '../device/accelerometer';
import Network from '../device/network';
import Timer from '../global/timer';
import Invocation from '../util/iOS/invocation';
import { ApplicationEvents } from './application-events';
import StatusBar from './statusbar';
import { IApplication } from './application';
import Page from '../ui/page';
import NavigationController from '../ui/navigationcontroller';
import { IBottomTabBar } from '../ui/bottomtabbar/bottomtabbar';
import NativeEventEmitterComponent from '../core/native-event-emitter-component';
import SliderDrawer from '../ui/sliderdrawer';

enum EmulatorResetState {
  scan,
  update,
  clear
}

//Application Direction Manager (RTL Support)
const userDefaults = new __SF_NSUserDefaults('SF_USER_DEFAULTS'); //From view-iOS.js viewAppearanceSemanticContentAttribute
const viewAppearanceSemanticContentAttribute = userDefaults.stringForKey('smartface.ios.viewAppearanceSemanticContentAttribute');
if (viewAppearanceSemanticContentAttribute !== undefined) {
  __SF_UIView.setViewAppearanceSemanticContentAttribute(parseInt(viewAppearanceSemanticContentAttribute));
}

class ApplicationIOSClass extends NativeEventEmitterComponent<ApplicationEvents> implements IApplication {
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this.statusBar = StatusBar;
    this.keyWindow = __SF_UIApplication.sharedApplication().keyWindow;
    super.preConstruct(params);
  }

  onUnhandledError: IApplication['onUnhandledError'];
  onExit: IApplication['onExit'];
  onReceivedNotification: IApplication['onReceivedNotification'];
  onApplicationCallReceived: IApplication['onApplicationCallReceived'];
  onMaximize: IApplication['onMaximize'];
  onMinimize: IApplication['onMinimize'];
  onAppShortcutReceived: IApplication['onAppShortcutReceived'];
  currentPage: Page;
  statusBar: typeof StatusBar;
  tabBar?: IBottomTabBar;
  private _sliderDrawer: SliderDrawer;
  private _rootPage: NavigationController['controller'];
  private keyWindow: any;
  readonly LayoutDirection = {
    LEFTTORIGHT: 0,
    RIGHTTOLEFT: 1
  } as const;
  readonly emulator = {
    globalObjectWillReset(state: EmulatorResetState) {
      this.cancelAllBackgroundJobs();
      switch (state) {
        case EmulatorResetState.scan:
          break;
        case EmulatorResetState.update:
          break;
        case EmulatorResetState.clear:
          break;
        default:
          break;
      }
    }
  } as const;
  constructor() {
    super();
    if (SMFApplication.sharedInstance) {
      SMFApplication.sharedInstance().performActionForShortcutItemShortcutItem = (shortcutItem: any) => {
        const params = { data: shortcutItem.userInfo };
        this.emit('appShortcutReceived', params);
        const innerReturnValue = this.onAppShortcutReceived?.(params);
        return typeof innerReturnValue === 'boolean' ? innerReturnValue : true;
      };
    }

    //@ts-ignore TODO: global Application variable from framework. NTVE-697
    Application.onUserActivityCallback = (e) => {
      const url = Invocation.invokeInstanceMethod(e.userActivity, 'webpageURL', [], 'NSObject');
      const type = Invocation.invokeInstanceMethod(e.userActivity, 'activityType', [], 'NSString');
      if (url && type === 'NSUserActivityTypeBrowsingWeb') {
        this.emit('applicationCallReceived', {
          data: e,
          url: url.absoluteString,
          eventType: 'callback',
          result: -1
        });
        return this.ios.onUserActivityWithBrowsingWeb?.(url.absoluteString) ?? true;
      }
      return false;
    };

    //@ts-ignore TODO: global Application variable from framework. NTVE-697
    Application.onAppShortcutReceive = (e) => {
      //TODO: Check isEmulator
      if (!SMFApplication.sharedInstance) {
        return;
      }
      this.emit('appShortcutReceived', e);
      this.onAppShortcutReceived?.(e);
    };

    //@ts-ignore TODO: global Application variable from framework. NTVE-697
    Application.onUnhandledError = (e) => {
      this.onUnhandledError?.(e);
      this.emit('unhandledError', e);
    };

    //@ts-ignore TODO: global Application variable from framework. NTVE-697
    Application.onExit = () => {
      this.emit('exit');
      this.onExit?.();
    };

    //@ts-ignore TODO: global Application variable from framework. NTVE-697
    Application.onReceivedNotification = (e) => {
      this.onReceivedNotification?.(e);
      this.emit('receivedNotification', e);
    };

    //@ts-ignore TODO: global Application variable from framework. NTVE-697
    Application.onApplicationCallReceived = (e) => {
      this.onApplicationCallReceived?.(e);
      this.emit('applicationCallReceived', e);
    };

    //@ts-ignore TODO: global Application variable from framework. NTVE-697
    Application.onMaximize = () => {
      this.onMaximize?.();
      this.emit('maximize');
    };

    //@ts-ignore TODO: global Application variable from framework. NTVE-697
    Application.onMinimize = () => {
      this.onMinimize?.();
      this.emit('minimize');
    };
  }
  setAppTheme: (theme: string) => void;
  registOnItemSelectedListener(): void {
    throw new Error('Method not implemented.');
  }

  canOpenUrl(url: string) {
    return SMFApplication.canOpenUrl(url);
  }
  exit() {
    //@ts-ignore TODO: global Application variable from framework. NTVE-697
    Application.onExit();
    SMFApplication.exit();
  }
  restart() {
    this.cancelAllBackgroundJobs();
    SMFApplication.restart();
  }
  setRootController(params: NavigationController) {
    if (params?.controller) {
      this.rootPage = params.controller;
      this.keyWindow.rootViewController = params.controller.nativeObject;
      this.keyWindow.makeKeyAndVisible();
    }
  }
  configureSliderDrawer(rootPage, sliderDrawer) {
    rootPage.sliderDrawer = sliderDrawer;
    sliderDrawer.nativeObject.Pages = rootPage;
    sliderDrawer.nativeObject.checkSwipeGesture(rootPage.nativeObject, rootPage, this._sliderDrawer.nativeObject);
  }
  call(params: Parameters<IApplication['call']>['0']) {
    SMFApplication.call(params.uriScheme, params.data || {}, params.onSuccess, params.onFailure);
  }
  hideKeyboard() {
    const argForce = new Invocation.Argument({
      type: 'BOOL',
      value: true
    });
    Invocation.invokeInstanceMethod(this.keyWindow, 'endEditing:', [argForce], 'BOOL');
  }

  get byteReceived() {
    const counterInfo = SMFApplication.dataCounters();
    return counterInfo.WiFiReceived + counterInfo.WWANReceived;
  }
  get byteSent() {
    const counterInfo = SMFApplication.dataCounters();
    return counterInfo.WiFiSent + counterInfo.WWANSent;
  }
  get keepScreenAwake() {
    const sharedApp = __SF_UIApplication.sharedApplication();
    return Invocation.invokeInstanceMethod(sharedApp, 'isIdleTimerDisabled', [], 'BOOL');
  }
  set keepScreenAwake(value) {
    const idletimerdisabled = new Invocation.Argument({
      type: 'BOOL',
      value: value
    });
    const sharedApp = __SF_UIApplication.sharedApplication();
    Invocation.invokeInstanceMethod(sharedApp, 'setIdleTimerDisabled:', [idletimerdisabled]);
  }
  get sliderDrawer() {
    return this._sliderDrawer;
  }
  set sliderDrawer(value) {
    if (value instanceof SliderDrawer) {
      this._sliderDrawer = value;
      if (this._rootPage) {
        this.configureSliderDrawer(this._rootPage, this._sliderDrawer);
      }
    }
  }
  get rootPage() {
    return this._rootPage;
  }
  set rootPage(value) {
    if (typeof value === 'object') {
      this._rootPage = value;
      if (this._sliderDrawer instanceof SliderDrawer) {
        this.configureSliderDrawer(this._rootPage, this._sliderDrawer);
      }
    }
  }
  get currentReleaseChannel() {
    //@ts-ignore TODO: global Application variable from framework. NTVE-697
    return Application.currentReleaseChannel;
  }
  get smartfaceAppName() {
    //@ts-ignore TODO: global Application variable from framework. NTVE-697
    return Application.smartfaceAppName;
  }
  get appName() {
    //@ts-ignore TODO: global Application variable from framework. NTVE-697
    return Application.smartfaceAppName;
  }
  get version() {
    //@ts-ignore TODO: global Application variable from framework. NTVE-697
    return Application.version;
  }
  get isVoiceOverEnabled() {
    return __SF_UIAccessibility.isVoiceOverRunning();
  }
  get ios(): IApplication['ios'] {
    return {
      get bundleIdentifier() {
        const mainBundle = Invocation.invokeClassMethod('NSBundle', 'mainBundle', [], 'NSObject');
        const bundleIdentifier = Invocation.invokeInstanceMethod(mainBundle!, 'bundleIdentifier', [], 'NSString');
        return bundleIdentifier;
      },
      get userInterfaceLayoutDirection() {
        return __SF_UIApplication.sharedApplication().userInterfaceLayoutDirection;
      }
    };
  }
  get android() {
    return {
      checkPermission: () => false,
      requestPermission: () => {},
      shouldShowRequestPermissionRationale: () => false,
      onRequestPermissionsResult: () => {},
      Permissions: {},
      navigationBar: {} as any,
      setAppTheme: () => {}
    };
  }
  get Android() {
    return {
      KeyboardMode: {} as any,
      Permissions: {} as any,
      NavigationBar: {} as any
    };
  }
  protected createNativeObject() {
    return null;
  }

  private cancelAllBackgroundJobs() {
    Timer.clearAllTimer();
    if (Location.nativeObject) {
      Location.stop();
    }
    Accelerometer.stop();
    Network?.cancelAll();
  }
}

const ApplicationIOS = new ApplicationIOSClass();

export default ApplicationIOS;
