// if (Device.deviceOS === "iOS") {
//     module.exports = require('./font-iOS');
// } else if (Device.deviceOS === "Android") {
/**
 * @type {import('./index')}
 */
module.exports = require("./font-" + Device.deviceOS);
// }
