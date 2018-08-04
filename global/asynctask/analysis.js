/**
 * @class AsyncTask
 * @since 3.1.0
 * AsyncTask enables proper and easy use of the UI thread. 
 * This class allows you to perform background operations and publish results on the UI thread without having to manipulate threads and/or handlers.
 * 
///////////////////////////////
// TODO !!!!
// NEEDS SAMPLE CODE
//
///////////////////////////////
 *
 */
function AsyncTask(params) {}

/**
 * This event invokes on the UI thread before the task is executed.
 *
 * @event onPreExecute
 * @android
 * @ios
 * @since 3.1.0
 */
AsyncTask.prototype.onPreExecute = function (){};

/**
 * This event invokes on the background thread immediately after onPreExecute() finishes executing.
 *
 * @event doInBackground
 * @android
 * @ios
 * @since 3.1.0
 */
AsyncTask.prototype.doInBackground = function (){};

/**
 * This event invokes on the UI thread after the background computation finishes.
 *
 * @event onPostExecute
 * @android
 * @ios
 * @since 3.1.0
 */
AsyncTask.prototype.onPostExecute = function (){};

/**
 * Executes the task.
 *
 * @event execute
 * @android
 * @ios
 * @since 3.1.0
 */
AsyncTask.prototype.execute = function (){};

module.exports = AsyncTask;