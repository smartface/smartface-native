const Application = require("../../application");

function Linking() { }

Linking.openMap = (options) => {
  return new Promise((resolve, reject) => {
    const { latitude, longitude } = options.location;
    Application.call({
      uriScheme: `geo:${latitude},${longitude}?q=${encodeURIComponent(options.name)}`,
      chooserTitle: global.lang.chooseMapsApp || "Choose Maps App",
      onSuccess: (e) => resolve(e),
      onFailure: (e) => reject(e),
      isShowChooser: true
    });
  });
};

Linking.openNavigation = (options) => {
  return new Promise((resolve, reject) => {
    const { latitude, longitude } = options.location;
    Application.call({
      uriScheme: `geo:${latitude},${longitude}?q=${latitude},${longitude}&mode=${options.transportType}`,
      chooserTitle: global.lang.chooseMapsApp || "Choose Maps App",
      onSuccess: (e) => resolve(e),
      onFailure: (e) => reject(e),
      isShowChooser: true,
    });
  });
};

Linking.openSettings = () => {
  return new Promise((resolve, reject) => {
    const options = {
      uriScheme: "package:" + Application.android.packageName,
      onSuccess: () => resolve(),
      onFailure: () => reject(),
      action: "android.settings.APPLICATION_DETAILS_SETTINGS"
    };
    Application.call(options);
  });
}

module.exports = Linking;
