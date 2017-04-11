const extend = require('js-base/core/extend');
const View = require('sf-core/ui/view');

const WebView = extend(View)(
    function (_super, params) {
        const NativeBuildVersion = requireClass('android.os.Build').VERSION;
        var activity = Android.getActivity();
        
        var self = this;
        if (!self.nativeObject) {
            const NativeWebView = requireClass('android.webkit.WebView');
            self.nativeObject = new NativeWebView(activity);

            var overrideMethods = {
                onPageFinished: function(view, url) {
                    _callbackOnShow && _callbackOnShow({url: url});
                },
                onPageStarted: function(view, url, favicon) {
                    _callbackOnLoad && _callbackOnLoad({url: url});
                }
            };

            if (NativeBuildVersion.SDK_INT >= 24) {
                overrideMethods.shouldOverrideUrlLoading = function(view, request) {
                    var uri = request.getUrl();
                    var url = uri.toString();
                    _callbackOnChangedURL && _callbackOnChangedURL({url: url});
                    return overrideURLChange(url);
                };
            } else {
                overrideMethods.shouldOverrideUrlLoading = function(view, url) {
                    _callbackOnChangedURL && _callbackOnChangedURL({url: url});
                    return overrideURLChange(url);
                };
            }

            if (NativeBuildVersion.SDK_INT >= 23) {
                overrideMethods.onReceivedError = function(webView, webResourceRequest, webResourceError) {
                    const NativeString = requireClass('java.lang.String');
                    var uri = webResourceRequest.getUrl();
                    var url = NativeString.valueOf(uri);
                    var code = webResourceError.getErrorCode();
                    var message = webResourceError.getDescription();

                    _callbackOnError && _callbackOnError({message: message, code: code, url: url});
                };
            } else {
                overrideMethods.onReceivedError = function(view, errorCode, description, failingUrl) {
                    _callbackOnError && _callbackOnError({message: description, code: errorCode, url: failingUrl});
                };
            }

            const NativeWebClient = requireClass('android.webkit.WebViewClient');
            var nativeWebClient = NativeWebClient.extend("SFWebClient", overrideMethods, null);
            self.nativeObject.setWebViewClient(nativeWebClient);
            self.nativeObject.getSettings().setJavaScriptEnabled(true);
        }
        _super(self);

        var _canOpenLinkInside = true;
        var _callbackOnError;
        var _callbackOnShow;
        var _callbackOnLoad;
        var _callbackOnChangedURL;
        Object.defineProperties(self, {
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
                    self.nativeObject.reload();
                }
            },
            'goBack': {
                value: function() {
                    self.nativeObject.goBack();
                }
            },
            'goForward': {
                value: function() {
                    self.nativeObject.goForward();
                }
            },
            'zoomEnabled': {
                get: function() {
                    return self.nativeObject.getSettings().getBuiltInZoomControls();
                },
                set: function(enabled) {
                    self.nativeObject.getSettings().setBuiltInZoomControls(enabled);
                }
            },
            'loadURL': {
                value: function(url) {
                    self.nativeObject.loadUrl(url);
                }
            },
            'loadHTML': {
                value: function(htmlText) {
                    self.nativeObject.loadData(htmlText, "text/html", null);
                }
            },
            'evaluateJS': {
                value: function(javascript) {
                    if (NativeBuildVersion.SDK_INT >= 19) {
                        self.nativeObject.evaluateJavascript(javascript, null);
                    } else {
                        self.nativeObject.loadUrl("javascript:"+ javascript);
                    }
                }
            },
            'onChangedURL': {
                get: function() {
                    return _callbackOnChangedURL;
                },
                set: function(callback) {
                    _callbackOnChangedURL = callback;
                }
            },
            'onLoad': {
                get: function() {
                    return _callbackOnLoad;
                },
                set: function(callback) {
                    _callbackOnLoad = callback;
                }
            },
            'onError': {
                get: function() {
                    return _callbackOnError;
                },
                set: function(callback) {
                    _callbackOnError = callback;
                }
            },
            'onShow': {
                get: function() {
                    return _callbackOnShow;
                },
                set: function(callback) {
                    _callbackOnShow = callback;
                }
            }
        });

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
        
        function overrideURLChange(url) {
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
    }
);

module.exports = WebView;