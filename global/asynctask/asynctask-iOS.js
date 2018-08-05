const TypeUtil          = require("sf-core/util/type");

function AsyncTask(params){
    var self = this;
    
    var _onPreExecute;
    var _task;
    var _onComplete;
    
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
        'task': {
            get: function(){
                return _task;
            },
            set: function(value){
                if(TypeUtil.isFunction(value)){
                    _task = value.bind(this);
                }
            }
        },
        'onComplete': {
            get: function(){
                return _onComplete;
            },
            set: function(value){
                if(TypeUtil.isFunction(value)){
                    _onComplete = value.bind(this);
                }
            }
        },
        'run': {
            value: function(){
                try{
                    self.onPreExecute();
                    
                    // Background
                    SF.dispatch_async(SF.dispatch_get_global_queue(0,0), function() {
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