const NativeHandler = requireClass("android.os.Handler");
const NativeRunnable = requireClass("java.lang.Runnable");

const NUMBER = "number";
    
function Timer(params) {
    if(params) {
        var delay = 0;
        if(typeof(params.delay) == NUMBER)
            delay = params.delay;
        var self = this;
        self.nativeObject = NativeRunnable.implement({
            run: function() {
                params.task();
                if(params.repeat) {
                    Timer.handler.postDelayed(self.nativeObject, delay);
                }
            }
        }); 
        Timer.handler.postDelayed(self.nativeObject, delay);
    }
}

Timer.handler = new NativeHandler();

Timer.setTimeout = function(params){
    params.repeat = false;
    return new Timer(params);
};

Timer.setInterval = function(params){
    params.repeat = true;
    return new Timer(params);
};

Timer.clearTimer = function(timer) {
    if(timer && timer.nativeObject)
        Timer.handler.removeCallbacks(timer.nativeObject, null);
    else 
        throw new Error("Not found given timer.");
};

Timer.clearAllTimer = function() {
    Timer.handler.removeCallbacksAndMessages(null);
};

module.exports = Timer;