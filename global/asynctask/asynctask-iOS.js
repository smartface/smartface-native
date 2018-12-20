const TypeUtil = require("sf-core/util/type");

function AsyncTask(params) {
    var self = this;

    var _task;
    var _onComplete;

    Object.defineProperties(self, {
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
            value: function() {
                try {
                    // Background
                    SF.dispatch_async(SF.dispatch_get_global_queue(0, 0), function() {
                        self.task();

                        // Main
                        SF.dispatch_async(SF.dispatch_get_main_queue(), function() {
                            self.onComplete();
                        });
                    });
                }
                catch (e) {
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
    
    self.android = {};
}

module.exports = AsyncTask;
