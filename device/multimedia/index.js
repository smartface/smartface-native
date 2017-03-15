if (Device.deviceOS === "iOS") {
  module.exports = require('./multimedia-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./multimedia-Android');
}