import Page from '../page';
import Color from '../color';

export declare class AbstractWebBrowserOptions {
  constructor(params?: Partial<AbstractWebBrowserOptions>);
  get url(): string;
  set url(value: string);
  get barColor(): Color;
  set barColor(value: Color);
  /**
   * Gets the itemColor.
   *
   * @returns {Color}
   * @ios
   * @since 2.0.11
   */
  get itemColor(): Color;
  /**
   * Sets the itemColor.
   *
   * @property {Color} [value = Color.BLACK]
   * @ios
   * @since 2.0.11
   */
  set itemColor(value: Color);
  /**
   * Gets the statusBar visibility.
   *
   * @returns {boolean}
   * @ios
   * @since 2.0.11
   */
  get statusBarVisible(): boolean;
  /**
   * Sets the statusBar visibility.
   *
   * @property {boolean} [value = true]
   * @ios
   * @since 2.0.11
   */
  set statusBarVisible(value: boolean);
}

/**
 * @class UI.WebBrowser
 * @since 2.0.11
 *
 * An object that provides a standard interface for browsing the web.
 *
 *       @example
 *       const WebBrowser = require('@smartface/native/ui/webbrowser');
 *       var webOptions = new WebBrowser.Options();
 *       webOptions.url = "https://smartface.io"
 *       webOptions.barColor = Color.RED;
 *       webOptions.ios.itemColor = Color.BLUE;
 *       WebBrowser.show(page,webOptions);
 */
export declare class AbstractWebBrowser {
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
   *      WebBrowser.show(page,options);
   */
  public static readonly Options: new (params?: Partial<AbstractWebBrowserOptions>) => AbstractWebBrowserOptions;
  /**
   *
   * This function shows WebBrowser on the given UI.Page.
   *
   * @event show
   * @param {UI.Page} page
   * @param {UI.WebBrowser.Options} options
   * @static
   * @android
   * @ios
   * @since 2.0.11
   */
  static show(page: Page, options: AbstractWebBrowserOptions): void;
  constructor(params?: AbstractWebBrowserOptions);
  /**
   * Only HTTP and HTTPS URLs are supported.
   *
   * @property {String} [url = ""]
   * @android
   * @ios
   * @since 2.0.11
   */
  url: string;
  /**
   * The color to tint the background of the header bar and bottom bar.
   *
   * @property {UI.Color} [barColor = UI.Color.WHITE]
   * @android
   * @ios
   * @since 2.0.11
   */
  barColor: Color;
  /**
   * The color to tint the the control buttons on the header bar and bottom bar.
   *
   * @property {UI.Color} [itemColor = UI.Color.create("#00A1F1")]
   * @ios
   * @since 0.1
   */
  itemColor: Color;
  /**
   * Gets/sets visibility of the status bar.
   *
   * @property {Boolean} [statusBarVisible = true]
   * @removed 4.0.0 Use {@link Application.statusBar} instead
   * @ios
   * @since 0.1
   */
  statusBarVisible: boolean;
}

const WebBrowser: typeof AbstractWebBrowser = require(`./webbrowser.${Device.deviceOS.toLowerCase()}`).default;
type WebBrowser = AbstractWebBrowser;

export default WebBrowser;
