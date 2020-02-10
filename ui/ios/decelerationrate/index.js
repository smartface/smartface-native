if (Device.deviceOS === "iOS") {
    module.exports = require('./decelerationrate-iOS');
} else if (Device.deviceOS === "Android") {
    module.exports = {};
}