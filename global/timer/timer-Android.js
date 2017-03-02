const NativeHandler = requireClass("android.os.Handler");
const NativeRunnable = requireClass("java.lang.Runnable");

var handler = new NativeHandler();
var timeOutTask = [];
var intervalTask = [];

const NUMBER = "number";
    
function Timer() {}

Timer.setTimeout = function(params){
    var delay = 0;
    if(typeof(params.delay) == NUMBER)
        delay = params.delay;
    var task = NativeRunnable.implement({
        run: function() {
            params.task();
        }
    });
    timeOutTask.push(task);
    handler.postDelayed(task, delay);
    return (timeOutTask.length - 1);
};


Timer.setInterval = function(params){
    var delay = 0;
    if(typeof(params.delay) == NUMBER)
        delay = params.delay;
        
    var task = NativeRunnable.implement({
        run: function() {
            params.task();
            handler.postDelayed(task, delay);
        }
    });
    intervalTask.push(task);
    handler.postDelayed(task, delay);
    return (intervalTask.length - 1);
};

Timer.clearTimeout = function(id) {
    if(id >= timeOutTask.length)
        throw new Error("Not found task, that created Timer.setTimeout, given id.");
    else
        handler.removeCallbacks(timeOutTask[id], null);
};

Timer.clearInterval = function(id) {
    if(id >= timeOutTask.length)
        throw new Error("Not found task given id.");
    else
        handler.removeCallbacks(intervalTask[id], null);
};

module.exports = Timer;