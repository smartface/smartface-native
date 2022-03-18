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
import { EventEmitter } from '../core/eventemitter';
import NativeEventEmitterComponent from '../core/native-event-emitter-component';

//Application Direction Manager (RTL Support)
const userDefaults = new __SF_NSUserDefaults('SF_USER_DEFAULTS'); //From view-iOS.js viewAppearanceSemanticContentAttribute
const viewAppearanceSemanticContentAttribute = userDefaults.stringForKey('smartface.ios.viewAppearanceSemanticContentAttribute');
if (viewAppearanceSemanticContentAttribute !== undefined) {
  __SF_UIView.setViewAppearanceSemanticContentAttribute(parseInt(viewAppearanceSemanticContentAttribute));
}

let _rootPage;
let _sliderDrawer;
const keyWindow = __SF_UIApplication.sharedApplication().keyWindow;

function listenAppShortcut(callback) {
  //TODO: Check isEmulator
  if (!SMFApplication.sharedInstance) return;

  SMFApplication.sharedInstance().performActionForShortcutItemShortcutItem = function (shortcutItem) {
    let returnValue = true;
    if (typeof callback === 'function') {
      const innerReturnValue = callback({ data: shortcutItem.userInfo });
      if (typeof innerReturnValue === 'boolean') {
        returnValue = innerReturnValue;
      }
    }
    return returnValue;
  };
}

