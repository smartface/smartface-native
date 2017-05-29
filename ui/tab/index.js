if (Device.deviceOS === "iOS") {
  module.exports = require('./tab-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./tab-Android');
}