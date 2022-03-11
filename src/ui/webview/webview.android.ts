import { ViewAndroid } from '../view/view.android';
import AndroidConfig from '../../util/Android/androidconfig';
import File from '../../io/file';
import Path from '../../io/path';
import { WebView as WebViewRequestCodes } from '../../util/Android/requestcodes';
import { WebViewEvents } from './webview-events';
import WebView from '.';
import IWebView from '.';
import OverScrollMode from '../shared/android/overscrollmode';
import { WithMobileOSProps } from '../../core/native-mobile-component';

const NativeView = requireClass('android.view.View');
const NativeCookieManager = requireClass('android.webkit.CookieManager');
const NativeBuild = requireClass('android.os.Build');
const NativeIntent = requireClass('android.content.Intent');
const NativeURI = requireClass('android.net.Uri');
const NativeSimpleDateFormat = requireClass('java.text.SimpleDateFormat');
const NativeDate = requireClass('java.util.Date');
const NativeMediaStore = requireClass('android.provider.MediaStore');
const NativeUri = requireClass('android.net.Uri');
const NativeFile = requireClass('java.io.File');
const NativeWebView = requireClass('android.webkit.WebView');
const SFWebView = requireClass('io.smartface.android.sfcore.ui.webview.SFWebView');
const ValueCallback = requireClass('android.webkit.ValueCallback');

const activity = AndroidConfig.activity;

let mFilePathCallback: any;
let mCameraPhotoPath: any;
let mUploadMessage: any;

interface IWebViewClientCallbacks {
  onPageFinished: (url: string) => void;
  onPageStarted: (url: string) => void;
  shouldOverrideUrlLoading: (url: string) => boolean;
  onReceivedError: (code: number, message: string, url: string) => void;
}

interface IWebChromeClientCallbacks {
  onShowFileChooser: (filePathCallback: () => void) => boolean;
  onConsoleMessage: (sourceId: number, message: string, lineNumber: number, messageLevel: string) => boolean;
}

