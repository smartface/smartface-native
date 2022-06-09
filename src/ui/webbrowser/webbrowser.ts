import { INativeMobileComponent, MobileOSProps } from '../../core/native-mobile-component';
import { IColor } from '../color/color';
import { IPage } from '../page/page';

export interface IWebBrowserIOSProps {
  /**
   * The color to tint the the control buttons on the header bar and bottom bar.
   *
   * @property {UI.Color} [itemColor = UI.Color.create("#00A1F1")]
   * @ios
   * @since 0.1
   */
  itemColor?: IColor;
}

/**
 * @class UI.WebBrowser
 * @since 2.0.11
 *
 * An object that provides a standard interface for browsing the web.
 *
 *       @example
 *       import WebBrowser from '@smartface/native/ui/webbrowser';
 *       const webBrowser = new WebBrowser({
 *          url: 'https://smartface.io',
 *          barColor: Color.RED,
 *          ios: {
 *           itemColor: Color.GREEN
 *         }
 *       });
 *       webBrowser.show(this);
 */
export interface IWebBrowser<TNative = any, TProps extends MobileOSProps<IWebBrowserIOSProps, {}> = MobileOSProps<IWebBrowserIOSProps, {}>> extends INativeMobileComponent<TNative, TProps> {
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
  barColor?: IColor;
  /**
   *
   * This function shows WebBrowser on the given UI.Page.
   *
   * @event show
   * @param {UI.Page} page
   * @android
   * @ios
   * @since 2.0.11
   */
  show(page: IPage): void;
}
