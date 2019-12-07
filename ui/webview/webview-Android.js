/*globals array,requireClass */
const extend = require('js-base/core/extend');
const View = require('../view');
const AndroidConfig = require('../../util/Android/androidconfig');
const File = require('../../io/file');
const Path = require('../../io/path');
const scrollableSuper = require("../../util/Android/scrollable");
const RequestCodes = require("sf-core/util/Android/requestcodes");
const TypeUtil = require("../../util/type");

const NativeView = requireClass("android.view.View");
const NativeCookieManager = requireClass("android.webkit.CookieManager");
const NativeBuild = requireClass("android.os.Build");

// MotionEvent.ACTION_UP
const ACTION_UP = 1;
// MotionEvent.ACTION_DOWN
const ACTION_DOWN = 0;
// MotionEvent.ACTION_MOVE
const ACTION_MOVE = 2;

const NativeSimpleDateFormat = requireClass('java.text.SimpleDateFormat');
const NativeDate = requireClass('java.util.Date');
const NativeEnvironment = requireClass('android.os.Environment');
const NativeIntent = requireClass('android.content.Intent');
const NativeMediaStore = requireClass('android.provider.MediaStore');
const NativeUri = requireClass('android.net.Uri');
const NativeFile = requireClass('java.io.File');
const NativeWebView = requireClass('android.webkit.WebView');
const SFWebView = requireClass('io.smartface.android.sfcore.ui.webview.SFWebView');

var activity = AndroidConfig.activity;

var mFilePathCallback;
var mCameraPhotoPath;
var mUploadMessage;

