/**
 * @class Application
 * @since 0.1
 *
 * A set of collection for application based properties and methods.
 */
function Application() {}

/**
 * This property allows you to prevent the screen from going to sleep while your app is active.
 *
 * @property {Boolean} [keepScreenAwake = false]
 * @android
 * @ios
 * @since 4.3.1
 */
Application.prototype.keepScreenAwake;
/**
 * Gets/sets sliderDrawer of the Application.
 *
 * @property {UI.SliderDrawer} [sliderDrawer = null]
 * @android
 * @ios
 * @since 3.2.0
 */
Application.prototype.sliderDrawer;

/**
 * Gets status bar object. This property is readonly, you can not set
 * status bar but you can change properties of status bar of application.
 *
 * @property {UI.StatusBar} statusBar
 * @android
 * @ios
 * @readonly
 * @since 3.2.0
 */
Application.prototype.statusBar;

/**
 * Application package name.
 *
 * @property {String} packageName
 * @readonly
 * @android
 * @static
 * @since 0.1
 */
Application.android.packageName;

/**
 * Treat the content of the window as secure, preventing it from appearing in screenshots or from being viewed on non-secure displays.
 *
 * @property {Boolean} secureWindowContent
 * @readonly
 * @android
 * @static
 * @since 4.1.5
 */
Application.android.secureWindowContent = false;

/**
 * Set/Get the layout direction from a Locale.
 *
 * @property {String} locale
 * @readonly
 * @android
 * @static
 * @since 3.1.3
 */
Application.android.locale;

/**
 * Get current layout direction.
 *
 * @property {Application.LayoutDirection} getLayoutDirection
 * @readonly
 * @android
 * @static
 * @since 3.1.3
 */
Application.android.getLayoutDirection;

/**
 * Application bundle identifier.
 *
 * @property {String} bundleIdentifier
 * @readonly
 * @ios
 * @static
 * @since 3.0.2
 */
Application.ios.bundleIdentifier;

/**
 * It indicates the directionality of the language in the user interface of the app.
 *
 * @property {Application.LayoutDirection} userInterfaceLayoutDirection
 * @readonly
 * @ios
 * @static
 * @since 3.1.3
 */
Application.ios.userInterfaceLayoutDirection;

/**
 * The received bytes from the application.
 *
 * @property {Number} byteReceived
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.byteReceived;

/**
 * The sent bytes from the application
 *
 * @property {Number} byteSent
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.byteSent;

/**
 * The specified release channel within project.json.
 *
 * @property {String} currentReleaseChannel
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.currentReleaseChannel;

/**
 * The application name within project.json
 *
 * @property {String} smartfaceAppName
 * @readonly
 * @android
 * @ios
 * @static
 * @deprecated
 * @since 0.1
 */
Application.smartfaceAppName;

/**
 * The application name within project.json
 *
 * @property {String} appName
 * @readonly
 * @android
 * @ios
 * @static
 * @since 4.0.7
 */
Application.appName;

/**
 * The application version within project.json
 *
 * @property {Number} version
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.version;

/**
 * Checks URL's scheme can be handled or not by some app that installed on the device.
 *
 * To pass this method, URL schemes must be declared into "Info.plist" file as "LSApplicationQueriesSchemes".
 *
 *     @example for Google Maps (Info.plist entry)
 *
 *      <key>LSApplicationQueriesSchemes</key>
 *      <array>
 *          <string>comgooglemaps</string>
 *      </array>
 *
 *      After entry add on, urlScheme can be check;
 *      const Application = require("@smartface/native/application");
 *      var isAppAvaible = Application.ios.canOpenUrl("comgooglemaps://");
 *
 * @method canOpenUrl
 * @param {String} url
 * @return {Boolean}
 * @ios
 * @static
 * @since 3.0.1
 */
Application.ios.canOpenUrl = function (url) {};

