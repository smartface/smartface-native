const TypeUtil          = require("sf-core/util/type");

function AsyncTask(params){
    var self = this;
    
    var _onPreExecute;
    var _doInBackground;
    var _onPostExecute;
    
    Object.defineProperties(self,{
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
            value: function(){
                try{
                    self.onPreExecute();
                    
                    // Background
                    SF.dispatch_async(SF.dispatch_get_global_queue(), function() {
                        self.doInBackground();
                        
                        // Main
                        SF.dispatch_async(SF.dispatch_get_main_queue(), function() {
                            self.onPostExecute();
                        });
                    });
                }
                catch(e){
                    Application.onUnhandledError(e);
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