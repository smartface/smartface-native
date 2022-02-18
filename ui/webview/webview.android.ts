/*globals array,requireClass */
import { ViewAndroid } from '../view/view.android';
import AndroidConfig from '../../util/Android/androidconfig';
import File from '../../io/file';
import Path from '../../io/path';
import { WebView as WebViewRequestCodes } from '../../util/Android/requestcodes';
import TypeUtil from '../../util/type';
import { WebViewEvents } from './webview-events';
import WebView, { AndroidProps } from './webview';
import IWebView from './webview';
import { Scrollable } from '../../util';
import { IScrollable } from '../../core/scrollable';
import { Point2D } from '../../primitive/point2d';
import ListViewItem from '../listviewitem';

const NativeView = requireClass('android.view.View');
const NativeCookieManager = requireClass('android.webkit.CookieManager');
const NativeBuild = requireClass('android.os.Build');

const NativeSimpleDateFormat = requireClass('java.text.SimpleDateFormat');
const NativeDate = requireClass('java.util.Date');
const NativeIntent = requireClass('android.content.Intent');
const NativeMediaStore = requireClass('android.provider.MediaStore');
const NativeUri = requireClass('android.net.Uri');
const NativeFile = requireClass('java.io.File');
const NativeWebView = requireClass('android.webkit.WebView');
const SFWebView = requireClass('io.smartface.android.sfcore.ui.webview.SFWebView');

const activity = AndroidConfig.activity;

let mFilePathCallback: any;
let mCameraPhotoPath: any;
let mUploadMessage: any;

function createImageFile() {
  const timeStamp = new NativeSimpleDateFormat('yyyyMMdd_HHmmss').format(new NativeDate());
  const imageFileName = 'JPEG_' + timeStamp + '_';
  const storageDir = activity.getExternalCacheDir();
  const imageFile = NativeFile.createTempFile(imageFileName /* prefix */, '.jpg' /* suffix */, storageDir /* directory */);
  return imageFile;
}

function overrideURLChange(url: string, _canOpenLinkInside: boolean) {
  if (_canOpenLinkInside) {
    return false;
  } else {
    const NativeIntent = requireClass('android.content.Intent');
    const NativeURI = requireClass('android.net.Uri');
    const action = NativeIntent.ACTION_VIEW;
    const uri = NativeURI.parse(url);
    const intent = new NativeIntent(action, uri);
    activity.startActivity(intent);
    return true;
  }
}
class WebViewAndroid<TEvent extends string = WebViewEvents> extends ViewAndroid<TEvent | WebViewEvents, AndroidProps> implements IWebView, IScrollable {
  