/**
 * Launches another application and passes data. For Android, you can open application chooser with
 * isShowChooser parameter and set chooser dialog title with chooserTitle.
 * If an app can open a given URL resource onSuccess callback will be triggered otherwise onFailure will be triggered.
 *
 *     @example
 *     // Calling application's Google Play Store page. Will work only for iOS
 *     Application.call({
 *         uriScheme: "market://details",
 *         data: {
 *             'id': Application.android.packageName
 *         }
 *     });
 *     // Open caller app with phone number.
 *     Application.call({ uriScheme: "tel:+901234567890", data: {} });
 *     // Call another application with its own url schema.
 *     Application.call({
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
 *     Application.call({ uriScheme: "io.smartface.SmartfaceDev|io.smartface.SmartfaceDev.A", data: {} });
 *     // Call Smartface Emulator with url schema.
 *     Application.call({ uriScheme: "smartface-emulator://", data : {} });
 *     // Open Youtube with Chooser for Android
 *     Application.call({
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
 * @param {Object} params
 * @param {String} params.uriScheme
 * @param {Object} params.data parameter should be url encoded if necessary.
 * @param {Function} params.onSuccess Added in 1.1.13.
 * @param {Function} params.onFailure Added in 1.1.13.
 * @param {Boolean} params.isShowChooser Added in 1.1.13.
 * @param {String} params.chooserTitle Added in 1.1.13.
 * @param {String} params.action  Such as <a href="https://developer.android.com/reference/android/content/Intent.html#ACTION_VIEW">android.intent.action.VIEW</a>
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.call = function (params) {};

/**
 * Exists the application.
 *
 * @method exit
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.exit = function () {};

/**
 * Set root controller of the application.
 *
 * @method setRootController
 * @param {Object} params
 * @param {UI.Page|UI.NavigationController} controller
 * @param {Boolean} [animated=false]
 * @android
 * @ios
 * @static
 * @since 3.2.0
 */
Application.setRootController = function (params) {};
/**
 * Restarts the application.
 *
 * @method restart
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.restart = function () {};

/**
 * This function checks if one of the dangerous permissions is granted at beginning or not.
 * For android versions earlier than 6.0, it will return value exists in manifest or not.
 * For permissions in same category with one of the permissions is approved earlier, checking
 * will return as it is not required to request for the same category permission.
 *
 * @method checkPermission
 * @param {String} permission
 * @return {Boolean}
 * @android
 * @static
 * @since 1.2
 */
Application.android.checkPermission = function (permission) {};

/**
 * With requestPermissions, the System Dialog will appear to ask for
 * permission grant by user for dangerous(privacy) permissions.
 * {@link Application.android#onRequestPermissionsResult onRequestPermissionsResult} will be fired after user interact with permission dialog.
 *
 *     @example
 *     const Application = require("@smartface/native/application");
 *     Application.android.requestPermissions(1002, Application.Android.Permissions.WRITE_EXTERNAL_STORAGE)
 *     Application.android.onRequestPermissionsResult = function(e){
 *         console.log(JSON.stringify(e));
 *     }
 *
 * @method requestPermissions
 * @param {Number} requestIdentifier This number  will be returned in {@link Application.android.onRequestPermissionsResult onRequestPermissionsResult} when the user give permission or not.
 * @param {String} permission
 * @android
 * @static
 * @since 1.2
 */
Application.android.requestPermissions = function (
	requestIdentifier,
	permission
) {};

/**
 * Called to process touch screen events. You can assign callback to intercept all touch screen events before they are dispatched to the window (except independent windows like dialog and etc.).
 * Be sure to call this implementation for touch screen events that should be handled normally. Callback might be fired several times.
 *
 *     @example
 *     const Application = require("@smartface/native/application");
 *     Application.android.dispatchTouchEvent = function(){
 *        return true; //Consume all touches & do not pass to window
 *     }
 *
 * @event dispatchTouchEvent
 * @android
 * @static
 * @return {Boolean}
 * @since 4.0.3
 */
Application.android.dispatchTouchEvent = function () {};

/**
 * This method checks for a permission is shown before to user
 * and the program is about to request the same permission again.
 *
 * @method shouldShowRequestPermissionRationale
 * @param {String} permission
 * @return {Boolean}
 * @android
 * @static
 * @since 1.2
 */
Application.android.shouldShowRequestPermissionRationale = function (
	permission
) {};

/**
 * Set the keyboard mode. That may be needed when intended to prevent keyboard to cover view or change actual behavior of shown keyboard .
 *
 * @property {Application.Android.KeyboardMode} keyboardMode
 * @readonly
 * @android
 * @static
 * @since 3.1.0
 */
Application.android.keyboardMode;

