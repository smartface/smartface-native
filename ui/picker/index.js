if (Device.deviceOS === "iOS") {
  module.exports = require('./picker-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./picker-Android');
}