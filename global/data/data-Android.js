const AndroidConfig = require("sf-core/util/Android/androidconfig");
const TypeUtil = require("sf-core/util/type");

function Data(){}

var activity = AndroidConfig.activity;
// Context.MODE_PRIVATE
var jsSharedPreferences = activity.getSharedPreferences(string("JS"),int(0));

Object.defineProperties(Data, {
    'getStringVariable': {
        value: function(key){
            if(TypeUtil.isString(key) &&  bool(jsSharedPreferences.contains(string(key)))){
                return string(jsSharedPreferences.getString(string(key), null));
            }
            return null;
        },
        enumerable: true
    },
    'getBooleanVariable': {
        value: function(key){
            if(TypeUtil.isString(key) &&  bool(jsSharedPreferences.contains(string(key)))){
                return bool(jsSharedPreferences.getBoolean(string(key), bool(false)));
            }
            return null;
        },
        enumerable: true
    },
    'getIntVariable': {
        value: function(key){
            if(TypeUtil.isString(key) &&  bool(jsSharedPreferences.contains(string(key)))){
                return int(jsSharedPreferences.getInt(string(key), int(-1)));
            }
            return null;
        },
        enumerable: true
    },
    'getFloatVariable': {
        value: function(key){
            if(TypeUtil.isString(key) &&  bool(jsSharedPreferences.contains(string(key)))){
                return float(jsSharedPreferences.getFloat(string(key), float(-1)));
            }
            return null;
        },
        enumerable: true
    },
    'getLongVariable': {
        value: function(key){
            if(TypeUtil.isString(key) &&  bool(jsSharedPreferences.contains(string(key)))){
                return long(jsSharedPreferences.getLong(string(key), long(-1)));
            }
            return null;
        },
        enumerable: true
    },
    'setStringVariable': {
        value: function(key, value){
            if(TypeUtil.isString(key) && TypeUtil.isString(value)){
                jsSharedPreferences.edit().putString(string(key), string(value)).commit();
            }
        },
        enumerable: true
    },
    'setBooleanVariable': {
        value: function(key, value){
            if(TypeUtil.isString(key) && TypeUtil.isBoolean(value)){
                jsSharedPreferences.edit().putBoolean(string(key), bool(value)).commit();
            }
        },
        enumerable: true
    },
    'setIntVariable': {
        value: function(key, value){
            if(TypeUtil.isString(key) && TypeUtil.isNumeric(value)){
                jsSharedPreferences.edit().putInt(string(key), int(value)).commit();
            }
        },
        enumerable: true
    },
    'setFloatVariable': {
        value: function(key, value){
            if(TypeUtil.isString(key) && TypeUtil.isNumeric(value)){
                jsSharedPreferences.edit().putFloat(string(key), float(value)).commit();
            }
        },
        enumerable: true
    },
    'setLongVariable': {
        value: function(key, value){
            if(TypeUtil.isString(key) && TypeUtil.isNumeric(value)){
                jsSharedPreferences.edit().putLong(string(key), long(value)).commit();
            }
        },
        enumerable: true
    },
    'containsVariable': {
        value: function(key){
            if(TypeUtil.isString(key)){
                return bool(jsSharedPreferences.contains(string(key)));
            }
            return false;
        },
        enumerable: true
    },
    'removeVariable': {
        value: function(key){
            if(TypeUtil.isString(key)){
                jsSharedPreferences.edit().remove(string(key)).commit();
            }
        },
        enumerable: true
    },
    'removeAllVariables': {
        value: function(){
            jsSharedPreferences.edit().clear().commit();
        },
        enumerable: true
    },
    'Database': {
        value: require('./database'),
        enumerable: true
    }
});



module.exports = Data;