const WebView = extend(View)(
    function(_super, params) {
        const self = this;

        var webViewClientCallbacks = {
            onPageFinished: function(url) {
                _onShow && _onShow({
                    url: url
                });
            },
            onPageStarted: function(url) {
                _onLoad && _onLoad({
                    url: url
                });
            },
            shouldOverrideUrlLoading: function(url) {
                var callbackValue = true;
                _onChangedURL && (callbackValue = _onChangedURL({
                    url: url
                }));
                if (!callbackValue)
                    return true;
                return overrideURLChange(url, _canOpenLinkInside);
            },
            onReceivedError: function(code, message, url) {
                _onError && _onError({
                    code,
                    message,
                    url
                });
            }
        };

        var webChromeClientCallbacks = {
            //For Android5.0+
            onShowFileChooser: function(filePathCallback) {
                if (mFilePathCallback != null) {
                    mFilePathCallback.onReceiveValue(null);
                }
                mFilePathCallback = filePathCallback;

                var takePictureIntent = new NativeIntent(NativeMediaStore.ACTION_IMAGE_CAPTURE);
                if (takePictureIntent.resolveActivity(activity.getPackageManager()) != null) {
                    // Create the File where the photo should go
                    var photoFile = null;
                    photoFile = createImageFile();
                    takePictureIntent.putExtra("PhotoPath", mCameraPhotoPath);

                    // Continue only if the File was successfully created
                    if (photoFile != null) {
                        mCameraPhotoPath = "file:" + photoFile.getAbsolutePath();
                        takePictureIntent.putExtra(NativeMediaStore.EXTRA_OUTPUT,
                            NativeUri.fromFile(photoFile));
                    } else {
                        takePictureIntent = null;
                    }
                }

                var contentSelectionIntent = new NativeIntent(NativeIntent.ACTION_GET_CONTENT);
                contentSelectionIntent.addCategory(NativeIntent.CATEGORY_OPENABLE);
                contentSelectionIntent.setType("image/*");

                var intentArray;
                var tempArr = [];
                if (takePictureIntent != null) {
                    tempArr.push(takePictureIntent);
                }
                intentArray = array(tempArr, "android.content.Intent");

                var chooserIntent = new NativeIntent(NativeIntent.ACTION_CHOOSER);
                chooserIntent.putExtra(NativeIntent.EXTRA_INTENT, contentSelectionIntent);
                chooserIntent.putExtra(NativeIntent.EXTRA_TITLE, "Image Chooser");
                chooserIntent.putExtra(NativeIntent.EXTRA_INITIAL_INTENTS, intentArray);

                _page.nativeObject.startActivityForResult(chooserIntent, WebView.REQUEST_CODE_LOLIPOP);
                return true;

            },
            onConsoleMessage: function(sourceId, message, lineNumber, messageLevel) {
                let result = self.android.onConsoleMessage ? self.android.onConsoleMessage({
                    sourceId,
                    message,
                    lineNumber,
                    messageLevel
                }) : false;
                return TypeUtil.isBoolean(result) ? result : false;
            }
        };


        if (!this.nativeObject) {
            this.nativeObject = new SFWebView(activity, webViewClientCallbacks, webChromeClientCallbacks);
        }

        _super(this);
        scrollableSuper(this, this.nativeObject);

        var _canOpenLinkInside = true,
            _onError, _onShow, _onLoad, _onChangedURL, _scrollBarEnabled = true,
            _scrollEnabled = true,
            touchEnabled = true,
            _superTouchCallbacks = this._touchCallbacks;
        Object.defineProperties(this, {
            'scrollBarEnabled': {
                get: function() {
                    return _scrollBarEnabled;
                },
                set: function(value) {
                    if (value) {
                        _scrollBarEnabled = true;
                        this.nativeObject.setScrollBarEnabled(true);
                    } else {
                        _scrollBarEnabled = false;
                        this.nativeObject.setScrollBarEnabled(false);
                    }
                },
                enumerable: true
            },
            'userAgent': {
                get: function() {
                    return this.nativeObject.getUserAgent();
                },
                set: function(value) {
                    this.nativeObject.setUserAgent(value);
                },
                enumerable: true
            },
            'bounceEnabled': {
                get: function() {
                    return (this.nativeObject.getOverScrollMode() !== 2); // OVER_SCROLL_NEVER
                },
                set: function(value) {
                    if (value) {
                        this.nativeObject.setOverScrollMode(0); // OVER_SCROLL_ALWAYS 
                    } else {
                        this.nativeObject.setOverScrollMode(2); // OVER_SCROLL_NEVER
                    }
                },
                enumerable: true
            },
            'openLinkInside': {
                get: function() {
                    return _canOpenLinkInside;
                },
                set: function(enabled) {
                    _canOpenLinkInside = enabled;
                },
                enumerable: true
            },
            'refresh': {
                value: function() {
                    this.nativeObject.reload();
                },
                enumerable: true
            },
            'goBack': {
                value: function() {
                    this.nativeObject.goBack();
                },
                enumerable: true
            },
            'goForward': {
                value: function() {
                    this.nativeObject.goForward();
                },
                enumerable: true
            },
            'zoomEnabled': {
                get: function() {
                    return this.nativeObject.getZoomEnabled();
                },
                set: function(enabled) {
                    this.nativeObject.setZoomEnabled(enabled);
                },
                enumerable: true
            },
            'scrollEnabled': {
                get: function() {
                    return _scrollEnabled;
                },
                set: function(enabled) {
                    _scrollEnabled = enabled;
                    self.setTouchHandlers();
                },
                enumerable: true
            },
            'loadURL': {
                value: function(url) {
                    this.nativeObject.loadUrl(url);
                },
                enumerable: true
            },
            'loadHTML': {
                value: function(htmlText) {
                    this.nativeObject.loadDataWithBaseURL(null, htmlText, "text/html", null, null);
                },
                enumerable: true
            },
            'loadFile': {
                value: function(file) {
                    if (file instanceof File) {
                        if (file.type == Path.FILE_TYPE.FILE || file.type === Path.FILE_TYPE.EMULATOR_ASSETS || file.type === Path.FILE_TYPE.RAU_ASSETS) {
                            //Generate FILE PATH
                            this.nativeObject.loadUrl("file:///" + file.fullPath);
                        } else if (file.type == Path.FILE_TYPE.ASSET) {
                            this.nativeObject.loadUrl("file:///android_asset/" + (file.path.replace("assets://", "")));
                        }
                    }
                },
                enumerable: true
            },
            'evaluateJS': {
                value: function(javascript, callback) {
                    if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_KITKAT) {
                        const ValueCallback = requireClass("android.webkit.ValueCallback");
                        var valueCallback = ValueCallback.implement({
                            onReceiveValue: function(value) {
                                if (callback)
                                    callback(value);
                            }
                        });
                        this.nativeObject.evaluateJavascript(javascript, valueCallback);
                    } else {
                        this.nativeObject.loadUrl("javascript:" + javascript);
                    }
                },
                enumerable: true
            },
            'onChangedURL': {
                get: function() {
                    return _onChangedURL;
                },
                set: function(callback) {
                    _onChangedURL = callback;
                },
                enumerable: true
            },
            'onLoad': {
                get: function() {
                    return _onLoad;
                },
                set: function(callback) {
                    _onLoad = callback;
                },
                enumerable: true
            },
            'onError': {
                get: function() {
                    return _onError;
                },
                set: function(callback) {
                    _onError = callback;
                },
                enumerable: true
            },
            'onShow': {
                get: function() {
                    return _onShow;
                },
                set: function(callback) {
                    _onShow = callback;
                },
                enumerable: true
            },
            'toString': {
                value: function() {
                    return 'WebView';
                },
                enumerable: true,
                configurable: true
            },
            'clearCache': {
                value: function(deleteDiskFiles) {
                    this.nativeObject.clearCache(deleteDiskFiles);
                },
                enumerable: true
            },
            'clearAllData': {
                value: function() {
                    this.clearCache(true);
                    this.clearCookie();
                    this.android.clearHistory();
                    this.android.clearFormData();
                }.bind(this),
                enumerable: true
            },
            'clearCookie': {
                value: function() {

                    var cookieManager = NativeCookieManager.getInstance();

                    if (NativeBuild.VERSION.SDK_INT >= 23) {
                        cookieManager.removeAllCookies(null);
                    } else {
                        cookieManager.removeAllCookie();
                    }

                },
                enumerable: true
            },
            "touchEnabled": {
                get: () => touchEnabled,
                set: (value) => {
                    touchEnabled = value;
                    self.setTouchHandlers();
                },
                enumerable: true
            },
            '_touchCallbacks': {
                value: {
                    'onTouchEnded': function(isInside, xInDp, yInDp) {
                        if (!self.touchEnabled)
                            return true;
                        let result = _superTouchCallbacks.onTouchEnded(isInside, xInDp, yInDp);
                        return result;
                    },
                    /*Overrides the View onTouch to keep backward compatibility. Returning true makes untouchable*/
                    'onTouch': function(x, y) {
                        if (!self.touchEnabled)
                            return true;
                        let result, mEvent = {
                            x,
                            y
                        };
                        self.onTouch && (result = self.onTouch(mEvent));
                        return (result === true);
                    },
                    'onTouchMoved': function(isInside, xInDp, yInDp) {
                        if (!self.touchEnabled || !self.scrollEnabled)
                            return true;
                        let result = _superTouchCallbacks.onTouchMoved(isInside, xInDp, yInDp);
                        return result;
                    },
                    'onTouchCancelled': function(xInDp, yInDp) {
                        if (!self.touchEnabled)
                            return true;
                        let result = _superTouchCallbacks.onTouchCancelled(xInDp, yInDp);
                        return result;
                    }
                },
                enumerable: true,
                configurable: true,
                writable: true
            }
        });

        var _page;
        // android-only properties
        Object.defineProperty(this.android, 'page', {
            get: function() {
                return _page;
            },
            set: function(page) {
                _page = page;
            },
            enumerable: true,
            configurable: true
        });


        let _onBackButtonPressedCallback = undefined;
        Object.defineProperty(this.android, 'onBackButtonPressed', {
            get: function() {
                return _onBackButtonPressedCallback;
            },
            set: function(onBackButtonPressedCallback) {
                if (_onBackButtonPressedCallback === undefined) {
                    _onBackButtonPressedCallback = onBackButtonPressedCallback;

                    self.nativeObject.setOnKeyListener(NativeView.OnKeyListener.implement({
                        onKey: function(view, keyCode, keyEvent) {
                            // KeyEvent.KEYCODE_BACK , KeyEvent.ACTION_DOWN
                            if (keyCode === 4 && (keyEvent.getAction() === 0)) {
                                typeof _onBackButtonPressedCallback === "function" &&
                                    _onBackButtonPressedCallback();
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }));
                } else {
                    _onBackButtonPressedCallback = onBackButtonPressedCallback;
                }
            },
            enumerable: true,
            configurable: true
        });

        // android-only properties
        let _onConsoleMessage;
        Object.defineProperties(this.android, {
            'clearHistory': {
                value: function() {
                    this.nativeObject.clearHistory();
                }.bind(this),
                enumerable: true,
                configurable: true
            },
            'clearFormData': {
                value: function() {
                    this.nativeObject.clearFormData();
                }.bind(this),
                enumerable: true,
                configurable: true
            },
            'onConsoleMessage': {
                get: () => _onConsoleMessage,
                set: (callback) => _onConsoleMessage = callback,
                enumerable: true
            }
        });

        this.nativeObject.setScrollBarEnabled(_scrollBarEnabled);

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }

    }
);