/**
 * Checks if there is a new update.
 *
 *     @example
 *     Application.checkUpdate(function(err, result) {
 *         if (err) {
 *             console.log("check update error: " + err);
 *         } else {
 *             result.download(function(err, downloadFinish) {
 *                 if (err) {
 *                     console.log("download error: " + err);
 *                 } else {
 *                     downloadFinish.updateAll(function(err) {
 *                         if (err) {
 *                             console.log("update all error: " + err);
 *                         } else {
 *                             console.log(downloadFinish.meta);
 *                             Application.restart();
 *                         }
 *                     });
 *                 }
 *             });
 *         }
 *     },"user_name");
 *
 * @method checkUpdate
 * @see https://developer.smartface.io/docs/remote-app-update
 * @param {Function} callback Function for update check result
 * @param {Object} callback.err For a valid update data, err argument should be null otherwise it will be message field in json response.
 * @param {Object} callback.result Update object when there is a new version of the app.
 * @param {String} callback.result.newVersion New version number obtained from RAU.
 * @param {String} callback.result.newRevision Revision value of the new version.
 * @param {Function} callback.result.download Method that initiates download of update files.
 * @param {Object} callback.result.download.err Error object of the download operation. For a valid update data, err argument should be null.
 * @param {Object} callback.result.download.downloadFinish Result object of the download operation.
 * @param {Function} callback.result.download.downloadFinish.updateAll Updates all files silently, callback is fired at the end of operation.
 * @param {Object} callback.result.download.downloadFinish.updateAll.err Error object of the update operation. For a valid update, err argument will be null.
 * @param {Function} callback.result.download.downloadFinish.cancel Clears all staged files.
 * @param {Object} callback.result.download.downloadFinish.cancel.err Error object of the clear operation. For a valid clear, err argument will be null.
 * @param {Function} callback.result.download.downloadFinish.meta  Meta in rau.json as object parsed.
 * @param {String} User information
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.checkUpdate = function (callback, user) {};

/**
 * Triggered when user press back key. The default implementation finishes the application,
 * but you can override this to do whatever you want.
 *
 * @event onBackButtonPressed
 * @deprecated
 * @android
 * @static
 * @since 3.2.0
 */
Application.onBackButtonPressed = function () {};
/**
 * Triggered before exiting application.
 *
 * @since 0.1
 * @event onExit
 * @deprecated
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onExit = function () {};

/**
 * Triggered after application bring to foreground state. In Android, it triggered even the user is leaving another activity(even the activities launched by your app).
 * That means Permissions & derived from Dialog components are makes this callback to triggered.
 *
 * @since 0.1
 * @event onMaximize
 * @deprecated
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onMaximize = function () {};

/**
 * Triggered after application bring to background state. Background state means that user is in another app or on the home screen. In Android, it triggered even the user is launching another activity(even the activities launched by your app).
 * That means Permissions & derived from Dialog components are make this callback to triggered.
 *
 * @since 0.1
 * @event onMinimize
 * @deprecated
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onMinimize = function () {};

/**
 * This function hides keyboard.
 *
 * @method hideKeyboard
 * @android
 * @ios
 * @static
 * @since 3.0.1
 */
Application.hideKeyboard = function () {};

/**
 * Triggered after a push (remote) notification recieved. This event will be
 * fired only if application is active and running.
 *
 * @event onReceivedNotification
 * @deprecated
 * @param {Object} data
 * @param {Object} data.remote
 * @param {Object} data.local
 * @android
 * @ios
 * @static
 * @deprecated 4.2.1 Use {@link Notifications#onNotificationClick} & {@link Notifications#onNotificationReceive} instead
 * @since 0.1
 */
Application.onReceivedNotification = function (data) {};

/**
 * Triggered when application is called by another application.
 * For Android, onApplicationCallReceived will be triggered when
 * the application started from System Launcher. For this reason,
 * if data does not contain key that you can handle, you should ignore this call.
 *
 * @event onApplicationCallReceived
 * @deprecated
 * @param {Object} e
 * @param {Object} e.data Data sent by application.
 * @param {String} e.eventType Can be "call" or "callback".
 * This parameter is available only for Android. For iOS this always returns "call".
 * For example; Application A calls application B, eventType becomes "call" for application B.
 * When application B is done its job and application A comes foreground and eventType becomes
 * "callback" for Android.
 * @param {Number} e.result This parameter is available only for Android and when eventType is
 * "callback". Returns Android Activity result code.
 * @see https://developer.android.com/training/basics/intents/result.html
 *
 * @android
 * @ios
 * @static
 * @since 1.1.13
 * @see https://developer.android.com/training/sharing/receive.html
 */
Application.onApplicationCallReceived = function (e) {};

