const Linking = require('../linking');

const openMaps = (options) => {
  return new Promise((resolve, reject) => {
    const { latitude, longitude } = options.location;
    const locationName = options.name || '';
    const chooserTitle = options.chooserTitle || '';
    Linking.openURL({
      uriScheme: `geo:${latitude},${longitude}?q=${encodeURIComponent(locationName)}`,
      chooserTitle,
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
    const chooserTitle = options.chooserTitle || '';
    Linking.openURL({
      uriScheme: `geo:${latitude},${longitude}?q=${latitude},${longitude}&mode=${transportType}`,
      chooserTitle,
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