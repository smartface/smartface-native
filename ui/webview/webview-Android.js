/*globals array,requireClass,release */
const extend = require('js-base/core/extend');
const View = require('../view');
const AndroidConfig = require('../../util/Android/androidconfig');
const File = require('../../io/file');
const Path = require('../../io/path');
const NativeView = requireClass("android.view.View");
const NativeCookieManager = requireClass("android.webkit.CookieManager");
const NativeBuild = requireClass("android.os.Build");

// MotionEvent.ACTION_UP
const ACTION_UP = 1;
// MotionEvent.ACTION_DOWN
const ACTION_DOWN = 0;
// MotionEvent.ACTION_MOVE
const ACTION_MOVE = 2;


const NativeWebChromeClient = requireClass('android.webkit.WebChromeClient');
const NativeSimpleDateFormat = requireClass('java.text.SimpleDateFormat');
const NativeDate = requireClass('java.util.Date');
const NativeEnvironment = requireClass('android.os.Environment');
const NativeIntent = requireClass('android.content.Intent');
const NativeMediaStore = requireClass('android.provider.MediaStore');
const NativeUri = requireClass('android.net.Uri');
const NativeFile = requireClass('java.io.File');
const Application = require("sf-core/application");
var activity = AndroidConfig.activity;

var REQUEST_CODE_LOLIPOP = 1111;
var RESULT_CODE_ICE_CREAM = 2222;
var mFilePathCallback;
var mCameraPhotoPath;
var mUploadMessage;


