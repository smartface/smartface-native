if (Device.deviceOS === "iOS") {
  module.exports = require('./system-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./system-Android');
}