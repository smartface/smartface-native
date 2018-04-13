/*globals array,requireClass */

const WebBrowser = function() {};

WebBrowser.Open = function(page,options) {
    const NativeCustomTabsIntent = requireClass("android.support.customtabs.CustomTabsIntent");
    // const NativeCustomTabsServiceConnection = requireClass("android.support.customtabs.CustomTabsServiceConnection");
    // const NativeCustomTabsClient = requireClass("android.support.customtabs.CustomTabsClient");
    const NativeUri = requireClass("android.net.Uri");
    const NativeIntent = requireClass("android.content.Intent");
    const spratAndroidActivityInstance = requireClass("io.smartface.android.SpratAndroidActivity").getInstance();
    const NativePendingIntent = requireClass("android.app.PendingIntent");
    
    var builder = new NativeCustomTabsIntent.Builder();
    builder.setToolbarColor(options.barColor.nativeObject);
    builder.setShowTitle(true);

    var shareIntent = new NativeIntent(NativeIntent.ACTION_SEND);
    shareIntent.setType("text/plain");
    shareIntent.putExtra(NativeIntent.EXTRA_TEXT, options.url);
    builder.addMenuItem("Share", NativePendingIntent.getActivity(spratAndroidActivityInstance, 0, shareIntent, 0));
    
    try {
         var customTabsIntent = builder.build();
        customTabsIntent.launchUrl(spratAndroidActivityInstance, NativeUri.parse(options.url));
    }
    catch (e) {
        throw new Error("" + e);
    }
};

WebBrowser.Options = require("./webbrowseroptions");
module.exports = WebBrowser;
