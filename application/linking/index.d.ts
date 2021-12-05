import { MapsOptions } from "./shared/map";

/**
 * @module map
 * @type {Object}
 * @author Furkan Arabacı <furkan.arabaci@smartface.io>
 * @copyright Smartface 2021
 *
 * Map utility to cover the most popular map applications on both platforms.
 * It will pin the given location in the chosen map app
 * It will prompt a menu to choose apps from on iOS and works out of the box on Android.
 * For this utility to work correctly, you need to publish the application.
 * You also need to add this key to your info.plist file, for the app to be able to decect them.
 * ```
 * <dict>
 * ...
 * 	<key>LSApplicationQueriesSchemes</key>
 *	    <array>
 *		    <string>comgooglemaps</string>
 *		    <string>yandexmaps</string>
 *	    </array>
 * </dict>
 * ```
 */
declare class Linking {
  /**
   * Prompts a menu to choose which navigation app to handle the location.
   * It sets the starting point to your current location, if the permission is granted.
   * @function
   * @example
   * ```
   * import Linking from "@smartface/native/application/linking";
   * Linking.openMap({
   *      page,
   *      location: {
   *          latitude: 37.4488259,
   *          longitude: -122.1600047
   *      },
   *      name: "Smartface Inc."
   *  });
   *```
   */
  static openMap(options: MapsOptions): Promise<string>
}
