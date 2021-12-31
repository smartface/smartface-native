import { Location, MapTypes, TransportTypes } from "../linking/shared/map";
/**
 * It sets the starting point to your current location, if the permission is granted.
 * @function
 * @param {object} options is the config parameter for openMaps function.
 * @param {MapTypes} options.mapType is an iOS only parameter to choose the map's type. (e.g. "GOOGLE_MAPS").
 * @param {string} [options.name]
 * @param {Location} options.location
 * @param {string} [options.chooserTitle] is Android only property.
 * @async
 * @returns {Promise<String>}
 * @example
 * ````
 * import { openMaps } from "@smartface/native/application/maps";
 *
 * openMaps({
 *  mapType: 'GOOGLE_MAPS',
 *  name: 'Smartface Inc.',
 *  location: {
 *          latitude: 37.4488259,
 *          longitude: -122.1600047
 *    }
 * });
 * ````
 */
function openMaps(options);

/**
 * It sets the starting point to your current location, if the permission is granted.
 * @function
 * @param {object} options is the config parameter for openNavigation function.
 * @param {MapTypes} options.mapType is an iOS only parameter to choose the map's type. (e.g. "GOOGLE_MAPS").
 * @param {string} [options.name]
 * @param {Location} options.location
 * @param {TransportTypes} options.transportType
 * @param {string} [options.chooserTitle] is Android only property.
 * @async
 * @returns {Promise<String>}
 * @example
 * ````
 * import { openNavigation } from "@smartface/native/application/maps";
 * import { TransportTypes } from "@smartface/native/application/linking/shared/map"
 *
 * openNavigation({
 *  mapType: 'GOOGLE_MAPS',
 *  name: 'Smartface Inc.',
 *  transportType: TransportTypes.DRIVING,
 *  location: {
 *          latitude: 37.4488259,
 *          longitude: -122.1600047
 *    }
 * });
 * ````
 */
function openNavigation(
  options
);


module.exports = {
  openMaps,
  openNavigation
}