if (Device.deviceOS === "iOS") {
  module.exports = require('./speechrecognizer-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./speechrecognizer-Android');
}