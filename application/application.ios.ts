import { StatusBar } from './statusbar';
import Location from '../device/location';
import Accelerometer from '../device/accelerometer';
import Network from '../device/network';
import Timer from '../global/timer';
import { Invocation } from '../util';
import { ApplicationEvents } from './application-events';
import { EventEmitter } from 'core/eventemitter';
import { INativeComponent } from 'core/inative-component';

//Application Direction Manager (RTL Support)
(function () {
  let userDefaults = new __SF_NSUserDefaults('SF_USER_DEFAULTS'); //From view-iOS.js viewAppearanceSemanticContentAttribute
  let viewAppearanceSemanticContentAttribute = userDefaults.stringForKey('smartface.ios.viewAppearanceSemanticContentAttribute');
  if (viewAppearanceSemanticContentAttribute !== undefined) {
    __SF_UIView.setViewAppearanceSemanticContentAttribute(parseInt(viewAppearanceSemanticContentAttribute));
  }
})();

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

const EventFunctions = {
  // [Events.ApplicationCallReceived]: () => {
  //     Application.onApplicationCallReceived = (e) => {
  //         this.emitter.emit(Events.ApplicationCallReceived, e);
  //     };
  // },
  // [Events.AppShortcutReceived]: () => {
  //     listenAppShortcut((e) => {
  //         this.emitter.emit(Events.AppShortcutReceived, e);
  //     });
  // },
  // [Events.BackButtonPressed]: () => {
  //     // Android only
  // },
};

class SFApplication extends EventEmitter<ApplicationEvents> {
  private _onUnhandledError: any;
  private _onExit: () => void;
  private _onReceivedNotification: (e: any) => void;
  private _onApplicationCallReceived: any;
  private _onAppShortcutReceived: any;
  private _onMaximize: (e: any) => void;
  private _onMinimize: (e: any) => void;
  constructor() {
    super();

    listenAppShortcut((e) => {
      ApplicationIOS.emit(ApplicationEvents.AppShortcutReceived, e);
    });

    this.onUnhandledError = (e) => {
      ApplicationIOS.emit(ApplicationEvents.UnhandledError, e);
    };

    this.onExit = function () {
      ApplicationIOS.emit(ApplicationEvents.Exit);
    };

    this.onReceivedNotification = function (e) {
      ApplicationIOS.emit(ApplicationEvents.ReceivedNotification, e);
    };

    this.onApplicationCallReceived = function (e) {
      ApplicationIOS.emit(ApplicationEvents.ApplicationCallReceived, e);
    };

    this.onMaximize = function (e) {
      ApplicationIOS.emit(ApplicationEvents.Maximize, e);
    };

    this.onMinimize = function (e) {
      ApplicationIOS.emit(ApplicationEvents.Minimize, e);
    };
  }
  private _sliderDrawer;
  private _rootPage;
  private _onUserActivityWithBrowsingWeb;
  // TODO: typescript error
  public statusBar = StatusBar;
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
  setRootController(params: { controller: INativeComponent }) {
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
    Invocation.invokeInstanceMethod(keyWindow, 'endEditing:', [argForce], 'BOOL');
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
      this.emitter.emit(ApplicationEvents.UnhandledError, e);
    };
  }
  set onExit(value) {
    this._onExit = () => {
      value && value();
      this.emitter.emit(ApplicationEvents.Exit);
    };
  }
  get onExit() {
    return this._onExit;
  }
  set onReceivedNotification(value) {
    this._onReceivedNotification = (e) => {
      value && value(e);
      this.emitter.emit(ApplicationEvents.ReceivedNotification, e);
    };
  }
  get onReceivedNotification() {
    return this._onReceivedNotification;
  }
  set onUserActivityWithBrowsingWeb(value) {
    this._onUserActivityWithBrowsingWeb = value;
    // TODO: Application Global
    Application.onUserActivityCallback = function (e) {
      const url = Invocation.invokeInstanceMethod(e.userActivity, 'webpageURL', [], 'NSObject');
      const type = Invocation.invokeInstanceMethod(e.userActivity, 'activityType', [], 'NSString');
      if (url && type === 'NSUserActivityTypeBrowsingWeb' && typeof value === 'function') {
        return value(url.absoluteString);
      }
      return false;
    };
  }
  get onApplicationCallReceived() {
    return this._onApplicationCallReceived;
  }
  set onApplicationCallReceived(value) {
    this._onApplicationCallReceived = (e) => {
      value && value(e);
      this.emitter.emit(ApplicationEvents.ApplicationCallReceived, e);
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
    this._onMaximize = (e) => {
      value && value(e);
      this.emitter.emit(ApplicationEvents.Maximize, e);
    };
  }
  get onMaximize() {
    return this._onMaximize;
  }
  set onMinimize(value) {
    this._onMinimize = (e) => {
      value && value(e);
      this.emitter.emit(ApplicationEvents.Minimize, e);
    };
  }
  get onMinimize() {
    return this._onMinimize;
  }
  get currentReleaseChannel() {
    return Application.currentReleaseChannel;
  }
  get smartfaceAppName() {
    return Application.smartfaceAppName;
  }
  get appName() {
    return Application.smartfaceAppName;
  }
  get version() {
    return Application.version;
  }
  get isVoiceOverEnabled() {
    return __SF_UIAccessibility.isVoiceOverRunning();
  }
  get ios() {
    return {
      get bundleIdentifier() {
        const mainBundle = Invocation.invokeClassMethod('NSBundle', 'mainBundle', [], 'NSObject');
        const bundleIdentifier = Invocation.invokeInstanceMethod(mainBundle, 'bundleIdentifier', [], 'NSString');
        return bundleIdentifier;
      },
      get userInterfaceLayoutDirection() {
        // TODO: sharedApplication userInterfaceLayoutDirection prop needed
        return __SF_UIApplication.sharedApplication().userInterfaceLayoutDirection;
      }
    };
  }
  get android() {
    const self = this;
    return {
      checkPermission() {},
      requestPermissions() {},
      shouldShowRequestPermissionRationale() {},
      onRequestPermissionsResult() {},
      Permissions: {},
      navigationBar: {},
      setAppTheme(e) {
        // TODO: EventEmitter
        self.emitter.emit(ApplicationEvents.UnhandledError, e);
      }
    };
  }
  get Android() {
    return {
      KeyboardMode: {},
      NavigationBar: { Style: {} },
      Permissions: {}
    };
  }
}
//EventEmitterCreator(SFApplication, EventFunctions);

// function getProjectJsonObject(){
//     const File = require("../io/file");
//     const projectFile = new File({path: File.getDocumentsDirectory() + "/project.json"});

//     // Publish case
//     if(!projectFile.exists){
//         projectFile = new File({path: File.getMainBundleDirectory() + "/project.json"});
//     }

//     var retval = {};
//     if(projectFile.exists){
//         const FileStream = require("../io/filestream");
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

Application.emulator = {};
Application.emulator.globalObjectWillReset = function (state: EmulatorResetState) {
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
};

function cancelAllBackgroundJobs() {
  Timer.clearAllTimer();

  if (Location.nativeObject) {
    Location.stop();
  }

  Accelerometer.stop();

  //TODO: notifierInstance not exists
  if (Network.notifierInstance) {
    Network.notifierInstance.stopNotifier();
    Network.notifierInstance.removeObserver();
  }

  // Http.__cancelAll();
}

const ApplicationIOS = new SFApplication();

export default ApplicationIOS;
