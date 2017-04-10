function Timer() {}

Timer.timerArray = [];

Timer.createTimer = function(params){
    this.timer = new __SF_Timer();
    this.timer.scheduledTimer(params.delay/1000,function(){
        if (params.task){
            params.task();
        }
    },params.repeats);
    
    Timer.timerArray.push(this.timer);
    
    return this.timer;
};

Timer.setTimeout = function(params) {
    params["repeats"] = false;
    return Timer.createTimer(params);
};

Timer.setInterval = function(params) {
    params["repeats"] = true;
    return Timer.createTimer(params);
};

Timer.clearTimer = function(timer) {
    timer.invalidate();
};

Timer.clearAllTimer = function(){
    for (var timer in Timer.timerArray){
        // Added this check to resolve the sonar issue. 
        // hasOwnProperty() is used to filter out properties from the object's prototype chain.
        if (Timer.timerArray.hasOwnProperty(timer)) { 
            Timer.clearTimer(Timer.timerArray[timer]);
        }
    }
};

module.exports = Timer;