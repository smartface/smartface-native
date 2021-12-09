const Linking = require('../linking');
const { MapList } = require("../linking/shared/map");
const { getMapOptions } = require('./maps');

const openMaps = (options) => {
  return new Promise((resolve, reject) => {
    const mapType = options?.mapType || MapList.APPLE_MAPS;
    const mapOptions = getMapOptions({
      locationName: options.name || '',
      location: options.location,
      mapType
    });

    if (!mapOptions) {
      return reject('Invalid map type.');
    }

    Linking.openURL({
      uriScheme: mapOptions.scheme,
      data: mapOptions.data,
      onSuccess: () => resolve(mapOptions.successText),
      onFailure: () => reject(mapOptions.errorText)
    });
  });
};

const openNavigation = (options) => {
  return new Promise((resolve, reject) => {
    const mapType = options?.mapType || MapList.APPLE_MAPS;
    const mapOptions = getMapOptions({
      locationName: options.name || '',
      location: options.location,
      transportType: options.transportType,
      isNavigation: true,
      mapType
    });

    if (!mapOptions) {
      return reject('Invalid map type.');
    }

    Linking.openURL({
      uriScheme: mapOptions.scheme,
      data: mapOptions.data,
      onSuccess: () => resolve(mapOptions.successText),
      onFailure: () => reject(mapOptions.errorText)
    });
  });
};

module.exports = {
  openMaps,
  openNavigation
}