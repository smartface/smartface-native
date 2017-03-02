function Timer() {}

Timer.timerArray = [];

Timer.createTimer = function(params){
    this.timer = new SMFTimer();
    this.timer.scheduledTimer(params.delay/1000,function(){
        if (params.task){
            params.task();
        }
    },params.repeats);
    
    Timer.timerArray.push(this.timer);
    
    return this.timer;
}

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
        Timer.clearTimer(Timer.timerArray[timer]);
    }
}

module.exports = Timer;