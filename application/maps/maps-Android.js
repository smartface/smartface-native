const Linking = require('../linking');

const openMaps = (options) => {
  return new Promise((resolve, reject) => {
    const { latitude, longitude } = options.location;
    const locationName = options.name || '';
    Linking.openURL({
      uriScheme: `geo:${latitude},${longitude}?q=${encodeURIComponent(locationName)}`,
      chooserTitle: global.lang.chooseMapsApp || "Choose Maps App",
      onSuccess: (e) => resolve(e),
      onFailure: (e) => reject(e),
      isShowChooser: true
    });
  });
};

const openNavigation = (options) => {
  return new Promise((resolve, reject) => {
    const { latitude, longitude } = options.location;
    const transportType = options.transportType;
    Linking.openURL({
      uriScheme: `geo:${latitude},${longitude}?q=${latitude},${longitude}&mode=${transportType}`,
      chooserTitle: global.lang.chooseMapsApp || "Choose Maps App",
      onSuccess: (e) => resolve(e),
      onFailure: (e) => reject(e),
      isShowChooser: true,
    });
  });
};

module.exports = {
  openMaps,
  openNavigation
}