WebView.REQUEST_CODE_LOLIPOP = RequestCodes.WebView.REQUEST_CODE_LOLIPOP;
WebView.RESULT_CODE_ICE_CREAM = RequestCodes.WebView.RESULT_CODE_ICE_CREAM;

WebView.onActivityResult = function(requestCode, resultCode, data) {
    if (requestCode == WebView.RESULT_CODE_ICE_CREAM) {
        var uri = null;
        if (data != null) {
            uri = data.getData();
        }
        mUploadMessage.onReceiveValue(uri);
        mUploadMessage = null;
    } else if (requestCode == WebView.REQUEST_CODE_LOLIPOP) {
        var results = null;
        // Check that the response is a good one
        if (resultCode == -1) { // Activity.RESULT_OK
            if (data == null) {
                // If there is not data, then we may have taken a photo
                if (mCameraPhotoPath != null) {
                    var parsedUri = [];
                    parsedUri.push(NativeUri.parse(mCameraPhotoPath));
                    results = array(parsedUri, "android.net.Uri");
                }
            } else {
                var dataString = data.getDataString();
                var parsedUri2 = [];
                parsedUri2.push(NativeUri.parse(dataString));
                if (dataString != null) {
                    results = array(parsedUri2, "android.net.Uri");
                }
            }
        }
        mFilePathCallback.onReceiveValue(results);
        mFilePathCallback = null;
    }

};

