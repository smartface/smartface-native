import OverScrollMode from '../android/overscrollmode';
import Page from '../page';
import File from '../../io/file';
import ContentInsetAdjustment from '../ios/contentinsetadjustment';
import { Boundary } from '../../primitive/boundary';
import { EventType } from 'core/eventemitter/EventType';
import { ExtractEventValues } from 'core/eventemitter/extract-event-values';
import { EventEmitterMixin, IEventEmitter } from 'core/eventemitter';
import { INativeComponent } from 'core/inative-component';
import { ViewEvents } from '../view/view-event';
import NativeComponent from 'core/native-component';

export type AndroidProps = {
/**
   * Gets/sets over-scroll mode for this view.
   *
   * @property {UI.Android.OverScrollMode} [overScrollMode = UI.Android.OverScrollMode.ALWAYS]
   * @android
   * @since 3.2.1
   */
 overScrollMode: OverScrollMode;
 /**
  * Sets/Gets the current page which contains the webview.
  *
  * @property {UI.Page} page
  * @android
  * @since 2.0.10
  */
 page: Page;
 /**
  * Sets/Gets the visibility of zoom controls.
  *
  * @property {Boolean} displayZoomControls
  * @android
  * @since 4.3.4
  */
 displayZoomControls: boolean;
 /**
  * This event will be triggered when user clicks back button on the Device. WebView is focusable view. When it gains focus, this
  * event begin to trigger. The purpose of using this event might be
  * navigating back to pervious web pages.
  *
  * @event onBackButtonPressed
  * @deprecated
  * @android
  * @since 3.2.1
  * @example
  * ````
  * import WebView from '@smartface/native/ui/webview';
  *
  * const webView = new WebView();
  * webView.on(WebView.Events.BackButtonPressed, () => {
  * 	console.info('onBackButtonPressed');
  * });
  * ````
  */
 onBackButtonPressed?: () => void;
 /**
  * Report a JavaScript console message to the host application.
  *
  * @event onConsoleMessage
  * @deprecated
  * @param {Object} params
  * @param {Number} params.sourceId     The name of the source file that caused the error.
  * @param {String} params.message      The error message to report.
  * @param {String} params.lineNumber   The line number of the error.
  * @param {String} params.messageLevel The message level of the report
  * @android
  * @since 4.0.4
  * @example
  * ````
  * import WebView from '@smartface/native/ui/webview';
  *
  * const webView = new WebView();
  * webView.on(WebView.Events.ConsoleMessage, (params) => {
  * 	console.info('onConsoleMessage', params);
  * });
  * ````
  */
 onConsoleMessage?: (params: { sourceId: number; message: string; lineNumber: number; messageLevel: string }) => void;
 /**
  * Removes the autocomplete popup from the currently focused form field, if present.
  *
  * @method clearFormData
  * @android
  * @since 2.0.7
  */
 clearFormData(): void;
 /**
  * Tells this WebView to clear its internal back/forward list.
  *
  * @method clearHistory
  * @android
  * @since 2.0.7
  */
 clearHistory(): void;
 /**
  * Enables debugging of WebView contents.
  *
  * @method setWebContentsDebuggingEnabled
  * @android
  * @param {Boolean} [enabled=false]
  * @static
  * @since 4.0.6
  */
 setWebContentsDebuggingEnabled(enabled: boolean): void;
}

