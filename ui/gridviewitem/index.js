// if (Device.deviceOS === "iOS") {
//     module.exports = require('./gridviewitem-iOS');
// } else if (Device.deviceOS === "Android") {
module.exports = require("./gridviewitem-" + Device.deviceOS);
// }
