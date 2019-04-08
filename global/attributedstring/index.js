if (Device.deviceOS === "iOS") {
    module.exports = require('./attributedstring-iOS');
} else if (Device.deviceOS === "Android") {
    module.exports = require('./attributedstring-Android');
}