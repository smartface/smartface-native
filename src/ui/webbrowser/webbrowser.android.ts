import { AbstractWebBrowser } from './webbrowser';
import Color from '../color';
import Page from '../page';
import { WebBrowserOptions } from './webbrowseroptions';

export default class WebBrowserAndroid implements AbstractWebBrowser {
  static readonly Options = WebBrowserOptions;

  static show(page: Page, options: Partial<WebBrowserOptions>) {
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
