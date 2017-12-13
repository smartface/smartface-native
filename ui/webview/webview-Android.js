/*globals array,requireClass,release */
const extend        = require('js-base/core/extend');
const View          = require('../view');
const AndroidConfig = require('../../util/Android/androidconfig');
const File          = require('../../io/file');
const Path          = require('../../io/path');
const NativeView    = requireClass("android.view.View");
const NativeCookieManager   = requireClass("android.webkit.CookieManager");
const NativeBuild            = requireClass("android.os.Build");

// MotionEvent.ACTION_UP
const ACTION_UP = 1;
// MotionEvent.ACTION_DOWN
const ACTION_DOWN = 0;
// MotionEvent.ACTION_MOVE
const ACTION_MOVE = 2;

const WebView = extend(View)(
    function (_super, params) {
        if (!this.nativeObject) {
            const NativeWebView = requireClass('android.webkit.WebView');
            this.nativeObject = new NativeWebView(AndroidConfig.activity);
        }
        
        _super(this);
        
        this.android = {};
        this.ios = {};
        
        var overrideMethods = {
            onPageFinished: function(view, url) {
                _onShow && _onShow({url: url});
            },
            onPageStarted: function(view, url, favicon) {
                _onLoad && _onLoad({url: url});
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
                    } else {
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
                    if(file instanceof File){
                        if(file.type == Path.FILE_TYPE.FILE || file.type === Path.FILE_TYPE.EMULATOR_ASSETS || file.type === Path.FILE_TYPE.RAU_ASSETS){
                            //Generate FILE PATH
                            this.nativeObject.loadUrl("file:///" + file.fullPath);
                        }
                        else if(file.type == Path.FILE_TYPE.ASSET){
                            this.nativeObject.loadUrl("file:///android_asset/" + (file.path.replace("assets://","")));
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
                                if(callback)
                                    callback(value);
                            }
                        });
                        this.nativeObject.evaluateJavascript(javascript, valueCallback);
                    } else {
                        this.nativeObject.loadUrl("javascript:"+ javascript);
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
                value: function(){
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
            'clearFormData': {
                value: function() {
                    this.nativeObject.clearFormData();
                },
                enumerable: true
            },
            'clearHistory': {
                value: function() {
                    this.nativeObject.clearHistory();
                },
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
        
        if(!this.isNotSetDefaults){
            if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_NOUGAT) {
                overrideMethods.shouldOverrideUrlLoading = function(view, request) {
                    var uri = request.getUrl();
                    var url = uri.toString();
                    var callbackValue = true;
                    _onChangedURL && (callbackValue = _onChangedURL({url: url}));
                    if(!callbackValue)
                        return true;
                    return overrideURLChange(url, _canOpenLinkInside);
                    
                };
            } else {
                overrideMethods.shouldOverrideUrlLoading = function(view, url) {
                    var callbackValue = true;
                    _onChangedURL && (callbackValue = _onChangedURL({url: url}));
                    if(!callbackValue)
                        return true;
                    return overrideURLChange(url, _canOpenLinkInside);
                };
            }
            
            // SDK version check will not work because implement engine does not supports types
            overrideMethods.onReceivedError = function() {
                if(arguments.count === 3){
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
    
                    _onError && _onError({message: message, code: code, url: url});
                }
                else{
                    /* AndroidConfig.sdkVersion < AndroidConfig.SDK.SDK_MARSHMALLOW
                     * arguments[0] = webView, 
                     * arguments[1] = errorCode, 
                     * arguments[2] = description, 
                     * arguments[3] = failingUrl, 
                     */
                    _onError && _onError({message: arguments[2], code: arguments[1], url: arguments[3]});
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

            if(AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_LOLLIPOP) {
                settings.setMixedContentMode(0); // android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW = 0
            }
            
            this.nativeObject.setOnTouchListener(NativeView.OnTouchListener.implement({
                onTouch: function(view, event) {
                    if(this.touchEnabled && (_onTouch || _onTouchEnded)){
                        if (event.getAction() === ACTION_UP) {
                            _onTouchEnded && _onTouchEnded();
                        } else if(event.getAction() === ACTION_DOWN) {
                            _onTouch && _onTouch();
                        }
                    }
                    if(!this.touchEnabled)
                        return true;
                    return  (event.getAction() === ACTION_MOVE) && (!this.scrollEnabled);
                }.bind(this)
            }));
        }
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

function overrideURLChange(url, _canOpenLinkInside) {
    if (_canOpenLinkInside) {
        return false;
    } else {
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