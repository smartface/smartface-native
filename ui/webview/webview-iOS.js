const View = require('../../ui/view');
const File = require('../../io/file');
const Invocation = require('../../util').Invocation;
const UIScrollViewInheritance = require('../../util').UIScrollViewInheritance;
const Events = require('./events');

WebView.prototype = Object.create(View.prototype);
function WebView(params) {
    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_WKWebView();
    }

    View.call(this);

    UIScrollViewInheritance.addPropertiesAndMethods.call(this, this.nativeObject.scrollView);
    self.nativeObject.scrollView.setValueForKey(4, "contentInsetAdjustmentBehavior");

    self.android.clearHistory = function() {};
    self.android.clearFormData = function() {};

    self.nativeObject.setValueForKey(false, "opaque");

    Object.defineProperty(self, 'loadURL', {
        value: function(value) {
            var nsURL = __SF_NSURL.URLWithString(value);
            var nsURLRequest = __SF_NSURLRequest.requestWithURL(nsURL);
            self.nativeObject.load(nsURLRequest);
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'userAgent', {
        get: function() {
            return self.nativeObject.valueForKey("customUserAgent");
        },
        set: function(value) {
            if (value) {
                self.nativeObject.setValueForKey(value, "customUserAgent");
            }else{
                self.nativeObject.setValueForKey("", "customUserAgent");
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'loadFile', {
        value: function(value) {
            var actualPath = value.nativeObject.getActualPath();
            var fileURL = __SF_NSURL.fileURLWithPath(actualPath);

            var baseUrl;

            if (actualPath.includes(".app")) {
                baseUrl = __SF_NSURL.fileURLWithPath(File.getMainBundleDirectory());
            } else {
                baseUrl = __SF_NSURL.fileURLWithPath(File.getDocumentsDirectory());
            }

            var invocation = __SF_NSInvocation.createInvocationWithSelectorInstance("loadFileURL:allowingReadAccessToURL:", self.nativeObject);
            if (invocation) {
                invocation.target = self.nativeObject;
                invocation.setSelectorWithString("loadFileURL:allowingReadAccessToURL:");
                invocation.retainArguments();
                invocation.setNSObjectArgumentAtIndex(fileURL, 2);
                invocation.setNSObjectArgumentAtIndex(baseUrl, 3);

                invocation.invoke();
                var returnValue = invocation.getReturnValue();
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'loadHTML', {
        value: function(value) {
            self.nativeObject.loadHTMLStringBaseURL(value, undefined);
        },
        enumerable: true
    });

    self.onLoad = function() {}
    self.nativeObject.onLoad = function(e) {
        self.onLoad({
            url: e.url.absoluteString
        });
    }

    self.onShow = function() {}
    self.nativeObject.onShow = function(e) {
        self.onShow({
            url: e.url.absoluteString
        });
    }

    self.onError = function() {}
    self.nativeObject.onError = function(e) {
        self.onError({
            code: e.error.code,
            message: e.error.localizedDescription
        });
    }

    self.refresh = function() {
        self.nativeObject.reload();
    }

    self.ios.onOpenNewWindow = function() {};
    self.nativeObject.onOpenNewWindow = function(e) {
        var urlString = e.request.URL ? e.request.URL.absoluteString : undefined;
        self.ios.onOpenNewWindow({
            url: urlString
        });
    };

    self.evaluateJS = function(javascript, callback) {
        function result(e) {
            if (callback) {
                var error;
                if (e.error) {
                    error = {
                        code: e.error.code,
                        message: e.error.localizedDescription
                    }
                }
                // callback({result : e.result,error : error});
                callback(e.result);
            }
        }
        self.nativeObject.evaluateJavaScript(javascript, result);
    }

    self.goBack = function() {
        if (self.nativeObject.canGoBack) {
            self.nativeObject.goBack();
        }
    }

    self.goForward = function() {
        if (self.nativeObject.canGoForward) {
            self.nativeObject.goForward();
        }
    }

    self.onChangedURL = function() {}
    self.nativeObject.onChangedURL = function(e) {
        var check = self.onChangedURL({
            url: e.url.absoluteString
        })
        if (check || check === undefined) {
            return true;
        } else {
            return false;
        }
    }

    const EventFunctions = {
        [Events.BackButtonPressed]: function() {
            //Android Only
        },
        [Events.ChangedURL]: function() {
            self.onChangedURL = function(state) {
                this.emitter.emit(Events.ChangedURL, state);
            }
        },
        [Events.ConsoleMessage]: function() {
            //Android only
        },
        [Events.Error]: function() {
            self.onError = function (state) {
                this.emitter.emit(Events.Error, state);
            } 
        },
        [Events.Load]: function() {
            self.onLoad = function (state) {
                this.emitter.emit(Events.Load, state);
            } 
        },
        [Events.OpenNewWindow]: function() {
            self.ios.onOpenNewWindow = function (state) {
                this.emitter.emit(Events.Load, state);
            } 
        },
        [Events.Show]: function() {
            self.onShow = function (state) {
                this.emitter.emit(Events.Show, state);
            } 
        }
    }

    const parentOnFunction = this.on;
    Object.defineProperty(this, 'on', {
        value: (event, callback) => {
            if (typeof EventFunctions[event] === 'function') {
                EventFunctions[event].call(this);
                this.emitter.on(event, callback);
            }
            else {
                parentOnFunction(event, callback);
            }
        },
        configurable: true
    });

    Object.defineProperty(self, 'openLinkInside', {
        get: function() {
            return self.nativeObject.openLinkInside;
        },
        set: function(value) {
            self.nativeObject.openLinkInside = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'zoomEnabled', {
        get: function() {
            return self.nativeObject.zoomEnabled;
        },
        set: function(value) {
            self.nativeObject.zoomEnabled = value;
        },
        enumerable: true
    });

    var _safeAreaInsets;
    Object.defineProperty(self.ios, 'safeAreaInsets', {
        get: function() {
            return _safeAreaInsets;
        },
        set: function(value) {
            if (typeof value === 'function') {
                _safeAreaInsets = value;
                self.nativeObject.safeAreaInsetsCallback = value;
            } else {
                throw new Error("safeAreaInsets must be function");
            }
        },
        enumerable: true
    });

    Object.defineProperty(self, 'scrollEnabled', {
        get: function() {
            return self.nativeObject.scrollView.valueForKey("scrollEnabled");
        },
        set: function(value) {
            self.nativeObject.scrollView.setValueForKey(value, "scrollEnabled");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'bounceEnabled', {
        get: function() {
            return self.nativeObject.scrollView.valueForKey("bounces");
        },
        set: function(value) {
            self.nativeObject.scrollView.setValueForKey(value, "bounces");
        },
        enumerable: true
    });

    var _scrollBarEnabled = true;
    Object.defineProperty(self, 'scrollBarEnabled', {
        get: function() {
            return _scrollBarEnabled;
        },
        set: function(value) {
            if (typeof value === 'boolean') {
                self.nativeObject.scrollView.setValueForKey(value, "showsVerticalScrollIndicator");
                self.nativeObject.scrollView.setValueForKey(value, "showsHorizontalScrollIndicator");
                _scrollBarEnabled = value;
            }
        },
        enumerable: true
    });

    self.clearCache = function(deleteDiskFiles) {
        var dataTypes = ["WKWebsiteDataTypeMemoryCache"];
        if (deleteDiskFiles) {
            dataTypes.push("WKWebsiteDataTypeDiskCache");
        }
        var nsSetDataTypes = dataTypesToNSSet(dataTypes);
        removeDataOfTypes(nsSetDataTypes);
    }

    self.clearCookie = function() {
        var dataTypes = ["WKWebsiteDataTypeCookies"];
        var nsSetDataTypes = dataTypesToNSSet(dataTypes);
        removeDataOfTypes(nsSetDataTypes);
    }

    self.clearAllData = function() {
        WebView.removeAllData();
    }

    function dataTypesToNSSet(dataTypes) {
        var alloc = Invocation.invokeClassMethod("NSSet", "alloc", [], "id");
        var argDataTypes = new Invocation.Argument({
            type: "id",
            value: dataTypes
        });
        return Invocation.invokeInstanceMethod(alloc, "initWithArray:", [argDataTypes], "id");
    }

    function removeDataOfTypes(dataTypes) {
        var defaultDataStore;
        var invocationDefaultDataStore = __SF_NSInvocation.createClassInvocationWithSelectorInstance("defaultDataStore", "WKWebsiteDataStore");
        if (invocationDefaultDataStore) {
            invocationDefaultDataStore.setClassTargetFromString("WKWebsiteDataStore");
            invocationDefaultDataStore.setSelectorWithString("defaultDataStore");
            invocationDefaultDataStore.retainArguments();

            invocationDefaultDataStore.invoke();
            defaultDataStore = invocationDefaultDataStore.getReturnValue();
        }

        var nsdate;
        var invocationNSDate = __SF_NSInvocation.createClassInvocationWithSelectorInstance("dateWithTimeIntervalSince1970:", "NSDate");
        if (invocationNSDate) {
            invocationNSDate.setClassTargetFromString("NSDate");
            invocationNSDate.setSelectorWithString("dateWithTimeIntervalSince1970:");
            invocationNSDate.retainArguments();
            invocationNSDate.setDoubleArgumentAtIndex(0, 2);

            invocationNSDate.invoke();
            nsdate = invocationNSDate.getReturnValue();
        }

        var invocationFetchDataRecordsOfTypes = __SF_NSInvocation.createInvocationWithSelectorInstance("fetchDataRecordsOfTypes:completionHandler:", defaultDataStore);
        if (invocationFetchDataRecordsOfTypes) {
            var invocationCheck = __SF_NSInvocation.createInvocationWithSelectorInstance("setIDBlockArgument:atIndex:", invocationFetchDataRecordsOfTypes);
            if (invocationCheck) {
                invocationFetchDataRecordsOfTypes.target = defaultDataStore;
                invocationFetchDataRecordsOfTypes.setSelectorWithString("fetchDataRecordsOfTypes:completionHandler:");
                invocationFetchDataRecordsOfTypes.retainArguments();
                invocationFetchDataRecordsOfTypes.setNSObjectArgumentAtIndex(dataTypes, 2);
                invocationFetchDataRecordsOfTypes.setIDBlockArgumentAtIndex(function(result) {}, 3);

                invocationFetchDataRecordsOfTypes.invoke();
            }
        }

        var invocationRemoveDataOfTypes = __SF_NSInvocation.createInvocationWithSelectorInstance("removeDataOfTypes:modifiedSince:completionHandler:", defaultDataStore);
        if (invocationRemoveDataOfTypes) {
            var invocationCheck = __SF_NSInvocation.createInvocationWithSelectorInstance("setVoidBlockArgument:atIndex:", invocationRemoveDataOfTypes);
            if (invocationCheck) {
                invocationRemoveDataOfTypes.target = defaultDataStore;
                invocationRemoveDataOfTypes.setSelectorWithString("removeDataOfTypes:modifiedSince:completionHandler:");
                invocationRemoveDataOfTypes.retainArguments();
                invocationRemoveDataOfTypes.setNSObjectArgumentAtIndex(dataTypes, 2);
                invocationRemoveDataOfTypes.setIDArgumentAtIndex(nsdate, 3);
                invocationRemoveDataOfTypes.setVoidBlockArgumentAtIndex(function() {}, 4);

                invocationRemoveDataOfTypes.invoke();
            }
        }
    }

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

WebView.removeAllData = function() {

    var allWebsiteDataTypes;
    var invocationWebsiteDataTypes = __SF_NSInvocation.createClassInvocationWithSelectorInstance("allWebsiteDataTypes", "WKWebsiteDataStore");
    if (invocationWebsiteDataTypes) {
        invocationWebsiteDataTypes.setClassTargetFromString("WKWebsiteDataStore");
        invocationWebsiteDataTypes.setSelectorWithString("allWebsiteDataTypes");
        invocationWebsiteDataTypes.retainArguments();

        invocationWebsiteDataTypes.invoke();
        allWebsiteDataTypes = invocationWebsiteDataTypes.getReturnValue();
    }

    var defaultDataStore;
    var invocationDefaultDataStore = __SF_NSInvocation.createClassInvocationWithSelectorInstance("defaultDataStore", "WKWebsiteDataStore");
    if (invocationDefaultDataStore) {
        invocationDefaultDataStore.setClassTargetFromString("WKWebsiteDataStore");
        invocationDefaultDataStore.setSelectorWithString("defaultDataStore");
        invocationDefaultDataStore.retainArguments();

        invocationDefaultDataStore.invoke();
        defaultDataStore = invocationDefaultDataStore.getReturnValue();
    }

    var nsdate;
    var invocationNSDate = __SF_NSInvocation.createClassInvocationWithSelectorInstance("dateWithTimeIntervalSince1970:", "NSDate");
    if (invocationNSDate) {
        invocationNSDate.setClassTargetFromString("NSDate");
        invocationNSDate.setSelectorWithString("dateWithTimeIntervalSince1970:");
        invocationNSDate.retainArguments();
        invocationNSDate.setDoubleArgumentAtIndex(0, 2);

        invocationNSDate.invoke();
        nsdate = invocationNSDate.getReturnValue();
    }

    var invocationFetchDataRecordsOfTypes = __SF_NSInvocation.createInvocationWithSelectorInstance("fetchDataRecordsOfTypes:completionHandler:", defaultDataStore);
    if (invocationFetchDataRecordsOfTypes) {
        var invocationCheck = __SF_NSInvocation.createInvocationWithSelectorInstance("setIDBlockArgument:atIndex:", invocationFetchDataRecordsOfTypes);
        if (invocationCheck) {
            invocationFetchDataRecordsOfTypes.target = defaultDataStore;
            invocationFetchDataRecordsOfTypes.setSelectorWithString("fetchDataRecordsOfTypes:completionHandler:");
            invocationFetchDataRecordsOfTypes.retainArguments();
            invocationFetchDataRecordsOfTypes.setNSObjectArgumentAtIndex(allWebsiteDataTypes, 2);
            invocationFetchDataRecordsOfTypes.setIDBlockArgumentAtIndex(function(result) {}, 3);

            invocationFetchDataRecordsOfTypes.invoke();
        }
    }

    var invocationRemoveDataOfTypes = __SF_NSInvocation.createInvocationWithSelectorInstance("removeDataOfTypes:modifiedSince:completionHandler:", defaultDataStore);
    if (invocationRemoveDataOfTypes) {
        var invocationCheck = __SF_NSInvocation.createInvocationWithSelectorInstance("setVoidBlockArgument:atIndex:", invocationRemoveDataOfTypes);
        if (invocationCheck) {
            invocationRemoveDataOfTypes.target = defaultDataStore;
            invocationRemoveDataOfTypes.setSelectorWithString("removeDataOfTypes:modifiedSince:completionHandler:");
            invocationRemoveDataOfTypes.retainArguments();
            invocationRemoveDataOfTypes.setNSObjectArgumentAtIndex(allWebsiteDataTypes, 2);
            invocationRemoveDataOfTypes.setIDArgumentAtIndex(nsdate, 3);
            invocationRemoveDataOfTypes.setVoidBlockArgumentAtIndex(function() {}, 4);

            invocationRemoveDataOfTypes.invoke();
        }
    }
}

//Android specific enums object
WebView.Android = {};
WebView.Android.ConsoleMessageLevel = {};

WebView.android = {};
WebView.android.setWebContentsDebuggingEnabled = function(enabled) {};

module.exports = WebView;