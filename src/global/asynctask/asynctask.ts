import { IEventEmitter } from '../../core/eventemitter';
import { INativeComponent } from '../../core/inative-component';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import { AsyncTaskEvents } from './asynctask-events';

export enum Status {
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

export interface IAsyncTaskAndroidProps {
  /**
   * Returns the current status of this task.
   *
   * @method getStatus
   * @android
   * @since 3.2.2
   * @return {AsyncTask.Android.Status} status
   */
  getStatus?: () => Status;
}

/**
 * @class AsyncTask
 * @since 3.1.0
 * AsyncTask enables proper and easy use of concurrency to improve speed and performance.
 *
 *     @example
 *     import AsyncTask from '@smartface/native/asynctask';
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
export interface IAsyncTask<TEvent extends string = AsyncTaskEvents, TMobile extends MobileOSProps<{}, IAsyncTaskAndroidProps> = MobileOSProps<{}, IAsyncTaskAndroidProps>>
  extends INativeComponent,
    IEventEmitter<TEvent | AsyncTaskEvents> {
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
   * @example
   * ````
   * import AsyncTask from '@smartface/native/global/asynctask';
   *
   * const task = new AsyncTask();
   * task.on(AsyncTask.Events.Complete, () => {
   * 	console.info('onComplete');
   * });
   * ````
   */
  onComplete: () => void;
  /**
   * Runs on the UI thread before onComplete.
   *
   * @method onPreExecute
   * @deprecated
   * @android
   * @since 3.2.2
   * @example
   * ````
   * import AsyncTask from '@smartface/native/global/asynctask';
   *
   * const task = new AsyncTask();
   * task.on(AsyncTask.Events.PreExecute, () => {
   * 	console.info('onPreExecute');
   * });
   * ````
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
   * @example
   * ````
   * import AsyncTask from '@smartface/native/global/asynctask';
   *
   * const task = new AsyncTask();
   * task.on(AsyncTask.Events.Cancelled, () => {
   * 	console.info('onCancelled');
   * });
   * ````
   */
  onCancelled: () => void;
  /**
   * Runs the task.
   *
   * @method run
   * @android
   * @ios
   * @since 3.1.0
   */
  run(): void;
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
  cancel(): void;
  ios: TMobile['ios'];
  android: TMobile['android'];
}

export declare class AbstractAsyncTask<TEvent extends string = AsyncTaskEvents, TMobile extends MobileOSProps<{}, IAsyncTaskAndroidProps> = MobileOSProps<{}, IAsyncTaskAndroidProps>>
  extends NativeEventEmitterComponent<TEvent | AsyncTaskEvents, any, TMobile>
  implements IAsyncTask
{
  protected createNativeObject(): any;
  task: () => void;
  onComplete: () => void;
  onPreExecute: () => void;
  onCancelled: () => void;
  getStatus?: () => Status;
  run(): void;
  cancel(): void;
  static readonly Android: {
    Status: Status;
  };
}
