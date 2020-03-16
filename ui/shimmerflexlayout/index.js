// if (Device.deviceOS === "iOS") {
//     module.exports = require('./shimmerflexlayout-iOS');
// } else if (Device.deviceOS === "Android") {
module.exports = require("./shimmerflexlayout-" + Device.deviceOS);
// }
