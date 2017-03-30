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
 * Launches another application and passes data.
 *
 * @method call
 * @param {String} uriScheme
 * @param {Object} data
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.call = function(uriScheme, data) {};

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
 * Check new update from {@link https://developer.smartface.io/docs/remote-app-update RAU}.
 * 
 *     @example
 *     Application.checkUpdate(function(err, result) {
 *         if (err) {
 *             alert("check update error: " + err);
 *         } else {
 *             result.download(function(err, downloadFinish) {
 *                 if (err) {
 *                     alert("download error: " + err);
 *                 } else {
 *                     downloadFinish.updateAll(function(err) {
 *                         if (err) {
 *                             alert("update all error: " + err);
 *                         } else {
 *                             alert(downloadFinish.meta);
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
 * Triggered when application is called by another application.
 * 
 * @since 0.1
 * @event onApplicationCallReceived
 * @param {Object} e 
 * @param {Object} e.data Data sent by application.
 * @param {String} [e.eventType] This parameter is available only for Android. For iOS this always returns "call". 
 * @param {String} [e.result] This parameter is available only for Android and when eventType is "callback". Returns Android Activity result code.
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onApplicationCallReceived = function(e){};

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
 * @since 0.1
 * @event onReceivedNotification
 * @param {Object} data 
 * @param {Object} data.remote
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onReceivedNotification = function(data){};

/**
 * Triggered when unhandelled error occurs.
 * 
 * @since 0.1
 * @event onUnhandledError
 * @param {Object} error 
 * @param {String} error.message
 * @param {String} error.stack
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onUnhandledError = function(error){};

module.exports = Application;