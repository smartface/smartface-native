if (Device.deviceOS === "iOS") {
  module.exports = require('./email-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./email-Android');
}