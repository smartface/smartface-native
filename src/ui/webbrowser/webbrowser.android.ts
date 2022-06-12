import { NativeMobileComponent } from '../../core/native-mobile-component';
import { IColor } from '../color/color';
import { IPage } from '../page/page';
import { IWebBrowser } from './webbrowser';

const NativeCustomTabsIntent = requireClass('androidx.browser.customtabs.CustomTabsIntent');
const NativeUri = requireClass('android.net.Uri');
const spratAndroidActivityInstance = requireClass('io.smartface.android.SpratAndroidActivity').getInstance();
export default class WebBrowserAndroid extends NativeMobileComponent implements IWebBrowser {
  private _options?: Partial<IWebBrowser>;
  constructor(params?: Partial<IWebBrowser>) {
    super(params);
    this._options = Object.assign({}, params);
  }
  url: string;
  barColor?: IColor | undefined;
  protected createNativeObject() {
    return null;
  }
  show(page: IPage) {
    if (!(this._options && this._options.url && (this._options.url.startsWith('https://') || this._options.url.startsWith('http://')))) {
      throw new Error('The specified URL has an unsupported scheme. Only HTTP and HTTPS URLs are supported.');
    } else {
      const builder = new NativeCustomTabsIntent.Builder();
      if (this._options.barColor?.nativeObject) {
        builder.setToolbarColor(this._options.barColor?.nativeObject);
      }
      builder.setShowTitle(true);

      try {
        const customTabsIntent = builder.build();
        customTabsIntent.launchUrl(spratAndroidActivityInstance, NativeUri.parse(this._options.url));
      } catch (e) {
        throw new Error('' + e);
      }
    }
  }
}
