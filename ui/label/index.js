if (Device.deviceOS === "iOS") {
  module.exports = require('./label-iOS');
} else if (Device.deviceOS === "Android") {
  module.exports = require('./label-Android');
}