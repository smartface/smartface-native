/*globals array,requireClass,release */
const TypeUtil = require("sf-core/util/type");
const SFAsyncTask = requireClass('io.smartface.android.SFAsyncTask');

function AsyncTask(params) {
    
    const self = this;
    
    var callbacks = {
        onPreExecute: function() {
            _onPreExecute && _onPreExecute();
        },
        doInBackground: function(objects) {
            _task && _task(objects);
        },
        onProgressUpdate: function() {
            _onProgressUpdate && _onProgressUpdate();
        },
        onPostExecute: function() {
            _onComplete && _onComplete();
        }
    };
    this.nativeObject = new SFAsyncTask();
    this.nativeObject.setJsCallback(callbacks);


    var _onPreExecute;
    var _task;
    var _onProgressUpdate;
    var _onComplete;
    Object.defineProperties(self, {
        'task': {
            get: function() {
                return _task;
            },
            set: function(value) {
                if (TypeUtil.isFunction(value)) {
                    _task = value.bind(self);
                }
            }
        },
        'onComplete': {
            get: function() {
                return _onComplete;
            },
            set: function(value) {
                if (TypeUtil.isFunction(value)) {
                    _onComplete = value.bind(self);
                }
            }
        },
        'run': {
            value: function(params) {
                if (TypeUtil.isArray(params)) {
                    self.nativeObject.executeTask(array(params, "java.lang.Object"));
                }
                else {
                    self.nativeObject.executeTask(null);
                }
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
        'setCancel': {
            value: function(mayInterruptIfRunning = false) {
                self.nativeObject.cancel(mayInterruptIfRunning);
            }
        },
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
                    _onPreExecute = value.bind(self);
                }
            }
        },
        'onProgressUpdate': {
            get: function() {
                return _onProgressUpdate;
            },
            set: function(value) {
                if (TypeUtil.isFunction(value)) {
                    _onProgressUpdate = value.bind(self);
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


AsyncTask.Status = {};
AsyncTask.Status.Android = {};
AsyncTask.Status.Android.FINISHED = SFAsyncTask.Status.FINISHED;
AsyncTask.Status.Android.PENDING = SFAsyncTask.Status.PENDING;
AsyncTask.Status.Android.RUNNING = SFAsyncTask.Status.RUNNING;
Object.freeze(AsyncTask.Status.Android);

module.exports = AsyncTask;
