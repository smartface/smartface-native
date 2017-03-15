if (Device.deviceOS === "iOS") {
  module.exports = require('./location-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./location-Android');
}