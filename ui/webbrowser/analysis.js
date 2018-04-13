/**
 * @class UI.WebBrowser
 * @since 2.0.11
 *
 * Open url with in app browser 
 *
 *    @example
 *    var options = new WebBrowser.Options({
 *       url: "http://twitter.com",
 *       barColor: Color.BLUE
 *    });
 * 
 */
function WebBrowser(params) {}

/**
 * 
 *
 * @event open
 * @param {options} WebBrowser.Options  
 * @android
 * @ios
 * @since 0.1
 */
WebBrowser.open = function(options) {};

/**
 * 
 *
 * @function Options
 * @param {options} WebBrowser.Options  
 * @android
 * @ios
 * @since 0.1
 */
WebBrowser.Options = function(options) {};

/**
 * 
 *
 * @property {Options.url} 
 * @android
 * @ios
 * @since 0.1
 */
WebBrowser.Options.prototype.url = null;

/**
 * 
 *
 * @property {Options.barColor} 
 * @android
 * @ios
 * @since 0.1
 */
WebBrowser.Options.prototype.barColor = null;

/**
 * 
 *
 * @property {Options.ios.itemColor} 
 * @android
 * @ios
 * @since 0.1
 */
WebBrowser.Options.prototype.ios.itemColor = null;

/**
 * 
 *
 * @property {Optionsios.ios.statusBarVisible} 
 * @android
 * @ios
 * @since 0.1
 */
WebBrowser.Options.prototype.ios.statusBarVisible = true;

module.exports = WebBrowser;