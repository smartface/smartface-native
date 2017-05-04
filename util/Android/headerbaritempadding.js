const AndroidUnitConverter  = require("sf-core/util/Android/unitconverter.js");

var HearBarItemPadding = {};
HearBarItemPadding.horizontal = AndroidUnitConverter.dpToPixel(12);
HearBarItemPadding.vertical = AndroidUnitConverter.dpToPixel(10);

module.exports = HearBarItemPadding;