  private _canOpenLinkInside = true;
  private _onError;
  private _onShow;
  private _onLoad;
  private _onChangedURL;
  private _onConsoleMessage;
  private _scrollBarEnabled = true;
  private _scrollEnabled = true;
  private _superTouchCallbacks;
  private _onBackButtonPressedCallback;
  private _page: any;
  private scrollable: Scrollable;
  private static REQUEST_CODE_LOLIPOP = WebViewRequestCodes.REQUEST_CODE_LOLIPOP;
  private static RESULT_CODE_ICE_CREAM = WebViewRequestCodes.RESULT_CODE_ICE_CREAM;
  private static onActivityResult = function (requestCode, resultCode, data) {
    if (requestCode === WebViewAndroid.RESULT_CODE_ICE_CREAM) {
      let uri = null;
      if (data !== null) {
        uri = data.getData();
      }
      mUploadMessage.onReceiveValue(uri);
      mUploadMessage = null;
    } else if (requestCode === WebViewAndroid.REQUEST_CODE_LOLIPOP) {
      let results = null;
      // Check that the response is a good one
      if (resultCode === -1) {
        // Activity.RESULT_OK
        if (data === null) {
          // If there is not data, then we may have taken a photo
          if (mCameraPhotoPath !== null) {
            const parsedUri = [];
            parsedUri.push(NativeUri.parse(mCameraPhotoPath));
            results = array(parsedUri, 'android.net.Uri');
          }
        } else {
          const dataString = data.getDataString();
          const parsedUri2 = [];
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
    super();
    const self = this;

    const EventFunctions = {
      [WebViewEvents.BackButtonPressed]: function () {
        if (this._onBackButtonPressedCallback === undefined) {
          self.nativeObject.setOnKeyListener(
            NativeView.OnKeyListener.implement({
              onKey: function (view, keyCode, keyEvent) {
                // KeyEvent.KEYCODE_BACK , KeyEvent.ACTION_DOWN
                if (keyCode === 4 && keyEvent.getAction() === 0) {
                  typeof this._onBackButtonPressedCallback === 'function' && this._onBackButtonPressedCallback();
                  return true;
                } else {
                  return false;
                }
              }
            })
          );
        }
        this._onBackButtonPressedCallback = (state) => {
          this.emitter.emit(WebViewEvents.BackButtonPressed, state);
        };
      },
      [WebViewEvents.ChangedURL]: function () {
        this._onChangedURL = (state) => {
          this.emitter.emit(WebViewEvents.ChangedURL, state);
        };
      },
      [WebViewEvents.ConsoleMessage]: function () {
        this._onConsoleMessage = (state) => {
          this.emitter.emit(WebViewEvents.ConsoleMessage, state);
        };
      },
      [WebViewEvents.Error]: function () {
        this._onError = (state) => {
          this.emitter.emit(WebViewEvents.Error, state);
        };
      },
      [WebViewEvents.Load]: function () {
        this._onLoad = (state) => {
          this.emitter.emit(WebViewEvents.Load, state);
        };
      },
      [WebViewEvents.Show]: function () {
        this._onShow = (state) => {
          this.emitter.emit(WebViewEvents.Show, state);
        };
      }
    };

    const android = {
      get page() {
        return self._page;
      },
      set page(value) {
        self._page = value;
      },
      get onConsoleMessage() {
        return self._onConsoleMessage;
      },
      set onConsoleMessage(callback) {
        self._onConsoleMessage = callback;
      },
      get onBackButtonPressed() {
        return self._onBackButtonPressedCallback;
      },
      set onBackButtonPressed(onBackButtonPressedCallback) {
        if (self._onBackButtonPressedCallback === undefined) {
          self._onBackButtonPressedCallback = onBackButtonPressedCallback;
          self.nativeObject.setOnKeyListener(
            NativeView.OnKeyListener.implement({
              onKey: function (view, keyCode, keyEvent) {
                // KeyEvent.KEYCODE_BACK , KeyEvent.ACTION_DOWN
                if (keyCode === 4 && keyEvent.getAction() === 0) {
                  typeof self._onBackButtonPressedCallback === 'function' && self._onBackButtonPressedCallback();
                  return true;
                } else {
                  return false;
                }
              }
            })
          );
        } else {
          self._onBackButtonPressedCallback = onBackButtonPressedCallback;
        }
      },
      get displayZoomControls() {
        return self.nativeObject.getDisplayZoomControls();
      },
      set displayZoomControls(displayZoomControls) {
        self.nativeObject.setDisplayZoomControls(displayZoomControls);
      },
      clearHistory() {
        self.nativeObject.clearHistory();
      },
      clearFormData() {
        self.nativeObject.clearFormData();
      },
      setWebContentsDebuggingEnabled(enabled) {
        NativeWebView.setWebContentsDebuggingEnabled(enabled);
      }
    };

    const webViewClientCallbacks = {
      onPageFinished: function (url: string) {
        self._onShow &&
          self._onShow({
            url: url
          });
      },
      onPageStarted: function (url: string) {
        self._onLoad &&
          self._onLoad({
            url: url
          });
      },
      shouldOverrideUrlLoading: function (url: string) {
        let callbackValue = true;
        self._onChangedURL &&
          (callbackValue = self._onChangedURL({
            url: url
          }));
        if (!callbackValue) return true;
        return overrideURLChange(url, self._canOpenLinkInside);
      },
      onReceivedError: function (code: number, message: string, url: string) {
        self._onError &&
          self._onError({
            code,
            message,
            url
          });
      }
    };

    const webChromeClientCallbacks = {
      //For Android5.0+
      onShowFileChooser: function (filePathCallback) {
        if (mFilePathCallback !== null) {
          mFilePathCallback.onReceiveValue(null);
        }
        mFilePathCallback = filePathCallback;

        let takePictureIntent = new NativeIntent(NativeMediaStore.ACTION_IMAGE_CAPTURE);
        if (takePictureIntent.resolveActivity(activity.getPackageManager()) !== null) {
          // Create the File where the photo should go
          let photoFile = null;
          photoFile = createImageFile();
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

        let intentArray;
        const tempArr = [];
        if (takePictureIntent !== null) {
          tempArr.push(takePictureIntent);
        }
        intentArray = array(tempArr, 'android.content.Intent');

        const chooserIntent = new NativeIntent(NativeIntent.ACTION_CHOOSER);
        chooserIntent.putExtra(NativeIntent.EXTRA_INTENT, contentSelectionIntent);
        chooserIntent.putExtra(NativeIntent.EXTRA_TITLE, 'Image Chooser');
        chooserIntent.putExtra(NativeIntent.EXTRA_INITIAL_INTENTS, intentArray);

        self._page.nativeObject.startActivityForResult(chooserIntent, WebViewAndroid.REQUEST_CODE_LOLIPOP);
        return true;
      },
      onConsoleMessage: function (sourceId: number, message: string, lineNumber: number, messageLevel: string) {
        const result = self._android.onConsoleMessage
          ? self._android.onConsoleMessage({
            sourceId,
            message,
            lineNumber,
            messageLevel
          })
          : false;
        return TypeUtil.isBoolean(result) ? result : false;
      }
    };

    if (!this.nativeObject) {
      this._nativeObject = new SFWebView(activity, webViewClientCallbacks, webChromeClientCallbacks);
    }

    this.scrollable = new Scrollable(this.nativeObject);

    /* Webview contains background color which draws all over given background drawbles.
    It means that setBackgroundColor is not same as setBackground. So, to eleminate this behavior, set transparent
    */
    this.nativeObject.setBackgroundColor(0);
    this.nativeObject.setScrollBarEnabled(this._scrollBarEnabled);

    this._android = Object.assign(this._android, android);

    // Assign parameters given in constructor
    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
  }
  get contentOffset(): Point2D {
    return this.scrollable.contentOffset;
  }
  indexByListViewItem(listViewItem: ListViewItem): number {
    return this.scrollable.indexByListViewItem(listViewItem);
  }
  deleteRowRange(params: Record<string, any>): void {
    this.scrollable.deleteRowRange(params);
  }
  insertRowRange(params: Record<string, any>): void {
    this.scrollable.insertRowRange(params);
  }
  refreshRowRange(params: Record<string, any>): void {
    this.scrollable.refreshRowRange(params);
  }
  onOpenNewWindow?: (e: { url: string; }) => void;
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
    return this.nativeObject.getOverScrollMode() !== 2; // OVER_SCROLL_NEVER
  }
  set bounceEnabled(value) {
    if (value) {
      this.nativeObject.setOverScrollMode(0); // OVER_SCROLL_ALWAYS
    } else {
      this.nativeObject.setOverScrollMode(2); // OVER_SCROLL_NEVER
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
      const ValueCallback = requireClass('android.webkit.ValueCallback');
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
    this.android.clearHistory();
    this.android.clearFormData();
  }
  clearCookie() {
    const cookieManager = NativeCookieManager.getInstance();
    if (NativeBuild.VERSION.SDK_INT >= 23) {
      cookieManager.removeAllCookies(null);
    } else {
      cookieManager.removeAllCookie();
    }
  }
}

export default WebViewAndroid;
