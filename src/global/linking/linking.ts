/**
 *
 * Linking gives you a general interface to interact with both incoming and outgoing app links.
 * Every Link (URL) has a URL Scheme, some websites are prefixed with https:// or http:// and the http is the URL Scheme. Let's call it scheme for short.
 * In addition to https, you're likely also familiar with the mailto scheme. When you open a link with the mailto scheme, your operating system will open an installed mail application. Similarly, there are schemes for making phone calls and sending SMS.
 * @see https://docs.smartface.io/smartface-native-framework/miscellaneous-native-features/universal-links
 */
export interface ILinking {
  /**
   * Opens application settings menu
   * @static
   * @method
   * @returns {Promise}
   * @example
   * ```
   * import Linking from '@smartface/native/global/linking';
   * Linking.openSettings();
   *```
   */
  openSettings(): Promise<void>;

  /**
   * Checks URL's scheme can be handled or not by some app that installed on the device.
   *
   * To pass this method, URL schemes must be declared into "Info.plist" file for iOS
   * and AndroidManifest.xml file for Android.
   *
   *     @example for Google Maps
   *
   *		(Info.plist entry)
   *      <key>LSApplicationQueriesSchemes</key>
   *      <array>
   *          <string>comgooglemaps</string>
   *      </array>
   *
   *      After entry add on, urlScheme can be check;
   * 	 	  import Linking from "@smartface/native/global/linking";
   *      const isAppAvaible = Linking.canOpenUrl("comgooglemaps://");
   *
   * 		(AndroidManifest.xml entry)
   * 		<manifest ...>
   * 			...
   * 			<queries>
   *  			<intent>
   *					<action android:name="android.intent.action.VIEW" />
   *  				<data android:scheme="geo"/>
   *				</intent>
   * 			</queries>
   * 		</manifest>
   *
   *	const Application = require("@smartface/native/application");
   *    const isAppAvaible = Application.canOpenUrl("geo://");
   *
   * @method canOpenUrl
   * @param {String} url
   * @return {Boolean}
   * @ios
   * @android
   * @static
   * @since 4.3.6
   * @see https://developer.android.com/training/package-visibility
   */
  canOpenURL(url: string): boolean;

  /**
   * Launches another application and passes data. For Android, you can open application chooser with
   * isShowChooser parameter and set chooser dialog title with chooserTitle.
   * If an app can open a given URL resource onSuccess callback will be triggered otherwise onFailure will be triggered.
   *
   *     @example
   *     import Linking from '@smartface/native/global/linking';
   *
   *     // Calling application's Google Play Store page. Note that this will not launch iOS App Store.
   *     Linking.openURL({
   *         uriScheme: "market://details",
   *         data: {
   *             'id': Application.android.packageName
   *         }
   *     });
   *     // Open caller app with phone number.
   *     Linking.openURL({ uriScheme: "tel:+901234567890", data: {} });
   *     // Call another application with its own url schema.
   *     Linking.openURL({
   *         uriScheme: "mySchema://",
   *         data: {
   *             key: encodeURIComponent("Smartace Encoded Data")
   *         },
   *         onSuccess: function() {
   *             alert("Application call completed")
   *         },
   *         onFailure: function() {
   *             alert("Application call failed")
   *         }
   *     });
   *     // Call another application with package name and activity name. Works only for Android.
   *     Linking.openURL({ uriScheme: "io.smartface.SmartfaceDev|io.smartface.SmartfaceDev.A", data: {} });
   *     // Call Smartface Emulator with url schema.
   *     Linking.openURL({ uriScheme: "smartface-emulator://", data : {} });
   *     // Open Youtube with Chooser for Android
   *     Linking.openURL({
   *         uriScheme: "https://www.youtube.com/watch?v=VMLU9mfzHYI",
   *         data: {},
   *         onSuccess: function() {
   *             alert("Application call completed")
   *         },
   *         onFailure: function() {
   *             alert("Application call failed")
   *         },
   *         isShowChooser: true,
   *         chooserTitle: "Select an Application"
   *     });
   *
   *
   * @method call
   * @param {Object} options
   * @param {String} options.uriScheme
   * @param {Object} options.data parameter should be url encoded if necessary.
   * @param {Function} options.onSuccess Added in 1.1.13.
   * @param {Function} options.onFailure Added in 1.1.13.
   * @param {Boolean} options.isShowChooser Added in 1.1.13.
   * @param {String} options.chooserTitle Added in 1.1.13.
   * @param {String} options.action  Such as <a href="https://developer.android.com/reference/android/content/Intent.html#ACTION_VIEW">android.intent.action.VIEW</a>
   * @readonly
   * @android
   * @ios
   * @static
   * @since 0.1
   */
  openURL(options: { uriScheme: string; data?: {}; onSuccess?: (value?: any) => void; onFailure?: (value?: any) => void; shouldShowChooser?: boolean; chooserTitle?: string; action?: string }): void;
}
