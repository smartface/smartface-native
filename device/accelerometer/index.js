if (Device.deviceOS === "iOS") {
  module.exports = require('./accelerometer-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./accelerometer-Android');
}