class ApplicationIOS extends NativeEventEmitterComponent<ApplicationEvents> implements ApplicationBase {
  private _onUnhandledError: any;
  private _onExit: () => void;
  private _onReceivedNotification: (e: any) => void;
  private _onApplicationCallReceived: any;
  private _onAppShortcutReceived: any;
  private _onMaximize: () => void;
  private _onMinimize: () => void;
  readonly emulator = {
    globalObjectWillReset(state: EmulatorResetState) {
      cancelAllBackgroundJobs();
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
    // TODO: Reimplement that
    // onUserActivityCallback = function (e) {
    //   const url = Invocation.invokeInstanceMethod(e.userActivity, 'webpageURL', [], 'NSObject');
    //   const type = Invocation.invokeInstanceMethod(e.userActivity, 'activityType', [], 'NSString');
    //   if (url && type === 'NSUserActivityTypeBrowsingWeb' && typeof value === 'function') {
    //     return value(url.absoluteString);
    //   }
    //   return false;
    // };
    listenAppShortcut((e) => {
      this.emit(ApplicationEvents.AppShortcutReceived, e);
    });

    this.onUnhandledError = (e) => {
      this.emit(ApplicationEvents.UnhandledError, e);
    };

    this.onExit = function () {
      this.emit(ApplicationEvents.Exit);
    };

    this.onReceivedNotification = function (e) {
      this.emit(ApplicationEvents.ReceivedNotification, e);
    };

    this.onApplicationCallReceived = function (e) {
      this.emit(ApplicationEvents.ApplicationCallReceived, e);
    };

    this.onMaximize = function () {
      this.emit(ApplicationEvents.Maximize);
    };

    this.onMinimize = function () {
      this.emit(ApplicationEvents.Minimize);
    };
  }
  setAppTheme: (theme: string) => void;
  Events: {
    readonly Exit: 'exit';
    readonly Maximize: 'maximize';
    readonly Minimize: 'minimize';
    readonly ReceivedNotification: 'receivedNotification';
    readonly UnhandledError: 'unhandledError';
    readonly ApplicationCallReceived: 'applicationCallReceived';
    readonly AppShortcutReceived: 'appShortcutReceived';
    readonly BackButtonPressed: 'backButtonPressed';
    readonly RequestPermissionResult: 'requestPermissionResult';
  };
  currentPage: Page;
  registOnItemSelectedListener(): void {
    throw new Error('Method not implemented.');
  }
  tabBar?: IBottomTabBar;
  __mDrawerLayout: any;
  private _sliderDrawer;
  private _rootPage;
  private _onUserActivityWithBrowsingWeb;
  // TODO: typescript error
  public statusBar: typeof StatusBar = StatusBar;
  readonly LayoutDirection = {
    LEFTTORIGHT: 0,
    RIGHTTOLEFT: 1
  } as const;
  canOpenUrl(url) {
    // TODO define SMFApplication globally
    return SMFApplication.canOpenUrl(url);
  }
  exit() {
    this._onExit();
    // TODO define SMFApplication globally
    SMFApplication.exit();
  }
  restart() {
    cancelAllBackgroundJobs();
    // TODO define SMFApplication globally
    SMFApplication.restart();
  }
  setRootController(params: NavigationController) {
    if (params && params.controller) {
      this.rootPage = params.controller;
      keyWindow.rootViewController = params.controller.nativeObject;
      keyWindow.makeKeyAndVisible();
    }
  }
  configureSliderDrawer(rootPage, sliderDrawer) {
    rootPage.sliderDrawer = sliderDrawer;
    sliderDrawer.nativeObject.Pages = rootPage;
    sliderDrawer.nativeObject.checkSwipeGesture(rootPage.nativeObject, rootPage, _sliderDrawer.nativeObject);
  }
  call(
    uriScheme: {
      uriScheme: string;
      data?: {};
      onSuccess?: (value?: any) => void;
      onFailure?: (value?: any) => void;
    },
    data?: {},
    onSuccess?: (value?: any) => void,
    onFailure?: (value?: any) => void
  ) {
    if (Object.keys(uriScheme).indexOf('uriScheme') === -1) {
      SMFApplication.call(uriScheme, data, onSuccess, onFailure);
    } else {
      SMFApplication.call(uriScheme.uriScheme, uriScheme.data, uriScheme.onSuccess, uriScheme.onFailure);
    }
  }
  hideKeyboard() {
    //TODO: new argument
    const argForce = new Invocation.Argument({
      type: 'BOOL',
      value: true
    });
    // TODO: keyWindow must be __SF_NSOBject
    Invocation.invokeInstanceMethod(keyWindow as any, 'endEditing:', [argForce], 'BOOL');
  }
  get byteReceived() {
    // TODO define SMFApplication globally
    const counterInfo = SMFApplication.dataCounters();
    return counterInfo.WiFiReceived + counterInfo.WWANReceived;
  }
  get byteSent() {
    // TODO define SMFApplication globally
    const counterInfo = SMFApplication.dataCounters();
    return counterInfo.WiFiSent + counterInfo.WWANSent;
  }
  get keepScreenAwake() {
    // TODO updated here with real sharedApplication
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
    if (typeof value === 'object') {
      _sliderDrawer = value;
      if (typeof _rootPage !== 'undefined') {
        this.configureSliderDrawer(_rootPage, _sliderDrawer);
      }
    }
  }
  get rootPage() {
    return this._rootPage;
  }
  set rootPage(value) {
    if (typeof value === 'object') {
      _rootPage = value;

      if (typeof _sliderDrawer !== 'undefined') {
        this.configureSliderDrawer(_rootPage, _sliderDrawer);
      }
    }
  }
  get onUnhandledError() {
    return this._onUnhandledError;
  }
  set onUnhandledError(value) {
    this._onUnhandledError = (e) => {
      value && value(e);
      this.emit(ApplicationEvents.UnhandledError, e);
    };
  }
  set onExit(value) {
    this._onExit = () => {
      value && value();
      this.emit(ApplicationEvents.Exit);
    };
  }
  get onExit() {
    return this._onExit;
  }
  set onReceivedNotification(value) {
    this._onReceivedNotification = (e) => {
      value && value(e);
      this.emit(ApplicationEvents.ReceivedNotification, e);
    };
  }
  get onReceivedNotification() {
    return this._onReceivedNotification;
  }
  set onUserActivityWithBrowsingWeb(value) {
    this._onUserActivityWithBrowsingWeb = value;
    // TODO: Application Global
  }
  get onApplicationCallReceived() {
    return this._onApplicationCallReceived;
  }
  set onApplicationCallReceived(value) {
    this._onApplicationCallReceived = (e) => {
      value && value(e);
      this.emit(ApplicationEvents.ApplicationCallReceived, e);
    };
  }
  set onAppShortcutReceived(value) {
    listenAppShortcut(value);
    this._onAppShortcutReceived = value;
  }
  get onUserActivityWithBrowsingWeb() {
    return this._onUserActivityWithBrowsingWeb;
  }
  set onMaximize(value) {
    this._onMaximize = () => {
      value && value();
      this.emit(ApplicationEvents.Maximize);
    };
  }
  get onMaximize() {
    return this._onMaximize;
  }
  set onMinimize(value) {
    this._onMinimize = () => {
      value && value();
      this.emit(ApplicationEvents.Minimize);
    };
  }
  get onMinimize() {
    return this._onMinimize;
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
  get ios() {
    return {
      get bundleIdentifier() {
        const mainBundle = Invocation.invokeClassMethod('NSBundle', 'mainBundle', [], 'NSObject');
        const bundleIdentifier = Invocation.invokeInstanceMethod(mainBundle!, 'bundleIdentifier', [], 'NSString');
        return bundleIdentifier;
      },
      get userInterfaceLayoutDirection() {
        // TODO: sharedApplication userInterfaceLayoutDirection prop needed
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
}
//EventEmitterCreator(SFApplication, EventFunctions);

// function getProjectJsonObject(){
//     imporr File from "../io/file";
//     const projectFile = new File({path: File.getDocumentsDirectory() + "/project.json"});

//     // Publish case
//     if(!projectFile.exists){
//         projectFile = new File({path: File.getMainBundleDirectory() + "/project.json"});
//     }

//     var retval = {};
//     if(projectFile.exists){
//         import FileStream from "../io/filestream";
//         var projectFileStream = projectFile.openStream(FileStream.StreamType.READ);
//         var projectFileContent = projectFileStream.readToEnd();
//         if (projectFileContent) {
//             retval = JSON.parse(projectFileContent);
//         }
//         projectFileStream.close();
//     }
//     return retval;
// }
///////////////////////////////////////////////////////////////////////////////////////////////////

enum EmulatorResetState {
  scan,
  update,
  clear
}

function cancelAllBackgroundJobs() {
  Timer.clearAllTimer();

  if (Location.nativeObject) {
    Location.stop();
  }

  Accelerometer.stop();

  //TODO: notifierInstance not exists
  if (Network) {
    Network.cancelAll();
  }
}

const Application = new ApplicationIOS();

export default Application;