function createImageFile() {
    var timeStamp = new NativeSimpleDateFormat("yyyyMMdd_HHmmss").format(new NativeDate());
    var imageFileName = "JPEG_" + timeStamp + "_";
    var storageDir = NativeEnvironment.getExternalStoragePublicDirectory(NativeEnvironment.DIRECTORY_PICTURES);
    var imageFile = NativeFile.createTempFile(
        imageFileName, /* prefix */
        ".jpg", /* suffix */
        storageDir /* directory */
    );
    return imageFile;

}

function overrideURLChange(url, _canOpenLinkInside) {
    if (_canOpenLinkInside) {
        return false;
    } else {
        const NativeIntent = requireClass('android.content.Intent');
        const NativeURI = requireClass('android.net.Uri');
        var action = NativeIntent.ACTION_VIEW;
        var uri = NativeURI.parse(url);
        var intent = new NativeIntent(action, uri);
        activity.startActivity(intent);
        return true;
    }
}

WebView.Android = {};
WebView.Android.ConsoleMessageLevel = Object.freeze({
    DEBUG: "DEBUG",
    ERROR: "ERROR",
    LOG: "LOG",
    TIP: "TIP",
    WARNING: "WARNING"
});

WebView.android = {};
Object.defineProperty(WebView.android, 'setWebContentsDebuggingEnabled', {
    value: function(enabled) {
        NativeWebView.setWebContentsDebuggingEnabled(enabled);
    },
    enumerable: true,
});

module.exports = WebView;