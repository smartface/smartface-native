if (Device.deviceOS === "iOS") {
    module.exports = require('./activityindicatorviewstyle-iOS');
} else if (Device.deviceOS === "Android") {
    module.exports = require('./activityindicatorviewstyle-Android');
}