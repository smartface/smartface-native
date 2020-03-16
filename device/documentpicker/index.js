if (Device.deviceOS === "iOS") {
    module.exports = require('./documentpicker-iOS');
} else if (Device.deviceOS === "Android") {
    module.exports = require('./documentpicker-Android');
}