const WebView = extend(View)(
    function(_super, params) {
        if (!this.nativeObject) {
            const NativeWebView = requireClass('android.webkit.WebView');
            this.nativeObject = new NativeWebView(AndroidConfig.activity);
        }

        _super(this);
        var overrideMethods = {
            onPageFinished: function(view, url) {
                _onShow && _onShow({ url: url });
            },
            onPageStarted: function(view, url, favicon) {
                _onLoad && _onLoad({ url: url });
            }
        };
        var _canOpenLinkInside = true;
        var _onError;
        var _onShow;
        var _onLoad;
        var _onChangedURL;
        var _scrollBarEnabled = true;
        var _scrollEnabled = true;
        var _onTouch, _onTouchEnded;
        var _page;
        Object.defineProperties(this, {
            'scrollBarEnabled': {
                get: function() {
                    return _scrollBarEnabled;
                },
                set: function(value) {
                    if (value) {
                        _scrollBarEnabled = true;
                        this.nativeObject.setHorizontalScrollBarEnabled(true);
                        this.nativeObject.setVerticalScrollBarEnabled(true);
                    }
                    else {
                        _scrollBarEnabled = false;
                        this.nativeObject.setHorizontalScrollBarEnabled(false);
                        this.nativeObject.setVerticalScrollBarEnabled(false);
                    }
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
                    }
                    else {
                        this.nativeObject.setOverScrollMode(2); // OVER_SCROLL_NEVER
                    }
                },
                enumerable: true
            },
            'page': {
                get: function() {
                    return _page;
                },
                set: function(page) {
                    _page = page;
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
                    return this.nativeObject.getSettings().getBuiltInZoomControls();
                },
                set: function(enabled) {
                    this.nativeObject.getSettings().setBuiltInZoomControls(enabled);
                },
                enumerable: true
            },
            'scrollEnabled': {
                get: function() {
                    return _scrollEnabled;
                },
                set: function(enabled) {
                    _scrollEnabled = enabled;
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
                    this.nativeObject.loadData(htmlText, "text/html", null);
                },
                enumerable: true
            },
            'loadFile': {
                value: function(file) {
                    if (file instanceof File) {
                        if (file.type == Path.FILE_TYPE.FILE || file.type === Path.FILE_TYPE.EMULATOR_ASSETS || file.type === Path.FILE_TYPE.RAU_ASSETS) {
                            //Generate FILE PATH
                            this.nativeObject.loadUrl("file:///" + file.fullPath);
                        }
                        else if (file.type == Path.FILE_TYPE.ASSET) {
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
                    }
                    else {
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
            // Overriden for touch events
            'onTouch': {
                get: function() {
                    return _onTouch;
                },
                set: function(onTouch) {
                    _onTouch = onTouch.bind(this);
                },
                enumerable: true
            },
            'onTouchEnded': {
                get: function() {
                    return _onTouchEnded;
                },
                set: function(onTouchEnded) {
                    _onTouchEnded = onTouchEnded.bind(this);
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
                    }
                    else {
                        cookieManager.removeAllCookie();
                    }

                },
                enumerable: true
            }
        });

        // android-only properties
        Object.defineProperty(this.android, 'clearHistory', {
            value: function() {
                this.nativeObject.clearHistory();
            }.bind(this),
            enumerable: true,
            configurable: true
        });

        // android-only properties
        Object.defineProperty(this.android, 'clearFormData', {
            value: function() {
                this.nativeObject.clearFormData();
            }.bind(this),
            enumerable: true,
            configurable: true
        });

        if (!this.isNotSetDefaults) {
            if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_NOUGAT) {
                overrideMethods.shouldOverrideUrlLoading = function(view, request) {
                    var uri = request.getUrl();
                    var url = uri.toString();
                    var callbackValue = true;
                    _onChangedURL && (callbackValue = _onChangedURL({ url: url }));
                    if (!callbackValue)
                        return true;
                    return overrideURLChange(url, _canOpenLinkInside);

                };
            }
            else {
                overrideMethods.shouldOverrideUrlLoading = function(view, url) {
                    var callbackValue = true;
                    _onChangedURL && (callbackValue = _onChangedURL({ url: url }));
                    if (!callbackValue)
                        return true;
                    return overrideURLChange(url, _canOpenLinkInside);
                };
            }

            // SDK version check will not work because implement engine does not supports types
            overrideMethods.onReceivedError = function() {
                if (arguments.count === 3) {
                    /* AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_MARSHMALLOW
                     * arguments[0] = webView
                     * arguments[1] = webResourceRequest
                     * arguments[2] = webResourceError
                     */
                    const NativeString = requireClass('java.lang.String');
                    var uri = arguments[1].getUrl();
                    var url = NativeString.valueOf(uri);
                    var code = arguments[2].getErrorCode();
                    var message = arguments[2].getDescription();

                    _onError && _onError({ message: message, code: code, url: url });
                }
                else {
                    /* AndroidConfig.sdkVersion < AndroidConfig.SDK.SDK_MARSHMALLOW
                     * arguments[0] = webView, 
                     * arguments[1] = errorCode, 
                     * arguments[2] = description, 
                     * arguments[3] = failingUrl, 
                     */
                    _onError && _onError({ message: arguments[2], code: arguments[1], url: arguments[3] });
                }
            };

            const NativeWebClient = requireClass('android.webkit.WebViewClient');
            var nativeWebClient = NativeWebClient.extend("SFWebClient", overrideMethods, null);
            this.nativeObject.setWebViewClient(nativeWebClient);
            this.nativeObject.setHorizontalScrollBarEnabled(_scrollBarEnabled);
            this.nativeObject.setVerticalScrollBarEnabled(_scrollBarEnabled);
            var settings = this.nativeObject.getSettings();
            /** @todo causes exception 
             * Error: Attempt to invoke virtual method 'boolean io.smartface.ExposingEngine.JsClass.isRejectedField(java.lang.String)' on a null object reference
             */
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setUseWideViewPort(true);
            settings.setLoadWithOverviewMode(true);
            settings.setLoadsImagesAutomatically(true);

            if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_LOLLIPOP) {
                settings.setMixedContentMode(0); // android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW = 0
            }

            this.nativeObject.setOnTouchListener(NativeView.OnTouchListener.implement({
                onTouch: function(view, event) {
                    if (this.touchEnabled && (_onTouch || _onTouchEnded)) {
                        if (event.getAction() === ACTION_UP) {
                            _onTouchEnded && _onTouchEnded();
                        }
                        else if (event.getAction() === ACTION_DOWN) {
                            _onTouch && _onTouch();
                        }
                    }
                    if (!this.touchEnabled)
                        return true;
                    return (event.getAction() === ACTION_MOVE) && (!this.scrollEnabled);
                }.bind(this)
            }));

            //-----------------

            var overrideMethodsWebChrome = {
                openFileChooser: function(uploadMsg, acceptType, capture) {
                    if (uploadMsg == !undefined && acceptType == !undefined && capture === undefined) {
                        mUploadMessage = uploadMsg;
                        var i = new NativeIntent(NativeIntent.ACTION_GET_CONTENT);
                        i.addCategory(NativeIntent.CATEGORY_OPENABLE);
                        i.setType("*/*");
                        _page.nativeObject.startActivityForResult(NativeIntent.createChooser(i, "File Browser"),
                            RESULT_CODE_ICE_CREAM);
                    }
                    else {
                        mUploadMessage = uploadMsg;
                        var i2 = new NativeIntent(NativeIntent.ACTION_GET_CONTENT);
                        i2.addCategory(NativeIntent.CATEGORY_OPENABLE);
                        i2.setType("image/*");
                        _page.nativeObject.startActivityForResult(NativeIntent.createChooser(i2, "File Browser"),
                            RESULT_CODE_ICE_CREAM);
                    }
                },
                //For Android5.0+
                onShowFileChooser: function(webView, filePathCallback, fileChooserParams) {
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
                        }
                        else {
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

                    _page.nativeObject.startActivityForResult(chooserIntent, REQUEST_CODE_LOLIPOP);
                    return true;

                }
            };

            var nativeWebChromeClient = NativeWebChromeClient.extend("SFWebChromeClient", overrideMethodsWebChrome, null);
            this.nativeObject.setWebChromeClient(nativeWebChromeClient);

        }
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }

    }
);

WebView.onActivityResult = function(requestCode, resultCode, data) {

    if (requestCode == RESULT_CODE_ICE_CREAM) {
        var uri = null;
        if (data != null) {
            uri = data.getData();
        }
        mUploadMessage.onReceiveValue(uri);
        mUploadMessage = null;
    }
    else if (requestCode == REQUEST_CODE_LOLIPOP) {
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
            }
            else {
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
    }
    else {
        const NativeIntent = requireClass('android.content.Intent');
        const NativeURI = requireClass('android.net.Uri');
        var action = NativeIntent.ACTION_VIEW;
        var uri = NativeURI.parse(url);
        var intent = new NativeIntent(action, uri);
        AndroidConfig.activity.startActivity(intent);
        return true;
    }
}
module.exports = WebView;
