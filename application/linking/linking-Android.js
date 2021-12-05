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