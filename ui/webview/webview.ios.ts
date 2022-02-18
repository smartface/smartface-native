import File from 'io/file';
import ViewIOS from 'ui/view/view.ios';
import Invocation from 'util/iOS/invocation';
import IWebView, { iOSProps } from './webview';
import { WebViewEvents } from './webview-events';

function dataTypesToNSSet(dataTypes) {
  const alloc = Invocation.invokeClassMethod('NSSet', 'alloc', [], 'id');
  //TODO: new Invocation
  const argDataTypes = new Invocation.Argument({
    type: 'id',
    value: dataTypes
  });
  return Invocation.invokeInstanceMethod(alloc, 'initWithArray:', [argDataTypes], 'id');
}

function removeDataOfTypes(dataTypes) {
  let defaultDataStore;
  const invocationDefaultDataStore = __SF_NSInvocation.createClassInvocationWithSelectorInstance('defaultDataStore', 'WKWebsiteDataStore');
  if (invocationDefaultDataStore) {
    invocationDefaultDataStore.setClassTargetFromString('WKWebsiteDataStore');
    invocationDefaultDataStore.setSelectorWithString('defaultDataStore');
    invocationDefaultDataStore.retainArguments();

    invocationDefaultDataStore.invoke();
    defaultDataStore = invocationDefaultDataStore.getReturnValue();
  }

  let nsdate;
  const invocationNSDate = __SF_NSInvocation.createClassInvocationWithSelectorInstance('dateWithTimeIntervalSince1970:', 'NSDate');
  if (invocationNSDate) {
    invocationNSDate.setClassTargetFromString('NSDate');
    invocationNSDate.setSelectorWithString('dateWithTimeIntervalSince1970:');
    invocationNSDate.retainArguments();
    invocationNSDate.setDoubleArgumentAtIndex(0, 2);

    invocationNSDate.invoke();
    nsdate = invocationNSDate.getReturnValue();
  }

  const invocationFetchDataRecordsOfTypes = __SF_NSInvocation.createInvocationWithSelectorInstance('fetchDataRecordsOfTypes:completionHandler:', defaultDataStore);
  if (invocationFetchDataRecordsOfTypes) {
    const invocationCheck = __SF_NSInvocation.createInvocationWithSelectorInstance('setIDBlockArgument:atIndex:', invocationFetchDataRecordsOfTypes);
    if (invocationCheck) {
      invocationFetchDataRecordsOfTypes.target = defaultDataStore;
      invocationFetchDataRecordsOfTypes.setSelectorWithString('fetchDataRecordsOfTypes:completionHandler:');
      invocationFetchDataRecordsOfTypes.retainArguments();
      invocationFetchDataRecordsOfTypes.setNSObjectArgumentAtIndex(dataTypes, 2);
      invocationFetchDataRecordsOfTypes.setIDBlockArgumentAtIndex(function (result) {}, 3);

      invocationFetchDataRecordsOfTypes.invoke();
    }
  }

  const invocationRemoveDataOfTypes = __SF_NSInvocation.createInvocationWithSelectorInstance('removeDataOfTypes:modifiedSince:completionHandler:', defaultDataStore);
  if (invocationRemoveDataOfTypes) {
    const invocationCheck = __SF_NSInvocation.createInvocationWithSelectorInstance('setVoidBlockArgument:atIndex:', invocationRemoveDataOfTypes);
    if (invocationCheck) {
      invocationRemoveDataOfTypes.target = defaultDataStore;
      invocationRemoveDataOfTypes.setSelectorWithString('removeDataOfTypes:modifiedSince:completionHandler:');
      invocationRemoveDataOfTypes.retainArguments();
      invocationRemoveDataOfTypes.setNSObjectArgumentAtIndex(dataTypes, 2);
      invocationRemoveDataOfTypes.setIDArgumentAtIndex(nsdate, 3);
      invocationRemoveDataOfTypes.setVoidBlockArgumentAtIndex(function () {}, 4);

      invocationRemoveDataOfTypes.invoke();
    }
  }
}
class WebViewIOS<TEvent extends string = WebViewEvents> extends ViewIOS<TEvent | WebViewEvents, iOSProps> implements IWebView {
  private _scrollBarEnabled: boolean;
  private _onError;
  private _onShow;
  private _onLoad;
  private _onChangedURL;
  private _safeAreaInsets;
  private _sslPinning;
  static removeAllData = function () {
    let allWebsiteDataTypes;
    const invocationWebsiteDataTypes = __SF_NSInvocation.createClassInvocationWithSelectorInstance('allWebsiteDataTypes', 'WKWebsiteDataStore');
    if (invocationWebsiteDataTypes) {
      invocationWebsiteDataTypes.setClassTargetFromString('WKWebsiteDataStore');
      invocationWebsiteDataTypes.setSelectorWithString('allWebsiteDataTypes');
      invocationWebsiteDataTypes.retainArguments();

      invocationWebsiteDataTypes.invoke();
      allWebsiteDataTypes = invocationWebsiteDataTypes.getReturnValue();
    }

    let defaultDataStore;
    const invocationDefaultDataStore = __SF_NSInvocation.createClassInvocationWithSelectorInstance('defaultDataStore', 'WKWebsiteDataStore');
    if (invocationDefaultDataStore) {
      invocationDefaultDataStore.setClassTargetFromString('WKWebsiteDataStore');
      invocationDefaultDataStore.setSelectorWithString('defaultDataStore');
      invocationDefaultDataStore.retainArguments();

      invocationDefaultDataStore.invoke();
      defaultDataStore = invocationDefaultDataStore.getReturnValue();
    }

    let nsdate;
    const invocationNSDate = __SF_NSInvocation.createClassInvocationWithSelectorInstance('dateWithTimeIntervalSince1970:', 'NSDate');
    if (invocationNSDate) {
      invocationNSDate.setClassTargetFromString('NSDate');
      invocationNSDate.setSelectorWithString('dateWithTimeIntervalSince1970:');
      invocationNSDate.retainArguments();
      invocationNSDate.setDoubleArgumentAtIndex(0, 2);

      invocationNSDate.invoke();
      nsdate = invocationNSDate.getReturnValue();
    }

    const invocationFetchDataRecordsOfTypes = __SF_NSInvocation.createInvocationWithSelectorInstance('fetchDataRecordsOfTypes:completionHandler:', defaultDataStore);
    if (invocationFetchDataRecordsOfTypes) {
      const invocationCheck = __SF_NSInvocation.createInvocationWithSelectorInstance('setIDBlockArgument:atIndex:', invocationFetchDataRecordsOfTypes);
      if (invocationCheck) {
        invocationFetchDataRecordsOfTypes.target = defaultDataStore;
        invocationFetchDataRecordsOfTypes.setSelectorWithString('fetchDataRecordsOfTypes:completionHandler:');
        invocationFetchDataRecordsOfTypes.retainArguments();
        invocationFetchDataRecordsOfTypes.setNSObjectArgumentAtIndex(allWebsiteDataTypes, 2);
        invocationFetchDataRecordsOfTypes.setIDBlockArgumentAtIndex(function (result) {}, 3);

        invocationFetchDataRecordsOfTypes.invoke();
      }
    }

    const invocationRemoveDataOfTypes = __SF_NSInvocation.createInvocationWithSelectorInstance('removeDataOfTypes:modifiedSince:completionHandler:', defaultDataStore);
    if (invocationRemoveDataOfTypes) {
      const invocationCheck = __SF_NSInvocation.createInvocationWithSelectorInstance('setVoidBlockArgument:atIndex:', invocationRemoveDataOfTypes);
      if (invocationCheck) {
        invocationRemoveDataOfTypes.target = defaultDataStore;
        invocationRemoveDataOfTypes.setSelectorWithString('removeDataOfTypes:modifiedSince:completionHandler:');
        invocationRemoveDataOfTypes.retainArguments();
        invocationRemoveDataOfTypes.setNSObjectArgumentAtIndex(allWebsiteDataTypes, 2);
        invocationRemoveDataOfTypes.setIDArgumentAtIndex(nsdate, 3);
        invocationRemoveDataOfTypes.setVoidBlockArgumentAtIndex(function () {}, 4);

        invocationRemoveDataOfTypes.invoke();
      }
    }
  };
  constructor(params?: Partial<IWebView>) {
    super();
    const self = this;
    if (!this.nativeObject) {
      this.nativeObject = new __SF_WKWebView();
    }

    UIScrollViewInheritance.addPropertiesAndMethods.call(this, this.nativeObject.scrollView);
    this.nativeObject.scrollView.setValueForKey(4, 'contentInsetAdjustmentBehavior');

    this.nativeObject.setValueForKey(false, 'opaque');

    self.onLoad = function () {};
    self.nativeObject.onLoad = function (e) {
      self.onLoad({
        url: e.url.absoluteString
      });
    };

    self.onShow = function () {};
    self.nativeObject.onShow = function (e) {
      self.onShow({
        url: e.url.absoluteString
      });
    };

    self.onError = function () {};
    self.nativeObject.onError = function (e) {
      self.onError({
        code: e.error.code,
        message: e.error.localizedDescription
      });
    };

    self.ios.onOpenNewWindow = function () {};
    self.nativeObject.onOpenNewWindow = function (e) {
      const urlString = e.request.URL ? e.request.URL.absoluteString : undefined;
      self.ios.onOpenNewWindow({
        url: urlString
      });
    };

    self.onChangedURL = function () {};
    self.nativeObject.onChangedURL = function (e) {
      const check = self.onChangedURL({
        url: e.url.absoluteString
      });
      if (check || check === undefined) {
        return true;
      } else {
        return false;
      }
    };

    const EventFunctions = {
      [WebViewEvents.BackButtonPressed]: function () {
        //Android Only
      },
      [WebViewEvents.ChangedURL]: function () {
        self.onChangedURL = function (state) {
          this.emitter.emit(WebViewEvents.ChangedURL, state);
        };
      },
      [WebViewEvents.ConsoleMessage]: function () {
        //Android only
      },
      [WebViewEvents.Error]: function () {
        self.onError = function (state) {
          this.emitter.emit(WebViewEvents.Error, state);
        };
      },
      [WebViewEvents.Load]: function () {
        self.onLoad = function (state) {
          this.emitter.emit(WebViewEvents.Load, state);
        };
      },
      [WebViewEvents.OpenNewWindow]: function () {
        self.ios.onOpenNewWindow = function (state) {
          this.emitter.emit(WebViewEvents.OpenNewWindow, state);
        };
      },
      [WebViewEvents.Show]: function () {
        self.onShow = function (state) {
          this.emitter.emit(WebViewEvents.Show, state);
        };
      }
    };

    // Assign parameters given in constructor
    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }

