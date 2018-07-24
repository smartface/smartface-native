if (Device.deviceOS === "iOS") {
  module.exports = require('./emailcomposer-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./emailcomposer-Android');
}