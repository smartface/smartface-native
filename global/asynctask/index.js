// if (Device.deviceOS === "iOS") {
//     module.exports = require('./asynctask-iOS');
// } else if (Device.deviceOS === "Android") {
module.exports = require("./asynctask-" + Device.deviceOS);
// }
