if (Device.deviceOS === "iOS") {
  module.exports = require('./network-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./network-Android');
}