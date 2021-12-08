const Application = require("../../application");
const TypeUtil = require("../../util/type");
const AndroidConfig = require("../../util/Android/androidconfig");

// Intent.ACTION_VIEW
const ACTION_VIEW = "android.intent.action.VIEW";

const activity = AndroidConfig.activity;

function Linking() { }

Linking.openSettings = () => {
  return new Promise((resolve, reject) => {
    const options = {
      uriScheme: "package:" + Application.android.packageName,
      onSuccess: () => resolve(),
      onFailure: () => reject(),
      action: "android.settings.APPLICATION_DETAILS_SETTINGS"
    };
    Linking.openURL(options);
  });
};

Linking.canOpenURL = () => { };

Linking.openURL = (options) => {
  const {
    uriScheme,
    data,
    onSuccess,
    onFailure,
    isShowChooser,
    chooserTitle,
    action = ACTION_VIEW
  } = options

  if (!TypeUtil.isString(uriScheme)) {
    throw new TypeError('uriScheme must be string');
  }

  const NativeIntent = requireClass("android.content.Intent");
  const NativeUri = requireClass("android.net.Uri");

  let intent = new NativeIntent(action);
  let uriObject;
  if (TypeUtil.isObject(data) && Object.keys(data).length > 0) {
    // we should use intent.putExtra but it causes native crash.
    let params = Object.keys(data).map(function (k) {
      return k + '=' + data[k];
    }).join('&');

    if (uriScheme.indexOf("|") !== -1) {
      configureIntent.call(intent, uriScheme);
      uriObject = NativeUri.parse(params);
    } else {
      let uri = uriScheme + "?" + params;
      uriObject = NativeUri.parse(uri);
    }
  } else {
    if (uriScheme.indexOf("|") !== -1)
      configureIntent.call(intent, uriScheme);
    else
      uriObject = NativeUri.parse(uriScheme);
  }
  uriObject && intent.setData(uriObject);

  let packageManager = activity.getPackageManager();
  let activitiesCanHandle = packageManager.queryIntentActivities(intent, 0);
  if (activitiesCanHandle.size() > 0) {
    if (TypeUtil.isBoolean(isShowChooser) && isShowChooser) {
      let title = TypeUtil.isString(chooserTitle) ? chooserTitle : "Select and application";
      let chooserIntent = NativeIntent.createChooser(intent, title);
      try {
        activity.startActivity(chooserIntent); // Due to the AND-3202: we have changed startActivityForResult
      } catch (e) {
        onFailure && onFailure();
        return;
      }
    } else {
      try {
        activity.startActivity(intent); // Due to the AND-3202: we have changed startActivityForResult
      } catch (e) {
        onFailure && onFailure();
        return;
      }
    }
    onSuccess && onSuccess();
    return;
  }
  onFailure && onFailure();
};

module.exports = Linking;