/**
 * The event is called when a user taps a universal link.
 *
 * @event onUserActivityWithBrowsingWeb
 * @deprecated
 * @param {String} url Universal link.
 * @return {Boolean} YES to indicate that your app handled the activity or NO to let iOS know that your app did not handle the activity.
 * @ios
 * @static
 * @since 3.1.2
 */
Application.onUserActivityWithBrowsingWeb = function (url) {};

/**
 * This event is called after Application.requestPermissions function. This event is
 * fired asynchronous way, there is no way to make sure which request is answered.
 *
 * @since 1.2
 * @event onRequestPermissionsResult
 * @deprecated
 * @param {Object} e
 * @param {Number} e.requestCode
 * @param {Boolean} e.result
 * @android
 * @static
 * @since 1.2
 */
Application.android.onRequestPermissionsResult = function (e) {};

/**
 * Triggered when unhandelled error occurs.
 *
 * @since 1.2
 * @event onUnhandledError
 * @deprecated
 * @param {Object} error
 * @param {String} error.message
 * @param {String} error.stack
 * @android
 * @ios
 * @static
 * @since 1.2
 */
Application.onUnhandledError = function (error) {};

/**
 * Triggered when user press back key. The default implementation finishes the application,
 * but you can override this to do whatever you want.
 *
 * @android
 * @static
 * @since 3.2.0
 */
 Application.Events.BackButtonPressed = "backButtonPressed";
 /**
  * Triggered before exiting application.
  *
  * @since 0.1
  * @android
  * @ios
  * @static
  * @since 0.1
  */
 Application.Events.Exit = "exit";
 
 /**
  * Triggered after application bring to foreground state. In Android, it triggered even the user is leaving another activity(even the activities launched by your app).
  * That means Permissions & derived from Dialog components are makes this callback to triggered.
  *
  * @since 0.1
  * @android
  * @ios
  * @static
  * @since 0.1
  */
 Application.Events.Maximize = "maximize";
 
 /**
  * Triggered after application bring to background state. Background state means that user is in another app or on the home screen. In Android, it triggered even the user is launching another activity(even the activities launched by your app).
  * That means Permissions & derived from Dialog components are make this callback to triggered.
  *
  * @since 0.1
  * @android
  * @ios
  * @static
  * @since 0.1
  */
 Application.Events.Minimize = "minimize";
 
 /**
  * This function hides keyboard.
  *
  * @method hideKeyboard
  * @android
  * @ios
  * @static
  * @since 3.0.1
  */
 Application.hideKeyboard = function () {};
 
 /**
  * Triggered after a push (remote) notification recieved. This event will be
  * fired only if application is active and running.
  *
  * @param {Object} data
  * @param {Object} data.remote
  * @param {Object} data.local
  * @android
  * @ios
  * @static
  * @deprecated 4.2.1 Use {@link Notifications#onNotificationClick} & {@link Notifications#onNotificationReceive} instead
  * @since 0.1
  */
 Application.Events.ReceivedNotification = "receivedNotification";
 
 /**
  * Triggered when application is called by another application.
  * For Android, onApplicationCallReceived will be triggered when
  * the application started from System Launcher. For this reason,
  * if data does not contain key that you can handle, you should ignore this call.
  *
  * @param {Object} e
  * @param {Object} e.data Data sent by application.
  * @param {String} e.eventType Can be "call" or "callback".
  * This parameter is available only for Android. For iOS this always returns "call".
  * For example; Application A calls application B, eventType becomes "call" for application B.
  * When application B is done its job and application A comes foreground and eventType becomes
  * "callback" for Android.
  * @param {Number} e.result This parameter is available only for Android and when eventType is
  * "callback". Returns Android Activity result code.
  * @see https://developer.android.com/training/basics/intents/result.html
  *
  * @android
  * @ios
  * @static
  * @since 1.1.13
  * @see https://developer.android.com/training/sharing/receive.html
  */
 Application.Events.ApplicationCallReceived = "applicationCallReceived";
 
 /**
  * The event is called when a user taps a universal link.
  *
  * @param {String} url Universal link.
  * @return {Boolean} YES to indicate that your app handled the activity or NO to let iOS know that your app did not handle the activity.
  * @ios
  * @static
  * @since 3.1.2
  */
 Application.Events.UserActivityWithBrowsingWeb = "userActivityWithBrowsingWeb";
 
 /**
  * This event is called after Application.requestPermissions function. This event is
  * fired asynchronous way, there is no way to make sure which request is answered.
  *
  * @since 1.2
  * @param {Object} e
  * @param {Number} e.requestCode
  * @param {Boolean} e.result
  * @android
  * @static
  * @since 1.2
  */
 Application.android.Events.RequestPermissionsResult = "requestPermissionsResult";
 
 /**
  * Triggered when unhandelled error occurs.
  *
  * @since 1.2
  * @param {Object} error
  * @param {String} error.message
  * @param {String} error.stack
  * @android
  * @ios
  * @static
  * @since 1.2
  */
 Application.Events.UnhandledError = "unhandledError";
 

