const NativeHandler = requireClass("android.os.Handler");
const NativeRunnable = requireClass("java.lang.Runnable");

const NUMBER = "number";
    
function Timer(params) {
    this.repeat = params.repeat;

    if (params) {
        this.task = params.task;
        this.delay = 0;
        if(typeof(params.delay) === NUMBER) {
            this.delay = params.delay;
        }

        this.nativeObject = NativeRunnable.implement({
            run: runnableTask.bind(this)
        }); 
        Timer.handler.postDelayed(this.nativeObject, this.delay);
    }
}

function runnableTask() {
    this.task();
    if (this.repeat) {
        Timer.handler.postDelayed(this.nativeObject, this.delay);
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
    if(timer && timer.nativeObject) {
        timer.repeat = false;
        Timer.handler.removeCallbacks(timer.nativeObject, null);
    } else {
        throw new Error("Not found given timer.");
    }
};

Timer.clearAllTimer = function() {
    Timer.handler.removeCallbacksAndMessages(null);
};

module.exports = Timer;