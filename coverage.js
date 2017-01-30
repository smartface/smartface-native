// This is a proxy class used for replacing native classes
var ClassProxy = new Proxy(function(params){}, {
    get: function(target, name) {
        if (name.toString() === "Symbol(Symbol.toPrimitive)") {
            return function(hint) { 
                var result;
                switch (hint) {
                    case 'string':
                        result = "";
                        break;
                    case 'number':
                        result = 0;
                        break;
                    case 'default':
                        result = true;
                        break;
                }
                return result; 
            };
        } else if (name.toString() === "implement") {
            return implement;
        } else if (name.toString() === "addJSTarget") {
            return addJSTarget;
        }
        return ClassProxy;
    },
    construct: function(target, argumentList, newTarget) {
        if (argumentList[0] instanceof Object) {

        }
        return ClassProxy;
    },
    apply: function(target, thisArg, argumentsList) {
        return ClassProxy;
    },
    set: function(target, prop, value, receiver) {
        return true;
    }
});

global.log = function(toLog){
    console.log(toLog);
}
global.alert = function(message){
    console.log(message);
}

// Cover Android
global.Device = {
    deviceOS: "Android"
}
if (Device.deviceOS === "Android") {
    global.requireClass = function(className) {
        return ClassProxy;
    }

    global.Android = {
        getActivity: function() {
            return ClassProxy;
        }
    }

    var callbacksToRun = [];
    global.implement = function(param){
        for (var key in param) {
            callbacksToRun.push(param[key].bind(this));
        }
    }

    // Run workspace
    require("./tests");

    callbacksToRun.forEach(function(callback) {
        for(var i = 0; i < 100; i++) {
            callback(ClassProxy, ClassProxy, ClassProxy, ClassProxy);
        }
    });
}

// Clear require cache
Object.keys(require.cache).forEach(function(key) { 
    delete require.cache[key] 
});

// Cover iOS
global.Device = {
    deviceOS: "iOS"
}
if (Device.deviceOS === "iOS") {
    global.UIColor                  = ClassProxy;
    global.UIViewController         = ClassProxy;
    global.SMFUIView                = ClassProxy;
    global.UIApplication            = ClassProxy;
    global.SMFUITextView            = ClassProxy;
    global.UIFont                   = ClassProxy;
    global.SMFUIButton              = ClassProxy;
    global.UINavigationController   = ClassProxy;
    global.SMFUISlider              = ClassProxy;

    var callbacksToRun = [];
    function addJSTarget(callback) {
        callbacksToRun.push(callback.bind(this));
    }

    // Run workspace
    require("./tests");

    callbacksToRun.forEach(function(callback) {
        for(var i = 0; i < 100; i++) {
            callback(ClassProxy, ClassProxy, ClassProxy, ClassProxy);
        }
    });
}