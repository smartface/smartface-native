/**
 * @class Application
 * @since 0.1
 * 
 * A set of collection for application based properties and methods.
 */
function Application() {}

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
 * @since 0.1
 */
Application.smartfaceAppName;

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
 * Launches another application and passes data. For Android, you can open application chooser with 
 * isShowChooser parameter and set chooser dialog title with chooserTitle.
 * if an app can open a given URL resource onSuccess callback will be triggered othervise onFailure triggered.
 * The data should be url encoded.
 * 
 *     @example
 *     // Calling application's Google Play Store page. Will work only for iOS
 *     Application.call("market://details",{
 *         'id': Application.android.packageName
 *     });
 *     // Open caller app with phone number.
 *     Application.call("tel:+901234567890",{});
 *     // Call another application with its own url schema.
 *     Application.call("mySchema://",{},function(){
 *         alert("Application call completed")
 *     },function(){
 *         alert("Application call failed")
 *     });
 *     // Call another application with package name and activity name. Works only for Android.
 *     Application.call("io.smartface.SmartfaceApp|io.smartface.SmartfaceApp.A",{});
 *     // Call Smartface Emulator with url schema.
 *     Application.call("smartface-emulator://",{});
 *     // Open Youtube with Chooser for Android
 *     Application.call("https://www.youtube.com/watch?v=VMLU9mfzHYI",{},function(){
 *         alert("Application call completed")
 *     },function(){
 *         alert("Application call failed")
 *     },true,"Select an Application");
 * 
 *
 * @method call
 * @param {String} uriScheme
 * @param {Object} data
 * @param {Function} onSuccess Added in 1.1.13.
 * @param {Function} onFailure Added in 1.1.13.
 * @param {Boolean} isShowChooser Added in 1.1.13.
 * @param {String} chooserTitle Added in 1.1.13.
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.call = function(uriScheme, data, onSuccess, onFailure, isShowChooser, chooserTitle) {};

/**
 * Exists the application.
 *
 * @method exit
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.exit = function(){};

/**
 * Restarts the application.
 *
 * @method restart
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.restart = function(){};

/**
 * This function checks if one of the dangerous permissions is granted at beginning or not. 
 * For android versions earlier than 6.0, it will return value exists in manifest or not. 
 * For permissions in same category with one of the permissions is approved earlier, checking 
 * will return as it is not required to request for the same category permission.
 *
 * @method checkPermission
 * @param {String} permission
 * @return {Boolean}
 * @readonly
 * @android
 * @static
 * @since 1.2
 */
Application.android.checkPermission = function(permission){};

/**
 * With requestPermissions, the System Dialog will appear to ask for 
 * permission grant by user for dangerous(privacy) permissions. 
 * {@link Application#android.onRequestPermissionsResult onRequestPermissionsResult} will be fired after user interact with permission dialog.
 * 
 *     @example
 *     const Application = require("sf-core/application");
 *     Application.android.requestPermissions(1002, Application.android.Permissions.WRITE_EXTERNAL_STORAGE)
 *     Application.android.onRequestPermissionsResult = function(e){
 *         console.log(JSON.stringify(e));
 *     }
 *
 * @method requestPermissions
 * @param {Number} requestIdentifier This number  will be returned in {@link Application#android.onRequestPermissionsResult onRequestPermissionsResult} when the user give permission or not. 
 * @param {String} permission
 * @readonly
 * @android
 * @static
 * @since 1.2
 */
Application.android.requestPermissions = function(requestIdentifier, permission){};

/**
 * This method checks for a permission is shown before to user 
 * and the program is about to request the same permission again.
 *
 * @method shouldShowRequestPermissionRationale
 * @param {String} permission
 * @return {Boolean}
 * @readonly
 * @android
 * @static
 * @since 1.2
 */
Application.android.shouldShowRequestPermissionRationale = function(permission){};

/**
 * Checks if there is a new update from {@link https://developer.smartface.io/docs/remote-app-update RAU}.
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
 *     });
 * 
 * @method checkUpdate
 * @param {Function} callback Function for update check result
 * @param {Object} callback.err For a valid update data, err argument should be null otherwise it will be message field in json response.
 * @param {Object} callback.update Update object when there is a new version of the app.
 * @param {String} callback.update.newVersion New version number obtained from RAU.
 * @param {String} callback.update.newRevision Revision value of the new version.
 * @param {Function} callback.update.download Method that initiates download of update files.
 * @param {Object} callback.update.download.err Error object of the download operation. For a valid update data, err argument should be null.
 * @param {Object} callback.update.download.downloadFinish Result object of the download operation.
 * @param {Function} callback.update.download.downloadFinish.updateAll Updates all files silently, callback is fired at the end of operation.
 * @param {Object} callback.update.download.downloadFinish.updateAll.err Error object of the update operation. For a valid update, err argument should be null.
 * @param {Function} callback.update.download.downloadFinish.cancel Clears all staged files.
 * @param {Object} callback.update.download.downloadFinish.cancel.err Error object of the clear operation. For a valid clear, err argument should be null.
 * @param {Function} callback.update.download.downloadFinish.meta  Meta in rau.json as object parsed.
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.checkUpdate = function(callback){};

/**
 * Triggered before exiting application.
 * 
 * @since 0.1
 * @event onExit
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onExit = function(){};

/**
 * Triggered after application bring to front.
 * 
 * @since 0.1
 * @event onMaximize
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onMaximize = function(){};

/**
 * Triggered after application bring to back.
 * 
 * @since 0.1
 * @event onMinimize
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onMinimize = function(){};

/**
 * Triggered after a push (remote) notification recieved. This event will be 
 * fired only if application is active and running. 
 * 
 * @event onReceivedNotification
 * @param {Object} data 
 * @param {Object} data.remote
 * @param {Object} data.local
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onReceivedNotification = function(data){};

/**
 * Triggered when application is called by another application.
 * 
 * @event onApplicationCallReceived
 * @param {Object} e 
 * @param {Object} e.data Data sent by application.
 * @param {Object} e.eventType Can be "call" or "callback". 
 * This parameter is available only for Android. For iOS this always returns "call". 
 * For example; Application A calls application B, eventType becomes "call" for application B. 
 * When application B is done its job and calls callFinish() method. Application A comes 
 * foreground and eventType becomes "callback" for Android.
 * @param {Object} e.result This parameter is available only for Android and when eventType is 
 * "callback". Returns Android Activity result code.
 * @android
 * @ios
 * @static
 * @since 1.1.13
 */
