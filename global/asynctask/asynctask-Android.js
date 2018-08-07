/*globals array,requireClass,release */
const TypeUtil = require("sf-core/util/type");
const SFAsyncTask = requireClass('io.smartface.android.SFAsyncTask');

function AsyncTask(params) {
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
    Object.defineProperties(this, {
        'onPreExecute': {
            get: function() {
                return _onPreExecute;
            },
            set: function(value) {
                if (TypeUtil.isFunction(value)) {
                    _onPreExecute = value.bind(this);
                }
            }
        },
        'task': {
            get: function() {
                return _task;
            },
            set: function(value) {
                if (TypeUtil.isFunction(value)) {
                    _task = value.bind(this);
                }
            }
        },
        'onProgressUpdate': {
            get: function() {
                return _onProgressUpdate;
            },
            set: function(value) {
                if (TypeUtil.isFunction(value)) {
                    _onProgressUpdate = value.bind(this);
                }
            }
        },
        'onComplete': {
            get: function() {
                return _onComplete;
            },
            set: function(value) {
                if (TypeUtil.isFunction(value)) {
                    _onComplete = value.bind(this);
                }
            }
        },
        'run': {
            value: function(params) {
                if (TypeUtil.isArray(params)) {
                    this.nativeObject.executeTask(array(params, "java.lang.Object"));
                } else {
                    this.nativeObject.executeTask(null);
                }
            }
        },
        'cancel': {
            value: function() {
                this.nativeObject.cancel();
            }
        },
        'status': {
            value: function() {
                return this.nativeObject.getStatus();
            }
        },
        'toString': {
            value: function() {
                return "AsyncTask";
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
AsyncTask.Status.FINISHED = SFAsyncTask.Status.FINISHED;
AsyncTask.Status.PENDING = SFAsyncTask.Status.PENDING;
AsyncTask.Status.RUNNING = SFAsyncTask.Status.RUNNING;

module.exports = AsyncTask;