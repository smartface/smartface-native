// if (Device.deviceOS === "iOS") {
//     module.exports = require('./gridview-iOS');
// } else if (Device.deviceOS === "Android") {
module.exports = require("./gridview-" + Device.deviceOS);
// }
