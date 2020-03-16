// if (Device.deviceOS === "iOS") {
//     module.exports = require('./bottomtabbarcontroller-iOS');
// } else if (Device.deviceOS === "Android") {
module.exports = require("./bottomtabbarcontroller-" + Device.deviceOS);
// }
