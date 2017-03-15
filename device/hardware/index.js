if (Device.deviceOS === "iOS") {
  module.exports = require('./hardware-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./hardware-Android');
}