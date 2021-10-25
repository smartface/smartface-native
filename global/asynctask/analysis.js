/**
 * @class AsyncTask
 * @since 3.1.0
 * AsyncTask enables proper and easy use of concurrency to improve speed and performance.
 *
 *     @example
 *     const AsyncTask = require("@smartface/native/asynctask");
 *     var asynctask = new AsyncTask();
 *     asynctask.task = function () {
 *         // do something
 *     };
 *     asynctask.onComplete = function () {
 *         console.log("AsyncTask is completed.");
 *     };
 *
 *     asynctask.run();
 */
function AsyncTask(params) {}

/**
 * This event describes task of AsyncTask instance.
 *
 * @event task
 * @android
 * @ios
 * @since 3.1.0
 */
AsyncTask.prototype.task = function () {};

/**
 * Runs the task.
 *
 * @method run
 * @android
 * @ios
 * @since 3.1.0
 */
AsyncTask.prototype.run = function () {};

/**
 * Attempts to cancel execution of this task. For Android, This attempt will fail if the task has already completed,
 * already been cancelled, or could not be cancelled for some other reason. For Android, If successful,
 * and this task has not started when cancel is called, this task should never run. If the task has already started,
 * then the mayInterruptIfRunning parameter determines whether the thread executing this task should be interrupted in an attempt to stop the task.
 *
 * @property cancel
 * @android
 * @ios
 * @since 3.2.2
 * @return {Boolean} false For Android, if the task could not be cancelled, typically because it has already completed normally; true otherwise.
 */
AsyncTask.prototype.cancel = function () {};

/**
 * Returns the current status of this task.
 *
 * @method getStatus
 * @android
 * @since 3.2.2
 * @return {AsyncTask.Android.Status} status
 */
AsyncTask.prototype.getStatus = function () {};

/**
 * This event invokes when task is completed.
 *
 * @event onComplete
 * @deprecated
 * @android
 * @ios
 * @since 3.1.0
 */
AsyncTask.prototype.onComplete = function () {};

/**
 * Runs on the UI thread before onComplete.
 *
 * @event onPreExecute
 * @deprecated
 * @android
 * @since 3.2.2
 */
AsyncTask.prototype.onPreExecute = function () {};

/**
 * Runs on the UI thread after cancel() is invoked
 *
 * @event onCancelled
 * @deprecated
 * @android
 * @ios
 * @since 3.2.2
 */
AsyncTask.prototype.onCancelled = function () {};

/**
 * Android Specific Properties.
 * @class AsyncTask.Android
 * @since 3.2.2
 */
AsyncTask.prototype.Android = {};

/**
 * @enum AsyncTask.Android.Status
 * @since 3.2.2
 *
 */
AsyncTask.prototype.Android.Status = {};

/**
 * Indicates that onComplete has finished.
 *
 * @property FINISHED
 * @static
 * @readonly
 * @since 3.2.0
 */
AsyncTask.prototype.Android.Status.FINISHED = {};

/**
 * Indicates that the task has not been executed yet.
 *
 * @property PENDING
 * @static
 * @readonly
 * @since 3.2.0
 */
AsyncTask.prototype.Android.Status.PENDING = {};

/**
 * Indicates that the task is running.
 *
 * @property RUNNING
 * @static
 * @readonly
 * @since 3.2.0
 */
AsyncTask.prototype.Android.Status.RUNNING = {};

/**
 * Event to be implemented
 * @param {string} event - Event type to be created
 * @param {*} callback
 * @returns {Function} unlistener function. Call it to remove the event
 * @android
 * @ios
 */
AsyncTask.prototype.on = function (event, callback) {};
/**
 * Event to be removed
 * @param {string} event - Event type to be created
 * @param {*} callback
 * @returns {Function} unlistener function. Call it to remove the event
 * @android
 * @ios
 */
AsyncTask.prototype.off = function (event, callback) {};

/**
 * Event to be emitted
 * @param {string} event - Event type to be triggered
 * @param {*} detail - Pass appropiate parameter to invoke the relevant event
 * @android
 * @ios
 */
AsyncTask.prototype.emit = function (event, detail) {};

/**
 * This event invokes when task is completed.
 *
 * @event onComplete
 * @android
 * @ios
 * @since 3.1.0
 */
AsyncTask.Events.Complete = "complete";

/**
 * Runs on the UI thread before onComplete.
 *
 * @method onPreExecute
 * @android
 * @since 3.2.2
 */
AsyncTask.Events.PreExecute = "preExecute";

/**
 * Runs on the UI thread after cancel() is invoked
 *
 * @method onCancelled
 * @android
 * @ios
 * @since 3.2.2
 */
AsyncTask.Events.Cancelled = "cancelled";

module.exports = AsyncTask;
