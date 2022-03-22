import { AbstractWebBrowser } from '.';
import Page from '../page';
import Color from '../color';
import Invocation from '../../util/iOS/invocation';
import { WebBrowserOptions } from './webbrowseroptions';

export default class WebBrowserIOS implements AbstractWebBrowser {
  static readonly Options = WebBrowserOptions;

  static show(page: Page, options: Partial<WebBrowserOptions>) {
    if (!(options && options.url && (options.url.startsWith('https://') || options.url.startsWith('http://')))) {
      throw new Error('The specified URL has an unsupported scheme. Only HTTP and HTTPS URLs are supported.');
    }
    const nsURL = __SF_NSURL.URLWithString(options.url);
    const safariViewController = __SF_SMFSFSafariViewController.create(nsURL, false);
    const argBarColor = new Invocation.Argument({
      type: 'NSObject',
      value: options.barColor?.nativeObject
    });
    Invocation.invokeInstanceMethod(safariViewController, 'setPreferredBarTintColor:', [argBarColor]);
    const argItemColor = new Invocation.Argument({
      type: 'NSObject',
      value: options.itemColor?.nativeObject
    });
    Invocation.invokeInstanceMethod(safariViewController, 'setPreferredControlTintColor:', [argItemColor]);
    const argPresentationStyle = new Invocation.Argument({
      type: 'NSInteger',
      value: 7
    });
    Invocation.invokeInstanceMethod(safariViewController, 'setModalPresentationStyle:', [argPresentationStyle]);

    page.nativeObject.presentViewController(safariViewController);
  }
}
