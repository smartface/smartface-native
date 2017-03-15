if (Device.deviceOS === "iOS") {
  module.exports = require('./sound-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./sound-Android');
}