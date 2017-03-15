if (Device.deviceOS === "iOS") {
  module.exports = require('./alertview-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./alertview-Android');
}