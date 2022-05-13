import NativeComponent from '../../core/native-component';
import { INativeMobileComponent, MobileOSProps } from '../../core/native-mobile-component';
import Color from '../color';
import { IPage } from '../page/page';

export interface IWebBrowserIOSProps {
  itemColor?: Color;
}

export interface IWebBrowser<TNative = any, TProps extends MobileOSProps<IWebBrowserIOSProps, {}> = MobileOSProps<IWebBrowserIOSProps, {}>> extends INativeMobileComponent<TNative, TProps> {
  url: string;
  barColor?: Color;
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
export class WebBrowserBase extends NativeComponent {
  protected createNativeObject(params?: Partial<Record<string, any>>) {
    throw new Error('createNativeObject Method not implemented.');
  }
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
  show(page: IPage) {
    throw new Error('show() Method not implemented.');
  }
  constructor(params?: Partial<IWebBrowser>) {
    super(params);
  }
}
