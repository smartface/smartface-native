/* globals */
function TypeUtil() {}

TypeUtil.isNumeric = function(param){
    return !isNaN(parseFloat(param)) && isFinite(param);
}

module.exports = TypeUtil;