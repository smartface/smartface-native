import { IWebBrowser, WebBrowserBase } from './webbrowser';
import Page from '../page';
import Invocation from '../../util/iOS/invocation';

export default class WebBrowserIOS extends WebBrowserBase {
  private _options?: Partial<IWebBrowser>;
  constructor(params?: Partial<IWebBrowser>) {
    super(params);
    this._options = Object.assign({}, params);
  }
  protected createNativeObject() {
    return null;
  }
  show(page: Page) {
    if (!(this._options && this._options.url && (this._options.url.startsWith('https://') || this._options.url.startsWith('http://')))) {
      throw new Error('The specified URL has an unsupported scheme. Only HTTP and HTTPS URLs are supported.');
    }
    const nsURL = __SF_NSURL.URLWithString(this._options.url);
    const safariViewController = __SF_SMFSFSafariViewController.create(nsURL, false);
    if (this._options.barColor?.nativeObject) {
      const argBarColor = new Invocation.Argument({
        type: 'NSObject',
        value: this._options.barColor?.nativeObject
      });
      Invocation.invokeInstanceMethod(safariViewController, 'setPreferredBarTintColor:', [argBarColor]);
    }
    if (this._options.ios?.itemColor?.nativeObject) {
      const argItemColor = new Invocation.Argument({
        type: 'NSObject',
        value: this._options.ios?.itemColor?.nativeObject
      });
      Invocation.invokeInstanceMethod(safariViewController, 'setPreferredControlTintColor:', [argItemColor]);
    }
    const argPresentationStyle = new Invocation.Argument({
      type: 'NSInteger',
      value: 7
    });
    Invocation.invokeInstanceMethod(safariViewController, 'setModalPresentationStyle:', [argPresentationStyle]);

    page.nativeObject.presentViewController(safariViewController);
  }
}