Application.onApplicationCallReceived = function(e){};

/**
 * This event is called after Application.requestPermissions function. This event is 
 * fired asynchronous way, there is no way to make sure which request is answered.
 * 
 * @since 1.2
 * @event onRequestPermissionsResult
 * @param {Number} e.requestCode
 * @param {Boolean} e.result
 * @android
 * @static
 * @since 1.2
 */
Application.android.onRequestPermissionsResult = function(e){}

/**
 * Triggered when unhandelled error occurs.
 * 
 * @since 1.2
 * @event onUnhandledError
 * @param {Object} error 
 * @param {String} error.message
 * @param {String} error.stack
 * @android
 * @ios
 * @static
 * @since 1.2
 */
Application.onUnhandledError = function(error){};

/** 
 * @enum Application.android.Permissions 
 * @since 1.2
 * 
 * Permission enum for Application.
 * Permission managements should be developed OS specific in the applications.
 */
Application.android.Permissions = {};

/**
 * Allows to read the calendar data.
 *
 * @property READ_CALENDAR
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.READ_CALENDAR;

/**
 * Allows an application to write the user's calendar data.
 *
 * @property WRITE_CALENDAR
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.WRITE_CALENDAR;

/**
 * Required to be able to access the camera device.
 *
 * @property CAMERA
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.CAMERA;

/**
 * Allows an application to read the user's contacts data.
 *
 * @property READ_CONTACTS
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.READ_CONTACTS;

/**
 * Allows an application to write the user's contacts data.
 *
 * @property WRITE_CONTACTS
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.WRITE_CONTACTS;

/**
 * Allows access to the list of accounts in the Accounts Service.
 *
 * @property GET_ACCOUNTS
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.GET_ACCOUNTS;

/**
 * Allows an app to access precise location.
 *
 * @property ACCESS_FINE_LOCATION
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.ACCESS_FINE_LOCATION;

/**
 * Allows an app to access approximate location.
 *
 * @property ACCESS_COARSE_LOCATION
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.ACCESS_COARSE_LOCATION;

/**
 * Allows an application to record audio.
 *
 * @property RECORD_AUDIO
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.RECORD_AUDIO;

/**
 * Allows read only access to phone state, including the phone number of the device, 
 * current cellular network information, the status of any ongoing calls, and a list 
 * of any PhoneAccounts registered on the device.
 *
 * @property READ_PHONE_STATE
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.READ_PHONE_STATE;

/**
 * Allows an application to initiate a phone call without going through the 
 * Dialer user interface for the user to confirm the call.
 *
 * @property CALL_PHONE
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.CALL_PHONE;

/**
 * Allows an application to read the user's call log.
 *
 * @property READ_CALL_LOG
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.READ_CALL_LOG;

/**
 * Allows an application to write (but not read) the user's call log data.
 *
 * @property WRITE_CALL_LOG
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.WRITE_CALL_LOG;

/**
 * Allows an application to add voicemails into the system.
 *
 * @property ADD_VOICEMAIL
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.ADD_VOICEMAIL;

/**
 * Allows an application to use SIP service.
 *
 * @property USE_SIP
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.USE_SIP;

/**
 * Allows an application to see the number being dialed during an 
 * outgoing call with the option to redirect the call to a different
 * number or abort the call altogether.
 *
 * @property PROCESS_OUTGOING_CALLS
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.PROCESS_OUTGOING_CALLS;

/**
 * Allows an application to access data from sensors 
 * that the user uses to measure what is happening inside 
 * his/her body, such as heart rate.
 *
 * @property BODY_SENSORS
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.BODY_SENSORS;

/**
 * Allows an application to send SMS messages.
 *
 * @property SEND_SMS
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.SEND_SMS;

/**
 * Allows an application to receive SMS messages.
 *
 * @property RECEIVE_SMS
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.RECEIVE_SMS;

/**
 * Allows an application to read SMS messages.
 *
 * @property READ_SMS
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.READ_SMS;

/**
 * Allows an application to receive WAP push messages.
 *
 * @property RECEIVE_WAP_PUSH
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.RECEIVE_WAP_PUSH;

/**
 * Allows an application to monitor incoming MMS messages.
 *
 * @property RECEIVE_MMS
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.RECEIVE_MMS;

/**
 * Allows to read from external storage. 
 * If you granted {@link Application.android.Permissions.WRITE_EXTERNAL_STORAGE WRITE_EXTERNAL_STORAGE} permission, 
 * you don't need this to granted this permission.
 *
 * @property READ_EXTERNAL_STORAGE
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.READ_EXTERNAL_STORAGE;

/**
 * Allows to write to external storage.
 *
 * @property WRITE_EXTERNAL_STORAGE
 * @static
 * @readonly
 * @since 1.2
 */
Application.android.Permissions.WRITE_EXTERNAL_STORAGE;

module.exports = Application;