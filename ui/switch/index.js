if (Device.deviceOS === "iOS") {
  module.exports = require('./switch-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./switch-Android');
}