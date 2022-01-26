/* global requireClass */
const NativeSFHandler = requireClass("io.smartface.android.sfcore.global.SFHandler");
const NativeRunnable = requireClass("java.lang.Runnable");

const NUMBER = "number";

function Timer(params) {
    const self = this;
    this.repeat = params.repeat;

    if (params) {
        this.task = params.task;
        this.delay = 0;
        if (typeof(params.delay) === NUMBER) {
            this.delay = params.delay;
        }

        this.nativeObject = NativeRunnable.implement({
            run: runnableTask
        });
        Timer.handler.postDelayed(this.nativeObject, long(this.delay));
    }

    function runnableTask() {
        self.task();
        if (self.repeat) {
            Timer.handler.postDelayed(self.nativeObject, long(self.delay));
        }
    }
}

Timer.handler = NativeSFHandler.getHandler();

Timer.setTimeout = function(params) {
    params.repeat = false;
    return new Timer(params);
};

Timer.setInterval = function(params) {
    params.repeat = true;
    return new Timer(params);
};

Timer.clearTimer = function(timer) {
    if (timer && timer.nativeObject) {
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