export default class WebViewAndroid<TEvent extends string = WebViewEvents> extends ViewAndroid<TEvent | WebViewEvents, any, IWebView> implements IWebView {
  private _canOpenLinkInside = true;
  private _onError: IWebView['onError'];
  private _onShow: IWebView['onShow'];
  private _onLoad: IWebView['onLoad'];
  private _onChangedURL: IWebView['onChangedURL'];
  private _onConsoleMessage: IWebView['android']['onConsoleMessage'];
  private _scrollBarEnabled = true;
  private _scrollEnabled = true;
  private _superTouchCallbacks;
  private webViewClientCallbacks: IWebViewClientCallbacks;
  private webChromeClientCallbacks: IWebChromeClientCallbacks;
  private _onBackButtonPressedCallback: IWebView['android']['onBackButtonPressed'];
  private _page: IWebView['android']['page'];
  private static REQUEST_CODE_LOLIPOP = WebViewRequestCodes.REQUEST_CODE_LOLIPOP;
  private static RESULT_CODE_ICE_CREAM = WebViewRequestCodes.RESULT_CODE_ICE_CREAM;
  static onActivityResult = function (requestCode, resultCode, data) {
    if (requestCode === WebViewAndroid.RESULT_CODE_ICE_CREAM) {
      let uri = null;
      if (data !== null) {
        uri = data.getData();
      }
      mUploadMessage.onReceiveValue(uri);
      mUploadMessage = null;
    } else if (requestCode === WebViewAndroid.REQUEST_CODE_LOLIPOP) {
      let results: any = null;
      // Check that the response is a good one
      if (resultCode === -1) {
        // Activity.RESULT_OK
        if (data === null) {
          // If there is not data, then we may have taken a photo
          if (mCameraPhotoPath !== null) {
            const parsedUri: any[] = [];
            parsedUri.push(NativeUri.parse(mCameraPhotoPath));
            results = array(parsedUri, 'android.net.Uri');
          }
        } else {
          const dataString = data.getDataString();
          const parsedUri2: any[] = [];
          parsedUri2.push(NativeUri.parse(dataString));
          if (dataString !== null) {
            results = array(parsedUri2, 'android.net.Uri');
          }
        }
      }
      mFilePathCallback.onReceiveValue(results);
      mFilePathCallback = null;
    }
  };
  constructor(params?: Partial<WebView>) {
    super(params);
    this.nativeObject.setOnKeyListener(
      NativeView.OnKeyListener.implement({
        onKey: (view: any, keyCode: number, keyEvent: any) => {
          // KeyEvent.KEYCODE_BACK , KeyEvent.ACTION_DOWN
          if (keyCode === 4 && keyEvent.getAction() === 0) {
            this._onBackButtonPressedCallback?.();
            this.emit('backButtonPressed');
            return true;
          } else {
            return false;
          }
        }
      })
    );

    this.addAndroidProps(this.getAndroidParams());
    this.setWebViewClientCallbacks();
    this.setWebChromeClientCallbacks();

    if (!this.nativeObject) {
      this._nativeObject = new SFWebView(activity, this.webViewClientCallbacks, this.webChromeClientCallbacks);
    }
    /* Webview contains background color which draws all over given background drawbles.
    It means that setBackgroundColor is not same as setBackground. So, to eleminate this behavior, set transparent
    */
    this.nativeObject.setBackgroundColor(0);
    this.nativeObject.setScrollBarEnabled(this._scrollBarEnabled);
  }
  onOpenNewWindow?: (e: { url: string }) => void;
  get scrollBarEnabled() {
    return this._scrollBarEnabled;
  }
  set scrollBarEnabled(value) {
    if (value) {
      this._scrollBarEnabled = true;
      this.nativeObject.setScrollBarEnabled(true);
    } else {
      this._scrollBarEnabled = false;
      this.nativeObject.setScrollBarEnabled(false);
    }
  }
  get userAgent() {
    return this.nativeObject.getUserAgent();
  }
  set userAgent(value) {
    this.nativeObject.setUserAgent(value);
  }
  get bounceEnabled() {
    return this.nativeObject.getOverScrollMode() !== OverScrollMode.NEVER;
  }
  set bounceEnabled(value) {
    if (value) {
      this.nativeObject.setOverScrollMode(OverScrollMode.ALWAYS);
    } else {
      this.nativeObject.setOverScrollMode(OverScrollMode.NEVER);
    }
  }
  get openLinkInside() {
    return this._canOpenLinkInside;
  }
  set openLinkInside(enabled) {
    this._canOpenLinkInside = enabled;
  }
  get zoomEnabled() {
    return this.nativeObject.getZoomEnabled();
  }
  set zoomEnabled(enabled) {
    this.nativeObject.setZoomEnabled(enabled);
  }
  get scrollEnabled() {
    return this._scrollEnabled;
  }
  set scrollEnabled(enabled) {
    this._scrollEnabled = enabled;
  }
  get onChangedURL() {
    return this._onChangedURL;
  }
  set onChangedURL(callback) {
    this._onChangedURL = callback;
  }
  get onLoad() {
    return this._onLoad;
  }
  set onLoad(callback) {
    this._onLoad = callback;
  }
  get onError() {
    return this._onError;
  }
  set onError(callback) {
    this._onError = callback;
  }
  get onShow() {
    return this._onShow;
  }
  set onShow(callback) {
    this._onShow = callback;
  }
  refresh() {
    this.nativeObject.reload();
  }
  goBack() {
    this.nativeObject.goBack();
  }
  goForward() {
    this.nativeObject.goForward();
  }
  loadURL(url: string) {
    this.nativeObject.loadUrl(url);
  }
  loadHTML(htmlText: string) {
    this.nativeObject.loadDataWithBaseURL(null, htmlText, 'text/html', null, null);
  }
  loadFile(file: File) {
    if (file instanceof File) {
      //@ts-ignore TODO: something wrong with typings or broken if-else logic
      if (file.type === Path.FILE_TYPE.FILE || file.type === Path.FILE_TYPE.EMULATOR_ASSETS || file.type === Path.FILE_TYPE.RAU_ASSETS) {
        //Generate FILE PATH
        this.nativeObject.loadUrl('file:///' + file.fullPath);
        //@ts-ignore
      } else if (file.type === Path.FILE_TYPE.ASSET) {
        this.nativeObject.loadUrl('file:///android_asset/' + file.path.replace('assets://', ''));
      }
    }
  }
  evaluateJS(javascript, callback) {
    if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_KITKAT) {
      const valueCallback = ValueCallback.implement({
        onReceiveValue: function (value) {
          if (callback) callback(value);
        }
      });
      this.nativeObject.evaluateJavascript(javascript, valueCallback);
    } else {
      this.nativeObject.loadUrl('javascript:' + javascript);
    }
  }
  toString() {
    return 'WebView';
  }
  clearCache(deleteDiskFiles) {
    this.nativeObject.clearCache(deleteDiskFiles);
  }
  clearAllData() {
    this.clearCache(true);
    this.clearCookie();
    this.android.clearHistory?.();
    this.android.clearFormData?.();
  }
  clearCookie() {
    const cookieManager = NativeCookieManager.getInstance();
    if (NativeBuild.VERSION.SDK_INT >= 23) {
      cookieManager.removeAllCookies(null);
    } else {
      cookieManager.removeAllCookie();
    }
  }

  private overrideURLChange(url: string, _canOpenLinkInside: boolean) {
    if (_canOpenLinkInside) {
      return false;
    } else {
      const action = NativeIntent.ACTION_VIEW;
      const uri = NativeURI.parse(url);
      const intent = new NativeIntent(action, uri);
      activity.startActivity(intent);
      return true;
    }
  }
  private createImageFile() {
    const timeStamp = new NativeSimpleDateFormat('yyyyMMdd_HHmmss').format(new NativeDate());
    const imageFileName = 'JPEG_' + timeStamp + '_';
    const storageDir = activity.getExternalCacheDir();
    const imageFile = NativeFile.createTempFile(imageFileName /* prefix */, '.jpg' /* suffix */, storageDir /* directory */);
    return imageFile;
  }

  private getAndroidParams() {
    const self = this;
    return {
      get page(): IWebView['android']['page'] {
        return self._page;
      },
      set page(value: IWebView['android']['page']) {
        self._page = value;
      },
      get onConsoleMessage(): IWebView['android']['onConsoleMessage'] {
        return self._onConsoleMessage;
      },
      set onConsoleMessage(value: IWebView['android']['onConsoleMessage']) {
        self._onConsoleMessage = value;
      },
      get onBackButtonPressed(): IWebView['android']['onBackButtonPressed'] {
        return self._onBackButtonPressedCallback;
      },
      set onBackButtonPressed(value: IWebView['android']['onBackButtonPressed']) {
        self._onBackButtonPressedCallback = value;
      },
      get displayZoomControls(): IWebView['android']['displayZoomControls'] {
        return self.nativeObject.getDisplayZoomControls();
      },
      set displayZoomControls(value: IWebView['android']['displayZoomControls']) {
        self.nativeObject.setDisplayZoomControls(value);
      },
      get overScrollMode(): OverScrollMode {
        return self._overScrollMode;
      },
      set overScrollMode(mode: OverScrollMode) {
        self.nativeObject.setOverScrollMode(mode);
        self._overScrollMode = mode;
      },
      clearHistory() {
        self.nativeObject.clearHistory();
      },
      clearFormData() {
        self.nativeObject.clearFormData();
      },
      setWebContentsDebuggingEnabled(enabled: boolean) {
        NativeWebView.setWebContentsDebuggingEnabled(enabled);
      }
    };
  }

  private setWebViewClientCallbacks() {
    this.webViewClientCallbacks = {
      onPageFinished: (url: string) => {
        const params = { url: url };
        this._onShow?.(params);
        this.emit('show', params);
      },
      onPageStarted: (url: string) => {
        const params = { url: url };
        this._onLoad?.(params);
        this.emit('load', params);
      },
      shouldOverrideUrlLoading: (url: string) => {
        const params = { url: url };
        const callbackValue = this._onChangedURL?.(params) || true;
        this.emit('changedURL', params);
        if (!callbackValue) {
          return true;
        }
        return this.overrideURLChange(url, this._canOpenLinkInside);
      },
      onReceivedError: (code: number, message: string, url: string) => {
        const params = {
          code,
          message,
          url
        };
        this.emit('error', params);
        this._onError?.(params);
      }
    };
  }
  private setWebChromeClientCallbacks() {
    this.webChromeClientCallbacks = {
      //For Android5.0+
      onShowFileChooser: (filePathCallback: () => void) => {
        if (mFilePathCallback !== null) {
          mFilePathCallback.onReceiveValue(null);
        }
        mFilePathCallback = filePathCallback;

        let takePictureIntent = new NativeIntent(NativeMediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(activity.getPackageManager()) !== null) {
          // Create the File where the photo should go
          let photoFile: File;
          photoFile = this.createImageFile();
          takePictureIntent.putExtra('PhotoPath', mCameraPhotoPath);

          // Continue only if the File was successfully created
          if (photoFile !== null) {
            mCameraPhotoPath = 'file:' + photoFile.getAbsolutePath();
            takePictureIntent.putExtra(NativeMediaStore.EXTRA_OUTPUT, NativeUri.fromFile(photoFile));
          } else {
            takePictureIntent = null;
          }
        }

        const contentSelectionIntent = new NativeIntent(NativeIntent.ACTION_GET_CONTENT);
        contentSelectionIntent.addCategory(NativeIntent.CATEGORY_OPENABLE);
        contentSelectionIntent.setType('image/*');

        const tempArr: any[] = [];
        if (takePictureIntent !== null) {
          tempArr.push(takePictureIntent);
        }
        const intentArray = array(tempArr, 'android.content.Intent');

        const chooserIntent = new NativeIntent(NativeIntent.ACTION_CHOOSER);
        chooserIntent.putExtra(NativeIntent.EXTRA_INTENT, contentSelectionIntent);
        chooserIntent.putExtra(NativeIntent.EXTRA_TITLE, 'Image Chooser');
        chooserIntent.putExtra(NativeIntent.EXTRA_INITIAL_INTENTS, intentArray);
        this._page?.nativeObject.startActivityForResult(chooserIntent, WebViewAndroid.REQUEST_CODE_LOLIPOP);
        return true;
      },
      onConsoleMessage: (sourceId: number, message: string, lineNumber: number, messageLevel: string) => {
        const params = {
          sourceId,
          message,
          lineNumber,
          messageLevel
        };
        this.emit('consoleMessage', params);
        const result = this.android.onConsoleMessage?.(params);
        return !!result;
      }
    };
  }
}
