if (Device.deviceOS === "iOS") {
    module.exports = require('./rangeslider-iOS');
} else if (Device.deviceOS === "Android") {
    module.exports = require('./rangeslider-Android');
}