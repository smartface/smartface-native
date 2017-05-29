if (Device.deviceOS === "iOS") {
  module.exports = require('./swipeview-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./swipeview-Android');
}