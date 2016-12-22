/* globals */
function TypeUtil() {}

TypeUtil.isNumeric = function(param){
    return typeof(param) == "number";
};

TypeUtil.isBooleand = function(param){
    return typeof(param) == 'boolean';
};

TypeUtil.isString = function(param){
    return typeof(param) == 'string';
};

TypeUtil.isObject = function(param){
    return typeof(param) == 'object';
};

module.exports = TypeUtil;