/**
 * Set the configure the native theme.
 *
 * @method setAppTheme
 * @param {String} currentTheme
 * @android
 * @static
 * @since 4.0.2
 */
Application.setAppTheme = function (currentTheme) {};

/**
 * Android Specific Properties.
 * @class Application.Android
 * @since 1.1.16
 */
Application.Android = {};

/**
 * @enum Application.Android.Permissions
 * @since 1.1.16
 *
 * Permission enum for Application.
 * Permission managements should be developed OS specific in the applications.
 * Application.android.Permissions deprecated since 1.1.16. Use Application.Android.Permissions instead.
 */
Application.Android.Permissions = {};

/**
 * Allows to read the calendar data.
 *
 * @property READ_CALENDAR
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.READ_CALENDAR;

/**
 * Allows an application to write the user's calendar data.
 *
 * @property WRITE_CALENDAR
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.WRITE_CALENDAR;

/**
 * Required to be able to access the camera device.
 *
 * @property CAMERA
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.CAMERA;

/**
 * Allows an application to read the user's contacts data.
 *
 * @property READ_CONTACTS
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.READ_CONTACTS;

/**
 * Allows an application to write the user's contacts data.
 *
 * @property WRITE_CONTACTS
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.WRITE_CONTACTS;

/**
 * Allows access to the list of accounts in the Accounts Service.
 *
 * @property GET_ACCOUNTS
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.GET_ACCOUNTS;

/**
 * Allows an app to access precise location.
 *
 * @property ACCESS_FINE_LOCATION
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.ACCESS_FINE_LOCATION;

/**
 * Allows an app to access approximate location.
 *
 * @property ACCESS_COARSE_LOCATION
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.ACCESS_COARSE_LOCATION;

/**
 * Allows an application to record audio.
 *
 * @property RECORD_AUDIO
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.RECORD_AUDIO;

/**
 * Allows read only access to phone state, including the phone number of the device,
 * current cellular network information, the status of any ongoing calls, and a list
 * of any PhoneAccounts registered on the device.
 *
 * @property READ_PHONE_STATE
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.READ_PHONE_STATE;

/**
 * Allows an application to initiate a phone call without going through the
 * Dialer user interface for the user to confirm the call.
 *
 * @property CALL_PHONE
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.CALL_PHONE;

/**
 * Allows an application to read the user's call log.
 *
 * @property READ_CALL_LOG
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.READ_CALL_LOG;

/**
 * Allows an application to write (but not read) the user's call log data.
 *
 * @property WRITE_CALL_LOG
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.WRITE_CALL_LOG;

/**
 * Allows an application to add voicemails into the system.
 *
 * @property ADD_VOICEMAIL
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.ADD_VOICEMAIL;

/**
 * Allows an application to use SIP service.
 *
 * @property USE_SIP
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.USE_SIP;

/**
 * Allows an application to see the number being dialed during an
 * outgoing call with the option to redirect the call to a different
 * number or abort the call altogether.
 *
 * @property PROCESS_OUTGOING_CALLS
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.PROCESS_OUTGOING_CALLS;

/**
 * Allows an application to access data from sensors
 * that the user uses to measure what is happening inside
 * his/her body, such as heart rate.
 *
 * @property BODY_SENSORS
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.BODY_SENSORS;

/**
 * Allows an application to send SMS messages.
 *
 * @property SEND_SMS
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.SEND_SMS;

/**
 * Allows an application to receive SMS messages.
 *
 * @property RECEIVE_SMS
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.RECEIVE_SMS;

/**
 * Allows an application to read SMS messages.
 *
 * @property READ_SMS
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.READ_SMS;

/**
 * Allows an application to receive WAP push messages.
 *
 * @property RECEIVE_WAP_PUSH
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.RECEIVE_WAP_PUSH;

/**
 * Allows an application to monitor incoming MMS messages.
 *
 * @property RECEIVE_MMS
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.RECEIVE_MMS;

/**
 * Allows to read from external storage.
 * If you granted {@link Application.Android.Permissions#WRITE_EXTERNAL_STORAGE WRITE_EXTERNAL_STORAGE} permission,
 * you don't need this to granted this permission.
 *
 * @property READ_EXTERNAL_STORAGE
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.READ_EXTERNAL_STORAGE;

/**
 * Allows to write to external storage.
 *
 * @property WRITE_EXTERNAL_STORAGE
 * @static
 * @readonly
 * @since 1.1.16
 */
