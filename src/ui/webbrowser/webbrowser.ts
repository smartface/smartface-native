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
 *       import WebBrowser from '@smartface/native/ui/webbrowser';
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
}