export type iOSProps= {
  /**
   * Sets/Gets the bounce effect when scrolling.
   *
   * @property {Boolean} bounces
   * @ios
   * @since 3.2.1
   */
  bounces: boolean;
  /**
   * This event is triggered more than once to get safeAreaInsets.
   *
   * @event safeAreaInsets
   * @param {Object} systemSafeAreaInsets
   * @param {Number} systemSafeAreaInsets.top
   * @param {Number} systemSafeAreaInsets.bottom
   * @param {Number} systemSafeAreaInsets.right
   * @param {Number} systemSafeAreaInsets.left
   * @return {Object} safeAreaInsets
   * @return {Number} return.top
   * @return {Number} return.bottom
   * @return {Number} return.right
   * @return {Number} return.left
   * @ios
   * @since 3.2.1
   */
  safeAreaInsets?: (e: Boundary) => Boundary;
  /**
   * The behavior for determining the adjusted content offsets.
   *
   * @property {UI.iOS.ContentInsetAdjustment} [contentInsetAdjustmentBehavior = UI.iOS.ContentInsetAdjustment.NEVER]
   * @ios
   * @since 4.0.0
   */
  contentInsetAdjustmentBehavior: ContentInsetAdjustment;
};
declare enum WebViewEvents {
  /**
   * This event will be triggered when user clicks back button on the Device. WebView is focusable view. When it gains focus, this
   * event begin to trigger. The purpose of using this event might be
   * navigating back to pervious web pages.
   *
   * @event onBackButtonPressed
   * @android
   * @since 3.2.1
   */
  BackButtonPressed = 'backButtonPressed',
  /**
   * Callback triggered when the url is changed. If it returns false, cannot navigate to the url.
   *
   * @event onChangedURL
   * @param {Object} event
   * @param {String} event.url
   * @return {Boolean}
   * @android
   * @ios
   * @since 0.1
   */
  ChangedURL = 'changedURL',
  /**
   * Report a JavaScript console message to the host application.
   *
   * @event onConsoleMessage
   * @param {Object} params
   * @param {Number} params.sourceId     The name of the source file that caused the error.
   * @param {String} params.message      The error message to report.
   * @param {String} params.lineNumber   The line number of the error.
   * @param {String} params.messageLevel The message level of the report
   * @android
   * @since 4.0.4
   */
  ConsoleMessage = 'consoleMessage',
  /**
   * Callback triggered when an error occured while loading a web page.
   *
   * @event onError
   * @param {Object} event
   * @param {String} event.url
   * @param {Number} event.code
   * @param {String} event.message
   * @android
   * @ios
   * @since 0.1
   */
  Error = 'error',
  /**
   * Callback triggered when the web page has started loading. In Android, This method is called once for each main frame load so a page with iframes or
   * framesets will call onLoad one time for the main frame.
   *
   * @event onLoad
   * @param {Object} event
   * @param {String} event.url
   * @android
   * @ios
   * @since 0.1
   */
  Load = 'load',
  /**
   * Callback triggered when the target equals to _blank. That means open new window.
   *
   *     @example
   *     myWebView.ios.onOpenNewWindow = function(event) {
   *         myWebView.loadURL(event.url);
   *     };
   *
   * @event onOpenNewWindow
   * @param {Object} event
   * @param {String} event.url
   * @iosx
   * @since 4.0.1
   */
  OpenNewWindow = 'openNewWindow',
  /**
   * Callback triggered when a web page has finished loading. In Android, this method is called only for main frame. Receiving an onShow callback
   * does not guarantee that the next frame drawn by WebView will reflect the state of the DOM at this point.
   *
   * @event onShow
   * @param {Object} event
   * @param {String} event.url
   * @android
   * @ios
   * @since 0.1
   */
  Show = 'show'
}

