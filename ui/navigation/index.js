if (Device.deviceOS === "iOS") {
  module.exports = require('./navigation-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./navigation-Android');
}