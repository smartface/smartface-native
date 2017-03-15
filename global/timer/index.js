if (Device.deviceOS === "iOS") {
  module.exports = require('./timer-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./timer-Android');
}