Application.Android.Permissions.WRITE_EXTERNAL_STORAGE;

/**
 * Allows applications to write the apn settings and read sensitive fields of an existing apn settings like user and password.
 *
 * @property WRITE_APN_SETTINGS
 * @static
 * @readonly
 * @since 4.3.2
 */
Application.Android.Permissions.WRITE_APN_SETTINGS;

/**
 * @enum Application.Android.KeyboardMode
 * @since 3.1.0
 *
 * Enable to change keyboard mode.
 *
 *     @example
 *     const Application  =require("@smartface/native/application");
 *     Application.android.keyboardMode = Application.Android.KeyboardMode.KeyboardAdjustResize;
 *
 */
Application.Android.KeyboardMode = {};

/**
 * Set to have a screen not adjust for a shown keyboard.
 *
 * @property KeyboardAdjustNothing
 * @static
 * @readonly
 * @since 3.1.0
 */
Application.Android.KeyboardMode.KeyboardAdjustNothing;

/**
 * Set to have a screen pan when an keyboard is shown,
 * so it doesn't need to deal with resizing but just panned by the framework to ensure the current input focus is visible.
 *
 * @property KeyboardAdjustPan
 * @static
 * @readonly
 * @since 3.1.0
 */
Application.Android.KeyboardMode.KeyboardAdjustPan;

/**
 * Set to allow the screen to be resized when an keyboard is shown,
 * so that its contents are not covered by the keyboard.
 *
 * @property KeyboardAdjustResize
 * @static
 * @readonly
 * @since 3.1.0
 */
Application.Android.KeyboardMode.KeyboardAdjustResize;

/**
 * Set as nothing specified. The system will try to pick one or the other depending on the contents of the screen.
 *
 * @property KeyboardAdjustUnspecified
 * @static
 * @readonly
 * @since 3.1.0
 */
Application.Android.KeyboardMode.KeyboardAdjustUnspecified;

/**
 * Always make the keyboard visible when this window receives input focus.
 *
 * @property AlwaysVisible
 * @static
 * @readonly
 * @since 3.1.0
 */
Application.Android.KeyboardMode.AlwaysVisible;

/**
 * Always hides any keyboard when this screen receives focus.
 *
 * @property AlwaysHidden
 * @static
 * @readonly
 * @since 3.1.0
 */
Application.Android.KeyboardMode.AlwaysHidden;

/**
 * @enum {Number} Application.LayoutDirection
 * @since 3.1.3
 * @ios
 * @android
 */
Application.LayoutDirection = {};

/**
 * Layout direction is left to right.
 *
 * @property {Number} LEFTTORIGHT
 * @static
 * @ios
 * @android
 * @readonly
 * @since 3.1.3
 */
Application.LayoutDirection.LEFTTORIGHT = 0;

/**
 * Layout direction is right to left.
 *
 * @property {Number} RIGHTTOLEFT
 * @static
 * @ios
 * @android
 * @readonly
 * @since 3.1.3
 */
Application.LayoutDirection.RIGHTTOLEFT = 1;

/**
 * Event to be implemented
 * @param {string} event - Event type to be created
 * @param {*} callback
 * @returns {Function} unlistener function. Call it to remove the event
 * @android
 * @ios
 */
Application.on = function (event, callback) {};
/**
 * Event to be removed
 * @param {string} event - Event type to be created
 * @param {*} callback
 * @returns {Function} unlistener function. Call it to remove the event
 * @android
 * @ios
 */
Application.off = function (event, callback) {};

/**
 * Event to be emitted
 * @param {string} event - Event type to be triggered
 * @param {*} detail - Pass appropiate parameter to invoke the relevant event
 * @android
 * @ios
 */
Application.emit = function (event, detail) {};

module.exports = Application;
