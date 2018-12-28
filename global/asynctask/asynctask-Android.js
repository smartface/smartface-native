/*globals array,requireClass */
const TypeUtil = require("sf-core/util/type");
const SFAsyncTask = requireClass('io.smartface.android.sfcore.global.SFAsyncTask');

function AsyncTask(params) {

    const self = this;

    var callbacks = {
        onPreExecute: function() {
            _onPreExecute && _onPreExecute();
        },
        doInBackground: function(objects) {
            _task && _task(objects);
        },
        onPostExecute: function() {
            _onComplete && _onComplete();
        },
        onCancelled: function() {
            _onCancelled && _onCancelled();
        }
    };
    this.nativeObject = new SFAsyncTask();
    this.nativeObject.setJsCallback(callbacks);


    let _onPreExecute,_task, _onComplete, _onCancelled;
    Object.defineProperties(self, {
        'task': {
            get: function() {
                return _task;
            },
            set: function(value) {
                if (TypeUtil.isFunction(value)) {
                    _task = value;
                }
            }
        },
        'onComplete': {
            get: function() {
                return _onComplete;
            },
            set: function(value) {
                if (TypeUtil.isFunction(value)) {
                    _onComplete = value;
                }
            }
        },
        'onCancelled':{
            get: function() {
                return _onCancelled;
            },
            set: function(value) {
                if (TypeUtil.isFunction(value)) {
                    _onCancelled = value;
                }
            }
        },
        'run': {
            value: function() {
                self.nativeObject.executeTask();
            }
        },
        'cancel': {
            value: function(mayInterruptIfRunning = false) {
                return self.nativeObject.cancel(mayInterruptIfRunning);
            }
        },
        'toString': {
            value: function() {
                return "AsyncTask";
            }
        }
    });

    self.android = {};
    Object.defineProperties(self.android, {
        'getStatus': {
            value: function() {
                return self.nativeObject.getStatus();
            }
        },
        'onPreExecute': {
            get: function() {
                return _onPreExecute;
            },
            set: function(value) {
                if (TypeUtil.isFunction(value)) {
                    _onPreExecute = value;
                }
            }
        }
    });

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}


AsyncTask.Android = {};
AsyncTask.Android.Status = {};
AsyncTask.Android.Status.FINISHED = SFAsyncTask.Status.FINISHED;
AsyncTask.Android.Status.PENDING = SFAsyncTask.Status.PENDING;
AsyncTask.Android.Status.RUNNING = SFAsyncTask.Status.RUNNING;
Object.freeze(AsyncTask.Android.Status);

module.exports = AsyncTask;
