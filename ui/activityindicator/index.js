if (Device.deviceOS === "iOS") {
  module.exports = require('./activityindicator-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./activityindicator-Android');
}