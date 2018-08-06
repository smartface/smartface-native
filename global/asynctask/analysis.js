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

module.exports = AsyncTask;