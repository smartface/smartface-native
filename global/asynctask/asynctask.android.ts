import { TypeUtil } from '../../util';
import { AsyncTaskBase, IAsyncTask } from './asynctask';
import { AsyncTaskEvents } from './asynctask-events';

const SFAsyncTask = requireClass('io.smartface.android.sfcore.global.SFAsyncTask');

export class AsyncTaskAndroid extends AsyncTaskBase {
  static Events = AsyncTaskEvents;
  protected _android;
  constructor(params?: Partial<IAsyncTask>) {
    super();
    this.nativeObject = new SFAsyncTask();
    const EventFunctions = {
      [AsyncTaskEvents.Cancelled]: function () {
        this._onCancelled = (state) => {
          this.emitter.emit(AsyncTaskEvents.Cancelled, state);
        };
      },
      [AsyncTaskEvents.Complete]: function () {
        this._onComplete = (state) => {
          this.emitter.emit(AsyncTaskEvents.Complete, state);
        };
      },
      [AsyncTaskEvents.PreExecute]: function () {
        this._onPreExecute = (state) => {
          this.emitter.emit(AsyncTaskEvents.PreExecute, state);
        };
      }
    };
    const self = this;
    const android = {
      getStatus() {
        self.nativeObject.getStatus();
      },
      get onPreExecute() {
        return self._onPreExecute;
      },
      set onPreExecute(value) {
        if (TypeUtil.isFunction(value)) {
          self._onPreExecute = value;
        }
      }
    };

    this._android = Object.assign(this._android, android);

    const callbacks = {
      onPreExecute: function () {
        this._onPreExecute && this._onPreExecute();
      },
      doInBackground: function (objects) {
        this._task && this._task(objects);
      },
      onPostExecute: function () {
        this._onComplete && this._onComplete();
      },
      onCancelled: function () {
        this._onCancelled && this._onCancelled();
      }
    };
    this.nativeObject.setJsCallback(callbacks);

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
