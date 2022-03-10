// if (Device.deviceOS === "iOS") {
//     module.exports = require('./videoview-iOS');
// } else if (Device.deviceOS === "Android") {
module.exports = require("./videoview-" + Device.deviceOS);
// }
