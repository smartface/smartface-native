
function Data() {
    var _identifier = "NF_USER_DEFAULTS";
    
    var self = this;
    self.nativeObject = new NSUserDefaults(_identifier);
    
    
    /////////////////////////////////////////////////////////////
    // GETTERS
    this.getStringVariable = function(key){
        if (typeof key === 'string'){
            return self.nativeObject.stringForKey(key);
        }
    };
    
    this.getBooleanVariable = function(key){
        if (typeof key === 'string'){
            return self.nativeObject.boolForKey(key);
        }
    };
    
    this.getIntVariable = function(key){
        if (typeof key === 'string'){
            return self.nativeObject.integerForKey(key);
        }
    };
    
    this.getFloatVariable = function(key){
        if (typeof key === 'string'){
            return self.nativeObject.floatForKey(key);
        }
    };
    
    this.getLongVariable = function(key){
        if (typeof key === 'string'){
            return self.nativeObject.doubleForKey(key);
        }
    };
    
    /////////////////////////////////////////////////////////////
    // SETTERS
    this.setStringVariable = function(key, value){
        if (typeof key === 'string' && typeof value === 'string'){
            self.nativeObject.setObjectForKey(value, key);
            return self.nativeObject.synchronize();
        }
    };
    
    this.setBooleanVariable = function(key, value){
        if (typeof key === 'string' && typeof value === 'boolean'){
            self.nativeObject.setBoolForKey(value, key);
            return self.nativeObject.synchronize();
        }
    };
    
    this.setIntVariable = function(key, value){
        if (typeof key === 'string' && typeof value === 'number'){
            self.nativeObject.setIntegerForKey(value, key);
            return self.nativeObject.synchronize();
        }
    };
    
    this.setFloatVariable = function(key, value){
        if (typeof key === 'string' && typeof value === 'number'){
            self.nativeObject.setFloatForKey(value, key);
            return self.nativeObject.synchronize();
        }
    };
    
    this.setLongVariable = function(key, value){
        if (typeof key === 'string' && typeof value === 'number'){
            self.nativeObject.setDoubleForKey(value, key);
            return self.nativeObject.synchronize();
        }
    };
    
    /////////////////////////////////////////////////////////////
    
    this.containsVariable = function(key){
        if (typeof key === 'string'){
            var retval = false;
            if(self.nativeObject.objectForKey(key)){
                retval = true;
            }
            return retval;
        }
    };
    
    this.removeVariable = function(key){
        if (typeof key === 'string'){
            self.nativeObject.removeObjectForKey(key);
            return self.nativeObject.synchronize();
        }
    };
    
    this.removeAllVariables = function(){
        var dictionary = self.nativeObject.dictionaryRepresentation();
        for (var key in dictionary){
            if (dictionary.hasOwnProperty(key)) {
                self.nativeObject.removeObjectForKey(key);
            }
        }
        return self.nativeObject.synchronize();
    };
}

module.exports = Data;