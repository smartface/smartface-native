import { AbstractWebBrowser } from '.';
import Color from '../color';
import Page from '../page';
import { WebBrowserOptions } from './webbrowseroptions';

export class WebBrowserAndroid implements AbstractWebBrowser {
  public static readonly Options = WebBrowserOptions;
  url: string = '';
  barColor: Color = Color.WHITE;
  itemColor: Color = Color.create('#00A1F1');
  statusBarVisible: boolean = true;
  constructor(params?: Partial<WebBrowserAndroid>) {
    // Assign parameters given in constructor
    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
  }
  show(page: Page, options: Partial<WebBrowserAndroid>) {
    if (!(options && options.url && (options.url.startsWith('https://') || options.url.startsWith('http://')))) {
      throw new Error('The specified URL has an unsupported scheme. Only HTTP and HTTPS URLs are supported.');
    } else {
      const NativeCustomTabsIntent = requireClass('androidx.browser.customtabs.CustomTabsIntent');
      const NativeUri = requireClass('android.net.Uri');
      const spratAndroidActivityInstance = requireClass('io.smartface.android.SpratAndroidActivity').getInstance();

      const builder = new NativeCustomTabsIntent.Builder();
      builder.setToolbarColor(options.barColor?.nativeObject);
      builder.setShowTitle(true);

      try {
        const customTabsIntent = builder.build();
        customTabsIntent.launchUrl(spratAndroidActivityInstance, NativeUri.parse(options.url));
      } catch (e) {
        throw new Error('' + e);
      }
    }
  }
}