    const ios = {
      get() {
        return self._ios;
      },
      set(value) {
        if (typeof value === 'object') {
          Object.assign(self._ios, value);
        }
      },
      get safeAreaInsets() {
        return self._safeAreaInsets;
      },
      set safeAreaInsets(value) {
        if (typeof value === 'function') {
          self._safeAreaInsets = value;
          self.nativeObject.safeAreaInsetsCallback = value;
        } else {
          throw new Error('safeAreaInsets must be function');
        }
      },
      get sslPinning() {
        return self._sslPinning;
      },
      set sslPinning(values) {
        self._sslPinning = values;
        let trustPolicies = values
          ? values.map((value) => {
              const { certificates, host, validateCertificateChain = true, validateHost = true } = value;

              let nSURLCertificates = certificates.map(function (path) {
                let certFile = new File({
                  path: path
                });
                return certFile.ios.getNSURL();
              });
              return __SF_SMFServerTrustPolicy.createServerTrustPolicyWithHostCertificateURLsValidateCertificateChainValidateHost(host, nSURLCertificates, validateCertificateChain, validateHost);
            })
          : undefined;
        self.nativeObject.serverTrustPolicies = trustPolicies;
      }
    };

    this._ios = Object.assign(this._ios, ios);
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
  get userAgent() {
    return this.nativeObject.valueForKey('customUserAgent');
  }
  set userAgent(value) {
    if (value) {
      this.nativeObject.setValueForKey(value, 'customUserAgent');
    } else {
      this.nativeObject.setValueForKey('', 'customUserAgent');
    }
  }
  get openLinkInside() {
    return this.nativeObject.openLinkInside;
  }
  set openLinkInside(value) {
    this.nativeObject.openLinkInside = value;
  }
  get zoomEnabled() {
    return this.nativeObject.zoomEnabled;
  }
  set zoomEnabled(value) {
    this.nativeObject.zoomEnabled = value;
  }
  get scrollEnabled() {
    return this.nativeObject.scrollView.valueForKey('scrollEnabled');
  }
  set scrollEnabled(value) {
    this.nativeObject.scrollView.setValueForKey(value, 'scrollEnabled');
  }
  get bounceEnabled() {
    return this.nativeObject.scrollView.valueForKey('bounces');
  }
  set bounceEnabled(value) {
    this.nativeObject.scrollView.setValueForKey(value, 'bounces');
  }
  get scrollBarEnabled() {
    return this._scrollBarEnabled;
  }
  set scrollBarEnabled(value) {
    if (typeof value === 'boolean') {
      this.nativeObject.scrollView.setValueForKey(value, 'showsVerticalScrollIndicator');
      this.nativeObject.scrollView.setValueForKey(value, 'showsHorizontalScrollIndicator');
      this._scrollBarEnabled = value;
    }
  }
  //Android specific enums object
  Android = { ConsoleMessageLevel: {} };
  android = {
    setWebContentsDebuggingEnabled: function (enabled) {},
    clearHistory: function () {},
    clearFormData: function () {}
  };
  clearCache(deleteDiskFiles) {
    const dataTypes = ['WKWebsiteDataTypeMemoryCache'];
    if (deleteDiskFiles) {
      dataTypes.push('WKWebsiteDataTypeDiskCache');
    }
    const nsSetDataTypes = dataTypesToNSSet(dataTypes);
    removeDataOfTypes(nsSetDataTypes);
  }
  clearCookie() {
    const dataTypes = ['WKWebsiteDataTypeCookies'];
    const nsSetDataTypes = dataTypesToNSSet(dataTypes);
    removeDataOfTypes(nsSetDataTypes);
  }
  clearAllData() {
    WebViewIOS.removeAllData();
  }
  loadURL(value: string) {
    const nsURL = __SF_NSURL.URLWithString(value);
    const nsURLRequest = __SF_NSURLRequest.requestWithURL(nsURL);
    this.nativeObject.load(nsURLRequest);
  }
  loadFile(value) {
    const actualPath = value.nativeObject.getActualPath();
    const fileURL = __SF_NSURL.fileURLWithPath(actualPath);
    let baseUrl;
    if (actualPath.includes('.app')) {
      baseUrl = __SF_NSURL.fileURLWithPath(File.getMainBundleDirectory());
    } else {
      baseUrl = __SF_NSURL.fileURLWithPath(File.getDocumentsDirectory());
    }
    const invocation = __SF_NSInvocation.createInvocationWithSelectorInstance('loadFileURL:allowingReadAccessToURL:', this.nativeObject);
    if (invocation) {
      invocation.target = this.nativeObject;
      invocation.setSelectorWithString('loadFileURL:allowingReadAccessToURL:');
      invocation.retainArguments();
      invocation.setNSObjectArgumentAtIndex(fileURL, 2);
      invocation.setNSObjectArgumentAtIndex(baseUrl, 3);

      invocation.invoke();
    }
  }
  refresh() {
    this.nativeObject.reload();
  }
  loadHTML(value) {
    this.nativeObject.loadHTMLStringBaseURL(value, undefined);
  }
  goBack() {
    if (this.nativeObject.canGoBack) {
      this.nativeObject.goBack();
    }
  }
  goForward() {
    if (this.nativeObject.canGoForward) {
      this.nativeObject.goForward();
    }
  }
  evaluateJS(javascript, callback) {
    function result(e) {
      if (callback) {
        let error;
        if (e.error) {
          error = {
            code: e.error.code,
            message: e.error.localizedDescription
          };
        }
        // callback({result : e.result,error : error});
        callback(e.result);
      }
    }
    this.nativeObject.evaluateJavaScript(javascript, result);
  }
}

export default WebViewIOS;
