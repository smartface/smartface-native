if (Device.deviceOS === "iOS") {
  module.exports = require('./scrollview-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./scrollview-Android');
}