const TypeUtil          = require("sf-core/util/type");
const NativeAsynTask    = requireClass('android.os.AsyncTask');

/**
 * This is JS implementtation of Android AsyncTask. 
 * When any operation needs different thread, we can use this.
 * params.onPreExecute 
 * params.doInBackground: objects[]
 * params.onProgressUpdate: progresses
 * params.onPostExecute: result
 * For more information: https://developer.android.com/reference/android/os/AsyncTask.html
 * 
 * NOTE: Not working due to COR-1281. 
 */
function AsyncTask(params){
    var asyncTask = NativeAsynTask.extend("SFAsyncTask", {
        onPreExecute: function(){
            _onPreExecute && _onPreExecute();
        },
        doInBackground: function(objects){
            _doInBackground && _doInBackground(objects);
        },
        onProgressUpdate: function(){
            _onProgressUpdate && _onProgressUpdate();
        },
        onPostExecute: function(){
            _onPostExecute && _onPostExecute();
        }
    }, null);
    
    var _onPreExecute;
    var _doInBackground;
    var _onProgressUpdate;
    var _onPostExecute;
    Object.defineProperties(this,{
        'onPreExecute': {
            get: function(){
                return _onPreExecute;
            },
            set: function(value){
                if(TypeUtil.isFunction(value)){
                    _onPreExecute = value.bind(this);
                }
            }
        },
        'doInBackground': {
            get: function(){
                return _doInBackground;
            },
            set: function(value){
                if(TypeUtil.isFunction(value)){
                    _doInBackground = value.bind(this);
                }
            }
        },
        'onProgressUpdate': {
            get: function(){
                return _onProgressUpdate;
            },
            set: function(value){
                if(TypeUtil.isFunction(value)){
                    _onProgressUpdate = value.bind(this);
                }
            }
        },
        'onPostExecute': {
            get: function(){
                return _onPostExecute;
            },
            set: function(value){
                if(TypeUtil.isFunction(value)){
                    _onPostExecute = value.bind(this);
                }
            }
        },
        'execute': {
            value: function(params){
                if(TypeUtil.isArray(params)){
                    try{
                        asyncTask.execute(params)
                    }
                    catch(e){
                        Application.onUnhandledError(e);
                    }
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

module.exports = AsyncTask;