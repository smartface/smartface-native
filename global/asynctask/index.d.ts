import { IEventEmitter } from "core/eventemitter";

export = AsyncTask;
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
declare class AsyncTask extends NativeComponent implements IEventEmitter<typeof AsyncTask.Events> {
  constructor();
  on(eventName: typeof AsyncTask.Events, callback: (...args: any) => void): () => void;
  off(eventName: typeof AsyncTask.Events, callback?: (...args: any) => void): void;
  emit(event: typeof AsyncTask.Events, detail?: any[]): void;
/**
 * This event describes task of AsyncTask instance.
 *
 * @event task
 * @android
 * @ios
 * @since 3.1.0
 */
  task: () => void;
/**
 * This event invokes when task is completed.
 *
 * @event onComplete
 * @android
 * @ios
 * @deprecated
 * @since 3.1.0
 */
  onComplete: () => void;
/**
 * Runs on the UI thread before onComplete.
 *
 * @method onPreExecute
 * @deprecated
 * @android
 * @since 3.2.2
 */
  onPreExecute: () => void;
/**
 * Runs on the UI thread after cancel() is invoked
 *
 * @method onCancelled
 * @android
 * @deprecated
 * @ios
 * @since 3.2.2
 */
  onCancelled: () => void;
/**
 * Returns the current status of this task.
 *
 * @method getStatus
 * @android
 * @since 3.2.2
 * @return {AsyncTask.Android.Status} status
 */
  getStatus?: () => AsyncTask.Android.Status;
/**
 * Runs the task.
 *
 * @method run
 * @android
 * @ios
 * @since 3.1.0
 */
  run():void;
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
  cancel():void;
}
declare namespace AsyncTask {
/**
 * Android Specific Properties.
 * @class AsyncTask.Android
 * @since 3.2.2
 */
	namespace Android {
/**
 * @enum AsyncTask.Android.Status  
 * @since 3.2.2
 *
 */
		enum Status {
/** 
 * Indicates that onComplete has finished.
 *
 * @property FINISHED
 * @static
 * @readonly
 * @since 3.2.0
 */
            FINISHED,
/** 
 * Indicates that the task has not been executed yet.
 *
 * @property PENDING
 * @static
 * @readonly
 * @since 3.2.0
 */
            PENDING,
/** 
 * Indicates that the task is running.
 *
 * @property RUNNING
 * @static
 * @readonly
 * @since 3.2.0
 */
			RUNNING
		}
	}

  enum Events {
    /**
     * This event invokes when task is completed.
     *
     * @event onComplete
     * @android
     * @ios
     * @since 3.1.0
     */
    Complete = "complete",
    /**
     * Runs on the UI thread after cancel() is invoked
     *
     * @method onCancelled
     * @android
     * @ios
     * @since 3.2.2
     */
    Cancelled = "cancelled",
    /**
     * Runs on the UI thread before onComplete.
     *
     * @method onPreExecute
     * @android
     * @since 3.2.2
     */
    PreExecute = "preExecute"
  }
}
