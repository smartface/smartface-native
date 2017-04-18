const extend = require('js-base/core/extend');
const View = require('sf-core/ui/view');
const AndroidConfig = require('sf-core/util/Android/androidconfig');

const WebView = extend(View)(
    function (_super, params) {
        var activity = Android.getActivity();
        
        if (!this.nativeObject) {
            const NativeWebView = requireClass('android.webkit.WebView');
            this.nativeObject = new NativeWebView(activity);
        }
        
        _super(this);
        
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
        Object.defineProperties(this, {
            'openLinkInside': {
                get: function() {
                    return _canOpenLinkInside;
                },
                set: function(enabled) {
                    _canOpenLinkInside = enabled;
                }
            },
            'refresh': {
                value: function() {
                    this.nativeObject.reload();
                }
            },
            'goBack': {
                value: function() {
                    this.nativeObject.goBack();
                }
            },
            'goForward': {
                value: function() {
                    this.nativeObject.goForward();
                }
            },
            'zoomEnabled': {
                get: function() {
                    return this.nativeObject.getSettings().getBuiltInZoomControls();
                },
                set: function(enabled) {
                    this.nativeObject.getSettings().setBuiltInZoomControls(enabled);
                }
            },
            'loadURL': {
                value: function(url) {
                    this.nativeObject.loadUrl(url);
                }
            },
            'loadHTML': {
                value: function(htmlText) {
                    this.nativeObject.loadData(htmlText, "text/html", null);
                }
            },
            'evaluateJS': {
                value: function(javascript) {
                    if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_KITKAT) {
                        this.nativeObject.evaluateJavascript(javascript, null);
                    } else {
                        this.nativeObject.loadUrl("javascript:"+ javascript);
                    }
                }
            },
            'onChangedURL': {
                get: function() {
                    return _onChangedURL;
                },
                set: function(callback) {
                    _onChangedURL = callback;
                }
            },
            'onLoad': {
                get: function() {
                    return _onLoad;
                },
                set: function(callback) {
                    _onLoad = callback;
                }
            },
            'onError': {
                get: function() {
                    return _onError;
                },
                set: function(callback) {
                    _onError = callback;
                }
            },
            'onShow': {
                get: function() {
                    return _onShow;
                },
                set: function(callback) {
                    _onShow = callback;
                }
            },
            'toString': {
                value: function(){
                    return 'WebView';
                },
                enumerable: true, 
                configurable: true
            }
        });
        
        if(!this.isNotSetDefaults){
            if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_NOUGAT) {
                overrideMethods.shouldOverrideUrlLoading = function(view, request) {
                    var uri = request.getUrl();
                    var url = uri.toString();
                    _onChangedURL && _onChangedURL({url: url});
                    return overrideURLChange(url, _canOpenLinkInside);
                };
            } else {
                overrideMethods.shouldOverrideUrlLoading = function(view, url) {
                    _onChangedURL && _onChangedURL({url: url});
                    return overrideURLChange(url, _canOpenLinkInside);
                };
            }
    
            if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_MARSHMALLOW) {
                overrideMethods.onReceivedError = function(webView, webResourceRequest, webResourceError) {
                    const NativeString = requireClass('java.lang.String');
                    var uri = webResourceRequest.getUrl();
                    var url = NativeString.valueOf(uri);
                    var code = webResourceError.getErrorCode();
                    var message = webResourceError.getDescription();
    
                    _onError && _onError({message: message, code: code, url: url});
                };
            } else {
                overrideMethods.onReceivedError = function(view, errorCode, description, failingUrl) {
                    _onError && _onError({message: description, code: errorCode, url: failingUrl});
                };
            }
    
            const NativeWebClient = requireClass('android.webkit.WebViewClient');
            var nativeWebClient = NativeWebClient.extend("SFWebClient", overrideMethods, null);
            this.nativeObject.setWebViewClient(nativeWebClient);
            this.nativeObject.getSettings().setJavaScriptEnabled(true);
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
        Android.getActivity().startActivity(intent);
        return true;
    }
}

module.exports = WebView;