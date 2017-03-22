/* globals */
function TypeUtil() {}

TypeUtil.isNumeric = function(param){
    return typeof(param) === "number";
};

TypeUtil.isBoolean = function(param){
    return typeof(param) === 'boolean';
};

TypeUtil.isString = function(param){
    return typeof(param) === 'string';
};

TypeUtil.isObject = function(param){
    return typeof(param) === 'object';
};

TypeUtil.isFunction = function(param){
    return typeof(param) === 'function';
};

TypeUtil.isArray = function(param){
    return Array.isArray(param);
};

TypeUtil.isURL = function(param) {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(param);
};

module.exports = TypeUtil;