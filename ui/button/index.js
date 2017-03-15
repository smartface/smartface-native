if (Device.deviceOS === "iOS") {
  module.exports = require('./button-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./button-Android');
}