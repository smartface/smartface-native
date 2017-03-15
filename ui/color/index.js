if (Device.deviceOS === "iOS") {
  module.exports = require('./color-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./color-Android');
}