if (Device.deviceOS === "iOS") {
    module.exports = require('./contentinsetadjustment-iOS');
} else if (Device.deviceOS === "Android") {
    module.exports = {};
}