import { TypeUtil } from '../../util';
import { AsyncTaskBase, IAsyncTask } from './asynctask';
import { AsyncTaskEvents } from './asynctask-events';

export class AsyncTaskIOS extends AsyncTaskBase {
  static Events = AsyncTaskEvents;
  constructor(params?: Partial<IAsyncTask>) {
    super();
    this.nativeObject = new __SF_NSOperationQueue();
    const EventFunctions = {
      [AsyncTaskEvents.Cancelled]: function () {
        this._onCancelled = function (state) {
          this.emitter.emit(AsyncTaskEvents.Cancelled, state);
        };
      },
      [AsyncTaskEvents.Complete]: function () {
        this._onComplete = function (state) {
          this.emitter.emit(AsyncTaskEvents.Complete, state);
        };
      }
    };

    // Assign parameters given in constructor
    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
  }
  get task() {
    return this._task;
  }
  set task(value) {
    if (TypeUtil.isFunction(value)) {
      this._task = value;
    }
  }
  get onComplete() {
    return this._onComplete;
  }
  set onComplete(value) {
    if (TypeUtil.isFunction(value)) {
      this._onComplete = value;
    }
  }
  get onCancelled() {
    return this._onCancelled;
  }
  set onCancelled(value) {
    if (TypeUtil.isFunction(value)) {
      this._onCancelled = value;
    }
  }
  run() {
    const self = this;
    if (this.nativeObject.operationCount === 0) {
      const operation = __SF_NSBlockOperation.blockOperationWithJSValue(function () {
        self.task && self.task();
      });

      operation.setCompletionBlockWithJSValue(
        function () {
          __SF_NSOperationQueue.mainQueue().addOperationWithJSValue(
            function () {
              this.cancelled ? self.onCancelled && self.onCancelled() : self.onComplete && self.onComplete();
            }.bind(this)
          );
        }.bind(operation)
      );

      self.nativeObject.addOperation(operation);
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
