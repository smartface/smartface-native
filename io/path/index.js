if (Device.deviceOS === "iOS") {
  module.exports = require('./path-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./path-Android');
}