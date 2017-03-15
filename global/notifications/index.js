if (Device.deviceOS === "iOS") {
  module.exports = require('./notifications-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./notifications-Android');
}