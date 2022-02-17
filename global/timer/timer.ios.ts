import NativeComponent from "core/native-component";
import { TimerBase } from "./timer";

class TimerIOS extends NativeComponent implements TimerBase {
    static createTimer(params: any) {
        const timer = new __SF_Timer();
        timer.scheduledTimer(params.delay / 1000, function() {
            if (params.task) {
                params.task();
            }
        }, params.repeats);

        TimerIOS.timerArray.push(timer);
        return timer;
    }
    static setTimeout(params: { task: () => void; delay: number }) {
        params["repeats"] = false;
        return TimerIOS.createTimer(params);
    }
    static setInterval(params: { task: () => void; delay: number }) {
        params["repeats"] = true;
        return TimerIOS.createTimer(params);
    }
    static clearTimer(timer: __SF_Timer) {
        timer.invalidate();
    }
    static clearAllTimer() {
        for (const timer in TimerIOS.timerArray) {
            // Added this check to resolve the sonar issue. 
            // hasOwnProperty() is used to filter out properties from the object's prototype chain.
            if (TimerIOS.timerArray.hasOwnProperty(timer)) {
                TimerIOS.clearTimer(TimerIOS.timerArray[timer]);
            }
        }
    }
    static timerArray = [];
}

export default TimerIOS;