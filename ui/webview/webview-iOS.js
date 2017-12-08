const extend = require('js-base/core/extend');
const View = require('sf-core/ui/view');
const Color = require('sf-core/ui/color');
const File = require('sf-core/io/file');

const WebView = extend(View)(
    function (_super, params) {
        var self = this;
       
        if(!self.nativeObject){
           self.nativeObject = new __SF_WKWebView();            
        }
         
        _super(this);
    
        self.nativeObject.setValueForKey(false,"opaque");
        self.backgroundColor = Color.WHITE;
        
        Object.defineProperty(self, 'loadURL', {
            value: function(value) {
                var nsURL = __SF_NSURL.URLWithString(value);
                var nsURLRequest = __SF_NSURLRequest.requestWithURL(nsURL);
                self.nativeObject.load(nsURLRequest);
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
                }else{
                    baseUrl = __SF_NSURL.fileURLWithPath(File.getDocumentsDirectory());
                }
                
                var invocation = __SF_NSInvocation.createInvocationWithSelectorInstance("loadFileURL:allowingReadAccessToURL:",self.nativeObject);
                if (invocation) {
                    invocation.target = self.nativeObject;
                    invocation.setSelectorWithString("loadFileURL:allowingReadAccessToURL:");
                    invocation.retainArguments();
                    invocation.setNSObjectArgumentAtIndex(fileURL,2);
                    invocation.setNSObjectArgumentAtIndex(baseUrl,3);
                    
                    invocation.invoke();
                    var returnValue = invocation.getReturnValue();
                 }
            },
            enumerable: true
         });

        Object.defineProperty(self, 'loadHTML', {
            value: function(value) {
                self.nativeObject.loadHTMLStringBaseURL(value,undefined);
            },
            enumerable: true
         });
        
        self.onLoad = function(){}
        self.nativeObject.onLoad = function(e){
            self.onLoad({url : e.url.absoluteString});
        }
        
        self.onShow = function(){}
        self.nativeObject.onShow = function(e){
            self.onShow({url : e.url.absoluteString});
        }
        
        self.onError = function(){}
        self.nativeObject.onError = function(e){
            self.onError({code :  e.error.code , message : e.error.localizedDescription});
        }
        
        self.refresh = function(){
            self.nativeObject.reload();
        }
        
        self.evaluateJS = function(javascript,callback){
            function result(e){
                if (callback){
                    var error;
                    if(e.error){
                        error = {
                           code : e.error.code,
                           message :  e.error.localizedDescription
                        }
                    }
                    // callback({result : e.result,error : error});
                    callback(e.result);
                }
            }
            self.nativeObject.evaluateJavaScript(javascript,result);
        }
        
        self.goBack = function(){
            if (self.nativeObject.canGoBack){
                self.nativeObject.goBack();
            }
        }
        
        self.goForward = function(){
            if (self.nativeObject.canGoForward){
                self.nativeObject.goForward();
            }
        }
        
        self.onChangedURL = function(){}
        self.nativeObject.onChangedURL = function(e){
            var check = self.onChangedURL({url : e.url.absoluteString})
            if(check || check === undefined){
                return true;
            }else{
                return false;
            }
        }
        
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
         
         Object.defineProperty(self, 'scrollEnabled', {
            get: function() {
                return self.nativeObject.scrollView.valueForKey("scrollEnabled");
            },
            set: function(value) {
                self.nativeObject.scrollView.setValueForKey(value,"scrollEnabled");
            },
            enumerable: true
         });
         
         Object.defineProperty(self, 'bounceEnabled', {
            get: function() {
                return self.nativeObject.scrollView.valueForKey("bounces");
            },
            set: function(value) {
                self.nativeObject.scrollView.setValueForKey(value,"bounces");
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
                    self.nativeObject.scrollView.setValueForKey(value,"showsVerticalScrollIndicator");
                    self.nativeObject.scrollView.setValueForKey(value,"showsHorizontalScrollIndicator");
                    _scrollBarEnabled = value;  
                }
            },
            enumerable: true
         });
         
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

WebView.removeAllData = function(){
    
    var allWebsiteDataTypes;
    var invocationWebsiteDataTypes = __SF_NSInvocation.createClassInvocationWithSelectorInstance("allWebsiteDataTypes","WKWebsiteDataStore");
    if (invocationWebsiteDataTypes) {
        invocationWebsiteDataTypes.setClassTargetFromString("WKWebsiteDataStore");
        invocationWebsiteDataTypes.setSelectorWithString("allWebsiteDataTypes");
        invocationWebsiteDataTypes.retainArguments();
        
        invocationWebsiteDataTypes.invoke();
        allWebsiteDataTypes = invocationWebsiteDataTypes.getReturnValue();
     }
     
    var defaultDataStore;
    var invocationDefaultDataStore = __SF_NSInvocation.createClassInvocationWithSelectorInstance("defaultDataStore","WKWebsiteDataStore");
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
        invocationNSDate.setDoubleArgumentAtIndex(0,2);
        
        invocationNSDate.invoke();
        nsdate = invocationNSDate.getReturnValue();
    }
        
    var invocationFetchDataRecordsOfTypes = __SF_NSInvocation.createInvocationWithSelectorInstance("fetchDataRecordsOfTypes:completionHandler:",defaultDataStore);
    if (invocationFetchDataRecordsOfTypes) {
        var invocationCheck = __SF_NSInvocation.createInvocationWithSelectorInstance("setIDBlockArgument:atIndex:",invocationFetchDataRecordsOfTypes);
        if (invocationCheck) {
            invocationFetchDataRecordsOfTypes.target = defaultDataStore;
            invocationFetchDataRecordsOfTypes.setSelectorWithString("fetchDataRecordsOfTypes:completionHandler:");
            invocationFetchDataRecordsOfTypes.retainArguments();
            invocationFetchDataRecordsOfTypes.setNSObjectArgumentAtIndex(allWebsiteDataTypes,2);
            invocationFetchDataRecordsOfTypes.setIDBlockArgumentAtIndex(function(result){},3);
            
            invocationFetchDataRecordsOfTypes.invoke();
        }
    }
     
    var invocationRemoveDataOfTypes = __SF_NSInvocation.createInvocationWithSelectorInstance("removeDataOfTypes:modifiedSince:completionHandler:",defaultDataStore);
    if (invocationRemoveDataOfTypes) {
        var invocationCheck = __SF_NSInvocation.createInvocationWithSelectorInstance("setVoidBlockArgument:atIndex:",invocationRemoveDataOfTypes);
        if (invocationCheck) {
            invocationRemoveDataOfTypes.target = defaultDataStore;
            invocationRemoveDataOfTypes.setSelectorWithString("removeDataOfTypes:modifiedSince:completionHandler:");
            invocationRemoveDataOfTypes.retainArguments();
            invocationRemoveDataOfTypes.setNSObjectArgumentAtIndex(allWebsiteDataTypes,2);
            invocationRemoveDataOfTypes.setIDArgumentAtIndex(nsdate,3);
            invocationRemoveDataOfTypes.setVoidBlockArgumentAtIndex(function(){},4);
            
            invocationRemoveDataOfTypes.invoke();
        }
     }
}

module.exports = WebView;