import Application from '../../application';
import AndroidConfig from '../../util/Android/androidconfig';
import TypeUtil from '../../util/type';
import { ILinking } from './linking';

const NativeIntent = requireClass('android.content.Intent');
const NativeUri = requireClass('android.net.Uri');

const ACTION_VIEW = 'android.intent.action.VIEW';

class LinkingAndroidClass implements ILinking {
  openSettings(): Promise<void> {
    return new Promise((resolve, reject) => {
      const options = {
        uriScheme: 'package:' + Application.android.packageName,
        onSuccess: () => resolve(),
        onFailure: () => reject(),
        action: 'android.settings.APPLICATION_DETAILS_SETTINGS'
      };
      this.openURL(options);
    });
  }
  canOpenURL(url: string): boolean {
    if (!url) {
      throw new Error("url parameter can't be empty.");
    }
    if (!TypeUtil.isString(url)) {
      new Error('url parameter must be string.');
    }
    const launchIntent = new NativeIntent(NativeIntent.ACTION_VIEW);
    launchIntent.setData(NativeUri.parse(url));
    const packageManager = AndroidConfig.activity.getApplicationContext().getPackageManager();
    const componentName = launchIntent.resolveActivity(packageManager);
    if (componentName === null) {
      return false;
    }
    const fallback = '{com.android.fallback/com.android.fallback.Fallback}';
    return !(fallback === componentName.toShortString());
  }
  openURL(options: { uriScheme?: string; data?: {}; onSuccess?: (value?: any) => void; onFailure?: (value?: any) => void; isShowChooser?: boolean; chooserTitle?: string; action?: string }): void {
    const { uriScheme, data = {}, onSuccess, onFailure, isShowChooser, chooserTitle, action = ACTION_VIEW } = options;
    if (typeof uriScheme !== 'string') {
      throw new TypeError('uriScheme must be string');
    }

    const intent = new NativeIntent(action);
    let uriObject: any;
    const dataKeys = Object.keys(data);
    if (TypeUtil.isObject(data) && dataKeys.length > 0) {
      // we should use intent.putExtra but it causes native crash.
      const params = dataKeys.map((k) => `${k}=${data?.[k]}`).join('&');

      if (uriScheme.indexOf('|') !== -1) {
        this.configureIntent(intent, uriScheme);
        uriObject = NativeUri.parse(params);
      } else {
        const uri = uriScheme + '?' + params;
        uriObject = NativeUri.parse(uri);
      }
    } else {
      if (uriScheme.indexOf('|') !== -1) {
        this.configureIntent(intent, uriScheme);
      } else {
        uriObject = NativeUri.parse(uriScheme);
      }
    }
    uriObject && intent.setData(uriObject);

    const packageManager = AndroidConfig.activity.getPackageManager();
    const activitiesCanHandle = packageManager.queryIntentActivities(intent, 0);
    if (activitiesCanHandle.size() > 0) {
      if (TypeUtil.isBoolean(isShowChooser) && isShowChooser) {
        const title = TypeUtil.isString(chooserTitle) ? chooserTitle : 'Select and application';
        const chooserIntent = NativeIntent.createChooser(intent, title);
        try {
          AndroidConfig.activity.startActivity(chooserIntent); // Due to the AND-3202: we have changed startActivityForResult
        } catch (e) {
          onFailure?.(e);
          return;
        }
      } else {
        try {
          AndroidConfig.activity.startActivity(intent); // Due to the AND-3202: we have changed startActivityForResult
        } catch (e) {
          onFailure?.(e);
          return;
        }
      }
      onSuccess?.();
      return;
    }
    onFailure?.();
  }

  private configureIntent(intent: any, uriScheme: string) {
    const classActivityNameArray = uriScheme.split('|');
    intent.setClassName(classActivityNameArray[0], classActivityNameArray[1]);
  }
}

const LinkingAndroid = new LinkingAndroidClass();

export default LinkingAndroid;
