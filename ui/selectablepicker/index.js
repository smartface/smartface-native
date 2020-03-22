// if (Device.deviceOS === "iOS") {
//     module.exports = require('./selectablepicker-iOS');
// } else if (Device.deviceOS === "Android") {
module.exports = require("./selectablepicker-" + Device.deviceOS);
// }
