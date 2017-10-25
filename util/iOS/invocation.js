function Invocation () {};

Invocation.invokeInstanceMethod = function(target,selector,argumentsArray,returnValueType){
    var invocation = __SF_NSInvocation.createInvocationWithSelectorInstance(selector, target);
    if (invocation) {
        invocation.target = target;
        invocation.setSelectorWithString(selector);
        invocation.retainArguments();
        for (var i = 0; i < argumentsArray.length; i++) {
            invocation["set" + argumentsArray[i].type + "ArgumentAtIndex"](argumentsArray[i].value,i+2);
        }
        
        invocation.invoke();
        if (returnValueType) {
            return invocation["get" + returnValueType + "ReturnValue"]();
        }
    }
}

Invocation.invokeClassMethod = function (target,selector,argumentsArray,returnValueType){
    var invocation = __SF_NSInvocation.createClassInvocationWithSelectorInstance(selector, target);
    if (invocation) {
        invocation.setClassTargetFromString(target);
        invocation.setSelectorWithString(selector);
        invocation.retainArguments();
        for (var i = 0; i < argumentsArray.length; i++) {
            invocation["set" + argumentsArray[i].type + "ArgumentAtIndex"](argumentsArray[i].value,i+2);
        }

        invocation.invoke();

        if (returnValueType) {
            return invocation["get" + returnValueType + "ReturnValue"]();
        }
    }
}

Invocation.Argument = function(params){
    var self = this;
    
    var _type;
    Object.defineProperty(self, 'type', {
        get:function() {
            return _type;
        },
        set:function(value) {
            _type = value;
        },
        enumerable: true
     });
     
     var _value;
     Object.defineProperty(self, 'value', {
        get:function() {
            
            return _value;
        },
        set:function(value) {
            _value = value;
        },
        enumerable: true
     });
    
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Invocation;