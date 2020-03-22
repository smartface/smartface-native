const modules = { Android: require("./contentinsetadjustment-iOS"), iOS: {} };
// if (Device.deviceOS === "iOS") {
module.exports =
  Device.deviceOS === "iOS" ? require("./contentinsetadjustment-iOS") : {};
// } else if (Device.deviceOS === "Android") {
//     module.exports = {};
// }
