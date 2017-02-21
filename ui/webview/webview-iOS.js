const extend = require('js-base/core/extend');
const View = require('nf-core/ui/view');

const WebView = extend(View)(
    function (_super, params) {
        var self = this;
       
        if(!self.nativeObject){
           self.nativeObject = new SMFWKWebView();            
        }
         
        _super(this);
    
        Object.defineProperty(self, 'loadURL', {
            set: function(value,callbackParams) {
                var nsURL = NSURL.URLWithString(value);
                var nsURLRequest = NSURLRequest.requestWithURL(nsURL);
                self.nativeObject.load(nsURLRequest);
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