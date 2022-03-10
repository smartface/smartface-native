// if (Device.deviceOS === "iOS") {
//     module.exports = {};
// } else if (Device.deviceOS === "Android") {
module.exports = require("./ripple-" + Device.deviceOS);
// }
