const Invocation = require('sf-core/util').Invocation;
const Options = require('sf-core/ui/webbrowser/webbrowseroptions');

function WebBrowser () {}

WebBrowser.show = function(page,options){
    if (!(options && options.url && (options.url.startsWith("https://")  || options.url.startsWith("http://")))) {
        throw new Error("The specified URL has an unsupported scheme. Only HTTP and HTTPS URLs are supported.");
    };
    var nsURL = __SF_NSURL.URLWithString(options.url);
    var argURL = new Invocation.Argument({
        type:"NSObject",
        value: nsURL
    });

    var safariViewController = __SF_SMFSFSafariViewController.create(nsURL,false);
    
    safariViewController.statusBarHidden = !options.ios.statusBarVisible;

    var argBarColor = new Invocation.Argument({
        type:"NSObject",
        value: options.barColor.nativeObject
    });
    Invocation.invokeInstanceMethod(safariViewController,"setPreferredBarTintColor:",[argBarColor]);
    
    var argItemColor = new Invocation.Argument({
        type:"NSObject",
        value: options.ios.itemColor.nativeObject
    });
    Invocation.invokeInstanceMethod(safariViewController,"setPreferredControlTintColor:",[argItemColor]);
    
   var argPresentationStyle = new Invocation.Argument({
        type:"NSInteger",
        value: 7
    });
    Invocation.invokeInstanceMethod(safariViewController,"setModalPresentationStyle:",[argPresentationStyle]);
    
    page.nativeObject.presentViewController(safariViewController);
};

WebBrowser.Options = Options;

module.exports = WebBrowser;