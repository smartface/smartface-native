class Linking {
  /**
   * Opens application settings menu
   * @static
   * @method canOpenURL
   * @async
   * @returns {Promise<void>}
   * @example
   * ```
   * import Linking from '@smartface/native/application/linking';
   * Linking.openSettings();
   *```
   */
  static openSettings();

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
   * 	 	  const Application = require("@smartface/native/application");
   *      var isAppAvaible = Application.canOpenUrl("comgooglemaps://");
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
   *	  import Linking from '@smartface/native/application/linking';
   *    const isAppAvaible = Linking.canOpenUrl("geo://");
   *
   * @method canOpenUrl
   * @param {String} url
   * @returns {Boolean}
   * @ios
   * @android
   * @static
   * @since 4.3.6
   * @see https://developer.android.com/training/package-visibility
   */
  static canOpenURL(url);

  /**
   * Launches another application and passes data. For Android, you can open application chooser with
   * isShowChooser parameter and set chooser dialog title with chooserTitle.
   * If an app can open a given URL resource onSuccess callback will be triggered otherwise onFailure will be triggered.
   *
   *     @example
   *     import Linking from '@smartface/native/application/linking';
   *
   *     // Calling application's Google Play Store page. Will work only for iOS
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
   * @method openURL
   * @param {Object} options
   * @param {String} [options.uriScheme]
   * @param {Object} [options.data] parameter should be url encoded if necessary.
   * @param {Function} [options.onSuccess] Added in 1.1.13.
   * @param {Function} [options.onFailure] Added in 1.1.13.
   * @param {Boolean} [options.isShowChooser] Added in 1.1.13.
   * @param {String} [options.chooserTitle] Added in 1.1.13.
   * @param {String} [options.action]  Such as <a href="https://developer.android.com/reference/android/content/Intent.html#ACTION_VIEW">android.intent.action.VIEW</a>
   * @readonly
   * @android
   * @ios
   * @static
   * @since 0.1
   */
  static openURL(options);
}

module.exports = Linking;