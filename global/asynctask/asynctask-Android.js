/*globals array,requireClass,release */
const TypeUtil = require("sf-core/util/type");
const SFAsyncTask = requireClass('io.smartface.android.asynctask.SFAsyncTask');

function AsyncTask(params) {
    var callbacks = {
        onPreExecute: function() {
            _onPreExecute && _onPreExecute();
        },
        doInBackground: function(objects) {
            _doInBackground && _doInBackground(objects);
        },
        onProgressUpdate: function() {
            _onProgressUpdate && _onProgressUpdate();
        },
        onPostExecute: function() {
            _onPostExecute && _onPostExecute();
        }
    };
    this.nativeObject = new SFAsyncTask();
    this.nativeObject.setJsCallback(callbacks);


    var _onPreExecute;
    var _doInBackground;
    var _onProgressUpdate;
    var _onPostExecute;
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
        'doInBackground': {
            get: function() {
                return _doInBackground;
            },
            set: function(value) {
                if (TypeUtil.isFunction(value)) {
                    _doInBackground = value.bind(this);
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
        'onPostExecute': {
            get: function() {
                return _onPostExecute;
            },
            set: function(value) {
                if (TypeUtil.isFunction(value)) {
                    _onPostExecute = value.bind(this);
                }
            }
        },
        'execute': {
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