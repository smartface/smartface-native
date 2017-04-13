const TypeUtil = require("sf-core/util/type");

function Data(){}

var activity = Android.getActivity();
// Context.MODE_PRIVATE
var jsSharedPreferences = activity.getSharedPreferences("JS",0);

Object.defineProperties(Data, {
    'getStringVariable': {
        value: function(key){
            if(TypeUtil.isString(key) &&  jsSharedPreferences.contains(key)){
                return jsSharedPreferences.getString(key, null);
            }
            return null;
        },
        enumerable: true
    },
    'getBooleanVariable': {
        value: function(key){
            if(TypeUtil.isString(key) &&  jsSharedPreferences.contains(key)){
                return jsSharedPreferences.getBoolean(key, false);
            }
            return null;
        },
        enumerable: true
    },
    'getIntVariable': {
        value: function(key){
            if(TypeUtil.isString(key) &&  jsSharedPreferences.contains(key)){
                return jsSharedPreferences.getInt(key, -1);
            }
            return null;
        },
        enumerable: true
    },
    'getFloatVariable': {
        value: function(key){
            if(TypeUtil.isString(key) &&  jsSharedPreferences.contains(key)){
                return jsSharedPreferences.getFloat(key, -1);
            }
            return null;
        },
        enumerable: true
    },
    'getLongVariable': {
        value: function(key){
            if(TypeUtil.isString(key) &&  jsSharedPreferences.contains(key)){
                return jsSharedPreferences.getLong(key, -1);
            }
            return null;
        },
        enumerable: true
    },
    'setStringVariable': {
        value: function(key, value){
            if(TypeUtil.isString(key) && TypeUtil.isString(value)){
                jsSharedPreferences.edit().putString(key, value).commit();
            }
        },
        enumerable: true
    },
    'setBooleanVariable': {
        value: function(key, value){
            if(TypeUtil.isString(key) && TypeUtil.isBoolean(value)){
                jsSharedPreferences.edit().putBoolean(key, value).commit();
            }
        },
        enumerable: true
    },
    'setIntVariable': {
        value: function(key, value){
            if(TypeUtil.isString(key) && TypeUtil.isNumeric(value)){
                jsSharedPreferences.edit().putInt(key, value).commit();
            }
        },
        enumerable: true
    },
    'setFloatVariable': {
        value: function(key, value){
            if(TypeUtil.isString(key) && TypeUtil.isNumeric(value)){
                jsSharedPreferences.edit().putFloat(key, value).commit();
            }
        },
        enumerable: true
    },
    'setLongVariable': {
        value: function(key, value){
            if(TypeUtil.isString(key) && TypeUtil.isNumeric(value)){
                jsSharedPreferences.edit().putLong(key, value).commit();
            }
        },
        enumerable: true
    },
    'containsVariable': {
        value: function(key){
            if(TypeUtil.isString(key)){
                return jsSharedPreferences.contains(key);
            }
            return false;
        },
        enumerable: true
    },
    'removeVariable': {
        value: function(key){
            if(TypeUtil.isString(key)){
                jsSharedPreferences.edit().remove(key).commit();
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