if (Device.deviceOS === "iOS") {
    module.exports = require('./bottomtabbar-iOS');
} else if (Device.deviceOS === "Android") {
    module.exports = require('./bottomtabbar-Android');
}