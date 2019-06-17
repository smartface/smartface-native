if (Device.deviceOS === "iOS") {
    module.exports = require('./gifimage-iOS');
} else if (Device.deviceOS === "Android") {
    module.exports = require('./gifimage-Android');
}