/**
 * @class AsyncTask
 * @since 3.1.0
 * AsyncTask enables proper and easy use of concurrency to improve speed and performance.
 *
 *     @example
 *     const AsyncTask = require("sf-core/asynctask");
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
AsyncTask.prototype.task = function (){};

/**
 * This event invokes when task is completed.
 *
 * @event onComplete
 * @android
 * @ios
 * @since 3.1.0
 */
AsyncTask.prototype.onComplete = function (){};

/**
 * Runs the task.
 *
 * @method run
 * @android
 * @ios
 * @since 3.1.0
 */
AsyncTask.prototype.run = function (){};

/**
 * Attempts to cancel execution of this task. This attempt will fail if the task has already completed,
 * already been cancelled, or could not be cancelled for some other reason. If successful, 
 * and this task has not started when cancel is called, this task should never run. If the task has already started,
 * then the mayInterruptIfRunning parameter determines whether the thread executing this task should be interrupted in an attempt to stop the task.
 *
 * @method setCancel
 * @android
 * @since 3.2.2
 * @return {Boolean} false if the task could not be cancelled, typically because it has already completed normally; true otherwise
 */
AsyncTask.prototype.setCancel = function (){};


/**
 * Returns the current status of this task.
 *
 * @method getStatus
 * @android
 * @since 3.2.2
 * @return {AsyncTask.Status.Android} status
 */
AsyncTask.prototype.getStatus = function (){};


/**
 * Runs on the UI thread before onComplete.
 *
 * @method onPreExecute
 * @android
 * @since 3.2.2
 */
AsyncTask.prototype.onPreExecute = function (){};


/**
 * Android Specific Properties.
 * @class AsyncTask.Android
 * @since 3.2.2
 */
AsyncTask.prototype.Status.Android = {};

/** 
 * @enum Application.Android.FINISHED 
 * @since 3.2.2
 * 
 * Indicates that onComplete has finished.
 */
AsyncTask.prototype.Android.Status.FINISHED = {};

/** 
 * @enum Application.Android.PENDING 
 * @since 3.2.2
 * 
 * Indicates that the task has not been executed yet.
 */
AsyncTask.prototype.Android.Status.PENDING = {};


/** 
 * @enum Application.Android.RUNNING 
 * @since 3.2.2
 * 
 * Indicates that the task is running.
 */
AsyncTask.prototype.Android.Status.RUNNING = {};


module.exports = AsyncTask;