function WebBrowser(params) {}

WebBrowser.open = function(options) {};
WebBrowser.Options = function(options) {};

WebBrowser.Options.prototype.url = null;
WebBrowser.Options.prototype.barColor = null;
WebBrowser.Options.prototype.ios.itemColor = null;
WebBrowser.Options.prototype.ios.statusBarVisible = true;

module.exports = WebBrowser;