const extend = require('js-base/core/extend');
const View = require('sf-core/ui/view');

const WebView = extend(View)(
    function (_super, params) {
        var self = this;
       
        if(!self.nativeObject){
           self.nativeObject = new __SF_WKWebView();            
        }
         
        _super(this);
    
        Object.defineProperty(self, 'loadURL', {
            value: function(value) {
                var nsURL = __SF_NSURL.URLWithString(value);
                var nsURLRequest = __SF_NSURLRequest.requestWithURL(nsURL);
                self.nativeObject.load(nsURLRequest);
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
                    callback({result : e.result,error : error});
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
            self.onChangedURL({url : e.url.absoluteString});
            return true;
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
         
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = WebView;