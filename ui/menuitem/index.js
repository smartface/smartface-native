if (Device.deviceOS === "iOS") {
  module.exports = require('./menuitem-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./menuitem-Android');
}