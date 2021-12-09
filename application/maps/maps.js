const { MapList, MapTypes, TransportTypes } = require("../linking/shared/map");

/**
 * @param {Object} options Options of will open map
 * @param {String} options.locationName
 * @param {Boolean} options.isNavigation
 * @param {TransportTypes} options.transportType
 * @param {MapTypes} options.mapType
 * @param {Object} options.location
 * @param {Number} options.location.latitude
 * @param {Number} options.location.longitude
 * @returns 
 */
function getMapOptions(options) {
  const {
    locationName,
    isNavigation,
    transportType,
    mapType,
    location: { latitude, longitude },
  } = options;
  const isDriving = transportType === TransportTypes.DRIVING;
  return [
    {
      type: MapTypes.APPLE_MAPS,
      data: isNavigation
        ? {
          daddr: `${latitude},${longitude}`,
          dirflg: isDriving ? TransportTypes.DRIVING : TransportTypes.WALKING,
        }
        : {
          ll: `${latitude},${longitude}`,
          q: encodeURIComponent(locationName)
        },
      scheme: MapList.APPLE_MAPS.URL,
      errorText: MapList.APPLE_MAPS.FAILURE_TEXT,
      successText: MapList.APPLE_MAPS.SUCCESS_TEXT
    },
    {
      type: MapTypes.GOOGLE_MAPS,
      data: isNavigation
        ? {
          api: "1",
          travelmode: isDriving ? "driving" : "walking",
          dir_action: "navigate",
          destination: `${latitude},${longitude}`,
        }
        : {
          api: "1",
          query: `${latitude},${longitude}`,
          q: encodeURIComponent(locationName)
        },
      scheme: isNavigation ? 'https://www.google.com/maps/dir/' : MapList.GOOGLE_MAPS.URL,
      errorText: MapList.GOOGLE_MAPS.FAILURE_TEXT,
      successText: MapList.GOOGLE_MAPS.SUCCESS_TEXT
    },
    {
      type: MapTypes.YANDEX_MAPS,
      data: isNavigation
        ? {}
        : { ll: `${latitude},${longitude}`, text: encodeURIComponent(locationName) },
      scheme: isNavigation
        ? `${MapList.YANDEX_NAVIGATION.SCHEME}build_route_on_map?lat_to=${latitude}&lon_to=${longitude}`
        : MapList.YANDEX_MAPS.SCHEME,
      errorText: isNavigation ? MapList.YANDEX_NAVIGATION.FAILURE_TEXT : MapList.YANDEX_MAPS.FAILURE_TEXT,
      successText: isNavigation ? MapList.YANDEX_NAVIGATION.SUCCESS_TEXT : MapList.YANDEX_MAPS.SUCCESS_TEXT
    }
  ].find(m => m.type === mapType);
}

module.exports = {
  getMapOptions
}