/**
 * @class UI.WebView
 * @since 0.1
 * @extends UI.View
 *
 * WebView shows web pages and displays custom html code.
 * It also holds some of the common functionalities of browsers like refresh, go back and etc.
 *
 *     @example
 *     const WebView = require('@smartface/native/ui/webview');
 *     const Flex = require('@smartface/native/ui/flexlayout')
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

interface IWebView<TEvent extends EventType = ExtractEventValues<typeof WebViewEvents>> extends IEventEmitter<ExtractEventValues<TEvent> | ExtractEventValues<typeof WebViewEvents>>, INativeComponent {
  /**
   * Indicates whether the links clicked on the webview will be rendered inside the webview or not.
   * Otherwise, the default browser of the device will handle that link.
   *
   * @property {Boolean} openLinkInside
   * @android
   * @ios
   * @since 0.1
   */
  openLinkInside: boolean;
  /**
   * If this property is false then scrolling ability is no longer exist.
   *
   * @property {Boolean} scrollEnabled
   * @android
   * @ios
   * @since 1.1.16
   */
  scrollEnabled: boolean;
  /**
   * Sets/Gets the userAgent. On Android, if the string is null or empty,
   * the system default value will be used. Changing the user-agent while
   * loading a web page causes WebView to initiate loading once again.
   * On iOS, default of userAgent property is empty string.
   *
   * @property {String} userAgent
   * @android
   * @ios
   * @since 4.1.1
   */
  userAgent: string;
  /**
   * Sets/Gets the visibility of scrollbar.
   *
   * @property {Boolean} scrollBarEnabled
   * @android
   * @ios
   * @since 1.1.12
   */
  scrollBarEnabled: boolean;
  /**
   * Sets/Gets the bounce effect when scrolling.
   *
   * @property {Boolean} bounceEnabled
   * @deprecated 3.2.1 Use {@link UI.WebView#bounces} for iOS or Use {@link UI.WebView#overScrollMode} for Android.
   * @android
   * @ios
   * @since 1.1.12
   */
  bounceEnabled: boolean;
  /**
   * Reloads the current page.
   *
   * @method refresh
   * @android
   * @ios
   * @since 0.1
   */
  refresh(): void;
  /**
   * Goes back to the previous web page.
   *
   * @method goBack
   * @android
   * @ios
   * @since 0.1
   */
  goBack(): void;
  /**
   * Goes back to the next web page if there is any.
   *
   * @method goForward
   * @android
   * @ios
   * @since 0.1
   */
  goForward(): void;
  /**
   * Enables zoom on the web page with gestures.
   *
   * @property {Boolean} zoomEnabled
   * @android
   * @ios
   * @since 0.1
   */
  zoomEnabled: boolean;
  /**
   * Loads the web page provided via the url.
   *
   * @method loadURL
   * @param {String} url
   * @android
   * @ios
   * @since 0.1
   */
  loadURL(url: string): void;
  /**
   * Loads the web page provided via html code.
   *
   * @method loadHTML
   * @param {String} htmlText
   * @android
   * @ios
   * @since 0.1
   */
  loadHTML(html: string): void;
  /**
   * Loads the web page provided via {@link IO.File}. You can load complete web page with
   * this method by passing index.html as a file.
   *
   * @method loadFile
   * @param {IO.File} file
   * @android
   * @ios
   * @since 1.1.16
   */
  loadFile(file: File): void;
  /**
   * Runs a javascript code. Return value must be inside a function.
   *
   *     @example
   *     const WebView = require('@smartface/native/ui/webview');
   *     const Flex = require('@smartface/native/ui/flexlayout');
   *
   *     var myScript = `
   *         function doSomething() {
   *             return "value";
   *         }
   *         doSomething();
   *     `;
   *
   *     var myWebView = new WebView({
   *         left:10, top:10, right:10, bottom:10,
   *         positionType: Flex.PositionType.ABSOLUTE
   *         onShow: function(event) {
   *             myWebView.evaluateJS(myScript, function(value) {
   *                 console.log("Result " + value);
   *             });
   *         }
   *     });
   *     page.layout.addChild(myWebView);
   *     myWebView.loadURL('https://www.google.com');
   *
   * @method evaluateJS
   * @param {String} javascript
   * @param {Function} onReceive
   * @param {String} onReceive.value
   * @android
   * @ios
   * @since 0.1
   */
  evaluateJS(javascript: string, onReceive: (value: string) => void): void;
  /**
   * Callback triggered when the url is changed. If it returns false, cannot navigate to the url.
   *
   * @event onChangedURL
   * @param {Object} event
   * @param {String} event.url
   * @return {Boolean}
   * @deprecated
   * @android
   * @ios
   * @since 0.1
   * @example
   * ````
   * import WebView from '@smartface/native/ui/webview';
   *
   * const webView = new WebView();
   * webView.on(WebView.Events.ChangedURL, (params) => {
   * 	console.info('onChangedURL', params);
   * });
   * ````
   */
  onChangedURL?: (e: { url: string }) => boolean;
  /**
   * Callback triggered when the web page has started loading. In Android, This method is called once for each main frame load so a page with iframes or
   * framesets will call onLoad one time for the main frame.
   *
   * @event onLoad
   * @param {Object} event
   * @param {String} event.url
   * @android
   * @deprecated
   * @ios
   * @since 0.1
   * @example
   * ````
   * import WebView from '@smartface/native/ui/webview';
   *
   * const webView = new WebView();
   * webView.on(WebView.Events.Load, (params) => {
   * 	console.info('onLoad', params);
   * });
   * ````
   */
  onLoad?: (e: { url: string }) => void;
  /**
   * Callback triggered when the target equals to _blank. That means open new window.
   *
   *     @example
   *     myWebView.ios.onOpenNewWindow = function(event) {
   *         myWebView.loadURL(event.url);
   *     };
   *
   * @event onOpenNewWindow
   * @deprecated
   * @param {Object} event
   * @param {String} event.url
   * @ios
   * @since 4.0.1
   * @example
   * ````
   * import WebView from '@smartface/native/ui/webview';
   *
   * const webView = new WebView();
   * webView.on(WebView.Events.OpenNewWindow, (params) => {
   * 	console.info('onOpenNewWindow', params);
   * });
   * ````
   */
  onOpenNewWindow?: (e: { url: string }) => void;
  /**
   * Callback triggered when an error occured while loading a web page.
   *
   * @event onError
   * @deprecated
   * @param {Object} event
   * @param {String} event.url
   * @param {Number} event.code
   * @param {String} event.message
   * @android
   * @ios
   * @since 0.1
   * @example
   * ````
   * import WebView from '@smartface/native/ui/webview';
   *
   * const webView = new WebView();
   * webView.on(WebView.Events.Error, (params) => {
   * 	console.info('onError', params);
   * });
   * ````
   */
  onError?: (e: { url: string; code: number; message: string }) => void;
  /**
   * Callback triggered when a web page has finished loading. In Android, this method is called only for main frame. Receiving an onShow callback
   * does not guarantee that the next frame drawn by WebView will reflect the state of the DOM at this point.
   *
   * @event onShow
   * @deprecated
   * @param {Object} event
   * @param {String} event.url
   * @android
   * @ios
   * @since 0.1
   * @example
   * ````
   * import WebView from '@smartface/native/ui/webview';
   *
   * const webView = new WebView();
   * webView.on(WebView.Events.Show, (params) => {
   * 	console.info('onShow', params);
   * });
   * ````
   */
  onShow?: (e: { url: string }) => void;
  /**
   * Clears the resource cache.
   *
   * @method clearCache
   * @param {Boolean} deleteDiskFiles
   * @android
   * @ios
   * @since 2.0.7
   */
  clearCache(deleteDiskFiles: boolean): void;
  /**
   * Tells this WebView to clear its Cookie.
   *
   * @method clearCookie
   * @android
   * @ios
   * @since 2.0.7
   */
  clearCookie(): void;
  /**
   * This method clear all data from webview.
   *
   * @method clearAllData
   * @android
   * @ios
   * @since 2.0.7
   */
  clearAllData(): void;
  android: Partial<{
      /**
       * Gets/sets over-scroll mode for this view.
       *
       * @property {UI.Android.OverScrollMode} [overScrollMode = UI.Android.OverScrollMode.ALWAYS]
       * @android
       * @since 3.2.1
       */
      overScrollMode: OverScrollMode;
      /**
       * Sets/Gets the current page which contains the webview.
       *
       * @property {UI.Page} page
       * @android
       * @since 2.0.10
       */
      page: Page | undefined;
      /**
       * Sets/Gets the visibility of zoom controls.
       *
       * @property {Boolean} displayZoomControls
       * @android
       * @since 4.3.4
       */
      displayZoomControls: boolean;
      /**
       * This event will be triggered when user clicks back button on the Device. WebView is focusable view. When it gains focus, this
       * event begin to trigger. The purpose of using this event might be
       * navigating back to pervious web pages.
       *
       * @event onBackButtonPressed
       * @deprecated
       * @android
       * @since 3.2.1
       * @example
       * ````
       * import WebView from '@smartface/native/ui/webview';
       *
       * const webView = new WebView();
       * webView.on(WebView.Events.BackButtonPressed, () => {
       * 	console.info('onBackButtonPressed');
       * });
       * ````
       */
      onBackButtonPressed?: () => void;
      /**
       * Report a JavaScript console message to the host application.
       *
       * @event onConsoleMessage
       * @deprecated
       * @param {Object} params
       * @param {Number} params.sourceId     The name of the source file that caused the error.
       * @param {String} params.message      The error message to report.
       * @param {String} params.lineNumber   The line number of the error.
       * @param {String} params.messageLevel The message level of the report
       * @android
       * @since 4.0.4
       * @example
       * ````
       * import WebView from '@smartface/native/ui/webview';
       *
       * const webView = new WebView();
       * webView.on(WebView.Events.ConsoleMessage, (params) => {
       * 	console.info('onConsoleMessage', params);
       * });
       * ````
       */
      onConsoleMessage?: (params: { sourceId: number; message: string; lineNumber: number; messageLevel: string }) => void;
      /**
       * Removes the autocomplete popup from the currently focused form field, if present.
       *
       * @method clearFormData
       * @android
       * @since 2.0.7
       */
      clearFormData(): void;
      /**
       * Tells this WebView to clear its internal back/forward list.
       *
       * @method clearHistory
       * @android
       * @since 2.0.7
       */
      clearHistory(): void;
      /**
       * Enables debugging of WebView contents.
       *
       * @method setWebContentsDebuggingEnabled
       * @android
       * @param {Boolean} [enabled=false]
       * @static
       * @since 4.0.6
       */
      setWebContentsDebuggingEnabled(enabled: boolean): void;
    }>;
  ios: Partial<{
      /**
       * Sets/Gets the bounce effect when scrolling.
       *
       * @property {Boolean} bounces
       * @ios
       * @since 3.2.1
       */
      bounces: boolean;
      /**
       * This event is triggered more than once to get safeAreaInsets.
       *
       * @event safeAreaInsets
       * @param {Object} systemSafeAreaInsets
       * @param {Number} systemSafeAreaInsets.top
       * @param {Number} systemSafeAreaInsets.bottom
       * @param {Number} systemSafeAreaInsets.right
       * @param {Number} systemSafeAreaInsets.left
       * @return {Object} safeAreaInsets
       * @return {Number} return.top
       * @return {Number} return.bottom
       * @return {Number} return.right
       * @return {Number} return.left
       * @ios
       * @since 3.2.1
       */
      safeAreaInsets?: (e: Boundary) => Boundary;
      /**
       * The behavior for determining the adjusted content offsets.
       *
       * @property {UI.iOS.ContentInsetAdjustment} [contentInsetAdjustmentBehavior = UI.iOS.ContentInsetAdjustment.NEVER]
       * @ios
       * @since 4.0.0
       */
      contentInsetAdjustmentBehavior: ContentInsetAdjustment;
      /**
       * Uses the pinned certificates to validate the server trust. The server trust is considered valid if one of the pinned certificates match one of the server certificates.
       * By validating both the certificate chain and host, certificate pinning provides a very secure form of server trust validation mitigating most, if not all, MITM attacks.
       * Applications are encouraged to always validate the host and require a valid certificate chain in production environments.
       *
       * @property {Array}    sslPinning
       * @property {String}   sslPinning.host
       * @property {Array}    sslPinning.certificates Only DER format accepted.
       * @property {Boolean}  [sslPinning.validateCertificateChain=true]
       * @property {Boolean}  [sslPinning.validateHost=true]
       * @ios
       * @since 4.3.4
       */
      sslPinning?: [
            {
              host: string;
              certificates: Array<string>;
              validateCertificateChain?: boolean;
              validateHost?: boolean;
            }
          ];
    }>;
}
const NativeEventEmitter = EventEmitterMixin(NativeComponent);

export declare class WebViewBase<TEvent extends { [key: string]: any } = { [key: string]: any }> extends NativeEventEmitter<TEvent & WebViewEvents> implements IWebView  {
  constructor(params?: Partial<IWebView>);
  android: Partial<AndroidProps>;
  ios: Partial<iOSProps>;
  nativeObject: any;
  openLinkInside: boolean;
  scrollEnabled: boolean;
  userAgent: string;
  scrollBarEnabled: boolean;
  bounceEnabled: boolean;
  refresh(): void;
  goBack(): void;
  goForward(): void;
  zoomEnabled: boolean;
  loadURL(url: string): void;
  loadHTML(html: string): void;
  loadFile(file: File): void;
  evaluateJS(javascript: string, onReceive: (value: string) => void): void;
  onChangedURL?: (e: { url: string; }) => boolean;
  onLoad?: (e: { url: string; }) => void;
  onOpenNewWindow?: (e: { url: string; }) => void;
  onError?: (e: { url: string; code: number; message: string; }) => void;
  onShow?: (e: { url: string; }) => void;
  clearCache(deleteDiskFiles: boolean): void;
  clearCookie(): void;
  clearAllData(): void;
  static Events: typeof ViewEvents & WebViewEvents;
}

export default IWebView;
