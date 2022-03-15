import { AbstractWebBrowser } from '.';
import Page from '../page';
import Color from '../color';
import Invocation from '../../util/ios/invocation';
import { WebBrowserOptions } from './webbrowseroptions';

export class WebBrowserIOS implements AbstractWebBrowser {
  public static readonly Options = WebBrowserOptions;
  url: string = '';
  barColor: Color = Color.WHITE;
  itemColor: Color = Color.create('#00A1F1');
  statusBarVisible: boolean = true;
  constructor(params?: Partial<WebBrowserIOS>) {
    // Assign parameters given in constructor
    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
  }
  show(page: Page, options: Partial<WebBrowserIOS>) {
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
