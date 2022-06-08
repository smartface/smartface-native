import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import { IAsyncTask, IAsyncTaskAndroidProps } from './asynctask';
import { AsyncTaskEvents } from './asynctask-events';

export class AsyncTaskIOS<TEvent extends string = AsyncTaskEvents, TProps extends MobileOSProps<{}, IAsyncTaskAndroidProps> = MobileOSProps<{}, IAsyncTaskAndroidProps>>
  extends NativeEventEmitterComponent<TEvent | AsyncTaskEvents, any, TProps>
  implements IAsyncTask
{
  protected createNativeObject() {
    return new __SF_NSOperationQueue();
  }
  static Events = AsyncTaskEvents;
  constructor(params: TProps) {
    super(params);
  }
  task: () => void;
  onComplete: () => void;
  onCancelled: () => void;
  onPreExecute: () => void;
  run() {
    const self = this;
    if (this.nativeObject.operationCount === 0) {
      const operation = __SF_NSBlockOperation.blockOperationWithJSValue(() => {
        this.task?.();
      });

      operation.setCompletionBlockWithJSValue(
        function () {
          __SF_NSOperationQueue.mainQueue().addOperationWithJSValue(() => {
            this.cancelled ? self.onCancelled?.() : self.onComplete?.();
            this.cancelled ? self.emit('cancelled') : self.emit('complete');
          });
        }.bind(operation)
      );

      this.nativeObject.addOperation(operation);
    } else {
      throw new Error('Cannot execute task: the task is already running.');
    }
  }
  cancel() {
    this.nativeObject.cancelAllOperations();
  }
  toString() {
    return 'AsyncTask';
  }
}

export default AsyncTaskIOS;
