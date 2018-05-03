/**
 * @class UI.WebBrowser
 * @since 2.0.11
 *
 * An object that provides a standard interface for browsing the web.
 *
 *       @example
 *       const WebBrowser = require('sf-core/ui/webbrowser');
 *       var webOptions = new WebBrowser.Options();
 *       webOptions.url = "https://smartface.io"
 *       webOptions.barColor = Color.RED;
 *       webOptions.ios.itemColor = Color.BLUE;
 *       webOptions.ios.statusBarVisible = false;
 *       WebBrowser.show(page,options);
 */
function WebBrowser(params) {}

/**
 * 
 * This function shows WebBrowser on the given UI.Page.
 * 
 * @event show
 * @param {UI.WebBrowser.Options} options
 * @static
 * @android
 * @ios
 * @since 2.0.11
 */
WebBrowser.show = function(options) {};

/**
 * @class UI.WebBrowser.Options
 * @since 2.0.11
 *
 * An object that provides a standard interface for browsing the web.
 *
 *      @example
 *      var webOptions = new WebBrowser.Options();
 *      webOptions.url = "https://smartface.io"
 *      webOptions.barColor = Color.RED;
 *      webOptions.ios.itemColor = Color.BLUE;
 *      webOptions.ios.statusBarVisible = false;
 *      WebBrowser.show(page,options);
 */
WebBrowser.Options = function(options) {};

/**
 * Only HTTP and HTTPS URLs are supported.
 *
 * @property {String} [url = ""]
 * @android
 * @ios
 * @since 2.0.11
 */
WebBrowser.Options.prototype.url = null;

/**
 * The color to tint the background of the header bar and bottom bar.
 *
 * @property {UI.Color} [barColor = UI.Color.WHITE]
 * @android
 * @ios
 * @since 2.0.11
 */
WebBrowser.Options.prototype.barColor = Color.WHITE;

/**
 * The color to tint the the control buttons on the header bar and bottom bar. 
 *
 * @property {UI.Color} [itemColor = UI.Color.create("#00A1F1")]
 * @ios
 * @since 0.1
 */
WebBrowser.Options.prototype.itemColor = Color.create("#00A1F1");

/**
 * Gets/sets visibility of the status bar.
 *
 * @property {Boolean} [statusBarVisible = true]
 * @ios
 * @since 0.1
 */
WebBrowser.Options.prototype.statusBarVisible = true;

module.exports = WebBrowser;