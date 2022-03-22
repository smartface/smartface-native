import Location from '../device/location';
import Accelerometer from '../device/accelerometer';
import Network from '../device/network';
import Timer from '../global/timer';
import Invocation from '../util/iOS/invocation';
import { ApplicationEvents } from './application-events';
import StatusBar from './statusbar';
import { ApplicationBase } from './application';
import Page from '../ui/page';
import NavigationController from '../ui/navigationcontroller';
import { IBottomTabBar } from '../ui/bottomtabbar';
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

class ApplicationIOS extends NativeEventEmitterComponent<ApplicationEvents> implements ApplicationBase {
  onUnhandledError: ApplicationBase['onUnhandledError'];
  onExit: ApplicationBase['onExit'];
  onReceivedNotification: ApplicationBase['onReceivedNotification'];
  onApplicationCallReceived: ApplicationBase['onApplicationCallReceived'];
  onMaximize: ApplicationBase['onMaximize'];
  onMinimize: ApplicationBase['onMinimize'];
  onAppShortcutReceived: ApplicationBase['onAppShortcutReceived'];
  currentPage: Page;
  statusBar: typeof StatusBar = StatusBar;
  tabBar?: IBottomTabBar;
  private _sliderDrawer: SliderDrawer;
  private _rootPage: NavigationController['controller'];
  private keyWindow = __SF_UIApplication.sharedApplication().keyWindow;
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
    __SF_UIApplication.onUserActivityCallback = (e) => {
      const url = Invocation.invokeInstanceMethod(e.userActivity, 'webpageURL', [], 'NSObject');
      const type = Invocation.invokeInstanceMethod(e.userActivity, 'activityType', [], 'NSString');
      if (url && type === 'NSUserActivityTypeBrowsingWeb') {
        return this.ios.onUserActivityWithBrowsingWeb?.(url.absoluteString);
      }
      return false;
    };
    if (__SF_UIApplication.sharedInstance) {
      __SF_UIApplication.sharedInstance().performActionForShortcutItemShortcutItem = (shortcutItem: any) => {
        const params = { data: shortcutItem.userInfo };
        this.emit('appShortcutReceived', params);
        const innerReturnValue = this.onAppShortcutReceived?.(params);
        return typeof innerReturnValue === 'boolean' ? innerReturnValue : true;
      };
    }

    __SF_UIApplication.onAppShortcutReceive = (e) => {
      //TODO: Check isEmulator
      if (!__SF_UIApplication.sharedInstance) {
        return;
      }
      this.emit('appShortcutReceived', e);
      this.onAppShortcutReceived?.(e);
    };

    __SF_UIApplication.onUnhandledError = (e) => {
      this.onUnhandledError?.(e);
      this.emit('unhandledError', e);
    };

    __SF_UIApplication.onExit = () => {
      this.emit('exit');
      this.onExit?.();
    };

    __SF_UIApplication.onReceivedNotification = (e) => {
      this.onReceivedNotification?.(e);
      this.emit('receivedNotification', e);
    };

    __SF_UIApplication.onApplicationCallReceived = (e) => {
      this.onApplicationCallReceived?.(e);
      this.emit('applicationCallReceived', e);
    };

    __SF_UIApplication.onMaximize = () => {
      this.onMaximize?.();
      this.emit('maximize');
    };

    __SF_UIApplication.onMinimize = () => {
      this.onMinimize?.();
      this.emit('minimize');
    };
  }
  setAppTheme: (theme: string) => void;
  registOnItemSelectedListener(): void {
    throw new Error('Method not implemented.');
  }

  canOpenUrl(url: string) {
    return __SF_UIApplication.canOpenUrl(url);
  }
  exit() {
    __SF_UIApplication.onExit();
    __SF_UIApplication.exit();
  }
  restart() {
    this.cancelAllBackgroundJobs();
    __SF_UIApplication.restart();
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
  call(params: Parameters<ApplicationBase['call']>['0']) {
    __SF_UIApplication.call(params.uriScheme, params.data || {}, params.onSuccess, params.onFailure);
  }
  hideKeyboard() {
    const argForce = new Invocation.Argument({
      type: 'BOOL',
      value: true
    });
    Invocation.invokeInstanceMethod(this.keyWindow, 'endEditing:', [argForce], 'BOOL');
  }

  get byteReceived() {
    const counterInfo = __SF_UIApplication.dataCounters();
    return counterInfo.WiFiReceived + counterInfo.WWANReceived;
  }
  get byteSent() {
    const counterInfo = __SF_UIApplication.dataCounters();
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
    return this.currentReleaseChannel;
  }
  get smartfaceAppName() {
    return this.smartfaceAppName;
  }
  get appName() {
    return this.smartfaceAppName;
  }
  get version() {
    return this.version;
  }
  get isVoiceOverEnabled() {
    return __SF_UIAccessibility.isVoiceOverRunning();
  }
  get ios(): ApplicationBase['ios'] {
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
    return {};
  }
  get Android() {
    return {};
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

const ApplicationIOSInstance = new ApplicationIOS();

export default ApplicationIOSInstance;
