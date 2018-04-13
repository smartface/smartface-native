/*globals array,requireClass */

const WebBrowser = function() {

    var _url;
    var _headerColor;
    Object.defineProperties(this, {
        'url': {
            get: function() {
                return _url;
            },
            set: function(value) {
                _url = value;
            },
            enumerable: true
        },
        'headerColor': {
            get: function() {
                return _headerColor;
            },
            set: function(value) {
                _headerColor = value;
            },
            enumerable: true
        },
        'open': {
            value: function() {

                const NativeCustomTabsIntent = requireClass("android.support.customtabs.CustomTabsIntent");
                // const NativeCustomTabsServiceConnection = requireClass("android.support.customtabs.CustomTabsServiceConnection");
                // const NativeCustomTabsClient = requireClass("android.support.customtabs.CustomTabsClient");
                const NativeUri = requireClass("android.net.Uri");
                const NativeIntent = requireClass("android.content.Intent");
                const spratAndroidActivityInstance = requireClass("io.smartface.android.SpratAndroidActivity").getInstance();
                
                var builder = new NativeCustomTabsIntent.Builder();
                builder.setToolbarColor(_headerColor.nativeObject);
                builder.setShowTitle(true);
                
                var shareIntent = new NativeIntent(NativeIntent.ACTION_SEND);
                shareIntent.setType("text/plain");
                shareIntent.putExtra(NativeIntent.EXTRA_TEXT, _url);
                var customTabsIntent = builder.build();

                try {
                    customTabsIntent.launchUrl(spratAndroidActivityInstance, NativeUri.parse(_url));
                }
                catch (e) {
                    throw new Error("" + e);
                }
            }
        }
    });
};


module.exports = WebBrowser;
