import { StatusBar } from './statusbar';
import Location from '../device/location';
import Accelerometer from '../device/accelerometer';
import Network from '../device/network';
import Timer from '../global/timer';
import { Invocation } from '../util';
import Events from './events';
import { EventEmitter } from 'core/eventemitter';

//Application Direction Manager (RTL Support)
(function () {
  var userDefaults = new __SF_NSUserDefaults('SF_USER_DEFAULTS'); //From view-iOS.js viewAppearanceSemanticContentAttribute
  var viewAppearanceSemanticContentAttribute = userDefaults.stringForKey('smartface.ios.viewAppearanceSemanticContentAttribute');
  if (viewAppearanceSemanticContentAttribute != undefined) {
    __SF_UIView.setViewAppearanceSemanticContentAttribute(parseInt(viewAppearanceSemanticContentAttribute));
  }
})();

var _rootPage;
var _sliderDrawer;
const keyWindow = __SF_UIApplication.sharedApplication().keyWindow;

function listenAppShortcut(callback) {
  //TODO: Check isEmulator
  if (!SMFApplication.sharedInstance) return;

  SMFApplication.sharedInstance().performActionForShortcutItemShortcutItem = function (shortcutItem) {
    var returnValue = true;
    if (typeof callback === 'function') {
      var innerReturnValue = callback({ data: shortcutItem.userInfo });
      if (typeof innerReturnValue == 'boolean') {
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
//TODO: event type should be given correctly
class SFApplication extends EventEmitter<string> {
  constructor() {
    super();
  }
  private _sliderDrawer;
  private _rootPage;
  private _onUserActivityWithBrowsingWeb;
  // TODO: typescript error
  public statusBar = StatusBar;
  LayoutDirection = {
    LEFTTORIGHT: 0,
    RIGHTTOLEFT: 1
  };
  canOpenUrl(url) {
    // TODO define SMFApplication globally
    return SMFApplication.canOpenUrl(url);
  }
  exit() {
    // TODO define Application globally
    Application.onExit();
    // TODO define SMFApplication globally
    SMFApplication.exit();
  }
  restart() {
    cancelAllBackgroundJobs();
    // TODO define SMFApplication globally
    SMFApplication.restart();
  }
  setRootController(params) {
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
  call(uriScheme, data, onSuccess, onFailure) {
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
    var idletimerdisabled = new Invocation.Argument({
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
    // TODO: Application Global
    return Application.onUnhandledError;
  }
  set onUnhandledError(value) {
    // TODO: Application Global
    Application.onUnhandledError = (e) => {
      value && value(e);
      // TODO: EventEmitter
      this.emitter.emit(Events.UnhandledError, e);
    };
  }
  set onExit(value) {
    // TODO: Application Global
    Application.onExit = (e) => {
      value && value(e);
      // TODO: EventEmitter
      this.emitter.emit(Events.Exit, e);
    };
  }
  get onExit() {
    // TODO: Application Global
    return Application.onExit;
  }
  set onReceivedNotification(value) {
    // TODO: Application Global
    Application.onReceivedNotification = (e) => {
      value && value(e);
      // TODO: EventEmitter
      this.emitter.emit(Events.ReceivedNotification, e);
    };
  }
  get onReceivedNotification() {
    return Application.onReceivedNotification;
  }
  set onUserActivityWithBrowsingWeb(value) {
    this._onUserActivityWithBrowsingWeb = value;
    // TODO: Application Global
    Application.onUserActivityCallback = function (e) {
      var url = Invocation.invokeInstanceMethod(e.userActivity, 'webpageURL', [], 'NSObject');
      var type = Invocation.invokeInstanceMethod(e.userActivity, 'activityType', [], 'NSString');
      if (url && type === 'NSUserActivityTypeBrowsingWeb' && typeof value === 'function') {
        return value(url.absoluteString);
      }
      return false;
    };
  }
  get onApplicationCallReceived() {
    return Application.onApplicationCallReceived;
  }
  set onApplicationCallReceived(value) {
    Application.onApplicationCallReceived = (e) => {
      value && value(e);
      this.emitter.emit(Events.ApplicationCallReceived, e);
    };
  }
  get onAppShortcutReceived() {
    return Application.onApplicationCallReceived;
  }
  set onAppShortcutReceived(value) {
    listenAppShortcut(value);
    Application.onAppShortcutReceive = value;
  }
  get onUserActivityWithBrowsingWeb() {
    return this._onUserActivityWithBrowsingWeb;
  }
  set onMaximize(value) {
    Application.onMaximize = (e) => {
      value && value(e);
      this.emitter.emit(Events.Maximize, e);
    };
  }
  get onMaximize() {
    return Application.onMaximize;
  }
  set onMinimize(value) {
    Application.onMinimize = (e) => {
      value && value(e);
      this.emitter.emit(Events.Minimize, e);
    };
  }
  get onMinimize() {
    return Application.onMinimize;
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
    return {
      checkPermission() {},
      requestPermissions() {},
      shouldShowRequestPermissionRationale() {},
      onRequestPermissionsResult() {},
      Permissions: {},
      navigationBar: {},
      setAppTheme(e) {
        // TODO: EventEmitter
        this.emitter.emit(Events.UnhandledError, e);
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

const EmulatorResetState = {
  scan: 0,
  update: 1,
  clear: 2
};

Application.emulator = {};
Application.emulator.globalObjectWillReset = function (state) {
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

listenAppShortcut((e) => {
  ApplicationIOS.emit(Events.AppShortcutReceived, e);
});

Application.onUnhandledError = (e) => {
  ApplicationIOS.emit(Events.UnhandledError, e);
};

Application.onExit = function (e) {
  ApplicationIOS.emit(Events.Exit, e);
};

Application.onReceivedNotification = function (e) {
  ApplicationIOS.emit(Events.ReceivedNotification, e);
};

Application.onApplicationCallReceived = function (e) {
  ApplicationIOS.emit(Events.ApplicationCallReceived, e);
};

Application.onMaximize = function (e) {
  ApplicationIOS.emit(Events.Maximize, e);
};

Application.onMinimize = function (e) {
  ApplicationIOS.emit(Events.Minimize, e);
};

export default ApplicationIOS;
