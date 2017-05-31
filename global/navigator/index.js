if (Device.deviceOS === "iOS") {
    module.exports = require('./navigator-iOS');
} else if (Device.deviceOS === "Android") {
    module.exports = require('./navigator-Android');
}