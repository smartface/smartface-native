import { Location, MapTypes, TransportTypes } from '../linking/shared/map';

export type MapOptions = {
  /**
   * @iOS
   */
  mapType?: keyof typeof MapTypes | MapTypes;
  name?: string;
  location: Location;
  /**
   * @android
   */
  chooserTitle?: string;
};

export type NavigationOptions = {
  /**
   * @iOS
   */
  mapType?: keyof typeof MapTypes | MapTypes;
  name?: string;
  location: Location;
  transportType: TransportTypes;
  /**
   * @android
   */
  chooserTitle?: string;
}

/**
 * It sets the starting point to your current location, if the permission is granted.
 * @function
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
export declare function openMaps(options: MapOptions): Promise<String>;

/**
 * It sets the starting point to your current location, if the permission is granted.
 * @function
 * @example
 * ````
 * import { openNavigation } from "@smartface/native/application/maps";
 * import { TransportTypes } from "@smartface/native/linking/shared/map"
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
export declare function openNavigation(options: NavigationOptions): Promise<String>;