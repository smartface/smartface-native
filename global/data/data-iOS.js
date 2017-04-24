var Data = {};
Data.ios = {};

Data.ios.getNativeObject = function(){
    var _identifier = "SF_USER_DEFAULTS";
    return new __SF_NSUserDefaults(_identifier);
};

/////////////////////////////////////////////////////////////
// GETTERS
Data.getStringVariable = function(key){
    if (typeof key === 'string'){
        return Data.ios.getNativeObject().stringForKey(key);
    }
};

Data.getBooleanVariable = function(key){
    if (typeof key === 'string'){
        return Data.ios.getNativeObject().boolForKey(key);
    }
};

Data.getIntVariable = function(key){
    if (typeof key === 'string'){
        return Data.ios.getNativeObject().integerForKey(key);
    }
};

Data.getFloatVariable = function(key){
    if (typeof key === 'string'){
        return Data.ios.getNativeObject().floatForKey(key);
    }
};

Data.getLongVariable = function(key){
    if (typeof key === 'string'){
        return Data.ios.getNativeObject().doubleForKey(key);
    }
};

/////////////////////////////////////////////////////////////
// SETTERS
Data.setStringVariable = function(key, value){
    if (typeof key === 'string' && typeof value === 'string'){
        Data.ios.getNativeObject().setObjectForKey(value, key);
        return Data.ios.getNativeObject().synchronize();
    }
};

Data.setBooleanVariable = function(key, value){
    if (typeof key === 'string' && typeof value === 'boolean'){
        Data.ios.getNativeObject().setBoolForKey(value, key);
        return Data.ios.getNativeObject().synchronize();
    }
};

Data.setIntVariable = function(key, value){
    if (typeof key === 'string' && typeof value === 'number'){
        Data.ios.getNativeObject().setIntegerForKey(value, key);
        return Data.ios.getNativeObject().synchronize();
    }
};

Data.setFloatVariable = function(key, value){
    if (typeof key === 'string' && typeof value === 'number'){
        Data.ios.getNativeObject().setFloatForKey(value, key);
        return Data.ios.getNativeObject().synchronize();
    }
};

Data.setLongVariable = function(key, value){
    if (typeof key === 'string' && typeof value === 'number'){
        Data.ios.getNativeObject().setDoubleForKey(value, key);
        return Data.ios.getNativeObject().synchronize();
    }
};

/////////////////////////////////////////////////////////////

Data.containsVariable = function(key){
    if (typeof key === 'string'){
        var retval = false;
        if(Data.ios.getNativeObject().objectForKey(key)){
            retval = true;
        }
        return retval;
    }
};

Data.removeVariable = function(key){
    if (typeof key === 'string'){
        Data.ios.getNativeObject().removeObjectForKey(key);
        return Data.ios.getNativeObject().synchronize();
    }
};

Data.removeAllVariables = function(){
    var dictionary = Data.ios.getNativeObject().dictionaryRepresentation();
    for (var key in dictionary){
        if (dictionary.hasOwnProperty(key)) {
            Data.ios.getNativeObject().removeObjectForKey(key);
        }
    }
    return Data.ios.getNativeObject().synchronize();
};

Object.defineProperty(Data,'Database',
{
    value: require('./database'),
    enumerable: true
});

module.exports = Data;