/**
 * @class UI.WebView
 * @since 0.1
 * @extends UI.View
 * 
 * WebView shows web pages and displays custom html code. 
 * It also holds some of the common functionalities of browsers like refresh, go back and etc.
 * 
 *     @example
 *     const WebView = require('sf-core/ui/webview');
 *     const Flex = require('sf-core/ui/flexlayout')
 * 
 *     var myWebView = new WebView({
 *         left:10, top:10, right:10, bottom:10,
 *         positionType: Flex.PositionType.ABSOLUTE,
 *         onChangedURL: function(event) {
 *             console.log("Event Change URL: " + event.url);
 *         },
 *         onError: function(event) {
 *             console.log("Event Error : " + event.message + ", URL: " + event.url);
 *         },
 *         onLoad: function(event) {
 *             console.log("Event Load: " + event.url);
 *         },
 *         onShow: function(event) {
 *             console.log("Event Show: " + event.url);
 *         }
 *     });
 *     page.layout.addChild(myWebView);
 *     myWebView.loadURL('https://www.google.com');
 * 
 */
function WebView(params) {}

/**
 * Indicates whether the links clicked on the webview will be rendered inside the webview or not. 
 * Otherwise, the default browser of the device will handle that link.
 *
 * @property {Boolean} openLinkInside
 * @since 0.1
 */
WebView.prototype.openLinkInside = true;

/**
 * Reloads the current page.
 *
 * @method refresh
 * @since 0.1
 */
WebView.prototype.refresh = function() {};

/**
 * Goes back to the previous web page.
 *
 * @method goBack
 * @since 0.1
 */
WebView.prototype.goBack = function() {};

/**
 * Goes back to the next web page if there is any.
 *
 * @method goForward
 * @since 0.1
 */
WebView.prototype.goForward = function() {};

/**
 * Enables zoom on the web page with gestures.
 *
 * @property {Boolean} zoomEnabled
 * @since 0.1
 */
WebView.prototype.zoomEnabled = true;

/**
 * Loads the web page provided via the url.
 *
 * @method loadURL
 * @param {String} url
 * @since 0.1
 */
WebView.prototype.loadURL =  function(url) {};

/**
 * Loads the web page provided via html code.
 *
 * @method loadHTML
 * @param {String} htmlText
 * @since 0.1
 */
WebView.prototype. loadHTML = function(htmlText) {};

/**
 * Runs a javascript code.
 *
 * @method evaluateJS
 * @param {String} javascript
 * @since 0.1
 */
WebView.prototype.evaluateJS = function(javascript) {};

/**
 * Callback triggered when the url is changed.
 *
 * @event onChangedURL
 * @param {Object} event
 * @param {String} event.url
 * @since 0.1
 */
WebView.prototype.onChangedURL = function(event) {};

/**
 * Callback triggered when the web page is loaded.
 *
 * @event onLoad
 * @param {Object} event
 * @param {String} event.url
 * @since 0.1
 */
WebView.prototype.onLoad = function(event) {};

/**
 * Callback triggered when an error occured while loading a web page.
 *
 * @event onError
 * @param {Object} event
 * @param {String} event.url
 * @param {Number} event.code
 * @param {String} event.message
 * @since 0.1
 */
WebView.prototype.onError = function(event) {};

/**
 * Callback triggered when a web page is loaded and displayed on the webview.
 *
 * @event onShow
 * @param {Object} event
 * @param {String} event.url
 * @since 0.1
 */
WebView.prototype.onShow = function(event) {};

module.exports = WebView;