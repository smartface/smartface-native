import File from '../../io/file';
import ViewIOS from '../../ui/view/view.ios';
import Invocation from '../../util/iOS/invocation';
import IWebView from '.';
import { WebViewEvents } from './webview-events';

function dataTypesToNSSet(dataTypes) {
  const alloc = Invocation.invokeClassMethod('NSSet', 'alloc', [], 'id');
  //TODO: new Invocation
  const argDataTypes = new Invocation.Argument({
    type: 'id',
    value: dataTypes
  });
  return Invocation.invokeInstanceMethod(alloc!, 'initWithArray:', [argDataTypes], 'id');
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
class WebViewIOS<TEvent extends string = WebViewEvents> extends ViewIOS<TEvent | WebViewEvents, any, IWebView> implements IWebView {
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
    super(params);
    if (!this.nativeObject) {
      this._nativeObject = new __SF_WKWebView();
    }
    // UIScrollViewInheritance.addPropertiesAndMethods.call(this, this.nativeObject.scrollView);
    this.nativeObject.scrollView.setValueForKey(4, 'contentInsetAdjustmentBehavior');

    this.nativeObject.setValueForKey(false, 'opaque');

    this.setEvents();
    this.addIOSProps(this.getIOSProps());
    this.addAndroidProps(this.getAndroidProps());
  }
  private setEvents() {
    this.nativeObject.onLoad = (e) => {
      const params = {
        url: e.url.absoluteString
      };
      this.onLoad?.(params);
      this.emit('load', params);
    };

    this.nativeObject.onShow = (e) => {
      const params = {
        url: e.url.absoluteString
      };
      this.onShow?.(params);
      this.emit('show', params);
    };

    this.nativeObject.onError = (e: any) => {
      const params = {
        code: e.error.code,
        message: e.error.localizedDescription
      };
      this.onError?.(params);
      this.emit('error', params);
    };

    this.nativeObject.onOpenNewWindow = (e) => {
      const params = {
        url: e.request.URL ? e.request.URL.absoluteString : undefined
      };
      this.ios.onOpenNewWindow?.(params);
      this.emit('openNewWindow', params);
    };

    this.nativeObject.onChangedURL = (e) => {
      const params = {
        url: e.url.absoluteString
      };
      this.emit('changedURL', params);
      const check = this.onChangedURL?.(params);
      return check || check === undefined;
    };
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
  private getAndroidProps() {
    return {
      setWebContentsDebuggingEnabled: function () {},
      clearHistory: function () {},
      clearFormData: function () {}
    };
  }
  private getIOSProps() {
    const self = this;
    return {
      get safeAreaInsets(): IWebView['ios']['safeAreaInsets'] {
        return self._safeAreaInsets;
      },
      set safeAreaInsets(value: IWebView['ios']['safeAreaInsets']) {
        if (typeof value === 'function') {
          self._safeAreaInsets = value;
          self.nativeObject.safeAreaInsetsCallback = value;
        } else {
          throw new Error('safeAreaInsets must be function');
        }
      },
      get sslPinning(): IWebView['ios']['sslPinning'] {
        return self._sslPinning;
      },
      set sslPinning(value: IWebView['ios']['sslPinning']) {
        self._sslPinning = value;
        const trustPolicies = value?.map?.((value) => {
          const { certificates, host, validateCertificateChain = true, validateHost = true } = value;
          const nSURLCertificates = certificates.map((path) => {
            const certFile = new File({
              path: path
            });
            return certFile.ios.getNSURL!();
          });
          return __SF_SMFServerTrustPolicy.createServerTrustPolicyWithHostCertificateURLsValidateCertificateChainValidateHost(host, nSURLCertificates, validateCertificateChain, validateHost);
        });
        self.nativeObject.serverTrustPolicies = trustPolicies;
      }
    };
  }
}

export default WebViewIOS;
