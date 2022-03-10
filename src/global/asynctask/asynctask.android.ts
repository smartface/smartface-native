import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import { IAsyncTask, IAsyncTaskAndroidProps, Status } from './asynctask';
import { AsyncTaskEvents } from './asynctask-events';

const SFAsyncTask = requireClass('io.smartface.android.sfcore.global.SFAsyncTask');

export class AsyncTaskAndroid<TEvent extends string = AsyncTaskEvents, TProps extends MobileOSProps<{}, IAsyncTaskAndroidProps> = MobileOSProps<{}, IAsyncTaskAndroidProps>>
  extends NativeEventEmitterComponent<TEvent | AsyncTaskEvents, any, TProps>
  implements IAsyncTask
{
  static Events = AsyncTaskEvents;
  protected _android;
  private _task: IAsyncTask['task'];
  constructor(params: Partial<IAsyncTask> = {}) {
    super();
    const { ios, android, ...rest } = params;
    this.nativeObject = new SFAsyncTask();
    Object.assign(this, rest);

    const callbacks = {
      onPreExecute: () => {
        this.onPreExecute();
        this.emit('preExecute');
      },
      doInBackground: () => {
        this.task();
      },
      onPostExecute: () => {
        this.onComplete?.();
        this.emit('complete');
      },
      onCancelled: () => {
        this.onCancelled?.();
        this.emit('cancelled');
      }
    };
    this.nativeObject.setJsCallback(callbacks);
    this.addAndroidProps(this.getAndroidProps());
  }
  private getAndroidProps(): IAsyncTask['android'] {
    const self = this;
    return {
      getStatus() {
        return self.nativeObject.getStatus();
      }
    };
  }
  onComplete: () => void;
  onCancelled: () => void;
  onPreExecute: () => void;
  getStatus?: () => Status;
  get task() {
    return this._task;
  }
  set task(value) {
    this._task = value;
  }
  run() {
    this.nativeObject.executeTask();
  }
  cancel(mayInterruptIfRunning = false) {
    return this.nativeObject.cancel(mayInterruptIfRunning);
  }
  toString() {
    return 'AsyncTask';
  }
}

export default AsyncTaskAndroid;
